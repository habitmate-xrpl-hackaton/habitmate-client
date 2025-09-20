// Credential Setup 관련 유틸리티 훅
import { useEffect, useState } from "react";

export interface CredentialSetupOptions {
  credentialType?: string;
  issuerSeed?: string;
  subjectSeed?: string;
  delay?: number; // 모달 표시 지연 시간 (ms)
  forceShow?: boolean; // 강제로 모달 표시 (개발용)
  showAfterAccept?: boolean; // CredentialAccept 완료 후에만 표시
}

export function useCredentialSetup(options: CredentialSetupOptions = {}) {
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [credentialAcceptCompleted, setCredentialAcceptCompleted] =
    useState(false);

  const {
    credentialType = "DRIVER_LICENCE",
    issuerSeed,
    subjectSeed,
    delay = 1000,
    forceShow = false,
    showAfterAccept = false,
  } = options;

  // CredentialAccept 완료 상태를 체크하는 함수
  const checkCredentialAcceptStatus = () => {
    // sessionStorage에서 credentialAccept 완료 상태 확인
    const acceptStatus = sessionStorage.getItem("credentialAcceptCompleted");
    return acceptStatus === "true";
  };

  useEffect(() => {
    if (forceShow) {
      // 개발 환경에서 강제 표시
      console.log("🔧 개발 모드: Credential Setup 모달 강제 표시");
      setShouldShowModal(true);
      setIsLoading(false);
      return;
    }

    if (showAfterAccept) {
      // CredentialAccept 완료 후에만 표시
      console.log("🔍 CredentialAccept 완료 상태 확인 중...");

      const checkInterval = setInterval(() => {
        const isCompleted = checkCredentialAcceptStatus();
        console.log("🔍 CredentialAccept 완료 상태:", isCompleted);

        if (isCompleted && !credentialAcceptCompleted) {
          console.log(
            "✅ CredentialAccept 완료됨 - Credential Setup 모달 표시"
          );
          setCredentialAcceptCompleted(true);
          setShouldShowModal(true);
          setIsLoading(false);
          clearInterval(checkInterval);
        }
      }, 1000); // 1초마다 체크

      // 30초 후 타임아웃
      const timeout = setTimeout(() => {
        clearInterval(checkInterval);
        setIsLoading(false);
        console.log("⏰ CredentialAccept 상태 체크 타임아웃");
      }, 30000);

      return () => {
        clearInterval(checkInterval);
        clearTimeout(timeout);
      };
    } else {
      // 기존 로직: 매번 로그인할 때마다 모달 표시
      console.log("🚀 로그인 시 Credential Setup 모달 표시");

      const timer = setTimeout(() => {
        setShouldShowModal(true);
      }, delay);

      setIsLoading(false);
      return () => clearTimeout(timer);
    }
  }, [forceShow, delay, showAfterAccept, credentialAcceptCompleted]);

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
    credentialAcceptCompleted,
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
