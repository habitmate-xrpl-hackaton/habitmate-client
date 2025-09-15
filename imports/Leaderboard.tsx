import Image from "next/image";
import {
  imgSignalWifiBattery,
  imgLeftIcon,
  imgEllipse46,
  imgEllipse49,
  imgEllipse50,
  imgEllipse47,
  imgEllipse48,
  imgIconsMedal,
  imgVector,
  imgEllipse1,
  imgEllipse4,
} from "./svg-ddy82";

const imgEllipse41 = "/52082776c222c04ea266d25b1c14000fb57174c6.webp";
const imgEllipse44 = "/003d19569f74f3854de4000e422b5e42ec3426c8.webp";
const imgEllipse45 = "/cfac0a29e5563ed53ec8e99885b80d1e418e1419.webp";
const imgEllipse51 = "/00d4c13d0df04e33c75697bea7b24fb30065f6a5.webp";
const imgMask = "/29faee2acf12de1f616f3be3b57ec19c47e9bc0a.webp";
const imgMask1 = "/c95bcfb4974ad36d8051dc7f79d48214d8cb9c2a.webp";
const imgMask2 = "/7dd2d0da8fd9c87f57c5f034628b8f7fae0d0f4b.webp";
const imgMask3 = "/7a75b25074f093a8c996abedaa3f9c75ce4ccdad.webp";
const imgMask4 = "/daa4fba95e1c644b914e9efda272aef7aa710aae.webp";

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
  return (
    <div className="basis-0 grow h-8 min-h-px min-w-px relative shrink-0">
      <div className="absolute font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] left-0 not-italic text-[#040415] text-[24px] top-0 tracking-[-1px] w-[233px]">
        <p className="leading-[32px]">Leaderboard</p>
      </div>
    </div>
  );
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

function Component1stTab() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)] shrink-0"
      data-name="1st Tab"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-2.5 items-center justify-center px-4 py-1 relative w-full">
          <div className="flex flex-col font-['Pretendard:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#686873] text-[14px] text-center text-nowrap">
            <p className="leading-[20px] whitespace-pre">Daily</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Component2ndTab() {
  return (
    <div
      className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)] shrink-0"
      data-name="2nd Tab"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-2.5 items-center justify-center px-4 py-1 relative w-full">
          <div className="flex flex-col font-['Pretendard:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3843ff] text-[14px] text-center text-nowrap">
            <p className="leading-[20px] whitespace-pre">Weekly</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Component3rdTab() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative rounded-[16px] shrink-0"
      data-name="3rd Tab"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-2.5 items-center justify-center px-4 py-1 relative w-full">
          <div className="flex flex-col font-['Pretendard:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#686873] text-[14px] text-center text-nowrap">
            <p className="leading-[20px] whitespace-pre">Monthly</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SegmentControl() {
  return (
    <div
      className="bg-[#eaecf0] box-border content-stretch flex items-start justify-start p-[2px] relative rounded-[16px] shrink-0 w-[345px]"
      data-name="Segment Control"
    >
      <Component1stTab />
      <Component2ndTab />
      <Component3rdTab />
    </div>
  );
}

function Header() {
  return (
    <div
      className="bg-white box-border content-stretch flex flex-col gap-3 items-center justify-start pb-4 pt-0 px-6 relative shrink-0 w-[393px]"
      data-name="Header"
    >
      <div
        aria-hidden="true"
        className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none"
      />
      <StatusBar />
      <HeaderType1 />
      <SegmentControl />
    </div>
  );
}

