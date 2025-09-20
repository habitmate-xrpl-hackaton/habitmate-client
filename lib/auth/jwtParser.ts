// JWT 토큰 파싱 유틸리티
export interface JWTPayload {
  sub: string;
  iat: number;
  exp: number;
  role: string;
  userId: number;
  xrplAddress: string;
  xrplSecret: string;
}

/**
 * JWT 토큰에서 payload를 파싱합니다
 * @param token JWT 토큰 (Bearer 접두사 포함 가능)
 * @returns 파싱된 payload 또는 null
 */
export function parseJWT(token: string): JWTPayload | null {
  try {
    // Bearer 접두사 제거
    const cleanToken = token.replace(/^Bearer\s+/i, "");

    // JWT 구조: header.payload.signature
    const parts = cleanToken.split(".");
    if (parts.length !== 3) {
      console.error("❌ 잘못된 JWT 형식");
      return null;
    }

    // payload 부분 디코딩
    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());

    console.log("🔍 JWT 파싱 성공:", {
      userId: payload.userId,
      xrplAddress: payload.xrplAddress,
      role: payload.role,
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
