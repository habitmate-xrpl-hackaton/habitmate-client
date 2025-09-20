// 토큰 관리 유틸리티
export class TokenManager {
  private static instance: TokenManager;
  private refreshPromise: Promise<string | null> | null = null;

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  // Access Token 가져오기
  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("accessToken");
  }

  // Refresh Token 가져오기
  // Refresh Token은 httpOnly 쿠키로 관리되므로 클라이언트에서 직접 접근할 수 없음
  // 토큰 갱신은 서버 API를 통해 처리

  // 토큰 저장 (Access Token만 클라이언트에서 관리)
  setTokens(accessToken: string): void {
    if (typeof window === "undefined") return;

    sessionStorage.setItem("accessToken", accessToken);
    // Refresh Token은 httpOnly 쿠키로 관리되므로 클라이언트에서 저장하지 않음
  }

  // 토큰 삭제
  clearTokens(): void {
    if (typeof window === "undefined") return;

    sessionStorage.removeItem("accessToken");
    // Refresh Token은 httpOnly 쿠키로 관리되므로 클라이언트에서 삭제하지 않음
    // 서버에서 쿠키 삭제 API를 호출해야 함
  }

  // 토큰 갱신 (쿠키에서 Refresh Token 확인)
  async refreshAccessToken(): Promise<string | null> {
    // 이미 갱신 중인 요청이 있으면 대기
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performTokenRefresh();

    try {
      const newAccessToken = await this.refreshPromise;
      return newAccessToken;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async performTokenRefresh(): Promise<string | null> {
    try {
      // 클라이언트 API 라우트를 통해 토큰 갱신 (쿠키 자동 전송)
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`토큰 갱신 실패: ${response.status}`);
      }

      const data = await response.json();

      if (data.accessToken) {
        // 새 Access Token만 저장 (Refresh Token은 쿠키에서 관리)
        this.setTokens(data.accessToken);
        console.log("✅ Access Token 갱신 성공");
        return data.accessToken;
      } else {
        throw new Error("토큰 갱신 응답에 accessToken이 없습니다");
      }
    } catch (error) {
      console.error("❌ 토큰 갱신 실패:", error);
      // 갱신 실패 시 토큰 삭제
      this.clearTokens();
      return null;
    }
  }

  // 인증 헤더 가져오기 (자동 갱신 포함)
  async getAuthHeaders(): Promise<Record<string, string>> {
    let accessToken = this.getAccessToken();

    if (!accessToken) {
      // Access Token이 없으면 Refresh Token으로 갱신 시도
      accessToken = await this.refreshAccessToken();
    }

    if (!accessToken) {
      return {};
    }

    // Bearer 토큰 형태로 처리 (Bearer 접두사가 없으면 추가)
    const bearerToken = accessToken.startsWith("Bearer ")
      ? accessToken
      : `Bearer ${accessToken}`;

    return { Authorization: bearerToken };
  }
}

// 싱글톤 인스턴스 내보내기
export const tokenManager = TokenManager.getInstance();
