import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  imgLeftIcon,
  imgRectangle160,
  imgRectangle161,
  imgRectangle162,
  imgEllipse42,
  imgEllipse43,
} from "../imports/svg-i054f";

interface BadgeRewardScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
}

export default function BadgeRewardScreen({
  navigateToScreen,
}: BadgeRewardScreenProps) {
  const handleClaim = () => {
    navigateToScreen("home");
  };

  return (
    <div
      className="bg-[#ffc148] overflow-clip relative min-h-screen flex flex-col"
      data-name="Badge Reward"
    >
      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-black h-[5px] rounded-[100px] w-[134px]" />
      </div>

      {/* Main Content - Vertical Flow */}
      <div className="flex-1 flex flex-col items-center justify-between px-6 pt-20 pb-6 min-h-screen">
        {/* Badge Section - Top Third */}
        <div className="flex-none mt-16 mb-12">
          <div className="relative flex items-center justify-center">
            {/* Radial background */}
            <div className="absolute w-80 h-80">
              <Image
                className="block max-w-none size-full"
                src="/de384d0d353a37302ac52721f573a089269b7448.webp"
                alt="Badge background"
                width={320}
                height={320}
              />
            </div>

            {/* Badge Container - Larger Size */}
            <div className="relative w-32 h-40 flex items-center justify-center">
              <div
                className="h-40 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.278px_0px] mask-size-[128px_160px] relative shrink-0 w-[128px]"
                style={{ maskImage: `url('${imgRectangle160}')` }}
              >
                <div className="absolute bottom-[-6.25%] left-0 right-0 top-0">
                  <img
                    className="block max-w-none size-full"
                    src={imgRectangle161}
                  />
                </div>
              </div>

              {/* Badge Number - Larger */}
              <div className="absolute font-['Pretendard'] font-bold text-[#fea800] text-[56px] text-center tracking-[-1px]">
                1
              </div>

              {/* Light effects */}
              <div className="absolute flex h-40 items-center justify-center w-40">
                <div className="flex-none rotate-[45deg]">
                  <div
                    className="h-[160px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[12.157px_5.075px] mask-size-[128px_160px] relative w-[56px]"
                    style={{ maskImage: `url('${imgRectangle160}')` }}
                  >
                    <img
                      className="block max-w-none size-full"
                      src={imgRectangle162}
                    />
                  </div>
                </div>
              </div>

              {/* Small circles */}
              <div
                className="absolute mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-15px_-16px] mask-size-[128px_160px] size-2 -top-12 -left-10"
                style={{ maskImage: `url('${imgRectangle160}')` }}
              >
                <img
                  className="block max-w-none size-full"
                  src={imgEllipse42}
                />
              </div>
              <div
                className="absolute mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-83px_-96px] mask-size-[128px_160px] size-2 top-10 right-8"
                style={{ maskImage: `url('${imgRectangle160}')` }}
              >
                <img
                  className="block max-w-none size-full"
                  src={imgEllipse43}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Text Content Block - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-xs mx-auto">
          <div className="text-center text-white space-y-3">
            {/* Title and Subtitle - Close together */}
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Congrats!</h1>
              <h2 className="text-lg font-semibold">
                You just completed today's challenge!
              </h2>
            </div>

            {/* Supporting text - More space above */}
            <div className="pt-4">
              <p className="text-sm leading-relaxed opacity-90 max-w-[280px]">
                This badge celebrates your commitment. Keep proving yourself and
                earn more rewards along the way.
              </p>
            </div>
          </div>
        </div>

        {/* Claim Button - Fixed at Bottom */}
        <div className="flex-none w-full pb-8">
          <Button
            onClick={handleClaim}
            className="bg-white text-black font-bold hover:bg-gray-50 rounded-full py-4 w-full text-base"
          >
            Claim
          </Button>
        </div>
      </div>
    </div>
  );
}
