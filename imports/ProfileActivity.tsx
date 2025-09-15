import imgBase from "figma:asset/94b99e3c70ec8d54efaf382f16c03a0495603999.png";
import { imgSignalWifiBattery, imgRightIcon, imgIconsMedal, imgFilter, imgAddButton, imgAddButton1, imgAddButton2, img1stButton, img2ndButton, img3rdButton, img4thButton, imgIconsPlusCrFr } from "./svg-akxmh";

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
        <p className="leading-[32px]">Your Profile</p>
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
        <p className="leading-[20px] whitespace-pre">1452 Points</p>
      </div>
    </div>
  );
}

function Frame2608647() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0">
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#040415] text-[18px] text-center text-nowrap">
        <p className="leading-[24px] whitespace-pre">Mert Kahveci</p>
      </div>
      <StatusBadge />
    </div>
  );
}

function Profile() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-full" data-name="Profile">
      <div className="bg-center bg-cover bg-no-repeat rounded-[56px] shrink-0 size-14" data-name="Base" style={{ backgroundImage: `url('${imgBase}')` }} />
      <Frame2608647 />
    </div>
  );
}

function Component1stTab() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)] shrink-0" data-name="1st Tab">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-2.5 items-center justify-center px-4 py-1 relative w-full">
          <div className="bg-clip-text flex flex-col font-['Pretendard:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap" style={{ WebkitTextFillColor: "transparent" }}>
            <p className="leading-[20px] whitespace-pre">Activity</p>
          </div>
        </div>
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
            <p className="leading-[20px] whitespace-pre">Friends</p>
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
            <p className="leading-[20px] whitespace-pre">Achievements</p>
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

function Header() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-3 items-center justify-start pb-4 pt-0 px-6 relative shrink-0 w-[393px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <StatusBar />
      <HeaderType1 />
      <Profile />
      <SegmentControl />
    </div>
  );
}

function Filter() {
  return (
    <div className="relative shrink-0 size-9" data-name="Filter">
      <img className="block max-w-none size-full" src={imgFilter} />
    </div>
  );
}

function Bar() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-full" data-name="Bar">
      <div className="basis-0 font-['Pretendard:Medium',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#040415] text-[14px]">
        <p className="leading-[20px]">Showing last month activity</p>
      </div>
      <Filter />
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">112 points earned!</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">Today, 12:34 PM</p>
      </div>
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
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Habit Card">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-3 items-center justify-start p-[16px] relative w-full">
          <Text />
          <AddButton />
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">62 points earned!</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">Today, 07:12 AM</p>
      </div>
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
          <Text1 />
          <AddButton1 />
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Challenge completed!</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">Yesterday, 14:12 PM</p>
      </div>
    </div>
  );
}

function AddButton2() {
  return (
    <div className="relative shrink-0 size-9" data-name="Add Button">
      <img className="block max-w-none size-full" src={imgAddButton1} />
    </div>
  );
}

function HabitCard2() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Habit Card">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-3 items-center justify-start p-[16px] relative w-full">
          <Text2 />
          <AddButton2 />
        </div>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">Weekly winning streak is broken!</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">12 Jun, 16:14 PM</p>
      </div>
    </div>
  );
}

function AddButton3() {
  return (
    <div className="relative shrink-0 size-9" data-name="Add Button">
      <img className="block max-w-none size-full" src={imgAddButton2} />
    </div>
  );
}

function HabitCard3() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Habit Card">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-3 items-center justify-start p-[16px] relative w-full">
          <Text3 />
          <AddButton3 />
        </div>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">96 points earned!</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">11 Jun, 17:45 PM</p>
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

function HabitCard4() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Habit Card">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-3 items-center justify-start p-[16px] relative w-full">
          <Text4 />
          <AddButton4 />
        </div>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-name="Text">
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[14px] w-full">
        <p className="leading-[20px]">110 points earned!</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[12px] w-full">
        <p className="leading-[16px]">10 Jun, 18:32 PM</p>
      </div>
    </div>
  );
}

function AddButton5() {
  return (
    <div className="relative shrink-0 size-9" data-name="Add Button">
      <img className="block max-w-none size-full" src={imgAddButton} />
    </div>
  );
}

function HabitCard5() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Habit Card">
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-3 items-center justify-start p-[16px] relative w-full">
          <Text5 />
          <AddButton5 />
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start px-6 py-0 relative shrink-0 w-[393px]" data-name="Body">
      <Bar />
      <HabitCard />
      <HabitCard1 />
      <HabitCard2 />
      <HabitCard3 />
      <HabitCard4 />
      {[...Array(3).keys()].map((_, i) => (
        <HabitCard5 key={i} />
      ))}
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

function HomeIndicator() {
  return (
    <div className="absolute bottom-0 box-border content-stretch flex flex-col gap-2 items-start justify-start left-0.5 px-32 py-2" data-name="Home Indicator">
      <div className="bg-black h-[5px] rounded-[100px] shrink-0 w-[134px]" data-name="Home Indicator" />
    </div>
  );
}

export default function ProfileActivity() {
  return (
    <div className="bg-[#f6f9ff] overflow-clip relative rounded-[48px] size-full" data-name="Profile - Activity">
      <Content />
      <AppBar />
      <HomeIndicator />
    </div>
  );
}