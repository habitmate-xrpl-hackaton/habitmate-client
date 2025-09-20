// URL 쿼리 파라미터에서 토큰을 추출하고 Bearer 형태로 변환하는 유틸리티
import qs from "qs";

export interface TokenInfo {
  accessToken: string;
  refreshToken?: string;
  userName?: string;
  userEmail?: string;
}

/**
 * URL 쿼리 파라미터에서 토큰 정보 추출
 * @param searchParams URLSearchParams 객체 또는 쿼리 문자열
 * @returns 토큰 정보 객체
 */
export function parseTokensFromQuery(
  searchParams: URLSearchParams | string
): TokenInfo | null {
  let params: URLSearchParams;

  if (typeof searchParams === "string") {
    params = new URLSearchParams(searchParams);
  } else {
    params = searchParams;
  }

  const accessToken = params.get("accessToken");

  if (!accessToken) {
    console.warn("⚠️ Access Token이 쿼리 파라미터에 없습니다");
    return null;
  }

  // Bearer 토큰 형태로 변환 (Bearer 접두사가 없으면 추가)
  const bearerAccessToken = accessToken.startsWith("Bearer ")
    ? accessToken
    : `Bearer ${accessToken}`;

  return {
    accessToken: bearerAccessToken,
    refreshToken: params.get("refreshToken") || undefined,
    userName: params.get("user_name") || params.get("userName") || undefined,
    userEmail: params.get("user_email") || params.get("userEmail") || undefined,
  };
}

/**
 * 네이버 뉴스 URL 형태의 토큰 파싱
 * @param url 네이버 뉴스 형태의 URL
 * @returns 토큰 정보 객체
 */
export function parseNaverNewsStyleTokens(url: string): TokenInfo | null {
  try {
    const urlObj = new URL(url);
    return parseTokensFromQuery(urlObj.searchParams);
  } catch {
    return null;
  }
}

/**
 * 현재 페이지 URL에서 토큰 파싱 (브라우저 환경)
 * XRPL 서버에서 %20? 형태로 리디렉션하는 경우를 처리
 * @returns 토큰 정보 객체
 */
export function parseTokensFromCurrentUrl(): TokenInfo | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    // XRPL 서버에서 %20? 형태로 리디렉션하는 경우 처리
    // URL에서 %20? 이후의 부분을 추출
    const url = window.location.href;
    const percent20Index = url.indexOf("%20?");

    if (percent20Index !== -1) {
      // %20? 이후의 쿼리 스트링 추출
      const queryString = url.substring(percent20Index + 4); // %20? = 4글자
      return parseTokensFromQuery(queryString);
    }

    return parseNaverNewsStyleTokens(window.location.href);
  } catch {
    return null;
  }
}

/**
 * %20? 패턴이 포함된 URL에서 토큰 추출 (XRPL 서버 전용)
 * @param url %20? 패턴이 포함된 URL
 * @returns 토큰 정보 객체
 */
export function parseTokensFromPercent20Url(url: string): TokenInfo | null {
  try {
    const percent20Index = url.indexOf("%20?");
    if (percent20Index === -1) {
      return null;
    }

    // %20? 이후의 쿼리 스트링 추출
    const queryString = url.substring(percent20Index + 4); // %20? = 4글자
    return parseTokensFromQuery(queryString);
  } catch {
    return null;
  }
}

/**
 * 토큰이 유효한지 간단히 검증
 * @param tokenInfo 토큰 정보 객체
 * @returns 유효성 여부
 */
export function validateTokens(tokenInfo: TokenInfo | null): boolean {
  if (!tokenInfo || !tokenInfo.accessToken) {
    return false;
  }

  // Bearer 접두사 확인
  if (!tokenInfo.accessToken.startsWith("Bearer ")) {
    return false;
  }

  // JWT 토큰 길이 확인 (최소 100자)
  const tokenWithoutBearer = tokenInfo.accessToken.replace("Bearer ", "");
  if (tokenWithoutBearer.length < 100) {
    return false;
  }

  return true;
}

// 사용 예시:
// const tokenInfo = parseTokensFromQuery(window.location.search);
// if (validateTokens(tokenInfo)) {
//   console.log('✅ 유효한 토큰:', tokenInfo);
// }
