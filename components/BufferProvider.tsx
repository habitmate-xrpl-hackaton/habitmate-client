"use client";

import { useEffect } from "react";
import { Buffer } from "buffer";

export default function BufferProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // 클라이언트에서만 Buffer를 window에 설정
    if (typeof window !== "undefined") {
      window.Buffer = Buffer;
    }
  }, []);

  return <>{children}</>;
}
