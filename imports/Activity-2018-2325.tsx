import { imgSignalWifiBattery, imgRightIcon, imgLeftButton, imgRightButton, imgRightButton1, imgIconsMedal, imgVector20, imgVector1, imgEllipse40, imgLine5, imgPopover, imgLine2, img1stButton, img2ndButton, img3rdButton, img4thButton, imgIconsPlusCrFr } from "./svg-1yoku";

function HomeIndicator() {
  return (
    <div className="absolute bottom-0 box-border content-stretch flex flex-col gap-2 items-start justify-start left-0.5 px-32 py-2" data-name="Home Indicator">
      <div className="bg-black h-[5px] rounded-[100px] shrink-0 w-[134px]" data-name="Home Indicator" />
    </div>
  );
}

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
        <p className="leading-[32px]">Activity</p>
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

function Component1stTab() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)] shrink-0" data-name="1st Tab">
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
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)] shrink-0" data-name="2nd Tab">
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
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[16px] shrink-0" data-name="3rd Tab">
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
    <div className="bg-[#eaecf0] box-border content-stretch flex items-start justify-start p-[2px] relative rounded-[16px] shrink-0 w-[345px]" data-name="Segment Control">
      <Component1stTab />
      <Component2ndTab />
      <Component3rdTab />
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">This week</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#686873] text-[12px] w-full">
        <p className="leading-[16px]">May 28 - Jun 3</p>
      </div>
    </div>
  );
}

function LeftButton() {
  return (
    <div className="relative shrink-0 size-10" data-name="Left Button">
      <img className="block max-w-none size-full" src={imgLeftButton} />
    </div>
  );
}

function RightButton() {
  return (
    <div className="relative shrink-0 size-10" data-name="Right Button">
      <img className="block max-w-none size-full" src={imgRightButton} />
    </div>
  );
}

function DatePicker() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-full" data-name="Date Picker">
      <Text />
      <LeftButton />
      <RightButton />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-3 items-center justify-start pb-4 pt-0 px-6 relative shrink-0 w-[393px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <StatusBar />
      <HeaderType1 />
      <SegmentControl />
      <DatePicker />
    </div>
  );
}

function Icon() {
  return (
    <div className="bg-gray-100 box-border content-stretch flex flex-col gap-2 items-center justify-center p-[8px] relative rounded-[8px] shrink-0 size-9" data-name="Icon">
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#040415] text-[18px] text-center text-nowrap">
        <p className="leading-[24px] whitespace-pre">👀</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">All Habits</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">Summary</p>
      </div>
    </div>
  );
}

function RightButton1() {
  return (
    <div className="relative shrink-0 size-9" data-name="Right Button">
      <img className="block max-w-none size-full" src={imgRightButton1} />
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0 w-full" data-name="Header">
      <Icon />
      <Text1 />
      <RightButton1 />
    </div>
  );
}

function Component01() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="01">
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[10px] tracking-[1px] uppercase w-full">
        <p className="leading-[16px]">SUCCESS RATE</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#3ba935] text-[18px] w-full">
        <p className="leading-[24px]">%98</p>
      </div>
    </div>
  );
}

function Component02() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="02">
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[10px] tracking-[1px] uppercase w-full">
        <p className="leading-[16px]">COMPLETED</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[18px] w-full">
        <p className="leading-[24px]">244</p>
      </div>
    </div>
  );
}

function Stats01() {
  return (
    <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0 w-[313px]" data-name="Stats 01">
      <Component01 />
      <Component02 />
    </div>
  );
}

function IconsMedal() {
  return (
    <div className="relative shrink-0 size-4" data-name="Icons/Medal">
      <img className="block max-w-none size-full" src={imgIconsMedal} />
    </div>
  );
}

function StatusBadge() {
  return (
    <div className="bg-[#fff3da] box-border content-stretch flex items-center justify-start px-1 py-0.5 relative rounded-[8px] shrink-0" data-name="Status Badge">
      <IconsMedal />
      <div className="flex flex-col font-['Pretendard:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fea800] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">322</p>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="01">
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#9b9ba1] text-[10px] tracking-[1px] uppercase" style={{ width: "min-content" }}>
        <p className="leading-[16px]">POINTS EARNED</p>
      </div>
      <StatusBadge />
    </div>
  );
}

