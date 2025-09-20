import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh Token이 없습니다" },
        { status: 401 }
      );
    }

    console.log("🔄 토큰 갱신 요청");

    // XRPL API 서버에 토큰 갱신 요청
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${apiBaseUrl}/oauth2/authorization/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      console.error("❌ 토큰 갱신 실패:", response.status);

      // 갱신 실패 시 쿠키 삭제
      const errorResponse = NextResponse.json(
        { error: "토큰 갱신 실패" },
        { status: 401 }
      );

      errorResponse.cookies.set("refreshToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 0, // 즉시 만료
      });

      return errorResponse;
    }

    const data = await response.json();

    if (!data.accessToken) {
      throw new Error("토큰 갱신 응답에 accessToken이 없습니다");
    }

    console.log("✅ 토큰 갱신 성공");

    // 새 토큰들을 응답으로 반환
    const successResponse = NextResponse.json({
      accessToken: data.accessToken,
      // refreshToken이 새로 발급되었으면 쿠키 업데이트
      ...(data.refreshToken && { refreshToken: data.refreshToken }),
    });

    // 새 Refresh Token이 있으면 쿠키 업데이트
    if (data.refreshToken) {
      successResponse.cookies.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30, // 30일
      });
    }

    return successResponse;
  } catch (error) {
    console.error("❌ 토큰 갱신 처리 에러:", error);

    // 에러 시 쿠키 삭제
    const errorResponse = NextResponse.json(
      { error: "토큰 갱신 중 오류가 발생했습니다" },
      { status: 500 }
    );

    errorResponse.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 0,
    });

    return errorResponse;
  }
}
