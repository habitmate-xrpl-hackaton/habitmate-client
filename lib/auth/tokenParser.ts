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
    console.log("🔍 네이버 뉴스 URL 파싱:", {
      origin: urlObj.origin,
      pathname: urlObj.pathname,
      hasAccessToken: urlObj.searchParams.has("accessToken"),
      hasRefreshToken: urlObj.searchParams.has("refreshToken"),
    });

    return parseTokensFromQuery(urlObj.searchParams);
  } catch (error) {
    console.error("❌ URL 파싱 에러:", error);
    return null;
  }
}

/**
 * 현재 페이지 URL에서 토큰 파싱 (브라우저 환경)
 * @returns 토큰 정보 객체
 */
export function parseTokensFromCurrentUrl(): TokenInfo | null {
  if (typeof window === "undefined") {
    console.warn("⚠️ 브라우저 환경이 아닙니다");
    return null;
  }

  try {
    console.log("🔍 현재 URL에서 토큰 파싱:", window.location.href);
    console.log("🔍 쿼리 스트링:", window.location.search);

    // qs 라이브러리로 쿼리 파라미터 파싱
    const queryParams = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });
    console.log("🔍 qs로 파싱된 쿼리 파라미터:", queryParams);

    // accessToken과 refreshToken 콘솔 출력
    if (queryParams.accessToken) {
      console.log(
        "🎯 accessToken:",
        typeof queryParams.accessToken === "string"
          ? queryParams.accessToken.substring(0, 50) + "..."
          : queryParams.accessToken
      );
    }
    if (queryParams.refreshToken) {
      console.log(
        "🎯 refreshToken:",
        typeof queryParams.refreshToken === "string"
          ? queryParams.refreshToken.substring(0, 50) + "..."
          : queryParams.refreshToken
      );
    }

    const result = parseNaverNewsStyleTokens(window.location.href);

    if (result) {
      console.log("✅ 토큰 파싱 성공:", {
        hasAccessToken: !!result.accessToken,
        hasRefreshToken: !!result.refreshToken,
        userName: result.userName,
        userEmail: result.userEmail,
        accessTokenPreview: result.accessToken?.substring(0, 30) + "...",
      });
    } else {
      console.log("❌ 토큰 파싱 실패: 토큰 정보 없음");
    }

    return result;
  } catch (error) {
    console.error("❌ 현재 URL 토큰 파싱 에러:", error);
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
    console.warn("⚠️ Access Token에 Bearer 접두사가 없습니다");
    return false;
  }

  // JWT 토큰 길이 확인 (최소 100자)
  const tokenWithoutBearer = tokenInfo.accessToken.replace("Bearer ", "");
  if (tokenWithoutBearer.length < 100) {
    console.warn("⚠️ Access Token이 너무 짧습니다");
    return false;
  }

  return true;
}

// 사용 예시:
// const tokenInfo = parseTokensFromQuery(window.location.search);
// if (validateTokens(tokenInfo)) {
//   console.log('✅ 유효한 토큰:', tokenInfo);
// }
