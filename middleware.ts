import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // 인증되지 않은 사용자가 보호된 페이지에 접근하려고 할 때
    if (!token && pathname !== "/onboarding" && pathname !== "/google-login") {
      const redirectUrl = new URL("/google-login", req.url);
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // 공개 페이지들은 항상 접근 가능
        if (pathname === "/onboarding" || pathname === "/google-login") {
          return true;
        }

        // 루트 경로는 onboarding으로 리디렉션
        if (pathname === "/") {
          return true;
        }

        // 인증이 필요한 페이지들은 토큰이 있어야 접근 가능
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
