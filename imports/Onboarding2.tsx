import Image from "next/image";
import {
  imgCircles,
  imgGradient,
  imgGradient1,
  imgPagination,
  imgIconsLogin,
  imgSignalWifiBattery,
  imgIconsTimeCircle,
  imgEllipse1,
  imgEllipse4,
  imgAddButton,
  imgEllipse5,
  imgCircleLoader,
  imgDoneButton,
} from "./svg-t3yvo";

const imgMask = "/8e8d8f782f7862ccf87fe1b3cba709f38b8f48e4.webp";
const imgMask1 = "/7beb1cfa9dabb543a58b107fae5fdb0f6849c196.webp";
const imgMask2 = "/732f1948dc788357b9292005561ccfc26bc46a8e.webp";
const imgMask3 = "/0ebd91327b8e40b78df0fa39350ed1461e68fe03.webp";

function Circles() {
  return (
    <div
      className="absolute bottom-[189px] size-[474px] translate-x-[-50%]"
      data-name="Circles"
      style={{ left: "calc(50% + 0.5px)" }}
    >
      <Image
        className="block max-w-none size-full"
        src={imgCircles}
        alt="Background circles"
        width={474}
        height={474}
      />
    </div>
  );
}

function Background() {
  return (
    <div
      className="absolute contents left-[-280px] top-[-117px]"
      data-name="Background"
    >
      <Circles />
      <div
        className="absolute mix-blend-overlay right-[43px] size-[630px] top-[-117px]"
        data-name="gradient"
      >
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
      <div
        className="absolute mix-blend-overlay right-[-186px] size-[630px] top-[364px]"
        data-name="gradient"
      >
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
    </div>
  );
}

function Titles() {
  return (
    <div
      className="content-stretch flex flex-col gap-2 items-start justify-start leading-[0] not-italic relative shrink-0"
      data-name="Titles"
    >
      <div className="font-['Airbnb_Cereal:Bold',_sans-serif] leading-[48px] relative shrink-0 text-[40px] text-white tracking-[-1px] w-[343px]">
        <p className="mb-0">Track</p>
        <p>Your Progress</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[20px] relative shrink-0 text-[#d7d9ff] text-[14px] w-[343px]">
        <p className="mb-0">Everyday you become one step closer to</p>
        <p>your goal. Don’t give up!</p>
      </div>
    </div>
  );
}

function Pagination() {
  return (
    <div className="h-2 relative shrink-0 w-14" data-name="Pagination">
      <Image
        className="block max-w-none size-full"
        src={imgPagination}
        alt="Pagination dots"
        width={56}
        height={8}
      />
    </div>
  );
}

function Top() {
  return (
    <div
      className="content-stretch flex flex-col gap-8 items-start justify-start relative shrink-0 w-full"
      data-name="Top"
    >
      <Titles />
      <Pagination />
    </div>
  );
}

function IconsLogin() {
  return (
    <div className="relative shrink-0 size-5" data-name="Icons/Login">
      <Image
        className="block max-w-none size-full"
        src={imgIconsLogin}
        alt="Login icon"
        width={20}
        height={20}
      />
    </div>
  );
}

function EMail() {
  return (
    <div
      className="bg-white box-border content-stretch flex gap-1 items-center justify-center px-5 py-4 relative rounded-[40px] shadow-[0px_12px_24px_0px_rgba(35,44,93,0.06)] shrink-0 w-[345px]"
      data-name="E-mail"
    >
      <IconsLogin />
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#040415] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">Continue with Wallet</p>
      </div>
    </div>
  );
}

function SocialLogin() {
  return <div className="h-9 shrink-0 w-full" data-name="Social Login" />;
}

function Buttons() {
  return (
    <div
      className="content-stretch flex flex-col gap-3 items-start justify-start relative shrink-0 w-full"
      data-name="Buttons"
    >
      <EMail />
      <SocialLogin />
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#afb4ff] text-[12px] text-center w-[345px]">
        <p className="leading-[16px]">{`By continuing you agree Terms of Services & Privacy Policy `}</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div
      className="absolute bottom-16 box-border content-stretch flex flex-col gap-12 items-start justify-start left-1/2 px-6 py-0 translate-x-[-50%] w-[391px]"
      data-name="Content"
    >
      <Top />
      <Buttons />
    </div>
  );
}

function StatusBarTime() {
  return (
    <div
      className="h-[21px] relative rounded-[24px] shrink-0 w-[54px]"
      data-name="_StatusBar-time"
    >
      <div className="absolute font-['SF_Pro_Text:Semibold',_sans-serif] h-5 leading-[0] left-[27px] not-italic text-[16px] text-center text-white top-px tracking-[-0.32px] translate-x-[-50%] w-[54px]">
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
      className="absolute content-stretch flex h-[59px] items-end justify-center left-0 top-0 w-[393px]"
      data-name="Status Bar"
    >
      <LeftSide />
      <DynamicIsland />
      <RightSide />
    </div>
  );
}

function HomeIndicator() {
  return (
    <div
      className="absolute bottom-0 h-[34px] left-0.5 w-[390px]"
      data-name="Home Indicator"
    >
      <div
        className="absolute bg-white bottom-2 h-[5px] left-1/2 rounded-[100px] translate-x-[-50%] w-[134px]"
        data-name="Home Indicator"
      />
    </div>
  );
}

function IconsTimeCircle() {
  return (
    <div
      className="relative shrink-0 size-[21.028px]"
      data-name="Icons/Time Circle"
    >
      <Image
        className="block max-w-none size-full"
        src={imgIconsTimeCircle}
        alt="Time circle icon"
        width={21}
        height={21}
      />
    </div>
  );
}

function Text() {
  return (
    <div
      className="basis-0 content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0"
      data-name="Text"
    >
      <div className="font-['Airbnb_Cereal:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[12.266px] w-full">
        <p className="leading-[17.523px]">Best Runners! 🏃🏻‍</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[10.514px] w-full">
        <p className="leading-[14.018px]">5 days 13 hours left</p>
      </div>
    </div>
  );
}

function Member() {
  return (
    <div
      className="box-border content-stretch flex items-start justify-start pl-0 pr-[7.009px] py-0 relative shrink-0"
      data-name="Member"
    >
      <div
        className="h-[17.366px] mr-[-7.009px] relative shrink-0 w-[17.681px]"
        data-name="Mask"
      >
        <Image
          className="block max-w-none size-full"
          height={17}
          src={imgMask}
          width={18}
          alt="User avatar"
        />
      </div>
      <div
        className="h-[17.366px] mr-[-7.009px] relative shrink-0 w-[17.681px]"
        data-name="Mask"
      >
        <Image
          className="block max-w-none size-full"
          height={17}
          src={imgMask1}
          width={18}
          alt="User avatar"
        />
      </div>
    </div>
  );
}

function Friends() {
  return (
    <div
      className="content-stretch flex flex-col h-full items-end justify-center relative shrink-0"
      data-name="Friends"
    >
      <Member />
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9b9ba1] text-[10.514px] text-nowrap text-right">
        <p className="leading-[14.018px] whitespace-pre">2 friends joined</p>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div
      className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-full"
      data-name="Content"
    >
      <IconsTimeCircle />
      <Text />
      <div className="flex flex-row items-center self-stretch">
        <Friends />
      </div>
    </div>
  );
}