function Circles() {
  return (
    <div
      className="absolute contents top-7 translate-x-[-50%]"
      data-name="Circles"
      style={{ left: "calc(50% + 0.5px)" }}
    >
      <div
        className="absolute opacity-[0.24] size-[392px] translate-x-[-50%] translate-y-[-50%]"
        style={{ top: "calc(50% + 117.452px)", left: "calc(50% + 0.5px)" }}
      >
        <Image
          className="block max-w-none size-full"
          height={392}
          src={imgEllipse41}
          width={392}
          alt="Background ellipse"
        />
      </div>
      <div
        className="absolute bottom-[-101.91px] size-52 translate-x-[-50%]"
        style={{ left: "calc(50% + 0.5px)" }}
      >
        <Image
          className="block max-w-none size-full"
          src={imgEllipse46}
          alt="Background ellipse"
          width={208}
          height={208}
        />
      </div>
      <div
        className="absolute bottom-[-59.91px] size-[124px] translate-x-[-50%]"
        style={{ left: "calc(50% + 0.5px)" }}
      >
        <Image
          className="block max-w-none size-full"
          src={imgEllipse49}
          alt="Background ellipse"
          width={124}
          height={124}
        />
      </div>
      <div
        className="absolute bottom-[-21.91px] size-12 translate-x-[-50%]"
        style={{ left: "calc(50% + 0.5px)" }}
      >
        <Image
          className="block max-w-none size-full"
          src={imgEllipse50}
          alt="Background ellipse"
          width={48}
          height={48}
        />
      </div>
      <div
        className="absolute bottom-[-159.91px] size-[324px] translate-x-[-50%]"
        style={{ left: "calc(50% + 0.5px)" }}
      >
        <Image
          className="block max-w-none size-full"
          src={imgEllipse47}
          alt="Background ellipse"
          width={324}
          height={324}
        />
      </div>
      <div
        className="absolute bottom-[-234.91px] size-[474px] translate-x-[-50%]"
        style={{ left: "calc(50% + 0.5px)" }}
      >
        <Image
          className="block max-w-none size-full"
          src={imgEllipse48}
          alt="Background ellipse"
          width={474}
          height={474}
        />
      </div>
    </div>
  );
}

function IconsMedal() {
  return (
    <div className="relative shrink-0 size-4" data-name="Icons/Medal">
      <Image
        className="block max-w-none size-full"
        src={imgIconsMedal}
        alt="Medal icon"
        width={16}
        height={16}
      />
    </div>
  );
}

function StatusBadge() {
  return (
    <div
      className="bg-[#fff3da] box-border content-stretch flex items-center justify-start px-1 py-0.5 relative rounded-[8px] shrink-0"
      data-name="Status Badge"
    >
      <IconsMedal />
      <div className="flex flex-col font-['Pretendard:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fea800] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">1223</p>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div
      className="bg-white box-border content-stretch flex flex-col gap-2 h-28 items-center justify-start px-[29px] py-4 relative rounded-[80px] shrink-0 w-20"
      data-name="Card"
    >
      <div
        className="bg-clip-text font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[0px] text-nowrap"
        style={{ WebkitTextFillColor: "transparent" }}
      >
        <p className="whitespace-pre">
          <span
            className="bg-clip-text font-['Airbnb_Cereal:Bold',_sans-serif] leading-[32px] not-italic text-[24px] tracking-[-1px]"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            2
          </span>
          <span className="leading-[20px] text-[14px]">nd</span>
        </p>
      </div>
      <StatusBadge />
    </div>
  );
}

function Component2nd() {
  return (
    <div
      className="basis-0 content-stretch flex flex-col gap-2 grow items-center justify-start min-h-px min-w-px relative shrink-0"
      data-name="2nd"
    >
      <div className="relative shrink-0 size-16">
        <div className="absolute inset-[-3.125%]">
          <Image
            className="block max-w-none size-full"
            height={68}
            src={imgEllipse44}
            width={68}
            alt="User avatar"
          />
        </div>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-white">
        <p className="leading-[20px] whitespace-pre">MirayK</p>
      </div>
      <Card />
    </div>
  );
}

