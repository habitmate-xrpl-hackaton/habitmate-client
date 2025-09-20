"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import {
  parseTokensFromCurrentUrl,
  validateTokens,
} from "@/lib/auth/tokenParser";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateUser } = useApp();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // 현재 URL에서 동적으로 토큰 파싱 (네이버 뉴스 형태)
        const tokenInfo = parseTokensFromCurrentUrl();
        const error = searchParams.get("error");

        console.log("🔗 OAuth2 콜백 수신:", {
          hasTokenInfo: !!tokenInfo,
          currentUrl:
            typeof window !== "undefined" ? window.location.href : "N/A",
          error,
        });

        if (error) {
          console.error("❌ OAuth2 에러:", error);
          setStatus("error");
          // 에러 시 로그인 페이지로 리디렉션
          setTimeout(() => {
            router.push("/google-login?error=oauth_error");
          }, 2000);
          return;
        }

        if (!validateTokens(tokenInfo)) {
          console.error("❌ 유효하지 않은 토큰 정보");
          setStatus("error");
          setTimeout(() => {
            router.push("/google-login?error=invalid_token");
          }, 2000);
          return;
        }

        console.log("🔐 토큰 저장:", {
          accessToken: tokenInfo!.accessToken.substring(0, 20) + "...",
          hasRefreshToken: !!tokenInfo!.refreshToken,
          userName: tokenInfo!.userName,
          userEmail: tokenInfo!.userEmail,
        });

        // Refresh Token을 httpOnly 쿠키로 저장 (서버 API 호출)
        if (tokenInfo!.refreshToken) {
          try {
            await fetch("/api/auth/set-refresh-token", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                refreshToken: tokenInfo!.refreshToken,
              }),
            });
            console.log("✅ Refresh Token 쿠키 저장 완료");
          } catch (error) {
            console.error("❌ Refresh Token 쿠키 저장 실패:", error);
          }
        }

        // Access Token을 sessionStorage에 저장하고 사용자 정보 업데이트
        updateUser({
          isLoggedIn: true,
          name: tokenInfo!.userName || "Google 사용자",
          email: tokenInfo!.userEmail || "user@example.com",
          avatar: "",
          accessToken: tokenInfo!.accessToken, // Bearer 포함해서 저장
        });

        console.log("✅ OAuth2 로그인 성공!");
        setStatus("success");

        // URL에서 토큰 파라미터 제거 (보안상)
        if (typeof window !== "undefined") {
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
          console.log("🧹 URL 정리 완료:", cleanUrl);
        }

        // 성공 시 홈 페이지로 리디렉션
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      } catch (error) {
        console.error("❌ OAuth2 콜백 처리 에러:", error);
        setStatus("error");
        setTimeout(() => {
          router.push("/google-login?error=callback_error");
        }, 2000);
      }
    };

    handleCallback();
  }, [searchParams, updateUser, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              로그인 처리 중...
            </h2>
            <p className="text-gray-600">잠시만 기다려주세요.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-600 text-4xl mb-4">✅</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              로그인 성공!
            </h2>
            <p className="text-gray-600">홈 화면으로 이동합니다.</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-600 text-4xl mb-4">❌</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              로그인 실패
            </h2>
            <p className="text-gray-600">로그인 페이지로 이동합니다.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">로딩 중...</h2>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
