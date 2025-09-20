import { NextRequest, NextResponse } from "next/server";
import { parseJWT } from "@/lib/auth/jwtParser";
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

    // JWT 토큰 파싱
    const payload = parseJWT(authHeader);
    if (!payload) {
      return NextResponse.json(
        { error: "유효하지 않은 토큰입니다" },
        { status: 401 }
      );
    }

    // XRPL 지갑 주소 확인
    if (!payload.xrplAddress) {
      return NextResponse.json(
        { error: "XRPL 지갑 주소가 없습니다" },
        { status: 400 }
      );
    }

    console.log("🚀 CredentialAccept 시작:", {
      userId: payload.userId,
      xrplAddress: payload.xrplAddress,
    });

    // 실제 발급자 시드 (환경변수에서 - 정부기관 등)
    const issuerSeed = process.env.ISSUER_SEED;
    if (!issuerSeed) {
      return NextResponse.json(
        { error: "발급자 시드가 설정되지 않았습니다" },
        { status: 500 }
      );
    }

    // 사용자의 XRPL 주소를 subject로 사용
    // 실제로는 사용자의 private key가 필요하지만,
    // 현재는 주소만 있으므로 테스트용으로 처리
    const subjectSeed = payload.xrplAddress; // 실제로는 사용자의 private key여야 함

    // CredentialAccept 실행
    const result = await credentialAccept({
      issuerSeed,
      subjectSeed,
      credentialType: "DRIVER_LICENCE",
    });

    if (result.success) {
      console.log("✅ CredentialAccept 성공:", result);
      return NextResponse.json({
        success: true,
        txHash: result.txHash,
        xrplAddress: payload.xrplAddress,
        userId: payload.userId,
      });
    } else {
      console.error("❌ CredentialAccept 실패:", result.error);
      return NextResponse.json(
        { error: `CredentialAccept 실패: ${result.error}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ CredentialAccept API 에러:", error);
    return NextResponse.json(
      { error: "CredentialAccept 처리 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
