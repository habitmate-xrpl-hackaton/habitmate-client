// Credential Setup 관련 유틸리티 훅
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export interface CredentialSetupOptions {
  credentialType?: string;
  issuerSeed?: string;
  subjectSeed?: string;
  delay?: number; // 모달 표시 지연 시간 (ms)
  forceShow?: boolean; // 강제로 모달 표시 (개발용)
}

export function useCredentialSetup(options: CredentialSetupOptions = {}) {
  const { data: session, status } = useSession();
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
    if (status === "loading") {
      setIsLoading(true);
      return;
    }

    if (status === "unauthenticated") {
      setIsLoading(false);
      return;
    }

    if (session?.user) {
      const userEmail = session.user.email;

      if (forceShow) {
        // 개발 환경에서 강제 표시
        console.log("🔧 개발 모드: Credential Setup 모달 강제 표시");
        setShouldShowModal(true);
        setIsLoading(false);
        return;
      }

      // 로컬 스토리지에서 사용자별 표시 여부 확인
      const credentialSetupShown = localStorage.getItem(
        "credential-setup-shown"
      );

      if (!credentialSetupShown || credentialSetupShown !== userEmail) {
        console.log(
          "🚀 새 사용자 감지, Credential Setup 모달 표시:",
          userEmail
        );

        // 지연 시간 후 모달 표시
        const timer = setTimeout(() => {
          setShouldShowModal(true);
          // 사용자 이메일로 표시 여부 저장
          localStorage.setItem("credential-setup-shown", userEmail || "");
        }, delay);

        setIsLoading(false);
        return () => clearTimeout(timer);
      } else {
        console.log("✅ 사용자 이미 Credential Setup 완료:", userEmail);
        setIsLoading(false);
      }
    }
  }, [session, status, forceShow, delay]);

  const markAsCompleted = () => {
    if (session?.user?.email) {
      localStorage.setItem("credential-setup-shown", session.user.email);
      setShouldShowModal(false);
    }
  };

  const resetCredentialSetup = () => {
    if (session?.user?.email) {
      localStorage.removeItem("credential-setup-shown");
      console.log("🔄 Credential Setup 상태 리셋");
    }
  };

  return {
    shouldShowModal,
    isLoading,
    session,
    credentialType,
    issuerSeed: issuerSeed || process.env.NEXT_PUBLIC_ADMIN_SEED,
    subjectSeed: subjectSeed || process.env.NEXT_PUBLIC_USER_SEED,
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
