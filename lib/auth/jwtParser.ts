import jwt from "jsonwebtoken";

// JWT 토큰 파싱 유틸리티
export interface JWTPayload {
  sub: string;
  iat: number;
  exp: number;
  role: string;
  userId: number;
  xrplAddress: string; // 사용자 지갑 주소
  xrplIssuerAddress?: string; // 발급자 지갑 주소 (새로 추가)
  xrplSecret: string;
  isKYC?: boolean; // KYC 완료 여부
}

/**
 * JWT 토큰에서 payload를 파싱합니다 (jsonwebtoken 라이브러리 사용)
 * @param token JWT 토큰 (Bearer 접두사 포함 가능)
 * @returns 파싱된 payload 또는 null
 */
export function parseJWT(token: string): JWTPayload | null {
  try {
    // Bearer 접두사 제거
    const cleanToken = token.replace(/^Bearer\s+/i, "");

    // jsonwebtoken 라이브러리를 사용하여 JWT 디코딩 (서명 검증 없이)
    const payload = jwt.decode(cleanToken) as any;

    if (!payload) {
      console.error("❌ JWT 디코딩 결과가 null입니다");
      return null;
    }

    console.log("🔍 JWT 파싱 성공:", {
      userId: payload.userId,
      xrplAddress: payload.xrplAddress,
      xrplIssuerAddress: payload.xrplIssuerAddress,
      role: payload.role,
      isKYC: payload.isKYC,
    });

    return payload as JWTPayload;
  } catch (error) {
    console.error("❌ JWT 파싱 실패:", error);
    return null;
  }
}

/**
 * JWT 토큰에서 XRPL 지갑 주소를 추출합니다
 * @param token JWT 토큰
 * @returns XRPL 지갑 주소 또는 null
 */
export function getXrplAddressFromToken(token: string): string | null {
  const payload = parseJWT(token);
  return payload?.xrplAddress || null;
}

/**
 * JWT 토큰에서 사용자 ID를 추출합니다
 * @param token JWT 토큰
 * @returns 사용자 ID 또는 null
 */
export function getUserIdFromToken(token: string): number | null {
  const payload = parseJWT(token);
  return payload?.userId || null;
}

/**
 * JWT 토큰에서 발급자 XRPL 지갑 주소를 추출합니다
 * @param token JWT 토큰
 * @returns 발급자 XRPL 지갑 주소 또는 null
 */
export function getXrplIssuerAddressFromToken(token: string): string | null {
  const payload = parseJWT(token);
  return payload?.xrplIssuerAddress || null;
}

/**
 * JWT 토큰에서 모든 XRPL 지갑 정보를 추출합니다
 * @param token JWT 토큰
 * @returns XRPL 지갑 정보 객체 또는 null
 */
export function getXrplWalletInfo(
  token: string
): { userAddress: string; issuerAddress?: string } | null {
  const payload = parseJWT(token);
  if (!payload?.xrplAddress) return null;

  return {
    userAddress: payload.xrplAddress,
    issuerAddress: payload.xrplIssuerAddress,
  };
}
