import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Exclude login page from protection
  if (pathname === "/admin-login") {
    return NextResponse.next();
  }

  // 1. Check if the path is an admin page
  const isProtectedPath = pathname.startsWith("/admin");
  
  // 2. Check if the path is a mutating API route
  const isApiRoute = pathname.startsWith("/api/");
  const isMutatingMethod = ["POST", "PATCH", "DELETE"].includes(request.method);
  
  // Don't protect /api/auth or public form submissions like POST /api/contact
  const isAuthRoute = pathname.startsWith("/api/auth");
  const isPublicContactSubmit = pathname === "/api/contact" && request.method === "POST";
  
  const requiresAuth = isProtectedPath || (isApiRoute && isMutatingMethod && !isAuthRoute && !isPublicContactSubmit);

  if (requiresAuth) {
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      if (isApiRoute) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }

    try {
      // Verify token
      const secret = process.env.JWT_SECRET || "default_secret_key";
      const key = new TextEncoder().encode(secret);
      await jwtVerify(token, key, { algorithms: ["HS256"] });

      // Flag admin routes so the root layout can skip the public site chrome
      if (isProtectedPath) {
        const reqHeaders = new Headers(request.headers);
        reqHeaders.set("x-is-admin-route", "1");
        return NextResponse.next({ request: { headers: reqHeaders } });
      }

      return NextResponse.next();
    } catch (error) {
      if (isApiRoute) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images).*)",
  ],
};