function ProgressBar() {
  return (
    <div
      className="content-stretch flex flex-col h-[3.473px] items-start justify-start relative shrink-0 w-full"
      data-name="Progress Bar"
    >
      <div
        className="bg-[#eaecf0] h-[3.473px] rounded-[7.009px] shrink-0 w-full"
        data-name="BG"
      />
      <div
        className="absolute bg-[#3843ff] h-[3.473px] left-0 rounded-[7.009px] top-0 w-[63.652px]"
        data-name="Progress"
      />
    </div>
  );
}

function Card() {
  return (
    <div
      className="bg-white relative rounded-[14.018px] shrink-0 w-full"
      data-name="Card"
    >
      <div
        aria-hidden="true"
        className="absolute border-[#eaecf0] border-[0.876px] border-solid inset-0 pointer-events-none rounded-[14.018px]"
      />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start px-3.5 py-2.5 relative w-full">
          <Content1 />
          <ProgressBar />
        </div>
      </div>
    </div>
  );
}

function CircleLoader() {
  return (
    <div
      className="relative shrink-0 size-[31.542px]"
      data-name="Circle - Loader"
    >
      <div className="absolute left-0 size-[31.542px] top-0">
        <img className="block max-w-none size-full" src={imgEllipse1} />
      </div>
      <div className="absolute left-0 size-[31.542px] top-0">
        <div className="absolute bottom-[47.22%] left-[47.22%] right-0 top-0">
          <img className="block max-w-none size-full" src={imgEllipse4} />
        </div>
      </div>
      <div
        className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic text-[10.514px] text-center text-nowrap text-white translate-x-[-50%]"
        style={{ top: "calc(50% - 7.009px)", left: "calc(50% + 0.362px)" }}
      >
        <p className="leading-[14.018px] whitespace-pre">%25</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div
      className="content-stretch flex items-center justify-start relative shrink-0 size-[31.542px]"
      data-name="Icon"
    >
      <CircleLoader />
      <div
        className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic text-[#040415] text-[12.266px] text-center text-nowrap translate-x-[-50%]"
        style={{ top: "calc(50% - 8.762px)", left: "calc(50% + 0.367px)" }}
      >
        <p className="leading-[17.523px] whitespace-pre">💧</p>
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
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[12.266px] w-full">
        <p className="leading-[17.523px]">Drink the water</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[10.514px] w-full">
        <p className="leading-[14.018px]">500/2000 ML</p>
      </div>
    </div>
  );
}

function Avatar1() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-7.009px] place-items-start relative shrink-0"
      data-name="Avatar 1"
    >
      <div
        className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24.532px]"
        data-name="Mask"
      >
        <img
          className="block max-w-none size-full"
          height="24.532"
          src={imgMask2}
          width="24.532"
        />
      </div>
    </div>
  );
}

