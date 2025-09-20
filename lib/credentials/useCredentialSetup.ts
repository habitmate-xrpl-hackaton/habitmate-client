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
    if (forceShow) {
      // 개발 환경에서 강제 표시
      console.log("🔧 개발 모드: Credential Setup 모달 강제 표시");
      setShouldShowModal(true);
      setIsLoading(false);
      return;
    }

    // 매번 로그인할 때마다 모달 표시
    console.log("🚀 로그인 시 Credential Setup 모달 표시");

    // 지연 시간 후 모달 표시
    const timer = setTimeout(() => {
      setShouldShowModal(true);
    }, delay);

    setIsLoading(false);
    return () => clearTimeout(timer);
  }, [forceShow, delay]);

  const markAsCompleted = () => {
    setShouldShowModal(false);
  };

  const resetCredentialSetup = () => {
    console.log("🔄 Credential Setup 상태 리셋");
  };

  return {
    shouldShowModal,
    isLoading,
    credentialType,
    issuerSeed: undefined,
    subjectSeed: undefined,
    markAsCompleted,
    resetCredentialSetup,
  };
}

// 개발용 디버그 함수들
export const credentialSetupDebug = {
  // 강제로 모달 표시하도록 설정
  forceShow: () => {
    console.log("🔧 Credential Setup 모달 강제 표시 설정");
  },
};
