import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url param" }, { status: 400 });
  }

  try {
    const parsed = new URL(url);
    const res = await fetch(parsed.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LinkPreview/1.0)",
        "Accept": "text/html",
      },
      signal: AbortSignal.timeout(5000),
      redirect: "follow",
    });
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

    return NextResponse.json({ imageUrl, title });
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