function Component3() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="02">
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[10px] tracking-[1px] uppercase w-full">
        <p className="leading-[16px]">BEST STREAK DAY</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[18px] w-full">
        <p className="leading-[24px]">22</p>
      </div>
    </div>
  );
}

function Stats02() {
  return (
    <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0 w-[313px]" data-name="Stats 02">
      <Component2 />
      <Component3 />
    </div>
  );
}

function Component4() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="01">
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[10px] tracking-[1px] uppercase w-full">
        <p className="leading-[16px]">SKIPPED</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[18px] w-full">
        <p className="leading-[24px]">4</p>
      </div>
    </div>
  );
}

function Component5() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="02">
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[10px] tracking-[1px] uppercase w-full">
        <p className="leading-[16px]">FAILED</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#e3524f] text-[18px] w-full">
        <p className="leading-[24px]">2</p>
      </div>
    </div>
  );
}

function Stats03() {
  return (
    <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0 w-[313px]" data-name="Stats 03">
      <Component4 />
      <Component5 />
    </div>
  );
}

function Stats() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0" data-name="Stats">
      <Stats01 />
      <Stats02 />
      <Stats03 />
    </div>
  );
}

function HabitCard() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Habit Card">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <div className="flex flex-col justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-start justify-center p-[16px] relative w-full">
          <Header1 />
          <Stats />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="bg-gray-100 box-border content-stretch flex flex-col gap-2 items-center justify-center p-[8px] relative rounded-[8px] shrink-0 size-9" data-name="Icon">
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#040415] text-[18px] text-center text-nowrap">
        <p className="leading-[24px] whitespace-pre">📈</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Habits</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">Comparison by week</p>
      </div>
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0 w-full" data-name="Header">
      <Icon1 />
      <Text2 />
    </div>
  );
}

function Graphics() {
  return (
    <div className="absolute contents left-0 top-[-3px]" data-name="Graphics">
      <div className="absolute h-[90.953px] left-0 top-[5px] w-[286.741px]">
        <img className="block max-w-none size-full" src={imgVector20} />
      </div>
      <div className="absolute h-[74.457px] left-[0.52px] top-[5.04px] w-[286.22px]">
        <div className="absolute inset-[-1.34%_-0.35%]">
          <img className="block max-w-none size-full" src={imgVector1} />
        </div>
      </div>
      <div className="absolute h-[93px] opacity-30 right-6 rounded-tl-[20px] rounded-tr-[20px] top-[3px] w-1" />
      <div className="absolute right-[18px] size-4 top-[-3px]">
        <div className="absolute inset-[-125%_-156.25%_-187.5%_-156.25%]">
          <img className="block max-w-none size-full" src={imgEllipse40} />
        </div>
      </div>
    </div>
  );
}

