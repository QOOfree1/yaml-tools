import { NextRequest, NextResponse } from "next/server";
import { getLangFromAcceptLanguage, supportedLangs } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if path already starts with a supported lang
  const pathnameHasLang = supportedLangs.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
  );

  if (pathnameHasLang) return NextResponse.next();

  // Redirect to detected language
  const acceptLang = request.headers.get("accept-language");
  const lang = getLangFromAcceptLanguage(acceptLang);
  const newUrl = new URL(`/${lang}${pathname === "/" ? "" : pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
