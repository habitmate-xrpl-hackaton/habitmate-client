import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh Token이 필요합니다" },
        { status: 400 }
      );
    }

    console.log("🍪 Refresh Token 쿠키 설정:", {
      tokenLength: refreshToken.length,
      tokenPrefix: refreshToken.substring(0, 20) + "...",
    });

    // httpOnly 쿠키로 Refresh Token 저장
    const response = NextResponse.json({ success: true });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true, // JavaScript 접근 불가 (XSS 방지)
      secure: true, // HTTPS에서만 전송
      sameSite: "strict", // CSRF 공격 방지
      maxAge: 60 * 60 * 24 * 30, // 30일
      path: "/", // 전체 도메인에서 접근 가능
    });

    console.log("✅ Refresh Token 쿠키 저장 완료");

    return response;
  } catch (error) {
    console.error("❌ Refresh Token 쿠키 저장 에러:", error);
    return NextResponse.json(
      { error: "쿠키 저장 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