function Chart() {
  return (
    <div className="h-[113px] relative shrink-0 w-full" data-name="Chart">
      <div className="absolute h-0 left-0 top-0 w-[313px]">
        <div className="absolute inset-[-0.5px_-0.16%]">
          <img className="block max-w-none size-full" src={imgLine5} />
        </div>
      </div>
      <div className="absolute h-0 left-0 top-6 w-[313px]">
        <div className="absolute inset-[-0.5px_-0.16%]">
          <img className="block max-w-none size-full" src={imgLine5} />
        </div>
      </div>
      <div className="absolute h-0 left-0 top-12 w-[313px]">
        <div className="absolute inset-[-0.5px_-0.16%]">
          <img className="block max-w-none size-full" src={imgLine5} />
        </div>
      </div>
      <div className="absolute h-0 left-0 top-[72px] w-[313px]">
        <div className="absolute inset-[-0.5px_-0.16%]">
          <img className="block max-w-none size-full" src={imgLine5} />
        </div>
      </div>
      <div className="absolute h-0 left-0 top-24 w-[313px]">
        <div className="absolute inset-[-0.5px_-0.16%]">
          <img className="block max-w-none size-full" src={imgLine5} />
        </div>
      </div>
      <div className="absolute font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] left-[6.5px] not-italic text-[#cdcdd0] text-[10px] text-nowrap top-[97px] tracking-[1px] uppercase">
        <p className="leading-[16px] whitespace-pre">4</p>
      </div>
      <div className="absolute font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] left-[49px] not-italic text-[#cdcdd0] text-[10px] text-nowrap top-[97px] tracking-[1px] uppercase">
        <p className="leading-[16px] whitespace-pre">5</p>
      </div>
      <div className="absolute font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] left-[91px] not-italic text-[#cdcdd0] text-[10px] text-nowrap top-[97px] tracking-[1px] uppercase">
        <p className="leading-[16px] whitespace-pre">6</p>
      </div>
      <div className="absolute font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] left-[133px] not-italic text-[#cdcdd0] text-[10px] text-nowrap top-[97px] tracking-[1px] uppercase">
        <p className="leading-[16px] whitespace-pre">7</p>
      </div>
      <div className="absolute font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] left-[175px] not-italic text-[#cdcdd0] text-[10px] text-nowrap top-[97px] tracking-[1px] uppercase">
        <p className="leading-[16px] whitespace-pre">8</p>
      </div>
      <div className="absolute font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] left-[217px] not-italic text-[#cdcdd0] text-[10px] text-nowrap top-[97px] tracking-[1px] uppercase">
        <p className="leading-[16px] whitespace-pre">9</p>
      </div>
      <div className="absolute font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] left-64 not-italic text-[#cdcdd0] text-[10px] text-nowrap top-[97px] tracking-[1px] uppercase">
        <p className="leading-[16px] whitespace-pre">10</p>
      </div>
      <div className="absolute font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] left-[299px] not-italic text-[#cdcdd0] text-[10px] text-nowrap top-[97px] tracking-[1px] uppercase">
        <p className="leading-[16px] whitespace-pre">11</p>
      </div>
      <Graphics />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute bottom-[142px] box-border content-stretch flex flex-col font-['Airbnb_Cereal:Book',_sans-serif] items-center justify-center leading-[0] not-italic pb-1 pt-1.5 px-2 right-2 text-[12px] w-[68px]" data-name="Text">
      <div className="relative shrink-0 text-[#040415] w-full">
        <p className="leading-[16px]">🔥 Burn!</p>
      </div>
      <div className="relative shrink-0 text-[#9b9ba1] w-full">
        <p className="leading-[16px]">32 habits</p>
      </div>
    </div>
  );
}

function Popover() {
  return (
    <div className="absolute contents right-[5px] top-[7px]" data-name="Popover">
      <div className="absolute h-[52.5px] right-[5px] top-[7px] w-[74px]" data-name="Popover">
        <div className="absolute inset-[-80%_-170.27%_-178.09%_-13.51%]">
          <img className="block max-w-none size-full" src={imgPopover} />
        </div>
      </div>
      <Text3 />
    </div>
  );
}

function HabitCard1() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Habit Card">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <div className="flex flex-col justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-start justify-center p-[16px] relative w-full">
          <Header2 />
          <Chart />
          <Popover />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="bg-gray-100 box-border content-stretch flex flex-col gap-2 items-center justify-center p-[8px] relative rounded-[8px] shrink-0 size-9" data-name="Icon">
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#040415] text-[18px] text-center text-nowrap">
        <p className="leading-[24px] whitespace-pre">🙂</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Happy</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">Avg. Mood</p>
      </div>
    </div>
  );
}

function Header3() {
  return (
    <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0 w-full" data-name="Header">
      <Icon2 />
      <Text4 />
    </div>
  );
}

function Moods() {
  return (
    <div className="box-border content-stretch flex flex-col h-[100px] items-start justify-between pb-1 pt-0 px-0 relative shrink-0 text-[#040415] text-[14px] text-center" data-name="Moods">
      <div className="flex flex-col font-['Pretendard:Medium',_sans-serif] justify-center mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😍</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] mb-[-4px] relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">🙂</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😐</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">☹️</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😡</p>
      </div>
    </div>
  );
}

function Component6() {
  return (
    <div className="content-stretch flex flex-col h-full items-center justify-between leading-[0] not-italic relative shrink-0 text-nowrap w-2.5" data-name="01">
      <Moods />
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] relative shrink-0 text-[#cdcdd0] text-[10px] tracking-[1px] uppercase">
        <p className="leading-[16px] text-nowrap whitespace-pre">s</p>
      </div>
    </div>
  );
}