function Pp() {
  return (
    <div
      className="content-stretch flex flex-col gap-3 items-center justify-start relative shrink-0"
      data-name="Pp"
    >
      <div className="h-[15.095px] relative shrink-0 w-6" data-name="Vector">
        <Image
          className="block max-w-none size-full"
          src={imgVector}
          alt="Vector icon"
          width={24}
          height={15}
        />
      </div>
      <div className="relative shrink-0 size-16">
        <div className="absolute inset-[-3.125%]">
          <Image
            className="block max-w-none size-full"
            height={68}
            src={imgEllipse45}
            width={68}
            alt="User avatar"
          />
        </div>
      </div>
    </div>
  );
}

function IconsMedal1() {
  return (
    <div className="relative shrink-0 size-4" data-name="Icons/Medal">
      <Image
        className="block max-w-none size-full"
        src={imgIconsMedal}
        alt="Medal icon"
        width={16}
        height={16}
      />
    </div>
  );
}

function StatusBadge1() {
  return (
    <div
      className="bg-[#fff3da] box-border content-stretch flex items-center justify-start px-1 py-0.5 relative rounded-[8px] shrink-0"
      data-name="Status Badge"
    >
      <IconsMedal1 />
      <div className="flex flex-col font-['Pretendard:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fea800] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">1452</p>
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div
      className="bg-white box-border content-stretch flex flex-col gap-2 h-[140px] items-center justify-start px-[29px] py-4 relative rounded-[80px] shrink-0 w-20"
      data-name="Card"
    >
      <div
        className="bg-clip-text font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[0px] text-nowrap"
        style={{ WebkitTextFillColor: "transparent" }}
      >
        <p className="whitespace-pre">
          <span
            className="bg-clip-text font-['Airbnb_Cereal:Bold',_sans-serif] leading-[32px] not-italic text-[24px] tracking-[-1px]"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            1
          </span>
          <span className="leading-[20px] text-[14px]">st</span>
        </p>
      </div>
      <StatusBadge1 />
    </div>
  );
}

function Component1st() {
  return (
    <div
      className="basis-0 content-stretch flex flex-col gap-2 grow items-center justify-start min-h-px min-w-px relative shrink-0"
      data-name="1st"
    >
      <Pp />
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-white">
        <p className="leading-[20px] whitespace-pre">Mert Kahveci</p>
      </div>
      <Card1 />
    </div>
  );
}

function IconsMedal2() {
  return (
    <div className="relative shrink-0 size-4" data-name="Icons/Medal">
      <img className="block max-w-none size-full" src={imgIconsMedal} />
    </div>
  );
}

function StatusBadge2() {
  return (
    <div
      className="bg-[#fff3da] box-border content-stretch flex items-center justify-start px-1 py-0.5 relative rounded-[8px] shrink-0"
      data-name="Status Badge"
    >
      <IconsMedal2 />
      <div className="flex flex-col font-['Pretendard:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fea800] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">968</p>
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div
      className="bg-white box-border content-stretch flex flex-col gap-2 h-[104px] items-center justify-start px-[29px] py-4 relative rounded-[80px] shrink-0 w-20"
      data-name="Card"
    >
      <div
        className="bg-clip-text font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[0px] text-nowrap"
        style={{ WebkitTextFillColor: "transparent" }}
      >
        <p className="whitespace-pre">
          <span
            className="bg-clip-text font-['Airbnb_Cereal:Bold',_sans-serif] leading-[32px] not-italic text-[24px] tracking-[-1px]"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            3
          </span>
          <span className="leading-[20px] text-[14px]">rd</span>
        </p>
      </div>
      <StatusBadge2 />
    </div>
  );
}

function Component3rd() {
  return (
    <div
      className="basis-0 content-stretch flex flex-col gap-2 grow items-center justify-start min-h-px min-w-px relative shrink-0"
      data-name="3rd"
    >
      <div className="relative shrink-0 size-16">
        <div className="absolute inset-[-3.125%]">
          <Image
            className="block max-w-none size-full"
            height={68}
            src={imgEllipse51}
            width={68}
            alt="User avatar"
          />
        </div>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-white">
        <p className="leading-[20px] whitespace-pre">Onur O.</p>
      </div>
      <Card2 />
    </div>
  );
}

