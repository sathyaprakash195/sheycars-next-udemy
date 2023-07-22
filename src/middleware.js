import { NextResponse } from "next/server";

export function middleware(request) {
  let token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const publicRoute = pathname === "/login" || pathname === "/register";
  // if the token is not present & if it is not a public route, redirect to login

  if (!token && !publicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // if the token is present & if it is a public route, redirect to home
  if (token && publicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/"],
};
