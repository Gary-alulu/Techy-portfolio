import { lookup } from "node:dns/promises";

function isPrivateIpv4(ip: string): boolean {
  const parts = ip.split(".").map((p) => parseInt(p, 10));
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) return false;
  const [a, b] = parts;
  if (a === 0 || a === 127) return true;
  if (a === 10) return true;
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
  if (a === 169 && b === 254) return true; // link-local
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 192 && b === 0) return true; // 192.0.0.0/24 (reserved for special purposes incl. IETF AS112)
  if (a === 198 && (b === 18 || b === 19)) return true; // benchmarking
  if (a === 224) return true; // multicast
  return false;
}

function isPrivateIpv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  if (lower === "::1" || lower === "::") return true;
  if (lower.startsWith("::ffff:")) {
    const v4 = lower.slice("::ffff:".length);
    return isPrivateIpv4(v4);
  }
  const normalized = lower.includes("::") ? expandIpv6(lower) : lower;
  const hextets = normalized.split(":").map((h) => parseInt(h || "0", 16));
  if (hextets.length !== 8 || hextets.some((h) => Number.isNaN(h))) return false;
  const [first, second] = hextets;
  if ((first >> 2) === (0xfc00 >> 2)) return true; // fc00::/7 unique-local
  if (first === 0xfe80 || (first === 0xfebf && second === 0xffff)) return true; // fe80::/10 link-local
  if (first === 0xff00) return true; // multicast
  if (first === 0x2001 && second === 0x0db8) return true; // documentation range — unreachable anyway
  return false;
}

function expandIpv6(ip: string): string {
  const [head, tail] = ip.split("::");
  const headParts = head ? head.split(":").filter(Boolean) : [];
  const tailParts = tail ? tail.split(":").filter(Boolean) : [];
  if (headParts.length + tailParts.length >= 8) return [headParts, tailParts].flat().join(":");
  const zeros = 8 - headParts.length - tailParts.length;
  return [...headParts, ...Array(zeros).fill("0"), ...tailParts].join(":");
}

/**
 * Guards server-side fetches against SSRF.
 * - Allowed: http/https only.
 * - When `allowedHostnames` is provided, http(s) hosts must match one exactly or as a subdomain;
 *   non-http URLs are rejected outright.
 * - Otherwise: rejects localhost / *.local / *.internal names, private IP literals,
 *   and hostnames that DNS-resolve to private addresses.
 * Returns `true` + the guarded URL, or an error message string.
 */
export async function guardFetchUrl(
  url: string,
  allowedHostnames?: string[]
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { ok: false, error: "Invalid URL" };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { ok: false, error: "Only http/https URLs are allowed" };
  }

  const hostname = parsed.hostname.toLowerCase().replace(/\.$/, "");

  if (allowedHostnames && allowedHostnames.length > 0) {
    const allowed = allowedHostnames.some((h) => {
      const hh = h.toLowerCase();
      return hostname === hh || hostname.endsWith(`.${hh}`);
    });
    if (!allowed) {
      return { ok: false, error: "Host is not allowed" };
    }
    return { ok: true, url: parsed.toString() };
  }

  if (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal") ||
    hostname.endsWith(".home.arpa")
  ) {
    return { ok: false, error: "Internal hostnames are not allowed" };
  }

  // IP literal
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
    if (isPrivateIpv4(hostname)) return { ok: false, error: "Private addresses are not allowed" };
    return { ok: true, url: parsed.toString() };
  }
  if (hostname.includes(":")) {
    if (isPrivateIpv6(hostname)) return { ok: false, error: "Private addresses are not allowed" };
    return { ok: true, url: parsed.toString() };
  }

  // Resolve hostname(s); reject if any resolve to a private address
  try {
    const addresses = await lookup(hostname, { all: true });
    for (const addr of addresses) {
      const ip = addr.address;
      if (ip.includes(":") ? isPrivateIpv6(ip) : isPrivateIpv4(ip)) {
        return { ok: false, error: "Resolved address is private" };
      }
    }
  } catch {
    return { ok: false, error: "Could not resolve host" };
  }

  return { ok: true, url: parsed.toString() };
}