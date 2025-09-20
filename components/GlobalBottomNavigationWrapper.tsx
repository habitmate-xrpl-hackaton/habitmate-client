"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalBottomNavigation from "./GlobalBottomNavigation";

export default function GlobalBottomNavigationWrapper() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // body에 modal-open 클래스가 있는지 확인
  useEffect(() => {
    const checkModalState = () => {
      setIsModalOpen(document.body.classList.contains("modal-open"));
    };

    // 초기 상태 확인
    checkModalState();

    // MutationObserver로 클래스 변경 감지
    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // onboarding, google-login 페이지 또는 모달이 열려있을 때 네비게이션 숨기기
  const hideNavigation =
    pathname === "/onboarding" ||
    pathname === "/google-login" ||
    isModalOpen ||
    pathname === "/uploadproof" ||
    pathname === "/createchallenge" ||
    pathname === "/challenge-detail" ||
    pathname === "/payment-confirmation";
  if (hideNavigation) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
      <GlobalBottomNavigation />
    </div>
  );
}
