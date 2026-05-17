import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const pathname = req.nextUrl.pathname;

  const isAuthPage = pathname === "/login" || pathname === "/sign-up";

  const isProtectedPage = pathname.startsWith("/dashboard");

  // Logged in user trying login/signup
  if (refreshToken && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Logged out user trying dashboard
  if (!refreshToken && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/sign-up", "/dashboard/:path*"],
};
