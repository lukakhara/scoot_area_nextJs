import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "../i18n/routing";

const intl = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const match = req.nextUrl.pathname.match(/^\/(en|ka)\/admin(\/|$)/);

  if (match && !req.cookies.get("token")?.value) {
    return NextResponse.redirect(new URL(`/${match[1]}/login`, req.url));
  }

  return intl(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