function Circles1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Circles">
      <div className="flex flex-row items-end relative size-full">
        <div className="box-border content-stretch flex gap-6 items-end justify-start px-4 py-0 relative w-full">
          <Circles />
          <Component2nd />
          <Component1st />
          <Component3rd />
        </div>
      </div>
    </div>
  );
}

function CircleLoader() {
  return (
    <div className="relative shrink-0 size-9" data-name="Circle - Loader">
      <div className="absolute left-0 size-9 top-0">
        <img className="block max-w-none size-full" src={imgEllipse1} />
      </div>
      <div className="absolute left-0 size-9 top-0">
        <img className="block max-w-none size-full" src={imgEllipse4} />
      </div>
      <div
        className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] left-1/2 not-italic text-[12px] text-center text-nowrap text-white translate-x-[-50%]"
        style={{ top: "calc(50% - 8px)" }}
      >
        <p className="leading-[16px] whitespace-pre">%0</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div
      className="content-stretch flex items-center justify-center relative shrink-0 size-9"
      data-name="Icon"
    >
      <CircleLoader />
      <div
        className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic text-[#040415] text-[14px] text-center text-nowrap translate-x-[-50%]"
        style={{ top: "calc(50% - 10px)", left: "calc(50% + 0.5px)" }}
      >
        <p className="leading-[20px] whitespace-pre">4</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div
      className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0"
      data-name="Text"
    >
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Jennings Stohler</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">912 Points</p>
      </div>
    </div>
  );
}

function Avatar1() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-8px] place-items-start relative shrink-0"
      data-name="Avatar 1"
    >
      <div
        className="[grid-area:1_/_1] ml-0 mt-0 relative size-7"
        data-name="Mask"
      >
        <img
          className="block max-w-none size-full"
          height="28"
          src={imgMask}
          width="28"
        />
      </div>
    </div>
  );
}

function Friends() {
  return (
    <div
      className="box-border content-stretch flex items-start justify-start pl-0 pr-2 py-0 relative shrink-0"
      data-name="Friends"
    >
      <Avatar1 />
    </div>
  );
}

function HabitCard() {
  return (
    <div
      className="bg-white relative rounded-[16px] shrink-0 w-full"
      data-name="Habit Card"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]"
      />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-3 items-center justify-start p-[16px] relative w-full">
          <Icon />
          <Text />
          <Friends />
        </div>
      </div>
    </div>
  );
}

function CircleLoader1() {
  return (
    <div className="relative shrink-0 size-9" data-name="Circle - Loader">
      <div className="absolute left-0 size-9 top-0">
        <img className="block max-w-none size-full" src={imgEllipse1} />
      </div>
      <div className="absolute left-0 size-9 top-0">
        <img className="block max-w-none size-full" src={imgEllipse4} />
      </div>
      <div
        className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] left-1/2 not-italic text-[12px] text-center text-nowrap text-white translate-x-[-50%]"
        style={{ top: "calc(50% - 8px)" }}
      >
        <p className="leading-[16px] whitespace-pre">%0</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div
      className="content-stretch flex items-center justify-center relative shrink-0 size-9"
      data-name="Icon"
    >
      <CircleLoader1 />
      <div
        className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] left-1/2 not-italic text-[#040415] text-[14px] text-center text-nowrap translate-x-[-50%]"
        style={{ top: "calc(50% - 10px)" }}
      >
        <p className="leading-[20px] whitespace-pre">5</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div
      className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0"
      data-name="Text"
    >
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Scotty Tovias</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">846 Points</p>
      </div>
    </div>
  );
}

function Avatar2() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-8px] place-items-start relative shrink-0"
      data-name="Avatar 1"
    >
      <div
        className="[grid-area:1_/_1] ml-0 mt-0 relative size-7"
        data-name="Mask"
      >
        <img
          className="block max-w-none size-full"
          height="28"
          src={imgMask1}
          width="28"
        />
      </div>
    </div>
  );
}

