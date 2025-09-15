import imgMask from "figma:asset/8abe8f69da0cce56e30514863bd05460d9211b32.png";
import imgMask1 from "figma:asset/77627788cb83ebc71f2e0fdf2589a6c21d441acc.png";
import imgImage from "figma:asset/ce427f7c805cbab99de05e414833474a4c2bd0cf.png";
import imgImage1 from "figma:asset/e49e1b41aa4c1dfbe9b36ce2bd48d4d1c05ae1ef.png";
import { imgSignalWifiBattery, imgRightIcon, imgIconsTimeCircle, imgIconsFolder, img1stButton, img2ndButton, img3rdButton, img4thButton, imgIconsPlusCrFr } from "./svg-b10nj";

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

function Header() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-3 items-center justify-start pb-4 pt-0 px-6 relative shrink-0 w-[393px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <StatusBar />
      <HeaderType1 />
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start leading-[0] not-italic relative shrink-0 w-full" data-name="Header">
      <div className="basis-0 font-['Pretendard:Medium',_sans-serif] grow min-h-px min-w-px relative shrink-0 text-[#040415] text-[14px]">
        <p className="leading-[20px]">Suggested for You</p>
      </div>
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] relative shrink-0 text-[#3843ff] text-[10px] text-nowrap tracking-[1px] uppercase">
        <p className="leading-[16px] whitespace-pre">View All</p>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-2 items-center justify-center overflow-clip px-1.5 py-1 relative rounded-[12px] shrink-0">
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black text-nowrap">
        <p className="leading-[24px] whitespace-pre">🚶‍♀️</p>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-0.5 items-start justify-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Walk</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#686873] text-[12px] w-full">
        <p className="leading-[16px]">10 km</p>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full">
      <Frame28 />
      <Frame30 />
    </div>
  );
}

function Frame55() {
  return (
    <div className="bg-[#fcdcd3] box-border content-stretch flex flex-col gap-2 items-start justify-start px-4 py-3 relative rounded-[16px] shrink-0 w-32">
      <Frame29 />
    </div>
  );
}

function Boxes() {
  return (
    <div className="box-border content-stretch flex gap-4 items-start justify-start relative shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)] shrink-0" data-name="Boxes">
      <Frame55 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-2 items-center justify-center overflow-clip px-1.5 py-1 relative rounded-[12px] shrink-0">
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black text-nowrap">
        <p className="leading-[24px] whitespace-pre">🏊🏻‍♂️</p>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-0.5 items-start justify-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Swim</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#686873] text-[12px] w-full">
        <p className="leading-[16px]">30 min</p>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full">
      <Frame31 />
      <Frame32 />
    </div>
  );
}

function Frame56() {
  return (
    <div className="bg-[#d7d9ff] box-border content-stretch flex flex-col gap-2 items-start justify-start px-4 py-3 relative rounded-[16px] shrink-0 w-32">
      <Frame33 />
    </div>
  );
}

function Boxes1() {
  return (
    <div className="box-border content-stretch flex gap-4 items-start justify-start relative shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)] shrink-0" data-name="Boxes">
      <Frame56 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-2 items-center justify-center overflow-clip px-1.5 py-1 relative rounded-[12px] shrink-0">
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black text-nowrap">
        <p className="leading-[24px] whitespace-pre">📕</p>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col gap-0.5 items-start justify-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Read</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#686873] text-[12px] w-full">
        <p className="leading-[16px]">20 min</p>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full">
      <Frame34 />
      <Frame35 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="bg-[#d5ece0] box-border content-stretch flex flex-col gap-2 items-start justify-start px-4 py-3 relative rounded-[16px] shrink-0 w-32">
      <Frame36 />
    </div>
  );
}

function Boxes2() {
  return (
    <div className="box-border content-stretch flex gap-4 items-start justify-start relative shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)] shrink-0" data-name="Boxes">
      <Frame57 />
    </div>
  );
}

function Habits() {
  return (
    <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0" data-name="Habits">
      <Boxes />
      <Boxes1 />
      <Boxes2 />
    </div>
  );
}

