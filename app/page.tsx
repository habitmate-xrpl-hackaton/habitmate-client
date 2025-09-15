"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // 루트 페이지에서는 온보딩으로 리다이렉트
    router.push("/onboarding");
  }, [router]);

  return null; // 리다이렉트 중에는 아무것도 렌더링하지 않음
}
