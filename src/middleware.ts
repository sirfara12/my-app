import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const requireAuth: string[] = [
  "/profile",
  "/admin",
  "/produk",
  "/about",
  "/editor"
];

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  let token = null;

  if (requireAuth.some((path) => pathname.startsWith(path))) {
    token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const url = new URL("/auth/login", req.url);
      url.searchParams.set("callbackUrl", encodeURI(req.url));
      return NextResponse.redirect(url);
    }
  }
  if (pathname.startsWith("/editor") && token?.role !== "editor") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  return NextResponse.next();
}