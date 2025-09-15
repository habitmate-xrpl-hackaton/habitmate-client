import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useApp } from "@/lib/context/AppContext";
import { useRouter } from "next/navigation";
import { imgCircles, imgGradient, imgGradient1 } from "../imports/svg-hbl5y";

export default function OnboardingScreen() {
  const { navigateToScreen } = useApp();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Build Better\nHabits",
      description:
        "Take on personal challenges and stay accountable with daily proof uploads",
      icon: "🎯",
    },
    {
      title: "Escrow Refund\nSystem",
      description:
        "Put money on the line. Complete your challenge to get your deposit back",
      icon: "💰",
    },
    {
      title: "Join the\nCommunity",
      description:
        "Share your journey, get motivated by others, and celebrate victories together",
      icon: "👥",
    },
    {
      title: "Track\nYour Progress",
      description:
        "Everyday you become one step closer to your goal. Don't give up!",
      icon: "📈",
    },
  ];

  const handleNextSlide = () => {
    console.log("Next button clicked! Current slide:", currentSlide);
    if (currentSlide < slides.length - 1) {
      const newSlide = currentSlide + 1;
      setCurrentSlide(newSlide);
      console.log("Updated to slide:", newSlide);
    } else {
      console.log("Going to Google login...");
      router.push("/google-login");
    }
  };

  const handleSkip = () => {
    console.log("Skip button clicked!");
    router.push("/google-login");
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

      {/* Content Area */}
      <div className="flex-1 flex flex-col pt-16">
        {/* Illustration Area */}
        <div className="flex-1 flex items-center justify-center px-6 pt-8">
          <div className="text-8xl text-center">
            {slides[currentSlide].icon}
          </div>
        </div>

        {/* Bottom Content */}
        <div className="px-6 pb-16">
          {/* Titles */}
          <div className="mb-8 text-left">
            <h1 className="text-[40px] leading-[48px] tracking-[-1px] text-white mb-2 whitespace-pre-line">
              {slides[currentSlide].title}
            </h1>
            <p className="text-[14px] leading-[20px] text-[#d7d9ff]">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Pagination - Now shows 4 dots */}
          <div className="flex justify-center space-x-6 mb-12">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? "bg-white" : "bg-[#888EFF]"
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="space-y-3 relative z-10">
            {/* Main Button */}
            <Button
              onClick={handleNextSlide}
              className="w-full bg-white text-[#040415] hover:bg-gray-100 rounded-[40px] px-5 py-4 shadow-[0px_12px_24px_0px_rgba(35,44,93,0.06)]"
            >
              <span className="text-[14px] leading-[20px] font-medium">
                {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
              </span>
            </Button>

            {/* Skip Button */}
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-[#afb4ff] text-[12px] leading-[16px] hover:text-white"
              >
                Skip for now
              </Button>
            </div>

            {/* Privacy Policy */}
            <div className="text-center">
              <p className="text-[#afb4ff] text-[12px] leading-[16px]">
                By continuing you agree Terms of Services & Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="w-[134px] h-[5px] bg-white rounded-full"></div>
      </div>
    </div>
  );
}
