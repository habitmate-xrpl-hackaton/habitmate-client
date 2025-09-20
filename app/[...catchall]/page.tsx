"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { handleTokensFromUrl } from "@/lib/auth/globalTokenHandler";
import { parseTokensFromCurrentUrl } from "@/lib/auth/tokenParser";

interface CatchAllPageProps {
  params: Promise<{
    catchall: string[];
  }>;
}

function CatchAllContent({ params }: CatchAllPageProps) {
  const router = useRouter();
  const { updateUser } = useApp();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("토큰을 처리하고 있습니다...");
  const [resolvedParams, setResolvedParams] = useState<{
    catchall: string[];
  } | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    const processTokens = async () => {
      try {
        // 디버깅: 현재 URL과 쿼리 파라미터 콘솔 출력
        if (typeof window !== "undefined") {
          console.log("🔍 CatchAll 페이지 - 현재 URL:", window.location.href);
          console.log(
            "🔍 CatchAll 페이지 - 파라미터:",
            resolvedParams.catchall
          );

          // %20? 패턴 감지
          const url = window.location.href;
          if (url.includes("%20?")) {
            console.log("🎯 %20? 패턴 감지됨 - 토큰 처리 시작");
          }
        }

        const result = await handleTokensFromUrl({
          autoRedirect: false, // 수동으로 리디렉션 처리
          keepQuery: true, // 쿼리를 지우지 않고 유지
          onSuccess: (tokenInfo) => {
            console.log("✅ CatchAll에서 토큰 처리 성공:", tokenInfo);

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

            // 바로 홈으로 이동
            router.push("/home");
          },
          onError: (error) => {
            console.error("❌ CatchAll에서 토큰 처리 실패:", error);
            setStatus("error");
            setMessage(`오류: ${error}`);

            // 2초 후 로그인 페이지로 리디렉션
            setTimeout(() => {
              router.push("/google-login");
            }, 2000);
          },
          onNoTokens: () => {
            console.warn("⚠️ CatchAll에서 토큰 정보가 없습니다.");
            setStatus("error");
            setMessage("토큰이 없습니다. 로그인 페이지로 이동합니다.");

            setTimeout(() => {
              router.push("/google-login");
            }, 2000);
          },
        });

        if (!result.success && result.reason === "no_tokens") {
          setStatus("error");
          setMessage("토큰이 없습니다. 로그인 페이지로 이동합니다.");

          setTimeout(() => {
            router.push("/google-login");
          }, 2000);
        }
      } catch (error) {
        console.error("❌ CatchAll 토큰 처리 에러:", error);
        setStatus("error");
        setMessage("토큰 처리 중 오류가 발생했습니다.");

        setTimeout(() => {
          router.push("/google-login");
        }, 2000);
      }
    };

    processTokens();
  }, [router, updateUser, resolvedParams]);

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

        <div className="mt-8 text-sm text-gray-500">
          <p>이 페이지는 모든 URL 패턴에서</p>
          <p>토큰을 자동으로 파싱하고 저장합니다.</p>
          <p className="mt-2 text-xs">
            현재 경로: /{resolvedParams?.catchall?.join("/") || "root"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CatchAllPage({ params }: CatchAllPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">로딩 중...</h2>
        </div>
      }
    >
      <CatchAllContent params={params} />
    </Suspense>
  );
}