function Suggested() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0 w-full" data-name="Suggested">
      <Header1 />
      <Habits />
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start leading-[0] not-italic relative shrink-0 w-full" data-name="Header">
      <div className="basis-0 font-['Pretendard:Medium',_sans-serif] grow min-h-px min-w-px relative shrink-0 text-[#040415] text-[14px]">
        <p className="leading-[20px]">Habit Clubs</p>
      </div>
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] relative shrink-0 text-[#3843ff] text-[10px] text-nowrap tracking-[1px] uppercase">
        <p className="leading-[16px] whitespace-pre">View All</p>
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0">
      <div className="box-border content-stretch flex flex-col gap-2 items-center justify-center overflow-clip px-1.5 py-1 relative">
        <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black text-nowrap">
          <p className="leading-[24px] whitespace-pre">😻</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-[-0.5px] pointer-events-none rounded-[12.5px]" />
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col gap-0.5 items-start justify-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Cat Lovers</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#686873] text-[12px] w-full">
        <p className="leading-[16px]">462 members</p>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full">
      <Frame37 />
      <Frame38 />
    </div>
  );
}

function Boxes3() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-2 items-start justify-start px-4 py-3 relative rounded-[16px] shrink-0 w-32" data-name="Boxes">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <Frame39 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0">
      <div className="box-border content-stretch flex flex-col gap-2 items-center justify-center overflow-clip px-1.5 py-1 relative">
        <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black text-nowrap">
          <p className="leading-[24px] whitespace-pre">🌃</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-[-0.5px] pointer-events-none rounded-[12.5px]" />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-col gap-0.5 items-start justify-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Istanbul</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#686873] text-[12px] w-full">
        <p className="leading-[16px]">+500 members</p>
      </div>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full">
      <Frame40 />
      <Frame41 />
    </div>
  );
}

function Boxes4() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-2 items-start justify-start px-4 py-3 relative rounded-[16px] shrink-0 w-32" data-name="Boxes">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <Frame42 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0">
      <div className="box-border content-stretch flex flex-col gap-2 items-center justify-center overflow-clip px-1.5 py-1 relative">
        <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black text-nowrap">
          <p className="leading-[24px] whitespace-pre">🏃🏻‍♂️</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-[-0.5px] pointer-events-none rounded-[12.5px]" />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col gap-0.5 items-start justify-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Runners</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#686873] text-[12px] w-full">
        <p className="leading-[16px]">336 members</p>
      </div>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full">
      <Frame43 />
      <Frame44 />
    </div>
  );
}

function Boxes5() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-2 items-start justify-start px-4 py-3 relative rounded-[16px] shrink-0 w-32" data-name="Boxes">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <Frame45 />
    </div>
  );
}

function Clubs() {
  return (
    <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0" data-name="Clubs">
      <Boxes3 />
      <Boxes4 />
      <Boxes5 />
    </div>
  );
}

function Clubs1() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0 w-full" data-name="Clubs">
      <Header2 />
      <Clubs />
    </div>
  );
}

function Header3() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start leading-[0] not-italic relative shrink-0 w-full" data-name="Header">
      <div className="basis-0 font-['Pretendard:Medium',_sans-serif] grow min-h-px min-w-px relative shrink-0 text-[#040415] text-[14px]">
        <p className="leading-[20px]">Challenges</p>
      </div>
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] relative shrink-0 text-[#3843ff] text-[10px] text-nowrap tracking-[1px] uppercase">
        <p className="leading-[16px] whitespace-pre">View All</p>
      </div>
    </div>
  );
}

function IconsTimeCircle() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icons/Time Circle">
      <img className="block max-w-none size-full" src={imgIconsTimeCircle} />
    </div>
  );
}

function Titles() {
  return (
    <div className="content-stretch flex flex-col items-start justify-start leading-[0] not-italic relative shrink-0 text-white w-full" data-name="Titles">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[14px] w-full">
        <p className="leading-[20px]">Best Runners! 🏃🏻‍♂️</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[10px] w-full">
        <p className="leading-[12px]">5 days 13 hours left</p>
      </div>
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="content-stretch flex flex-col h-1 items-start justify-start relative shrink-0 w-full" data-name="Progress Bar">
      <div className="bg-[#afb4ff] h-1 rounded-[8px] shrink-0 w-full" />
      <div className="absolute bg-white h-1 rounded-[8px] top-0 translate-x-[-50%] w-[38px]" style={{ left: "calc(50% - 65px)" }} />
    </div>
  );
}

function Avatar3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid mr-[-8px] place-items-start relative shrink-0" data-name="Avatar 3">
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-5" data-name="Mask">
        <img className="block max-w-none size-full" height="20" src={imgMask} width="20" />
      </div>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid mr-[-8px] place-items-start relative shrink-0" data-name="Avatar 2">
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-5" data-name="Mask">
        <img className="block max-w-none size-full" height="20" src={imgMask1} width="20" />
      </div>
    </div>
  );
}

