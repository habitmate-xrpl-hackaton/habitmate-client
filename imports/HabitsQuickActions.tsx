import imgMask from "figma:asset/29faee2acf12de1f616f3be3b57ec19c47e9bc0a.png";
import imgMask1 from "figma:asset/5bc00eccfb5a496997fad8da5d8c4f75e2f7f958.png";
import { imgSignalWifiBattery, imgLeftIcon, imgRightIcon, imgEllipse1, imgEllipse4, imgEllipse2, imgEllipse5, imgAddButton, imgEllipse6, imgEllipse7, imgCircleLoader, imgDoneButton, imgIconsShow, imgIconsTickSquare, imgLine1, imgIconsClose, imgIconsArrowRight2, img1stButton, img2ndButton, img3rdButton, img4thButton, imgIconsPlusCrFr } from "./svg-mmyoz";

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

function LeftIcon() {
  return (
    <div className="relative shrink-0 size-12" data-name="Left Icon">
      <img className="block max-w-none size-full" src={imgLeftIcon} />
    </div>
  );
}

function Frame2608541() {
  return <div className="basis-0 grow h-8 min-h-px min-w-px shrink-0" />;
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
      <LeftIcon />
      <Frame2608541 />
      <RightIcon />
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-1 grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[18px] w-[329px]">
        <p className="leading-[24px]">Hi, Mert 👋🏻</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[14px] w-[329px]">
        <p className="leading-[20px]">Let’s make habits together!</p>
      </div>
    </div>
  );
}

function Mood() {
  return (
    <div className="bg-[#ddf2fc] box-border content-stretch flex flex-col gap-2 items-center justify-center px-3 py-2 relative rounded-[24px] shrink-0" data-name="Mood">
      <div className="[text-shadow:rgba(35,44,93,0.06)_58px_26px_68px] flex flex-col font-['Airbnb_Cereal:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#040415] text-[24px] text-center text-nowrap tracking-[-1px]">
        <p className="leading-[32px] whitespace-pre">😇</p>
      </div>
    </div>
  );
}

function TopContent() {
  return (
    <div className="content-stretch flex gap-1 items-center justify-start relative shrink-0 w-[345px]" data-name="Top Content">
      <Text />
      <Mood />
    </div>
  );
}

function Component1stTab() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)] shrink-0" data-name="1st Tab">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-2.5 items-center justify-center px-4 py-1 relative w-full">
          <div className="bg-clip-text flex flex-col font-['Pretendard:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap" style={{ WebkitTextFillColor: "transparent" }}>
            <p className="leading-[20px] whitespace-pre">Today</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2608540() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-2 items-center justify-center px-2 py-0.5 relative rounded-[44px] shrink-0">
      <div className="flex flex-col font-['Airbnb_Cereal:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3843ff] text-[10px] text-center text-nowrap tracking-[1px] uppercase">
        <p className="leading-[16px] whitespace-pre">2</p>
      </div>
    </div>
  );
}

function Component2ndTab() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[16px] shrink-0" data-name="2nd Tab">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-2.5 items-center justify-center px-4 py-1 relative w-full">
          <div className="flex flex-col font-['Pretendard:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#686873] text-[14px] text-center text-nowrap">
            <p className="leading-[20px] whitespace-pre">Clubs</p>
          </div>
          <Frame2608540 />
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
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-3 items-center justify-start pb-4 pt-0 px-6 relative shrink-0 w-[393px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <StatusBar />
      <HeaderType1 />
      <TopContent />
      <SegmentControl />
    </div>
  );
}

function DatePicker() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center justify-center px-2 py-3 relative rounded-[16px] shrink-0 w-[31px]" data-name="Date-Picker">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#040415] text-[20px] text-center w-full">
        <p className="leading-[24px]">2</p>
      </div>
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#cdcdd0] text-[10px] text-center tracking-[1px] uppercase w-full">
        <p className="leading-[16px]">RI</p>
      </div>
    </div>
  );
}

function DatePicker1() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center justify-center px-2 py-3 relative rounded-[16px] shrink-0 w-12" data-name="Date-Picker">
      <div aria-hidden="true" className="absolute border-2 border-[#6b73ff] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-text font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-center w-full" style={{ WebkitTextFillColor: "transparent" }}>
        <p className="leading-[24px]">3</p>
      </div>
      <div className="bg-clip-text font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[10px] text-center tracking-[1px] uppercase w-full" style={{ WebkitTextFillColor: "transparent" }}>
        <p className="leading-[16px]">SAT</p>
      </div>
    </div>
  );
}

