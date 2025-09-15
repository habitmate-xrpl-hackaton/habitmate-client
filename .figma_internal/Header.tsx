import { imgSignalWifiBattery, imgRightIcon } from "./svg-ir6g7";

function StatusBarTime() {
  return (
    <div className="h-[21px] relative rounded-[24px] shrink-0 w-[54px]" data-name="_StatusBar-time">
      <div className="absolute font-['SF_Pro_Text:Semibold',_sans-serif] h-5 leading-[0] left-[27px] not-italic text-[16px] text-black text-center top-px tracking-[-0.32px] translate-x-[-50%] w-[54px]">
        <p className="leading-[21px]">9:41</p>
      </div>
    </div>
  );
}

function LeftSide() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Left Side">
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2 items-center justify-center pb-[3px] pl-2.5 pr-0 pt-0 relative size-full">
          <StatusBarTime />
        </div>
      </div>
    </div>
  );
}

function TrueDepthCamera() {
  return <div className="absolute bg-black h-[37px] rounded-[100px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-20" data-name="TrueDepth camera" style={{ left: "calc(50% - 22.5px)" }} />;
}

function FaceTimeCamera() {
  return <div className="absolute bg-black rounded-[100px] size-[37px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="FaceTime camera" style={{ left: "calc(50% + 44px)" }} />;
}

function StatusBarDynamicIsland() {
  return (
    <div className="bg-black h-[37px] relative rounded-[100px] shrink-0 w-[125px]" data-name="StatusBar-dynamicIsland">
      <TrueDepthCamera />
      <FaceTimeCamera />
    </div>
  );
}

function DynamicIsland() {
  return (
    <div className="content-stretch flex flex-col h-full items-center justify-center relative shrink-0" data-name="Dynamic Island">
      <StatusBarDynamicIsland />
    </div>
  );
}

function SignalWifiBattery() {
  return (
    <div className="h-[13px] relative shrink-0 w-[78.401px]" data-name="Signal, Wifi, Battery">
      <img className="block max-w-none size-full" src={imgSignalWifiBattery} />
    </div>
  );
}

function RightSide() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Right Side">
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
    <div className="content-stretch flex h-[59px] items-end justify-center relative shrink-0 w-[393px]" data-name="Status Bar">
      <LeftSide />
      <DynamicIsland />
      <RightSide />
    </div>
  );
}

function Frame2608541() {
  return (
    <div className="basis-0 grow h-8 min-h-px min-w-px relative shrink-0">
      <div className="absolute font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] left-0 not-italic text-[#040415] text-[24px] top-0 tracking-[-1px] w-[233px]">
        <p className="leading-[32px]">Explore</p>
      </div>
    </div>
  );
}

function RightIcon() {
  return (
    <div className="relative shrink-0 size-12" data-name="Right Icon">
      <img className="block max-w-none size-full" src={imgRightIcon} />
    </div>
  );
}

function HeaderType1() {
  return (
    <div className="content-stretch flex gap-2 h-12 items-center justify-start relative shrink-0 w-[345px]" data-name="Header Type 1">
      <Frame2608541 />
      <RightIcon />
    </div>
  );
}

export default function Header() {
  return (
    <div className="bg-white relative size-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-center justify-start pb-4 pt-0 px-6 relative size-full">
          <StatusBar />
          <HeaderType1 />
        </div>
      </div>
    </div>
  );
}