function Member() {
  return (
    <div className="box-border content-stretch flex items-start justify-start pl-0 pr-2 py-0 relative shrink-0" data-name="Member">
      <Avatar3 />
      <Avatar2 />
    </div>
  );
}

function Friends() {
  return (
    <div className="content-stretch flex gap-1 items-center justify-start leading-[0] relative shrink-0 w-full" data-name="Friends">
      <Member />
      <div className="basis-0 font-['Airbnb_Cereal:Book',_sans-serif] grow min-h-px min-w-px not-italic relative shrink-0 text-[10px] text-white">
        <p className="leading-[12px]">2 friends joined</p>
      </div>
    </div>
  );
}

function Component01() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start px-4 py-3 relative rounded-[16px] shrink-0 w-[200px]" data-name="01">
      <IconsTimeCircle />
      <Titles />
      <ProgressBar />
      <Friends />
    </div>
  );
}

function IconsTimeCircle1() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icons/Time Circle">
      <img className="block max-w-none size-full" src={imgIconsTimeCircle} />
    </div>
  );
}

function Titles1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-start leading-[0] not-italic relative shrink-0 text-white w-full" data-name="Titles">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[14px] w-full">
        <p className="leading-[20px]">Best Bikers! 🚴🏻‍</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[10px] w-full">
        <p className="leading-[12px]">2 days 11 hours left</p>
      </div>
    </div>
  );
}

function ProgressBar1() {
  return (
    <div className="content-stretch flex flex-col h-1 items-start justify-start relative shrink-0 w-full" data-name="Progress Bar">
      <div className="bg-[#afb4ff] h-1 rounded-[8px] shrink-0 w-full" />
      <div className="absolute bg-white h-1 rounded-[8px] top-0 translate-x-[-50%] w-[110px]" style={{ left: "calc(50% - 29px)" }} />
    </div>
  );
}

function Avatar4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Avatar 3">
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-5" data-name="Mask">
        <img className="block max-w-none size-full" height="20" src={imgMask} width="20" />
      </div>
    </div>
  );
}

function Friends1() {
  return (
    <div className="content-stretch flex gap-1 items-center justify-start leading-[0] relative shrink-0 w-full" data-name="Friends">
      <Avatar4 />
      <div className="basis-0 font-['Airbnb_Cereal:Book',_sans-serif] grow min-h-px min-w-px not-italic relative shrink-0 text-[10px] text-white">
        <p className="leading-[12px]">1 friends joined</p>
      </div>
    </div>
  );
}

function Component02() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start px-4 py-3 relative rounded-[16px] shrink-0 w-[200px]" data-name="02">
      <IconsTimeCircle1 />
      <Titles1 />
      <ProgressBar1 />
      <Friends1 />
    </div>
  );
}

function Cards() {
  return (
    <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0" data-name="Cards">
      <Component01 />
      <Component02 />
    </div>
  );
}

function Challenges() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0 w-full" data-name="Challenges">
      <Header3 />
      <Cards />
    </div>
  );
}

function Header4() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start leading-[0] not-italic relative shrink-0 w-full" data-name="Header">
      <div className="basis-0 font-['Pretendard:Medium',_sans-serif] grow min-h-px min-w-px relative shrink-0 text-[#040415] text-[14px]">
        <p className="leading-[20px]">Learning</p>
      </div>
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] relative shrink-0 text-[#3843ff] text-[10px] text-nowrap tracking-[1px] uppercase">
        <p className="leading-[16px] whitespace-pre">View All</p>
      </div>
    </div>
  );
}

function IconsFolder() {
  return (
    <div className="relative shrink-0 size-5" data-name="Icons/Folder">
      <img className="block max-w-none size-full" src={imgIconsFolder} />
    </div>
  );
}

function Header5() {
  return (
    <div className="content-stretch flex gap-2 items-start justify-start relative shrink-0 w-full" data-name="Header">
      <IconsFolder />
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[140px]">
        <p className="leading-[20px]">Why should we drink water often?</p>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start pb-3 pt-[88px] px-4 relative rounded-[16px] shrink-0 w-[200px]" data-name="01">
      <Header5 />
      <div className="absolute bg-[#000dff33] bg-[position:0%_0%,_50%_50%] bg-size-[auto,cover] h-20 left-0 rounded-tl-[16px] rounded-tr-[16px] top-0 w-[200px]" data-name="Image" style={{ backgroundImage: `url('${imgImage}')` }} />
    </div>
  );
}

