// Credential Setup 관련 유틸리티 훅
import { useEffect, useState } from "react";

export interface CredentialSetupOptions {
  credentialType?: string;
  issuerSeed?: string;
  subjectSeed?: string;
  delay?: number; // 모달 표시 지연 시간 (ms)
  forceShow?: boolean; // 강제로 모달 표시 (개발용)
}

export function useCredentialSetup(options: CredentialSetupOptions = {}) {
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    credentialType = "DRIVER_LICENCE",
    issuerSeed,
    subjectSeed,
    delay = 1000,
    forceShow = false,
  } = options;

  useEffect(() => {
    // 더미 사용자 이메일 사용
    const userEmail = "test@example.com";

    if (forceShow) {
      // 개발 환경에서 강제 표시
      console.log("🔧 개발 모드: Credential Setup 모달 강제 표시");
      setShouldShowModal(true);
      setIsLoading(false);
      return;
    }

    // 매번 로그인할 때마다 모달 표시
    console.log("🚀 로그인 시 Credential Setup 모달 표시:", userEmail);

    // 지연 시간 후 모달 표시
    const timer = setTimeout(() => {
      setShouldShowModal(true);
    }, delay);

    setIsLoading(false);
    return () => clearTimeout(timer);
  }, [forceShow, delay]);

  const markAsCompleted = () => {
    const userEmail = "test@example.com";
    localStorage.setItem("credential-setup-shown", userEmail);
    setShouldShowModal(false);
  };

  const resetCredentialSetup = () => {
    const userEmail = "test@example.com";
    localStorage.removeItem("credential-setup-shown");
    console.log("🔄 Credential Setup 상태 리셋");
  };

  return {
    shouldShowModal,
    isLoading,
    session: { user: { email: "test@example.com" } }, // 더미 세션
    credentialType,
    // 보안상 시드는 클라이언트에서 사용하지 않음
    issuerSeed: undefined,
    subjectSeed: undefined,
    markAsCompleted,
    resetCredentialSetup,
  };
}

// 개발용 디버그 함수들
export const credentialSetupDebug = {
  // 현재 상태 확인
  getStatus: () => {
    const shown = localStorage.getItem("credential-setup-shown");
    return {
      hasShownBefore: !!shown,
      userEmail: shown,
      timestamp: new Date().toISOString(),
    };
  },

  // 모든 사용자 데이터 리셋
  resetAll: () => {
    localStorage.removeItem("credential-setup-shown");
    console.log("🔄 모든 Credential Setup 데이터 리셋됨");
  },

  // 특정 사용자 데이터 리셋
  resetForUser: (email: string) => {
    const stored = localStorage.getItem("credential-setup-shown");
    if (stored === email) {
      localStorage.removeItem("credential-setup-shown");
      console.log(`🔄 사용자 ${email}의 Credential Setup 데이터 리셋됨`);
    }
  },

  // 강제로 모달 표시하도록 설정
  forceShow: (email: string) => {
    localStorage.setItem("credential-setup-shown", `FORCE_SHOW_${email}`);
    console.log(
      `🔧 사용자 ${email}에 대해 Credential Setup 모달 강제 표시 설정`
    );
  },
};
