import { NextRequest, NextResponse } from "next/server";
import { guardFetchUrl } from "@/lib/ssrf";

const MAX_REDIRECTS = 4;

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url param" }, { status: 400 });
  }

  try {
    const guarded = await guardFetchUrl(url);
    if (!guarded.ok) {
      return NextResponse.json({ error: guarded.error }, { status: 403 });
    }

    // Follow redirects manually so every hop passes the SSRF guard.
    let target = guarded.url;
    let hops = 0;
    let res: Response | undefined;
    while (true) {
      res = await fetch(target, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; LinkPreview/1.0)",
          Accept: "text/html",
        },
        signal: AbortSignal.timeout(5000),
        redirect: "manual",
      });

      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get("location");
        if (!location || hops >= MAX_REDIRECTS) {
          return NextResponse.json({ error: "Too many redirects" }, { status: 400 });
        }
        const next = new URL(location, target).toString();
        const nextGuarded = await guardFetchUrl(next);
        if (!nextGuarded.ok) {
          return NextResponse.json({ error: nextGuarded.error }, { status: 403 });
        }
        target = nextGuarded.url;
        hops += 1;
        continue;
      }
      break;
    }

    if (!res || !res.ok) {
      return NextResponse.json({ error: "Failed to fetch" }, { status: 502 });
    }

    const html = await res.text();

    // Extract og:image
    const ogMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);

    // Extract twitter:image
    const twMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i)
      || html.match(/<meta[^>]*name=["']twitter:image:src["'][^>]*content=["']([^"']+)["']/i);

    // Extract title
    const titleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:title["']/i)
      || html.match(/<title>([^<]+)<\/title>/i);

    const parsed = new URL(target);
    let imageUrl = ogMatch?.[1] || twMatch?.[1] || null;
    const title = titleMatch?.[1]?.trim() || parsed.hostname;

    // Resolve relative URLs
    if (imageUrl && !imageUrl.startsWith("http")) {
      imageUrl = new URL(imageUrl, parsed.origin).toString();
    }

    // Favicon fallback
    if (!imageUrl) {
      imageUrl = `https://www.google.com/s2/favicons?domain=${parsed.hostname}&sz=128`;
    }

    return NextResponse.json({ imageUrl, title, url: target });
  } catch {
    // Even on error, try to return a favicon
    try {
      const hostname = new URL(url).hostname;
      return NextResponse.json({
        imageUrl: `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`,
        title: hostname,
      });
    } catch {
      return NextResponse.json({ imageUrl: null, title: null });
    }
  }
}