function DatePicker2() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center justify-center px-2 py-3 relative rounded-[16px] shrink-0 w-12" data-name="Date-Picker">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#040415] text-[20px] text-center w-full">
        <p className="leading-[24px]">4</p>
      </div>
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#cdcdd0] text-[10px] text-center tracking-[1px] uppercase w-full">
        <p className="leading-[16px]">SUN</p>
      </div>
    </div>
  );
}

function DatePicker3() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center justify-center px-2 py-3 relative rounded-[16px] shrink-0 w-12" data-name="Date-Picker">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#040415] text-[20px] text-center w-full">
        <p className="leading-[24px]">5</p>
      </div>
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#cdcdd0] text-[10px] text-center tracking-[1px] uppercase w-full">
        <p className="leading-[16px]">MON</p>
      </div>
    </div>
  );
}

function DatePicker4() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center justify-center px-2 py-3 relative rounded-[16px] shrink-0 w-12" data-name="Date-Picker">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#040415] text-[20px] text-center w-full">
        <p className="leading-[24px]">6</p>
      </div>
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#cdcdd0] text-[10px] text-center tracking-[1px] uppercase w-full">
        <p className="leading-[16px]">TUE</p>
      </div>
    </div>
  );
}

function DatePicker5() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center justify-center px-2 py-3 relative rounded-[16px] shrink-0 w-12" data-name="Date-Picker">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#040415] text-[20px] text-center w-full">
        <p className="leading-[24px]">7</p>
      </div>
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#cdcdd0] text-[10px] text-center tracking-[1px] uppercase w-full">
        <p className="leading-[16px]">Wed</p>
      </div>
    </div>
  );
}

function DatePicker6() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center justify-center px-2 py-3 relative rounded-[16px] shrink-0 w-12" data-name="Date-Picker">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#040415] text-[20px] text-center w-full">
        <p className="leading-[24px]">8</p>
      </div>
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#cdcdd0] text-[10px] text-center tracking-[1px] uppercase w-full">
        <p className="leading-[16px]">THU</p>
      </div>
    </div>
  );
}

function DatePicker7() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center justify-center px-2 py-3 relative rounded-[16px] shrink-0 w-12" data-name="Date-Picker">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#040415] text-[20px] text-center w-full">
        <p className="leading-[24px]">9</p>
      </div>
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#cdcdd0] text-[10px] text-center tracking-[1px] uppercase w-full">
        <p className="leading-[16px]">FRI</p>
      </div>
    </div>
  );
}

function Calendar() {
  return (
    <div className="content-stretch flex gap-2 items-start justify-center relative shrink-0 w-full" data-name="Calendar">
      <DatePicker />
      <DatePicker1 />
      <DatePicker2 />
      <DatePicker3 />
      <DatePicker4 />
      <DatePicker5 />
      <DatePicker6 />
      <DatePicker7 />
    </div>
  );
}

function CircleLoader() {
  return (
    <div className="relative shrink-0 size-10" data-name="Circle - Loader">
      <div className="absolute left-0 size-10 top-0">
        <img className="block max-w-none size-full" src={imgEllipse1} />
      </div>
      <div className="absolute left-0 size-10 top-0">
        <div className="absolute bottom-[47.22%] left-[47.22%] right-0 top-0">
          <img className="block max-w-none size-full" src={imgEllipse4} />
        </div>
      </div>
      <div className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic text-[12px] text-center text-nowrap text-white translate-x-[-50%]" style={{ top: "calc(50% - 8.889px)", left: "calc(50% + 0.278px)" }}>
        <p className="leading-[16px] whitespace-pre">%25</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-1 grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[14px] text-white w-full">
        <p className="leading-[20px]">Your daily goals almost done! 🔥</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#afb4ff] text-[12px] w-full">
        <p className="leading-[16px]">1 of 4 completed</p>
      </div>
    </div>
  );
}

