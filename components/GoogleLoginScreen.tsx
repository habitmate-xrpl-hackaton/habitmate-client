import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useApp } from "@/lib/context/AppContext";
import {
  imgCircles,
  imgGradient,
  imgGradient1,
  imgIconsGoogle,
  imgMask2,
} from "../imports/svg-hbl5y";
import { useRouter } from "next/navigation";
import { tokenManager } from "@/lib/auth/tokenManager";

export default function GoogleLoginScreen() {
  const { updateUser } = useApp();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      console.log("🚀 Google OAuth2 로그인 시작...");

      // XRPL API 서버의 Google OAuth2 엔드포인트로 리디렉션
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      if (!apiBaseUrl) {
        console.error("❌ NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다");
        throw new Error("API Base URL이 설정되지 않았습니다");
      }

      // API Base URL 정리 (끝에 슬래시 제거)

      // 임시 디버깅: 하드코딩된 URL로 테스트
      const debugApiBaseUrl = apiBaseUrl;
      console.log("🔧 디버깅 - 하드코딩된 API URL:", debugApiBaseUrl);

      // 콜백 URL 설정 (토큰 핸들러 페이지)
      const callbackUrl = `${window.location.origin}/token-handler`;

      // 디버깅을 위해 하드코딩된 URL 사용
      const googleAuthUrl = `${debugApiBaseUrl}/oauth2/authorization/google?redirect_uri=${encodeURIComponent(
        callbackUrl
      )}`;

      console.log("🔗 Google 인증 URL:", googleAuthUrl);
      console.log("📋 콜백 URL:", callbackUrl);
      console.log("🔍 환경 변수 확인:", {
        apiBaseUrl,
        callbackUrl,
        origin: window.location.origin,
      });

      window.location.href = googleAuthUrl;
    } catch (error) {
      console.error("💥 Google 로그인 에러:", error);

      // 에러 발생 시 더미 로그인으로 폴백
      updateUser({
        isLoggedIn: true,
        name: "테스트 사용자",
        email: "test@example.com",
        avatar: "",
      });
      router.push("/home");
    }
  };

  return (
    <div className="h-screen bg-[#6b73ff] flex flex-col overflow-hidden relative rounded-[48px]">
      {/* Background Elements */}
      <div
        className="absolute bottom-[189px] size-[474px] translate-x-[-50%]"
        style={{ left: "calc(50% + 0.5px)" }}
      >
        <Image
          className="block max-w-none size-full opacity-30"
          src={imgCircles}
          alt="Background circles"
          width={474}
          height={474}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute mix-blend-overlay right-[43px] size-[630px] top-[-117px] opacity-40">
        <div className="absolute inset-[-12.944%]">
          <Image
            className="block max-w-none size-full"
            src={imgGradient}
            alt="Gradient overlay"
            width={630}
            height={630}
          />
        </div>
      </div>
      <div className="absolute mix-blend-overlay right-[-186px] size-[630px] top-[364px]">
        <div className="absolute inset-[-12.944%]">
          <Image
            className="block max-w-none size-full"
            src={imgGradient1}
            alt="Gradient overlay"
            width={630}
            height={630}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex justify-center items-end h-[59px] w-full pt-3">
        <div className="flex justify-between items-center w-full px-6">
          <div className="text-white text-base font-semibold">9:41</div>
          <div className="bg-black h-[37px] w-[125px] rounded-full"></div>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-1 h-3 bg-white rounded-sm"></div>
              <div className="w-1 h-3 bg-white rounded-sm"></div>
              <div className="w-1 h-3 bg-white rounded-sm"></div>
              <div className="w-1 h-3 bg-white rounded-sm"></div>
            </div>
            <svg width="25" height="13" viewBox="0 0 25 13" fill="none">
              <path
                d="M2 2h17c2 0 3 1 3 3v3c0 2-1 3-3 3H2c-1 0-2-1-2-3V5c0-2 1-3 3-3z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 py-4 relative z-10">
        {/* Top Section - Cards */}
        <div className="mt-8">
          <div className="text-white text-[12px] leading-[17px] mb-1">
            Challenges
          </div>

          {/* Challenge Card */}
          <div className="bg-white rounded-[14px] p-4 mb-4 border border-[#eaecf0]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-[21px] h-[21px] bg-[#ebecff] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#3843ff] rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="text-[#040415] text-[12px] leading-[17px] font-medium">
                    Best Runners! 🏃🏻‍♂️
                  </div>
                  <div className="text-[#9b9ba1] text-[10px] leading-[14px]">
                    5 days 13 hours left
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <Image
                    src="/8e8d8f782f7862ccf87fe1b3cba709f38b8f48e4.webp"
                    className="w-[17px] h-[17px] rounded-full border border-white"
                    alt="User avatar"
                    width={17}
                    height={17}
                  />
                  <Image
                    src="/7beb1cfa9dabb543a58b107fae5fdb0f6849c196.webp"
                    className="w-[17px] h-[17px] rounded-full border border-white"
                    alt="User avatar"
                    width={17}
                    height={17}
                  />
                </div>
                <div className="text-[#9b9ba1] text-[10px] leading-[14px] ml-2">
                  2 friends joined
                </div>
              </div>
            </div>
            <div className="w-full bg-[#eaecf0] rounded-full h-[3px]">
              <div className="bg-[#3843ff] h-[3px] rounded-full w-[20%]"></div>
            </div>
          </div>

          <div className="text-white text-[12px] leading-[17px] mb-1">
            Clubs
          </div>

          {/* Habit Cards */}
          <div className="space-y-2">
            {/* Water Habit */}
            <div className="bg-white rounded-[14px] p-[14px] border border-[#eaecf0] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-[32px] h-[32px] relative">
                  <div className="w-full h-full border-2 border-[#eaecf0] rounded-full"></div>
                  <div
                    className="absolute inset-0 border-2 border-[#3843ff] rounded-full"
                    style={{
                      clipPath: "polygon(0 75%, 100% 75%, 100% 100%, 0% 100%)",
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-[12px]">
                    💧
                  </div>
                </div>
                <div>
                  <div className="text-[#040415] text-[12px] leading-[17px] font-medium">
                    Drink the water
                  </div>
                  <div className="text-[#9b9ba1] text-[10px] leading-[14px]">
                    500/2000 ML
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <Image
                    src="/732f1948dc788357b9292005561ccfc26bc46a8e.webp"
                    className="w-[24px] h-[24px] rounded-full border border-white"
                    alt="User avatar"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/0ebd91327b8e40b78df0fa39350ed1461e68fe03.webp"
                    className="w-[24px] h-[24px] rounded-full border border-white"
                    alt="User avatar"
                    width={24}
                    height={24}
                  />
                  <div className="w-[24px] h-[24px] bg-[#ebecff] rounded-full border border-white flex items-center justify-center">
                    <span className="text-[#3843ff] text-[8px] font-bold">
                      +3
                    </span>
                  </div>
                </div>
                <div className="w-[32px] h-[32px] bg-white rounded-[10px] border border-[#eaecf0] flex items-center justify-center">
                  <div className="text-[#040415] text-lg">+</div>
                </div>
              </div>
            </div>

            {/* Walk Habit */}
            <div className="bg-white rounded-[14px] p-[14px] border border-[#eaecf0] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-[32px] h-[32px] relative">
                  <div className="w-full h-full border-2 border-[#eaecf0] rounded-full"></div>
                  <div
                    className="absolute inset-0 border-2 border-[#3843ff] rounded-full"
                    style={{
                      clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)",
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-[12px]">
                    🚶‍♂️
                  </div>
                </div>
                <div>
                  <div className="text-[#040415] text-[12px] leading-[17px] font-medium">
                    Walk
                  </div>
                  <div className="text-[#9b9ba1] text-[10px] leading-[14px]">
                    0/10000 STEPS
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <Image
                    src="/732f1948dc788357b9292005561ccfc26bc46a8e.webp"
                    className="w-[24px] h-[24px] rounded-full border border-white"
                    alt="User avatar"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/0ebd91327b8e40b78df0fa39350ed1461e68fe03.webp"
                    className="w-[24px] h-[24px] rounded-full border border-white"
                    alt="User avatar"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="w-[32px] h-[32px] bg-white rounded-[10px] border border-[#eaecf0] flex items-center justify-center">
                  <div className="text-[#040415] text-lg">+</div>
                </div>
              </div>
            </div>

            {/* Meditate Habit */}
            <div className="bg-white rounded-[14px] p-[14px] border border-[#eaecf0] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-[32px] h-[32px] relative">
                  <div className="w-full h-full border-2 border-[#3843ff] rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 2L9.5 6.5L14 8L9.5 9.5L8 14L6.5 9.5L2 8L6.5 6.5L8 2Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-[12px]">
                    🧘🏻‍♂️
                  </div>
                </div>
                <div>
                  <div className="text-[#040415] text-[12px] leading-[17px] font-medium">
                    Meditate
                  </div>
                  <div className="text-[#9b9ba1] text-[10px] leading-[14px]">
                    30/30 MIN
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <Image
                    src={imgMask2}
                    className="w-[24px] h-[24px] rounded-full border border-white"
                    alt="User avatar"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="w-[32px] h-[32px] bg-white rounded-[10px] border border-[#eaecf0] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="#3ba935"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Title, Subtitle, and Button grouped together */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[40px] leading-[48px] tracking-[-1px] text-white mb-2">
              Track
            </h1>
            <h1 className="text-[40px] leading-[48px] tracking-[-1px] text-white mb-2">
              Your Progress
            </h1>
            <p className="text-[14px] leading-[20px] text-[#d7d9ff]">
              Everyday you become one step closer to
            </p>
            <p className="text-[14px] leading-[20px] text-[#d7d9ff] mb-8">
              your goal. Don&apos;t give up!
            </p>

            {/* Login Button - Original size restored */}
            <div className="space-y-3">
              <Button
                onClick={handleLogin}
                className="w-full bg-white text-[#040415] hover:bg-gray-100 rounded-[40px] px-5 py-4 shadow-[0px_12px_24px_0px_rgba(35,44,93,0.06)] flex items-center justify-center cursor-pointer"
              >
                <Image
                  className="w-5 h-5 mr-3"
                  src={imgIconsGoogle}
                  alt="Login icon"
                  width={20}
                  height={20}
                />
                <span className="text-[14px] leading-[20px] font-medium">
                  Start Tracking
                </span>
              </Button>

              <div className="text-center">
                <p className="text-[#afb4ff] text-[12px] leading-[16px]">
                  By continuing you agree Terms of Services &amp; Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Spacer */}
        <div className="pb-8"></div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="w-[134px] h-[5px] bg-white rounded-full"></div>
      </div>
    </div>
  );
}
