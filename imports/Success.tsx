import Image from "next/image";
import {
  imgSignalWifiBattery,
  imgLeftIcon,
  imgRectangle160,
  imgRectangle161,
  imgRectangle162,
  imgEllipse42,
  imgEllipse43,
} from "./svg-i054f";

const imgEllipse41 = "/de384d0d353a37302ac52721f573a089269b7448.webp";

function HomeIndicator() {
  return (
    <div
      className="absolute bottom-0 box-border content-stretch flex flex-col gap-2 items-start justify-start left-0.5 px-32 py-2"
      data-name="Home Indicator"
    >
      <div
        className="bg-black h-[5px] rounded-[100px] shrink-0 w-[134px]"
        data-name="Home Indicator"
      />
    </div>
  );
}

function StatusBarTime() {
  return (
    <div
      className="h-[21px] relative rounded-[24px] shrink-0 w-[54px]"
      data-name="_StatusBar-time"
    >
      <div className="absolute font-['SF_Pro_Text:Semibold',_sans-serif] h-5 leading-[0] left-[27px] not-italic text-[16px] text-black text-center top-px tracking-[-0.32px] translate-x-[-50%] w-[54px]">
        <p className="leading-[21px]">9:41</p>
      </div>
    </div>
  );
}

function LeftSide() {
  return (
    <div
      className="basis-0 grow h-full min-h-px min-w-px relative shrink-0"
      data-name="Left Side"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2 items-center justify-center pb-[3px] pl-2.5 pr-0 pt-0 relative size-full">
          <StatusBarTime />
        </div>
      </div>
    </div>
  );
}

function TrueDepthCamera() {
  return (
    <div
      className="absolute bg-black h-[37px] rounded-[100px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-20"
      data-name="TrueDepth camera"
      style={{ left: "calc(50% - 22.5px)" }}
    />
  );
}

function FaceTimeCamera() {
  return (
    <div
      className="absolute bg-black rounded-[100px] size-[37px] top-1/2 translate-x-[-50%] translate-y-[-50%]"
      data-name="FaceTime camera"
      style={{ left: "calc(50% + 44px)" }}
    />
  );
}

function StatusBarDynamicIsland() {
  return (
    <div
      className="bg-black h-[37px] relative rounded-[100px] shrink-0 w-[125px]"
      data-name="StatusBar-dynamicIsland"
    >
      <TrueDepthCamera />
      <FaceTimeCamera />
    </div>
  );
}

function DynamicIsland() {
  return (
    <div
      className="content-stretch flex flex-col h-full items-center justify-center relative shrink-0"
      data-name="Dynamic Island"
    >
      <StatusBarDynamicIsland />
    </div>
  );
}

function SignalWifiBattery() {
  return (
    <div
      className="h-[13px] relative shrink-0 w-[78.401px]"
      data-name="Signal, Wifi, Battery"
    >
      <Image
        className="block max-w-none size-full"
        src={imgSignalWifiBattery}
        alt="Signal wifi battery"
        width={78}
        height={13}
      />
    </div>
  );
}

function RightSide() {
  return (
    <div
      className="basis-0 grow h-full min-h-px min-w-px relative shrink-0"
      data-name="Right Side"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-2 items-center justify-center pl-0 pr-[11px] py-0 relative size-full">
          <SignalWifiBattery />
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div
      className="content-stretch flex h-[59px] items-end justify-center relative shrink-0 w-[393px]"
      data-name="Status Bar"
    >
      <LeftSide />
      <DynamicIsland />
      <RightSide />
    </div>
  );
}

function LeftIcon() {
  return (
    <div className="relative shrink-0 size-12" data-name="Left Icon">
      <Image
        className="block max-w-none size-full"
        src={imgLeftIcon}
        alt="Left icon"
        width={48}
        height={48}
      />
    </div>
  );
}

function Frame2608541() {
  return <div className="basis-0 grow h-8 min-h-px min-w-px shrink-0" />;
}

function HeaderType1() {
  return (
    <div
      className="content-stretch flex gap-2 h-12 items-center justify-start relative shrink-0 w-[345px]"
      data-name="Header Type 1"
    >
      <LeftIcon />
      <Frame2608541 />
    </div>
  );
}

function Header() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-center justify-start pb-4 pt-0 px-6 relative shrink-0 w-[393px]"
      data-name="Header"
    >
      <StatusBar />
      <HeaderType1 />
    </div>
  );
}