function InfoBox() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full" data-name="Info box">
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-3 items-start justify-start p-[16px] relative w-full">
          <CircleLoader />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start leading-[0] not-italic relative shrink-0 w-full" data-name="Header">
      <div className="basis-0 font-['Pretendard:Medium',_sans-serif] grow min-h-px min-w-px relative shrink-0 text-[#040415] text-[14px]">
        <p className="leading-[20px]">Clubs</p>
      </div>
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] relative shrink-0 text-[#3843ff] text-[10px] text-nowrap tracking-[1px] uppercase">
        <p className="leading-[16px] whitespace-pre">View All</p>
      </div>
    </div>
  );
}

function CircleLoader1() {
  return (
    <div className="relative shrink-0 size-9" data-name="Circle - Loader">
      <div className="absolute left-0 size-9 top-0">
        <img className="block max-w-none size-full" src={imgEllipse2} />
      </div>
      <div className="absolute left-0 size-9 top-0">
        <div className="absolute bottom-[47.22%] left-[47.22%] right-0 top-0">
          <img className="block max-w-none size-full" src={imgEllipse5} />
        </div>
      </div>
      <div className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic text-[12px] text-center text-nowrap text-white translate-x-[-50%]" style={{ top: "calc(50% - 8px)", left: "calc(50% + 0.5px)" }}>
        <p className="leading-[16px] whitespace-pre">%25</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 size-9" data-name="Icon">
      <CircleLoader1 />
      <div className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] left-1/2 not-italic text-[#040415] text-[14px] text-center text-nowrap translate-x-[-50%]" style={{ top: "calc(50% - 10px)" }}>
        <p className="leading-[20px] whitespace-pre">💧</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Drink the water</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">500/2000 ML</p>
      </div>
    </div>
  );
}

function Avatar1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-8px] place-items-start relative shrink-0" data-name="Avatar 1">
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-7" data-name="Mask">
        <img className="block max-w-none size-full" height="28" src={imgMask} width="28" />
      </div>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-8px] place-items-start relative shrink-0" data-name="Avatar 2">
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-7" data-name="Mask">
        <img className="block max-w-none size-full" height="28" src={imgMask1} width="28" />
      </div>
    </div>
  );
}

function Avatar3() {
  return (
    <div className="bg-[#ebecff] mr-[-8px] relative rounded-[24px] shrink-0 size-7" data-name="Avatar 3">
      <div className="box-border content-stretch flex flex-col gap-2 items-center justify-center overflow-clip px-0 py-1 relative size-7">
        <div className="flex flex-col font-['Airbnb_Cereal:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3843ff] text-[10px] text-nowrap tracking-[1px] uppercase">
          <p className="leading-[16px] whitespace-pre">+3</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Friends() {
  return (
    <div className="box-border content-stretch flex items-start justify-start pl-0 pr-2 py-0 relative shrink-0" data-name="Friends">
      <Avatar1 />
      <Avatar2 />
      <Avatar3 />
    </div>
  );
}

function AddButton() {
  return (
    <div className="relative shrink-0 size-9" data-name="Add Button">
      <img className="block max-w-none size-full" src={imgAddButton} />
    </div>
  );
}

function HabitCard() {
  return (
    <div className="bg-white opacity-0 relative rounded-[16px] shrink-0 w-full" data-name="Habit Card">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-3 items-center justify-start p-[16px] relative w-full">
          <Icon />
          <Text2 />
          <Friends />
          <AddButton />
        </div>
      </div>
    </div>
  );
}

function CircleLoader2() {
  return (
    <div className="relative shrink-0 size-9" data-name="Circle - Loader">
      <div className="absolute left-0 size-9 top-0">
        <img className="block max-w-none size-full" src={imgEllipse2} />
      </div>
      <div className="absolute left-0 size-9 top-0">
        <div className="absolute bottom-0 left-[47.22%] right-0 top-0">
          <img className="block max-w-none size-full" src={imgEllipse6} />
        </div>
      </div>
      <div className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic text-[12px] text-center text-nowrap text-white translate-x-[-50%]" style={{ top: "calc(50% - 8px)", left: "calc(50% + 0.5px)" }}>
        <p className="leading-[16px] whitespace-pre">%50</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 size-9" data-name="Icon">
      <CircleLoader2 />
      <div className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] left-1/2 not-italic text-[#040415] text-[14px] text-center text-nowrap translate-x-[-50%]" style={{ top: "calc(50% - 10px)" }}>
        <p className="leading-[20px] whitespace-pre">🚶‍♂️</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Walk</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">0/10000 STEPS</p>
      </div>
    </div>
  );
}

function Avatar4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid mr-[-8px] place-items-start relative shrink-0" data-name="Avatar 1">
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-7" data-name="Mask">
        <img className="block max-w-none size-full" height="28" src={imgMask} width="28" />
      </div>
    </div>
  );
}