function IconsFolder1() {
  return (
    <div className="relative shrink-0 size-5" data-name="Icons/Folder">
      <img className="block max-w-none size-full" src={imgIconsFolder} />
    </div>
  );
}

function Header6() {
  return (
    <div className="content-stretch flex gap-2 items-start justify-start relative shrink-0 w-full" data-name="Header">
      <IconsFolder1 />
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[140px]">
        <p className="leading-[20px]">Benefits of regular walking</p>
      </div>
    </div>
  );
}

function Component3() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start pb-3 pt-[88px] px-4 relative rounded-[16px] shrink-0 w-[200px]" data-name="02">
      <Header6 />
      <div className="absolute bg-[#000dff33] bg-[position:0%_0%,_50%_50%] bg-size-[auto,cover] h-20 left-0 rounded-tl-[16px] rounded-tr-[16px] top-0 w-[200px]" data-name="Image" style={{ backgroundImage: `url('${imgImage1}')` }} />
    </div>
  );
}

function Posts() {
  return (
    <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0" data-name="Posts">
      <Component2 />
      <Component3 />
    </div>
  );
}

function Learning() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0 w-full" data-name="Learning">
      <Header4 />
      <Posts />
    </div>
  );
}

function Content() {
  return (
    <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start px-6 py-0 relative shrink-0 w-[393px]" data-name="Content">
      <Suggested />
      <Clubs1 />
      <Challenges />
      <Learning />
    </div>
  );
}

function Component1stButton() {
  return (
    <div className="relative shrink-0 size-6" data-name="1st Button">
      <img className="block max-w-none size-full" src={img1stButton} />
    </div>
  );
}

function Component2ndButton() {
  return (
    <div className="relative shrink-0 size-6" data-name="2nd Button">
      <img className="block max-w-none size-full" src={img2ndButton} />
    </div>
  );
}

function LeftSide1() {
  return (
    <div className="content-stretch flex gap-10 items-start justify-start relative shrink-0" data-name="Left Side">
      <Component1stButton />
      <Component2ndButton />
    </div>
  );
}

function Component3rdButton() {
  return (
    <div className="relative shrink-0 size-6" data-name="3rd Button">
      <div className="absolute bottom-0 left-0 right-[-20.83%] top-[-20.83%]">
        <img className="block max-w-none size-full" src={img3rdButton} />
      </div>
    </div>
  );
}

function Component4thButton() {
  return (
    <div className="relative shrink-0 size-6" data-name="4th Button">
      <img className="block max-w-none size-full" src={img4thButton} />
    </div>
  );
}

function RightSide1() {
  return (
    <div className="content-stretch flex gap-10 items-start justify-start relative shrink-0" data-name="Right Side">
      <Component3rdButton />
      <Component4thButton />
    </div>
  );
}

function Buttons() {
  return (
    <div className="basis-0 content-stretch flex grow items-start justify-between min-h-px min-w-px relative shrink-0" data-name="Buttons">
      <LeftSide1 />
      <RightSide1 />
    </div>
  );
}

function IconsPlusCrFr() {
  return (
    <div className="absolute left-1/2 size-12 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Icons/Plus cr-fr">
      <div className="absolute inset-[-79.17%_-254.17%_-187.5%_-12.5%]">
        <img className="block max-w-none size-full" src={imgIconsPlusCrFr} />
      </div>
    </div>
  );
}

function AppBar() {
  return (
    <div className="absolute bg-white bottom-[33px] left-[16.5px] rounded-[64px] w-[360px]" data-name="App Bar">
      <div className="box-border content-stretch flex gap-10 items-start justify-start overflow-clip px-6 py-5 relative w-[360px]">
        <Buttons />
        <IconsPlusCrFr />
      </div>
      <div aria-hidden="true" className="absolute border-[#cdcdd0] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[64px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
    </div>
  );
}

function HomeIndicator() {
  return (
    <div className="absolute bottom-0 box-border content-stretch flex flex-col gap-2 items-start justify-start left-[1.5px] px-32 py-2" data-name="Home Indicator">
      <div className="bg-black h-[5px] rounded-[100px] shrink-0 w-[134px]" data-name="Home Indicator" />
    </div>
  );
}

export default function Explore() {
  return (
    <div className="bg-[#f6f9ff] content-stretch flex flex-col gap-3 items-center justify-start overflow-clip relative rounded-[48px] size-full" data-name="Explore">
      <Header />
      <Content />
      <AppBar />
      <HomeIndicator />
    </div>
  );
}