function Moods1() {
  return (
    <div className="box-border content-stretch flex flex-col h-[100px] items-start justify-between pb-1 pt-0 px-0 relative shrink-0 text-[#040415] text-[14px] text-center" data-name="Moods">
      <div className="flex flex-col font-['Pretendard:Medium',_sans-serif] justify-center mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😍</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">🙂</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😐</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">☹️</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😡</p>
      </div>
    </div>
  );
}

function Component7() {
  return (
    <div className="content-stretch flex flex-col h-full items-center justify-between leading-[0] not-italic relative shrink-0 text-nowrap w-2.5" data-name="02">
      <Moods1 />
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] relative shrink-0 text-[#cdcdd0] text-[10px] tracking-[1px] uppercase">
        <p className="leading-[16px] text-nowrap whitespace-pre">M</p>
      </div>
    </div>
  );
}

function Moods2() {
  return (
    <div className="box-border content-stretch flex flex-col h-[100px] items-start justify-between pb-1 pt-0 px-0 relative shrink-0 text-[#040415] text-[14px] text-center" data-name="Moods">
      <div className="flex flex-col font-['Pretendard:Medium',_sans-serif] justify-center mb-[-4px] relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😍</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">🙂</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😐</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">☹️</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😡</p>
      </div>
    </div>
  );
}

function Component03() {
  return (
    <div className="content-stretch flex flex-col h-full items-center justify-between leading-[0] not-italic relative shrink-0 text-nowrap w-2.5" data-name="03">
      <Moods2 />
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] relative shrink-0 text-[#cdcdd0] text-[10px] tracking-[1px] uppercase">
        <p className="leading-[16px] text-nowrap whitespace-pre">t</p>
      </div>
    </div>
  );
}

function Moods3() {
  return (
    <div className="box-border content-stretch flex flex-col h-[100px] items-start justify-between pb-1 pt-0 px-0 relative shrink-0 text-[#040415] text-[14px] text-center" data-name="Moods">
      <div className="flex flex-col font-['Pretendard:Medium',_sans-serif] justify-center mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😍</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] mb-[-4px] relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">🙂</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😐</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">☹️</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😡</p>
      </div>
    </div>
  );
}

function Component04() {
  return (
    <div className="content-stretch flex flex-col h-full items-center justify-between leading-[0] not-italic relative shrink-0 text-nowrap w-2.5" data-name="04">
      <Moods3 />
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] relative shrink-0 text-[#cdcdd0] text-[10px] tracking-[1px] uppercase">
        <p className="leading-[16px] text-nowrap whitespace-pre">w</p>
      </div>
    </div>
  );
}

function Moods4() {
  return (
    <div className="box-border content-stretch flex flex-col h-[100px] items-start justify-between pb-1 pt-0 px-0 relative shrink-0 text-[#040415] text-[14px] text-center" data-name="Moods">
      <div className="flex flex-col font-['Pretendard:Medium',_sans-serif] justify-center mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😍</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] mb-[-4px] relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">🙂</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😐</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">☹️</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😡</p>
      </div>
    </div>
  );
}

function Component05() {
  return (
    <div className="content-stretch flex flex-col h-full items-center justify-between leading-[0] not-italic relative shrink-0 text-nowrap w-2.5" data-name="05">
      <Moods4 />
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] relative shrink-0 text-[#cdcdd0] text-[10px] tracking-[1px] uppercase">
        <p className="leading-[16px] text-nowrap whitespace-pre">t</p>
      </div>
    </div>
  );
}

function Moods5() {
  return (
    <div className="box-border content-stretch flex flex-col h-[100px] items-start justify-between pb-1 pt-0 px-0 relative shrink-0 text-[#040415] text-[14px] text-center" data-name="Moods">
      <div className="flex flex-col font-['Pretendard:Medium',_sans-serif] justify-center mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😍</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">🙂</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😐</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">☹️</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😡</p>
      </div>
    </div>
  );
}

function Component06() {
  return (
    <div className="content-stretch flex flex-col h-full items-center justify-between leading-[0] not-italic relative shrink-0 text-nowrap w-2.5" data-name="06">
      <Moods5 />
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] relative shrink-0 text-[#cdcdd0] text-[10px] tracking-[1px] uppercase">
        <p className="leading-[16px] text-nowrap whitespace-pre">F</p>
      </div>
    </div>
  );
}