function Avatar5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid mr-[-8px] place-items-start relative shrink-0" data-name="Avatar 2">
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-7" data-name="Mask">
        <img className="block max-w-none size-full" height="28" src={imgMask1} width="28" />
      </div>
    </div>
  );
}

function Friends1() {
  return (
    <div className="box-border content-stretch flex items-start justify-start leading-[0] pl-0 pr-2 py-0 relative shrink-0" data-name="Friends">
      <Avatar4 />
      <Avatar5 />
    </div>
  );
}

function AddButton1() {
  return (
    <div className="relative shrink-0 size-9" data-name="Add Button">
      <img className="block max-w-none size-full" src={imgAddButton} />
    </div>
  );
}

function HabitCard1() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Habit Card">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-3 items-center justify-start p-[16px] relative w-full">
          <Icon1 />
          <Text3 />
          <Friends1 />
          <AddButton1 />
        </div>
      </div>
    </div>
  );
}

function CircleLoader3() {
  return (
    <div className="relative shrink-0 size-9" data-name="Circle - Loader">
      <div className="absolute left-0 size-9 top-0">
        <img className="block max-w-none size-full" src={imgEllipse2} />
      </div>
      <div className="absolute left-0 size-9 top-0">
        <img className="block max-w-none size-full" src={imgEllipse7} />
      </div>
      <div className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] left-1/2 not-italic text-[12px] text-center text-nowrap text-white translate-x-[-50%]" style={{ top: "calc(50% - 8px)" }}>
        <p className="leading-[16px] whitespace-pre">%0</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 size-9" data-name="Icon">
      <CircleLoader3 />
      <div className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] left-1/2 not-italic text-[#040415] text-[14px] text-center text-nowrap translate-x-[-50%]" style={{ top: "calc(50% - 10px)" }}>
        <p className="leading-[20px] whitespace-pre">🌿</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Water Plants</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">0/1 TIMES</p>
      </div>
    </div>
  );
}

function AddButton2() {
  return (
    <div className="relative shrink-0 size-9" data-name="Add Button">
      <img className="block max-w-none size-full" src={imgAddButton} />
    </div>
  );
}

function HabitCard2() {
  return (
    <div className="bg-white opacity-0 relative rounded-[16px] shrink-0 w-full" data-name="Habit Card">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-3 items-center justify-start p-[16px] relative w-full">
          <Icon2 />
          <Text4 />
          <AddButton2 />
        </div>
      </div>
    </div>
  );
}

function CircleLoader4() {
  return (
    <div className="relative shrink-0 size-9" data-name="Circle - Loader">
      <img className="block max-w-none size-full" src={imgCircleLoader} />
    </div>
  );
}

function Icon3() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 size-9" data-name="Icon">
      <CircleLoader4 />
      <div className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] left-1/2 not-italic text-[#040415] text-[14px] text-center text-nowrap translate-x-[-50%]" style={{ top: "calc(50% - 10px)" }}>
        <p className="leading-[20px] whitespace-pre">🧘🏻‍♂️</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Meditate</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">30/30 MIN</p>
      </div>
    </div>
  );
}

function Avatar6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-8px] place-items-start relative shrink-0" data-name="Avatar 1">
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-7" data-name="Mask">
        <img className="block max-w-none size-full" height="28" src={imgMask} width="28" />
      </div>
    </div>
  );
}

function Friends2() {
  return (
    <div className="box-border content-stretch flex items-start justify-start pl-0 pr-2 py-0 relative shrink-0" data-name="Friends">
      <Avatar6 />
    </div>
  );
}

function DoneButton() {
  return (
    <div className="relative shrink-0 size-9" data-name="Done Button">
      <img className="block max-w-none size-full" src={imgDoneButton} />
    </div>
  );
}

function HabitCard3() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Habit Card">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-3 items-center justify-start p-[16px] relative w-full">
          <Icon3 />
          <Text5 />
          <Friends2 />
          <DoneButton />
        </div>
      </div>
    </div>
  );
}

