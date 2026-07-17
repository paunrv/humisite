import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Session refresh for the future app shell + auth routes.
     * Marketing pages are excluded so the public site stays fast.
     */
    "/app/:path*",
    "/login",
    "/signup",
    "/auth/:path*",
    "/agrupacion/:path*",
  ],
};
