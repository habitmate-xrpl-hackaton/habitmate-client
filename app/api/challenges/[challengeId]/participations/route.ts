import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ challengeId: string }> }
) {
  try {
    const { challengeId } = await params;

    // Authorization 헤더에서 토큰 가져오기
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "인증 토큰이 없습니다" },
        { status: 401 }
      );
    }

    // 요청 바디 파싱
    const body = await request.json();
    console.log("🚀 챌린지 참가 요청:", { challengeId, body });

    // API Base URL
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      return NextResponse.json(
        { error: "API Base URL이 설정되지 않았습니다" },
        { status: 500 }
      );
    }

    // 실제 API 호출
    const participationUrl = new URL(
      `/api/v1/challenges/${challengeId}/participations`,
      apiBaseUrl
    );

    const response = await fetch(participationUrl.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader, // 클라이언트에서 받은 토큰 그대로 전달
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("챌린지 참가 API 에러:", errorText);
      return NextResponse.json(
        { error: `챌린지 참가 실패: ${response.status}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log("✅ 챌린지 참가 성공:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ 챌린지 참가 API 프록시 에러:", error);
    return NextResponse.json(
      { error: "챌린지 참가 처리 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