function CircleLoader5() {
  return (
    <div className="relative shrink-0 size-9" data-name="Circle - Loader">
      <div className="absolute left-0 size-9 top-0">
        <img className="block max-w-none size-full" src={imgEllipse2} />
      </div>
      <div className="absolute left-0 size-9 top-0">
        <div className="absolute bottom-[47.22%] left-[47.22%] right-0 top-0">
          <img className="block max-w-none size-full" src={imgEllipse5} />
        </div>
      </div>
      <div className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic text-[12px] text-center text-nowrap text-white translate-x-[-50%]" style={{ top: "calc(50% - 8px)", left: "calc(50% + 0.5px)" }}>
        <p className="leading-[16px] whitespace-pre">%25</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 size-9" data-name="Icon">
      <CircleLoader5 />
      <div className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] left-1/2 not-italic text-[#040415] text-[14px] text-center text-nowrap translate-x-[-50%]" style={{ top: "calc(50% - 10px)" }}>
        <p className="leading-[20px] whitespace-pre">💧</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Drink the water</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">500/2000 ML</p>
      </div>
    </div>
  );
}

function Avatar7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-8px] place-items-start relative shrink-0" data-name="Avatar 1">
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-7" data-name="Mask">
        <img className="block max-w-none size-full" height="28" src={imgMask} width="28" />
      </div>
    </div>
  );
}

function Avatar8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-8px] place-items-start relative shrink-0" data-name="Avatar 2">
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-7" data-name="Mask">
        <img className="block max-w-none size-full" height="28" src={imgMask1} width="28" />
      </div>
    </div>
  );
}

function Avatar9() {
  return (
    <div className="bg-[#ebecff] mr-[-8px] relative rounded-[24px] shrink-0 size-7" data-name="Avatar 3">
      <div className="box-border content-stretch flex flex-col gap-2 items-center justify-center overflow-clip px-0 py-1 relative size-7">
        <div className="flex flex-col font-['Airbnb_Cereal:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3843ff] text-[10px] text-nowrap tracking-[1px] uppercase">
          <p className="leading-[16px] whitespace-pre">+3</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Friends3() {
  return (
    <div className="box-border content-stretch flex items-start justify-start pl-0 pr-2 py-0 relative shrink-0" data-name="Friends">
      <Avatar7 />
      <Avatar8 />
      <Avatar9 />
    </div>
  );
}

function AddButton3() {
  return (
    <div className="relative shrink-0 size-9" data-name="Add Button">
      <img className="block max-w-none size-full" src={imgAddButton} />
    </div>
  );
}

function HabitCard4() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-3 items-center justify-start left-[124px] p-[16px] rounded-[16px] top-6 w-[345px]" data-name="Habit Card">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <Icon4 />
      <Text6 />
      <Friends3 />
      <AddButton3 />
    </div>
  );
}

function IconsShow() {
  return (
    <div className="relative shrink-0 size-5" data-name="Icons/Show">
      <img className="block max-w-none size-full" src={imgIconsShow} />
    </div>
  );
}

function View() {
  return (
    <div className="content-stretch flex flex-col items-center justify-start relative shrink-0 w-8" data-name="View">
      <IconsShow />
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9b9ba1] text-[12px] text-center text-nowrap">
        <p className="leading-[16px] whitespace-pre">View</p>
      </div>
    </div>
  );
}

function IconsTickSquare1() {
  return (
    <div className="relative shrink-0 size-5" data-name="Icons/Tick Square">
      <img className="block max-w-none size-full" src={imgIconsTickSquare} />
    </div>
  );
}

function Done() {
  return (
    <div className="box-border content-stretch flex flex-col items-center justify-start px-1.5 py-0 relative shrink-0 w-8" data-name="Done">
      <IconsTickSquare1 />
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9b9ba1] text-[12px] text-center text-nowrap">
        <p className="leading-[16px] whitespace-pre">Done</p>
      </div>
    </div>
  );
}

