// 전역 토큰 핸들러 - 어떤 페이지에서든 토큰을 자동으로 파싱하고 저장

import { parseTokensFromCurrentUrl, validateTokens } from "./tokenParser";

export interface TokenHandlerOptions {
  autoRedirect?: boolean;
  redirectPath?: string;
  onSuccess?: (tokenInfo: any) => void;
  onError?: (error: string) => void;
  onNoTokens?: () => void;
  keepQuery?: boolean; // true면 URL 쿼리를 유지
}

/**
 * 현재 페이지 URL에서 토큰을 자동으로 파싱하고 저장
 * @param options 토큰 처리 옵션
 * @returns 토큰 처리 결과
 */
export async function handleTokensFromUrl(options: TokenHandlerOptions = {}) {
  const {
    autoRedirect = true,
    redirectPath = "/home",
    onSuccess,
    onError,
    onNoTokens,
    keepQuery = false,
  } = options;

  try {
    console.log("🔍 전역 토큰 핸들러 시작");

    // 현재 URL에서 토큰 파싱
    const tokenInfo = parseTokensFromCurrentUrl();

    if (!tokenInfo) {
      console.log("ℹ️ URL에 토큰이 없습니다");
      onNoTokens?.();
      return { success: false, reason: "no_tokens" };
    }

    console.log("✅ 토큰 파싱 성공:", {
      hasAccessToken: !!tokenInfo.accessToken,
      hasRefreshToken: !!tokenInfo.refreshToken,
      userName: tokenInfo.userName,
      userEmail: tokenInfo.userEmail,
    });

    // 토큰 유효성 검증
    if (!validateTokens(tokenInfo)) {
      const errorMsg = "유효하지 않은 토큰입니다";
      console.error("❌", errorMsg);
      onError?.(errorMsg);
      return { success: false, reason: "invalid_tokens" };
    }

    // Refresh Token을 httpOnly 쿠키로 저장
    if (tokenInfo.refreshToken) {
      try {
        const response = await fetch("/api/auth/set-refresh-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: tokenInfo.refreshToken,
          }),
        });

        if (!response.ok) {
          throw new Error(`쿠키 저장 실패: ${response.status}`);
        }

        console.log("✅ Refresh Token 쿠키 저장 완료");
      } catch (error) {
        console.error("❌ Refresh Token 쿠키 저장 실패:", error);
        onError?.("토큰 저장 중 오류가 발생했습니다");
        return { success: false, reason: "cookie_save_failed" };
      }
    }

    // Access Token을 sessionStorage에 저장
    if (typeof window !== "undefined" && tokenInfo.accessToken) {
      sessionStorage.setItem("accessToken", tokenInfo.accessToken);
      console.log("✅ Access Token sessionStorage 저장 완료");
    }

    // 성공 콜백 실행
    onSuccess?.(tokenInfo);

    // URL에서 토큰 파라미터 제거 (보안상) - 단, keepQuery가 false일 때만
    if (!keepQuery && typeof window !== "undefined") {
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }

    // 자동 리디렉션
    if (autoRedirect && typeof window !== "undefined") {
      setTimeout(() => {
        window.location.href = redirectPath;
      }, 1000);
    }

    return { success: true, tokenInfo };
  } catch (error) {
    const errorMsg = `토큰 처리 중 오류: ${error}`;
    console.error("❌", errorMsg);
    onError?.(errorMsg);
    return { success: false, reason: "processing_error" };
  }
}

/**
 * 페이지 로드 시 자동으로 토큰 처리
 * @param options 토큰 처리 옵션
 */
export function autoHandleTokensOnPageLoad(options: TokenHandlerOptions = {}) {
  if (typeof window === "undefined") return;

  // 페이지 로드 시 자동 실행
  handleTokensFromUrl(options);
}

// 사용 예시:
// 1. 특정 페이지에서 수동 호출
// handleTokensFromUrl({ redirectPath: "/dashboard" });

// 2. 페이지 로드 시 자동 실행
// autoHandleTokensOnPageLoad();