function Friends1() {
  return (
    <div
      className="box-border content-stretch flex items-start justify-start pl-0 pr-2 py-0 relative shrink-0"
      data-name="Friends"
    >
      <Avatar2 />
    </div>
  );
}

function HabitCard1() {
  return (
    <div
      className="bg-white relative rounded-[16px] shrink-0 w-full"
      data-name="Habit Card"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]"
      />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-3 items-center justify-start p-[16px] relative w-full">
          <Icon1 />
          <Text1 />
          <Friends1 />
        </div>
      </div>
    </div>
  );
}

function CircleLoader2() {
  return (
    <div className="relative shrink-0 size-9" data-name="Circle - Loader">
      <div className="absolute left-0 size-9 top-0">
        <img className="block max-w-none size-full" src={imgEllipse1} />
      </div>
      <div className="absolute left-0 size-9 top-0">
        <img className="block max-w-none size-full" src={imgEllipse4} />
      </div>
      <div
        className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] left-1/2 not-italic text-[12px] text-center text-nowrap text-white translate-x-[-50%]"
        style={{ top: "calc(50% - 8px)" }}
      >
        <p className="leading-[16px] whitespace-pre">%0</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div
      className="content-stretch flex items-center justify-center relative shrink-0 size-9"
      data-name="Icon"
    >
      <CircleLoader2 />
      <div
        className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic text-[#040415] text-[14px] text-center text-nowrap translate-x-[-50%]"
        style={{ top: "calc(50% - 10px)", left: "calc(50% + 0.5px)" }}
      >
        <p className="leading-[20px] whitespace-pre">6</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div
      className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0"
      data-name="Text"
    >
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Amelina Aguila</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">771 Points</p>
      </div>
    </div>
  );
}

function Avatar3() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-8px] place-items-start relative shrink-0"
      data-name="Avatar 1"
    >
      <div
        className="[grid-area:1_/_1] ml-0 mt-0 relative size-7"
        data-name="Mask"
      >
        <img
          className="block max-w-none size-full"
          height="28"
          src={imgMask2}
          width="28"
        />
      </div>
    </div>
  );
}

function Friends2() {
  return (
    <div
      className="box-border content-stretch flex items-start justify-start pl-0 pr-2 py-0 relative shrink-0"
      data-name="Friends"
    >
      <Avatar3 />
    </div>
  );
}

function HabitCard2() {
  return (
    <div
      className="bg-white relative rounded-[16px] shrink-0 w-full"
      data-name="Habit Card"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]"
      />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-3 items-center justify-start p-[16px] relative w-full">
          <Icon2 />
          <Text2 />
          <Friends2 />
        </div>
      </div>
    </div>
  );
}

function CircleLoader3() {
  return (
    <div className="relative shrink-0 size-9" data-name="Circle - Loader">
      <div className="absolute left-0 size-9 top-0">
        <img className="block max-w-none size-full" src={imgEllipse1} />
      </div>
      <div className="absolute left-0 size-9 top-0">
        <img className="block max-w-none size-full" src={imgEllipse4} />
      </div>
      <div
        className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] left-1/2 not-italic text-[12px] text-center text-nowrap text-white translate-x-[-50%]"
        style={{ top: "calc(50% - 8px)" }}
      >
        <p className="leading-[16px] whitespace-pre">%0</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div
      className="content-stretch flex items-center justify-center relative shrink-0 size-9"
      data-name="Icon"
    >
      <CircleLoader3 />
      <div
        className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] left-1/2 not-italic text-[#040415] text-[14px] text-center text-nowrap translate-x-[-50%]"
        style={{ top: "calc(50% - 10px)" }}
      >
        <p className="leading-[20px] whitespace-pre">7</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div
      className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0"
      data-name="Text"
    >
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Kally Cirrincione</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">693 Points</p>
      </div>
    </div>
  );
}

function Avatar4() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-8px] place-items-start relative shrink-0"
      data-name="Avatar 1"
    >
      <div
        className="[grid-area:1_/_1] ml-0 mt-0 relative size-7"
        data-name="Mask"
      >
        <img
          className="block max-w-none size-full"
          height="28"
          src={imgMask3}
          width="28"
        />
      </div>
    </div>
  );
}