function QuickActionsLeft() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-6 h-[68px] items-center justify-center left-0 px-4 py-3.5 rounded-[16px] top-6" data-name="Quick Actions Left">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <View />
      <Done />
      <div className="absolute flex h-[32px] items-center justify-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[0px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-8">
            <div className="absolute inset-[-0.3px_-0.94%]">
              <img className="block max-w-none size-full" src={imgLine1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconsClose() {
  return (
    <div className="relative shrink-0 size-5" data-name="Icons/Close">
      <img className="block max-w-none size-full" src={imgIconsClose} />
    </div>
  );
}

function Fail() {
  return (
    <div className="box-border content-stretch flex flex-col items-center justify-start px-1.5 py-0 relative shrink-0 w-8" data-name="Fail">
      <IconsClose />
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9b9ba1] text-[12px] text-center text-nowrap">
        <p className="leading-[16px] whitespace-pre">Fail</p>
      </div>
    </div>
  );
}

function IconsArrowRight2() {
  return (
    <div className="relative shrink-0 size-5" data-name="Icons/Arrow - Right 2">
      <img className="block max-w-none size-full" src={imgIconsArrowRight2} />
    </div>
  );
}

function Skip() {
  return (
    <div className="content-stretch flex flex-col items-center justify-start relative shrink-0 w-7" data-name="Skip">
      <IconsArrowRight2 />
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9b9ba1] text-[12px] text-center text-nowrap">
        <p className="leading-[16px] whitespace-pre">Skip</p>
      </div>
    </div>
  );
}

function QuickActionsRight() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-6 h-[68px] items-center justify-center px-4 py-3.5 right-0 rounded-[16px] top-[168px]" data-name="Quick Actions Right">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <Fail />
      <Skip />
      <div className="absolute flex h-[32px] items-center justify-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[0px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-8">
            <div className="absolute inset-[-0.3px_-0.94%]">
              <img className="block max-w-none size-full" src={imgLine1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircleLoader6() {
  return (
    <div className="relative shrink-0 size-9" data-name="Circle - Loader">
      <div className="absolute left-0 size-9 top-0">
        <img className="block max-w-none size-full" src={imgEllipse2} />
      </div>
      <div className="absolute left-0 size-9 top-0">
        <img className="block max-w-none size-full" src={imgEllipse7} />
      </div>
      <div className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] left-1/2 not-italic text-[12px] text-center text-nowrap text-white translate-x-[-50%]" style={{ top: "calc(50% - 8px)" }}>
        <p className="leading-[16px] whitespace-pre">%0</p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 size-9" data-name="Icon">
      <CircleLoader6 />
      <div className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] left-1/2 not-italic text-[#040415] text-[14px] text-center text-nowrap translate-x-[-50%]" style={{ top: "calc(50% - 10px)" }}>
        <p className="leading-[20px] whitespace-pre">🌿</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Water Plants</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">0/1 TIMES</p>
      </div>
    </div>
  );
}

function AddButton4() {
  return (
    <div className="relative shrink-0 size-9" data-name="Add Button">
      <img className="block max-w-none size-full" src={imgAddButton} />
    </div>
  );
}

function HabitCard5() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-3 items-center justify-start left-[-124px] p-[16px] rounded-[16px] top-[168px] w-[345px]" data-name="Habit Card">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <Icon5 />
      <Text7 />
      <AddButton4 />
    </div>
  );
}

function Tasks() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0 w-full" data-name="Tasks">
      <Header1 />
      <HabitCard />
      <HabitCard1 />
      <HabitCard2 />
      <HabitCard3 />
      <HabitCard4 />
      <QuickActionsLeft />
      <QuickActionsRight />
      <HabitCard5 />
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start px-6 py-0 relative w-full">
          <Calendar />
          <InfoBox />
          <Tasks />
        </div>
      </div>
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
    <div className="absolute bg-white left-4 rounded-[64px] top-[755px] w-[360px]" data-name="App Bar">
      <div className="box-border content-stretch flex gap-10 items-start justify-start overflow-clip px-6 py-5 relative w-[360px]">
        <Buttons />
        <IconsPlusCrFr />
      </div>
      <div aria-hidden="true" className="absolute border-[#cdcdd0] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[64px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
    </div>
  );
}

export default function HabitsQuickActions() {
  return (
    <div className="bg-[#f6f9ff] content-stretch flex flex-col gap-3 items-center justify-start overflow-clip relative rounded-[48px] size-full" data-name="Habits: Quick Actions">
      <Header />
      <Content />
      <HomeIndicator />
      <AppBar />
    </div>
  );
}