function Moods6() {
  return (
    <div className="box-border content-stretch flex flex-col h-[100px] items-start justify-between pb-1 pt-0 px-0 relative shrink-0 text-[#040415] text-[14px] text-center" data-name="Moods">
      <div className="flex flex-col font-['Pretendard:Medium',_sans-serif] justify-center mb-[-4px] relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😍</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">🙂</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😐</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">☹️</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] mb-[-4px] opacity-0 relative shrink-0">
        <p className="leading-[20px] text-nowrap whitespace-pre">😡</p>
      </div>
    </div>
  );
}

function Component07() {
  return (
    <div className="content-stretch flex flex-col h-full items-center justify-between leading-[0] not-italic relative shrink-0 text-nowrap w-2.5" data-name="07">
      <Moods6 />
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] relative shrink-0 text-[#cdcdd0] text-[10px] tracking-[1px] uppercase">
        <p className="leading-[16px] text-nowrap whitespace-pre">s</p>
      </div>
    </div>
  );
}

function MoodTable() {
  return (
    <div className="h-[124px] relative shrink-0 w-full" data-name="Mood Table">
      <div className="flex flex-row items-end relative size-full">
        <div className="box-border content-stretch flex h-[124px] items-end justify-between px-4 py-0 relative w-full">
          <div className="absolute h-0 left-0 top-0 w-[313px]">
            <div className="absolute inset-[-0.5px_-0.16%]">
              <img className="block max-w-none size-full" src={imgLine2} />
            </div>
          </div>
          <div className="absolute h-0 left-0 top-5 w-[313px]">
            <div className="absolute inset-[-0.5px_-0.16%]">
              <img className="block max-w-none size-full" src={imgLine2} />
            </div>
          </div>
          <div className="absolute h-0 left-0 top-10 w-[313px]">
            <div className="absolute inset-[-0.5px_-0.16%]">
              <img className="block max-w-none size-full" src={imgLine2} />
            </div>
          </div>
          <div className="absolute h-0 left-0 top-[60px] w-[313px]">
            <div className="absolute inset-[-0.5px_-0.16%]">
              <img className="block max-w-none size-full" src={imgLine2} />
            </div>
          </div>
          <div className="absolute h-0 left-0 top-20 w-[313px]">
            <div className="absolute inset-[-0.5px_-0.16%]">
              <img className="block max-w-none size-full" src={imgLine2} />
            </div>
          </div>
          <div className="absolute h-0 left-0 top-[100px] w-[313px]">
            <div className="absolute inset-[-0.5px_-0.16%]">
              <img className="block max-w-none size-full" src={imgLine2} />
            </div>
          </div>
          <Component6 />
          <Component7 />
          <Component03 />
          <Component04 />
          <Component05 />
          <Component06 />
          <Component07 />
        </div>
      </div>
    </div>
  );
}

function HabitCard2() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Habit Card">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <div className="flex flex-col justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-3 items-start justify-center p-[16px] relative w-full">
          <Header3 />
          <MoodTable />
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start px-6 py-0 relative shrink-0 w-[393px]" data-name="Body">
      <HabitCard />
      <HabitCard1 />
      <HabitCard2 />
    </div>
  );
}

function Content() {
  return (
    <div className="absolute content-stretch flex flex-col gap-3 h-[852px] items-start justify-start left-0 top-0" data-name="Content">
      <Header />
      <Body />
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
    <div className="absolute bg-white left-[16.5px] rounded-[64px] top-[755px] w-[360px]" data-name="App Bar">
      <div className="box-border content-stretch flex gap-10 items-start justify-start overflow-clip px-6 py-5 relative w-[360px]">
        <Buttons />
        <IconsPlusCrFr />
      </div>
      <div aria-hidden="true" className="absolute border-[#cdcdd0] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[64px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
    </div>
  );
}

export default function Activity() {
  return (
    <div className="bg-[#f6f9ff] overflow-clip relative rounded-[48px] size-full" data-name="Activity">
      <HomeIndicator />
      <Content />
      <AppBar />
    </div>
  );
}