function Friends3() {
  return (
    <div
      className="box-border content-stretch flex items-start justify-start pl-0 pr-2 py-0 relative shrink-0"
      data-name="Friends"
    >
      <Avatar4 />
    </div>
  );
}

function HabitCard3() {
  return (
    <div
      className="bg-white relative rounded-[16px] shrink-0 w-full"
      data-name="Habit Card"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]"
      />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-3 items-center justify-start p-[16px] relative w-full">
          <Icon3 />
          <Text3 />
          <Friends3 />
        </div>
      </div>
    </div>
  );
}

function CircleLoader4() {
  return (
    <div className="relative shrink-0 size-9" data-name="Circle - Loader">
      <div className="absolute left-0 size-9 top-0">
        <img className="block max-w-none size-full" src={imgEllipse1} />
      </div>
      <div className="absolute left-0 size-9 top-0">
        <img className="block max-w-none size-full" src={imgEllipse4} />
      </div>
      <div
        className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] left-1/2 not-italic text-[12px] text-center text-nowrap text-white translate-x-[-50%]"
        style={{ top: "calc(50% - 8px)" }}
      >
        <p className="leading-[16px] whitespace-pre">%0</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div
      className="content-stretch flex items-center justify-center relative shrink-0 size-9"
      data-name="Icon"
    >
      <CircleLoader4 />
      <div
        className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic text-[#040415] text-[14px] text-center text-nowrap translate-x-[-50%]"
        style={{ top: "calc(50% - 10px)", left: "calc(50% + 0.5px)" }}
      >
        <p className="leading-[20px] whitespace-pre">8</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div
      className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0"
      data-name="Text"
    >
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Layla Schupbach</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">555 Points</p>
      </div>
    </div>
  );
}

function Avatar5() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-8px] place-items-start relative shrink-0"
      data-name="Avatar 1"
    >
      <div
        className="[grid-area:1_/_1] ml-0 mt-0 relative size-7"
        data-name="Mask"
      >
        <img
          className="block max-w-none size-full"
          height="28"
          src={imgMask4}
          width="28"
        />
      </div>
    </div>
  );
}

function Friends4() {
  return (
    <div
      className="box-border content-stretch flex items-start justify-start pl-0 pr-2 py-0 relative shrink-0"
      data-name="Friends"
    >
      <Avatar5 />
    </div>
  );
}

function HabitCard4() {
  return (
    <div
      className="bg-white relative rounded-[16px] shrink-0 w-full"
      data-name="Habit Card"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]"
      />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-3 items-center justify-start p-[16px] relative w-full">
          <Icon4 />
          <Text4 />
          <Friends4 />
        </div>
      </div>
    </div>
  );
}

function Other() {
  return (
    <div
      className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full"
      data-name="Other"
    >
      <HabitCard />
      <HabitCard1 />
      <HabitCard2 />
      <HabitCard3 />
      <HabitCard4 />
    </div>
  );
}

function Content() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 h-[661px] items-start justify-start px-6 py-4 relative shrink-0 w-[393px]"
      data-name="Content"
    >
      <Circles1 />
      <Other />
    </div>
  );
}

function HomeIndicator() {
  return (
    <div
      className="absolute bottom-0 box-border content-stretch flex flex-col gap-2 items-start justify-start left-[1.5px] px-32 py-2"
      data-name="Home Indicator"
    >
      <div
        className="bg-black h-[5px] rounded-[100px] shrink-0 w-[134px]"
        data-name="Home Indicator"
      />
    </div>
  );
}

export default function Leaderboard() {
  return (
    <div
      className="content-stretch flex flex-col gap-3 items-center justify-start overflow-clip relative rounded-[48px] size-full"
      data-name="Leaderboard"
    >
      <Header />
      <Content />
      <HomeIndicator />
    </div>
  );
}