function Avatar2() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-7.009px] place-items-start relative shrink-0"
      data-name="Avatar 2"
    >
      <div
        className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24.532px]"
        data-name="Mask"
      >
        <img
          className="block max-w-none size-full"
          height="24.532"
          src={imgMask3}
          width="24.532"
        />
      </div>
    </div>
  );
}

function Avatar3() {
  return (
    <div
      className="bg-[#ebecff] mr-[-7.009px] relative rounded-[21.028px] shrink-0 size-[24.532px]"
      data-name="Avatar 3"
    >
      <div className="box-border content-stretch flex flex-col gap-[7.009px] items-center justify-center overflow-clip px-0 py-[3.505px] relative size-[24.532px]">
        <div className="flex flex-col font-['Airbnb_Cereal:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3843ff] text-[8.762px] text-nowrap tracking-[0.8762px] uppercase">
          <p className="leading-[14.018px] whitespace-pre">+3</p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[0.876px] border-solid border-white inset-0 pointer-events-none rounded-[21.028px]"
      />
    </div>
  );
}

function Friends1() {
  return (
    <div
      className="box-border content-stretch flex items-start justify-start pl-0 pr-[7.009px] py-0 relative shrink-0"
      data-name="Friends"
    >
      <Avatar1 />
      <Avatar2 />
      <Avatar3 />
    </div>
  );
}

function AddButton() {
  return (
    <div className="relative shrink-0 size-[31.542px]" data-name="Add Button">
      <img className="block max-w-none size-full" src={imgAddButton} />
    </div>
  );
}

function HabitCard() {
  return (
    <div
      className="bg-white relative rounded-[14.018px] shrink-0 w-full"
      data-name="Habit Card"
    >
      <div
        aria-hidden="true"
        className="absolute border-[#eaecf0] border-[0.876px] border-solid inset-0 pointer-events-none rounded-[14.018px] shadow-[50.817px_22.78px_59.579px_0px_rgba(35,44,93,0.06)]"
      />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[10.514px] items-center justify-start p-[14.018px] relative w-full">
          <Icon />
          <Text1 />
          <Friends1 />
          <AddButton />
        </div>
      </div>
    </div>
  );
}

function CircleLoader1() {
  return (
    <div
      className="relative shrink-0 size-[31.542px]"
      data-name="Circle - Loader"
    >
      <div className="absolute left-0 size-[31.542px] top-0">
        <img className="block max-w-none size-full" src={imgEllipse1} />
      </div>
      <div className="absolute left-0 size-[31.542px] top-0">
        <div className="absolute bottom-0 left-[47.22%] right-0 top-0">
          <img className="block max-w-none size-full" src={imgEllipse5} />
        </div>
      </div>
      <div
        className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic text-[10.514px] text-center text-nowrap text-white translate-x-[-50%]"
        style={{ top: "calc(50% - 7.009px)", left: "calc(50% + 0.362px)" }}
      >
        <p className="leading-[14.018px] whitespace-pre">%50</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div
      className="content-stretch flex items-center justify-start relative shrink-0 size-[31.542px]"
      data-name="Icon"
    >
      <CircleLoader1 />
      <div
        className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic text-[#040415] text-[12.266px] text-center text-nowrap translate-x-[-50%]"
        style={{ top: "calc(50% - 8.762px)", left: "calc(50% + 0.367px)" }}
      >
        <p className="leading-[17.523px] whitespace-pre">🚶‍♂️</p>
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
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[12.266px] w-full">
        <p className="leading-[17.523px]">Walk</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[10.514px] w-full">
        <p className="leading-[14.018px]">0/10000 STEPS</p>
      </div>
    </div>
  );
}

function Avatar4() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid mr-[-7.009px] place-items-start relative shrink-0"
      data-name="Avatar 1"
    >
      <div
        className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24.532px]"
        data-name="Mask"
      >
        <img
          className="block max-w-none size-full"
          height="24.532"
          src={imgMask2}
          width="24.532"
        />
      </div>
    </div>
  );
}

function Avatar5() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid mr-[-7.009px] place-items-start relative shrink-0"
      data-name="Avatar 2"
    >
      <div
        className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24.532px]"
        data-name="Mask"
      >
        <img
          className="block max-w-none size-full"
          height="24.532"
          src={imgMask3}
          width="24.532"
        />
      </div>
    </div>
  );
}

