import { imgCircleBg, imgLogo, imgGradient, imgGradient1 } from "./svg-maa07";

function CircleBg() {
  return (
    <div className="absolute bottom-[189px] size-[474px] translate-x-[-50%]" data-name="Circle BG" style={{ left: "calc(50% + 0.5px)" }}>
      <img className="block max-w-none size-full" src={imgCircleBg} />
    </div>
  );
}

function Logo() {
  return (
    <div className="absolute h-[73.199px] translate-x-[-50%] translate-y-[-50%] w-60" data-name="Logo" style={{ top: "calc(50% - 0.401px)", left: "calc(50% + 0.5px)" }}>
      <img className="block max-w-none size-full" src={imgLogo} />
    </div>
  );
}

function HomeIndicator() {
  return (
    <div className="absolute bottom-0 h-[34px] left-0.5 w-[390px]" data-name="Home Indicator">
      <div className="absolute bg-white bottom-2 h-[5px] left-1/2 rounded-[100px] translate-x-[-50%] w-[134px]" data-name="Home Indicator" />
    </div>
  );
}

export default function Splash() {
  return (
    <div className="overflow-clip relative rounded-[48px] size-full" data-name="Splash">
      <CircleBg />
      <Logo />
      <div className="absolute mix-blend-overlay right-[43px] size-[630px] top-[-117px]" data-name="gradient">
        <div className="absolute inset-[-12.944%]">
          <img className="block max-w-none size-full" src={imgGradient} />
        </div>
      </div>
      <div className="absolute mix-blend-overlay right-[-186px] size-[630px] top-[364px]" data-name="gradient">
        <div className="absolute inset-[-12.944%]">
          <img className="block max-w-none size-full" src={imgGradient1} />
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}