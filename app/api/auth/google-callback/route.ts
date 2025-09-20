import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const error = searchParams.get("error");

    console.log("🔗 Google OAuth2 콜백 수신:", {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
      error,
    });

    if (error) {
      console.error("❌ OAuth2 에러:", error);
      // 에러 시 로그인 페이지로 리디렉션
      return NextResponse.redirect(
        new URL("/google-login?error=oauth_error", request.url)
      );
    }

    if (!accessToken) {
      console.error("❌ Access Token이 없습니다");
      return NextResponse.redirect(
        new URL("/google-login?error=no_token", request.url)
      );
    }

    // Bearer 토큰 형태로 처리 (Bearer 접두사가 없으면 추가)
    const bearerAccessToken = accessToken.startsWith("Bearer ")
      ? accessToken
      : `Bearer ${accessToken}`;

    // 사용자 정보를 가져오는 API 호출 (필요한 경우)
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const userResponse = await fetch(`${apiBaseUrl}/api/user/profile`, {
        headers: {
          Authorization: bearerAccessToken, // Bearer 포함해서 전송
          "Content-Type": "application/json",
        },
      });

      let userData = null;
      if (userResponse.ok) {
        userData = await userResponse.json();
        console.log("✅ 사용자 정보 조회 성공:", userData);
      } else {
        console.warn("⚠️ 사용자 정보 조회 실패, 기본값 사용");
        userData = {
          name: "Google 사용자",
          email: "user@example.com",
          avatar: "",
        };
      }

      // 성공 시 홈 페이지로 리디렉션
      const homeUrl = new URL("/home", request.url);
      homeUrl.searchParams.set("access_token", accessToken);
      homeUrl.searchParams.set("user_name", userData?.name || "Google 사용자");
      homeUrl.searchParams.set(
        "user_email",
        userData?.email || "user@example.com"
      );

      const response = NextResponse.redirect(homeUrl);

      // Refresh Token을 httpOnly 쿠키로 설정 (보안 강화)
      if (refreshToken) {
        response.cookies.set("refreshToken", refreshToken, {
          httpOnly: true, // JavaScript 접근 불가
          secure: true, // HTTPS에서만 전송
          sameSite: "strict", // CSRF 공격 방지
          maxAge: 60 * 60 * 24 * 30, // 30일
        });
      }

      return response;
    } catch (fetchError) {
      console.error("❌ 사용자 정보 조회 에러:", fetchError);

      // API 호출 실패 시에도 토큰과 함께 홈으로 리디렉션
      const homeUrl = new URL("/home", request.url);
      homeUrl.searchParams.set("access_token", accessToken);
      homeUrl.searchParams.set("user_name", "Google 사용자");
      homeUrl.searchParams.set("user_email", "user@example.com");

      const response = NextResponse.redirect(homeUrl);

      // Refresh Token을 httpOnly 쿠키로 설정
      if (refreshToken) {
        response.cookies.set("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30,
        });
      }

      return response;
    }
  } catch (error) {
    console.error("❌ Google OAuth2 콜백 처리 에러:", error);
    return NextResponse.redirect(
      new URL("/google-login?error=callback_error", request.url)
    );
  }
}