function Frame2608633() {
  return (
    <div className="box-border content-stretch flex gap-2 items-start justify-center px-0 py-20 relative shrink-0 w-full">
      <div
        className="absolute size-[392px] top-1/2 translate-x-[-50%] translate-y-[-50%]"
        style={{ left: "calc(50% + 0.5px)" }}
      >
        <Image
          className="block max-w-none size-full"
          height={392}
          src={imgEllipse41}
          width={392}
          alt="Success badge"
        />
      </div>
      <div
        className="h-32 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.278px_0px] mask-size-[108.444px_136px] relative shrink-0 w-[108.444px]"
        style={{ maskImage: `url('${imgRectangle160}')` }}
      >
        <div className="absolute bottom-[-6.25%] left-0 right-0 top-0">
          <Image
            className="block max-w-none size-full"
            src={imgRectangle161}
            alt="Rectangle"
            width={108}
            height={136}
          />
        </div>
      </div>
      <div
        className="absolute font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-44px_-36px] mask-size-[108.444px_136px] not-italic text-[#fea800] text-[48px] text-center text-nowrap tracking-[-1px] translate-x-[-50%]"
        style={{
          maskImage: `url('${imgRectangle160}')`,
          top: "calc(50% - 28px)",
          left: "calc(50% + 0.5px)",
        }}
      >
        <p className="leading-[56px] whitespace-pre">1</p>
      </div>
      <div
        className="absolute flex h-[136.67px] items-center justify-center translate-x-[-50%] translate-y-[-50%] w-[136.67px]"
        style={{ top: "calc(50% - 0.734px)", left: "calc(50% + 1.685px)" }}
      >
        <div className="flex-none rotate-[45deg]">
          <div
            className="h-[144.944px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[12.157px_5.075px] mask-size-[108.444px_136px] relative w-[48.355px]"
            style={{ maskImage: `url('${imgRectangle160}')` }}
          >
            <Image
              className="block max-w-none size-full"
              src={imgRectangle162}
              alt="Rectangle"
              width={48}
              height={144}
            />
          </div>
        </div>
      </div>
      <div
        className="absolute mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-15px_-16px] mask-size-[108.444px_136px] size-2 translate-x-[-50%] translate-y-[-50%]"
        style={{
          top: "calc(50% - 44px)",
          left: "calc(50% - 35.5px)",
          maskImage: `url('${imgRectangle160}')`,
        }}
      >
        <Image
          className="block max-w-none size-full"
          src={imgEllipse42}
          alt="Ellipse"
          width={8}
          height={8}
        />
      </div>
      <div
        className="absolute mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-83px_-96px] mask-size-[108.444px_136px] size-2 translate-x-[-50%] translate-y-[-50%]"
        style={{
          top: "calc(50% + 36px)",
          left: "calc(50% + 32.5px)",
          maskImage: `url('${imgRectangle160}')`,
        }}
      >
        <Image
          className="block max-w-none size-full"
          src={imgEllipse43}
          alt="Ellipse"
          width={8}
          height={8}
        />
      </div>
    </div>
  );
}

function Frame2608636() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start leading-[0] not-italic px-10 py-0 relative text-center text-white w-full">
          <div className="font-['Airbnb_Cereal:Bold',_sans-serif] leading-[32px] relative shrink-0 text-[24px] tracking-[-1px] w-full">
            <p className="mb-0">Congrats!</p>
            <p className="mb-0">You just reached your</p>
            <p>first habit goal!</p>
          </div>
          <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[14px] w-full">
            <p className="leading-[20px]">
              This badge is a symbol of your commitment to yourself. Keep going
              and earn more badges along the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div
      className="bg-white relative rounded-[40px] shrink-0 w-full"
      data-name="Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-1 items-center justify-center px-5 py-4 relative w-full">
          <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#040415] text-[14px] text-center text-nowrap">
            <p className="leading-[20px] whitespace-pre">Claim</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2608634() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-10 items-center justify-end px-6 py-10 relative size-full">
          <Frame2608636 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Frame2608618() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-3 h-[852px] items-start justify-start left-0 pb-10 pt-0 px-0 top-0 w-[393px]">
      <Header />
      <Frame2608633 />
      <Frame2608634 />
    </div>
  );
}

export default function Success() {
  return (
    <div
      className="bg-[#ffc148] overflow-clip relative rounded-[48px] size-full"
      data-name="Success"
    >
      <HomeIndicator />
      <Frame2608618 />
    </div>
  );
}
