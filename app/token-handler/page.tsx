"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { handleTokensFromUrl } from "@/lib/auth/globalTokenHandler";

function TokenHandlerContent() {
  const router = useRouter();
  const { updateUser } = useApp();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("토큰을 처리하고 있습니다...");

  useEffect(() => {
    const processTokens = async () => {
      try {
        // 디버깅: 현재 URL과 쿼리 파라미터 콘솔 출력
        if (typeof window !== "undefined") {
          console.log("🔍 현재 페이지 URL:", window.location.href);
          console.log("🔍 URL 쿼리 파라미터:", window.location.search);
          console.log("🔍 URL 파라미터들:");

          const urlParams = new URLSearchParams(window.location.search);
          for (const [key, value] of urlParams.entries()) {
            console.log(
              `  ${key}: ${value.substring(0, 50)}${
                value.length > 50 ? "..." : ""
              }`
            );
          }

          // 쿼리 파라미터가 없으면 이미 처리된 것으로 간주하고 홈으로 리디렉션
          if (!window.location.search || window.location.search === "") {
            console.log(
              "ℹ️ 쿼리 파라미터가 없음 - 이미 처리됨 또는 홈으로 리디렉션"
            );
            setStatus("success");
            setMessage("이미 로그인되었습니다. 홈으로 이동합니다.");
            setTimeout(() => {
              router.push("/home");
            }, 1000);
            return;
          }
        }

        const result = await handleTokensFromUrl({
          autoRedirect: false, // 수동으로 리디렉션 처리
          onSuccess: (tokenInfo) => {
            // 사용자 정보 업데이트
            updateUser({
              isLoggedIn: true,
              name: tokenInfo.userName || "Google 사용자",
              email: tokenInfo.userEmail || "user@example.com",
              avatar: "",
              accessToken: tokenInfo.accessToken,
            });

            setStatus("success");
            setMessage("로그인 성공! 홈 화면으로 이동합니다.");

            // 1초 후 홈으로 리디렉션
            setTimeout(() => {
              router.push("/home");
            }, 1000);
          },
          onError: (error) => {
            setStatus("error");
            setMessage(`오류: ${error}`);

            // 2초 후 로그인 페이지로 리디렉션
            setTimeout(() => {
              router.push("/google-login");
            }, 2000);
          },
        });

        if (!result.success && result.reason === "no_tokens") {
          setStatus("error");
          setMessage("토큰이 없습니다. 로그인 페이지로 이동합니다.");

          //   setTimeout(() => {
          //     router.push("/google-login");
          //   }, 2000);
        }
        return;
      } catch (error) {
        console.error("❌ 토큰 처리 에러:", error);
        setStatus("error");
        setMessage("토큰 처리 중 오류가 발생했습니다.");

        setTimeout(() => {
          router.push("/google-login");
        }, 2000);
      }
    };

    processTokens();
  }, [router, updateUser]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              토큰 처리 중...
            </h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-600 text-6xl mb-6">✅</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              로그인 성공!
            </h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-600 text-6xl mb-6">❌</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              처리 실패
            </h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function TokenHandlerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">로딩 중...</h2>
        </div>
      }
    >
      <TokenHandlerContent />
    </Suspense>
  );
}
