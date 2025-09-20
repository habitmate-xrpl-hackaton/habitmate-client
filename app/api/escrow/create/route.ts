import { NextRequest, NextResponse } from "next/server";
import { credentialAccept } from "@/lib/credentials/credentialAccept";

export async function POST(request: NextRequest) {
  try {
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
    console.log("🔒 Escrow 생성 요청:", body);

    const { issuerSeed, subjectSeed, amount, condition } = body;

    if (!issuerSeed || !subjectSeed || !amount) {
      return NextResponse.json(
        { error: "필수 매개변수가 누락되었습니다" },
        { status: 400 }
      );
    }

    // Escrow 생성 시뮬레이션 (실제로는 xrpl 라이브러리 사용)
    console.log("🔒 Escrow 생성 시뮬레이션 시작");

    // 시뮬레이션 지연
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 시뮬레이션 결과
    const escrowResult = {
      sequenceNumber: Math.floor(Math.random() * 1000000) + 1000000,
      txHash:
        "ESCROW_" + Math.random().toString(36).substr(2, 16).toUpperCase(),
      amount: amount,
      condition: condition,
      issuerAddress: issuerSeed, // 실제로는 시드에서 주소를 계산해야 함
      subjectAddress: subjectSeed,
      status: "created",
      createdAt: new Date().toISOString(),
    };

    console.log("✅ Escrow 생성 시뮬레이션 완료:", escrowResult);

    return NextResponse.json(escrowResult);
  } catch (error) {
    console.error("❌ Escrow 생성 API 에러:", error);
    return NextResponse.json(
      { error: "Escrow 생성 처리 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