function Friends2() {
  return (
    <div
      className="box-border content-stretch flex items-start justify-start leading-[0] pl-0 pr-[7.009px] py-0 relative shrink-0"
      data-name="Friends"
    >
      <Avatar4 />
      <Avatar5 />
    </div>
  );
}

function AddButton1() {
  return (
    <div className="relative shrink-0 size-[31.542px]" data-name="Add Button">
      <img className="block max-w-none size-full" src={imgAddButton} />
    </div>
  );
}

function HabitCard1() {
  return (
    <div
      className="bg-white relative rounded-[14.018px] shrink-0 w-full"
      data-name="Habit Card"
    >
      <div
        aria-hidden="true"
        className="absolute border-[#eaecf0] border-[0.876px] border-solid inset-0 pointer-events-none rounded-[14.018px] shadow-[50.817px_22.78px_59.579px_0px_rgba(35,44,93,0.06)]"
      />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[10.514px] items-center justify-start p-[14.018px] relative w-full">
          <Icon1 />
          <Text2 />
          <Friends2 />
          <AddButton1 />
        </div>
      </div>
    </div>
  );
}

function CircleLoader2() {
  return (
    <div
      className="relative shrink-0 size-[31.542px]"
      data-name="Circle - Loader"
    >
      <img className="block max-w-none size-full" src={imgCircleLoader} />
    </div>
  );
}

function Icon2() {
  return (
    <div
      className="content-stretch flex items-center justify-start relative shrink-0 size-[31.542px]"
      data-name="Icon"
    >
      <CircleLoader2 />
      <div
        className="absolute font-['Airbnb_Cereal:Book',_sans-serif] leading-[0] not-italic text-[#040415] text-[12.266px] text-center text-nowrap translate-x-[-50%]"
        style={{ top: "calc(50% - 8.762px)", left: "calc(50% + 0.367px)" }}
      >
        <p className="leading-[17.523px] whitespace-pre">🧘🏻‍♂️</p>
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
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#040415] text-[12.266px] w-full">
        <p className="leading-[17.523px]">Meditate</p>
      </div>
      <div className="font-['Airbnb_Cereal:Book',_sans-serif] relative shrink-0 text-[#9b9ba1] text-[10.514px] w-full">
        <p className="leading-[14.018px]">30/30 MIN</p>
      </div>
    </div>
  );
}

function Avatar6() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-7.009px] place-items-start relative shrink-0"
      data-name="Avatar 1"
    >
      <div
        className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24.532px]"
        data-name="Mask"
      >
        <img
          className="block max-w-none size-full"
          height="24.532"
          src={imgMask2}
          width="24.532"
        />
      </div>
    </div>
  );
}

function Friends3() {
  return (
    <div
      className="box-border content-stretch flex items-start justify-start pl-0 pr-[7.009px] py-0 relative shrink-0"
      data-name="Friends"
    >
      <Avatar6 />
    </div>
  );
}

function DoneButton() {
  return (
    <div className="relative shrink-0 size-[31.542px]" data-name="Done Button">
      <img className="block max-w-none size-full" src={imgDoneButton} />
    </div>
  );
}

function HabitCard2() {
  return (
    <div
      className="bg-white relative rounded-[14.018px] shrink-0 w-full"
      data-name="Habit Card"
    >
      <div
        aria-hidden="true"
        className="absolute border-[#eaecf0] border-[0.876px] border-solid inset-0 pointer-events-none rounded-[14.018px] shadow-[50.817px_22.78px_59.579px_0px_rgba(35,44,93,0.06)]"
      />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[10.514px] items-center justify-start p-[14.018px] relative w-full">
          <Icon2 />
          <Text3 />
          <Friends3 />
          <DoneButton />
        </div>
      </div>
    </div>
  );
}

function Illustration() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[3.505px] h-[301.144px] items-start justify-start left-1/2 top-[93px] translate-x-[-50%] w-[343px]"
      data-name="Illustration"
    >
      <div className="font-['Airbnb_Cereal:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12.266px] text-white w-[343px]">
        <p className="leading-[17.523px]">Challenges</p>
      </div>
      <Card />
      <div className="font-['Airbnb_Cereal:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12.266px] text-white w-[343px]">
        <p className="leading-[17.523px]">Habits</p>
      </div>
      <HabitCard />
      <HabitCard1 />
      <HabitCard2 />
    </div>
  );
}

export default function Onboarding2() {
  return (
    <div
      className="overflow-clip relative rounded-[48px] size-full"
      data-name="Onboarding - 2"
    >
      <Background />
      <Content />
      <StatusBar />
      <HomeIndicator />
      <Illustration />
    </div>
  );
}
