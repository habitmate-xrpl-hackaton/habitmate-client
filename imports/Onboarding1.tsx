import Image from "next/image";
import {
  imgCircles,
  imgGradient,
  imgGradient1,
  imgPagination,
  imgIconsLogin,
  imgIconsApple,
  imgIconsGoogle,
  imgFacebookLogo20191,
  imgSignalWifiBattery,
  imgDots,
  imgMask,
  imgPhilipMartin5AGUyCwPJwUnsplash1,
  imgMask1,
  img396Mckinsey21A0488Jir2,
  imgMask2,
  img383Ted0689Teddy1,
  imgChatPopup,
} from "./svg-hbl5y";

const imgPhilipMartin5AGUyCwPJwUnsplash =
  "/b31631e939e50c6f7611bbf0d62f903bb5f0541f.webp";
const img396Mckinsey21A0488Jir1 =
  "/e7e751779218574c981d2a54f3dabdf271a0b048.webp";
const img383Ted0689Teddy = "/93bc49a934805b8c452e0c94e5a80ea6b0e71b51.webp";

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
        <p className="mb-0">Create</p>
        <p>Good Habits</p>
      </div>
      <div className="font-['Pretendard:Medium',_sans-serif] relative shrink-0 text-[#d7d9ff] text-[14px] w-[343px]">
        <p className="leading-[20px]">
          Change your life by slowly adding new healty habits and sticking to
          them.
        </p>
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
        <p className="leading-[20px] whitespace-pre">Continue with E-mail</p>
      </div>
    </div>
  );
}

function IconsApple() {
  return (
    <div className="relative shrink-0 size-5" data-name="Icons/Apple">
      <Image
        className="block max-w-none size-full"
        src={imgIconsApple}
        alt="Apple icon"
        width={20}
        height={20}
      />
    </div>
  );
}

function Apple() {
  return (
    <div
      className="bg-white box-border content-stretch flex gap-1 items-center justify-center px-4 py-2 relative rounded-[40px] shadow-[0px_12px_24px_0px_rgba(35,44,93,0.06)] shrink-0"
      data-name="Apple"
    >
      <IconsApple />
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#040415] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">Apple</p>
      </div>
    </div>
  );
}

function IconsGoogle() {
  return (
    <div className="relative shrink-0 size-5" data-name="Icons/Google">
      <Image
        className="block max-w-none size-full"
        src={imgIconsGoogle}
        alt="Google icon"
        width={20}
        height={20}
      />
    </div>
  );
}

function Google() {
  return (
    <div
      className="bg-white box-border content-stretch flex gap-1 items-center justify-center px-4 py-2 relative rounded-[40px] shadow-[0px_12px_24px_0px_rgba(35,44,93,0.06)] shrink-0"
      data-name="Google"
    >
      <IconsGoogle />
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#040415] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">Google</p>
      </div>
    </div>
  );
}

function FacebookLogo20191() {
  return (
    <div className="relative shrink-0 size-5" data-name="facebook-logo-2019 1">
      <Image
        className="block max-w-none size-full"
        src={imgFacebookLogo20191}
        alt="Facebook logo"
        width={20}
        height={20}
      />
    </div>
  );
}

function Facebook() {
  return (
    <div
      className="bg-white box-border content-stretch flex gap-1 items-center justify-center px-4 py-2 relative rounded-[40px] shadow-[0px_12px_24px_0px_rgba(35,44,93,0.06)] shrink-0"
      data-name="Facebook"
    >
      <FacebookLogo20191 />
      <div className="font-['Pretendard:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#040415] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">Facebook</p>
      </div>
    </div>
  );
}

function SocialLogin() {
  return (
    <div
      className="content-stretch flex items-start justify-between relative shrink-0 w-full"
      data-name="Social Login"
    >
      <Apple />
      <Google />
      <Facebook />
    </div>
  );
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

function Dots() {
  return (
    <div
      className="absolute h-20 left-[62px] top-[88px] w-[77px]"
      data-name="Dots"
    >
      <Image
        className="block max-w-none size-full"
        src={imgDots}
        alt="Dots decoration"
        width={77}
        height={80}
      />
    </div>
  );
}

function Avatar02() {
  return (
    <div
      className="absolute contents inset-[67.95%_41.14%_-0.59%_27.43%]"
      data-name="Avatar 02"
    >
      <div
        className="absolute inset-[67.95%_41.14%_-0.59%_27.43%]"
        data-name="Mask"
      >
        <Image
          className="block max-w-none size-full"
          src={imgMask}
          alt="User avatar"
          width={110}
          height={110}
        />
      </div>
      <div
        className="absolute bg-no-repeat bg-size-[100%_100%] bg-top-left inset-[67.02%_37.79%_-5.26%_25.41%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[7.066px_3.143px] mask-size-[110px_110px]"
        data-name="philip-martin-5aGUyCW_PJw-unsplash"
        style={{
          backgroundImage: `url('${imgPhilipMartin5AGUyCwPJwUnsplash}')`,
          maskImage: `url('${imgPhilipMartin5AGUyCwPJwUnsplash1}')`,
        }}
      />
    </div>
  );
}

function Avatar01() {
  return (
    <div
      className="absolute contents inset-[39.02%_74.86%_37.24%_2.29%]"
      data-name="Avatar 01"
    >
      <div
        className="absolute inset-[39.02%_74.86%_37.24%_2.29%]"
        data-name="Mask"
      >
        <Image
          className="block max-w-none size-full"
          src={imgMask1}
          alt="User avatar"
          width={80}
          height={80}
        />
      </div>
      <div
        className="absolute bg-no-repeat bg-size-[100%_100%] bg-top-left inset-[36.35%_59.86%_12.31%_-9.29%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[40.5px_9px] mask-size-[80px_80px]"
        data-name="396-mckinsey-21a0488-jir_1"
        style={{
          backgroundImage: `url('${img396Mckinsey21A0488Jir1}')`,
          maskImage: `url('${img396Mckinsey21A0488Jir2}')`,
        }}
      />
    </div>
  );
}

function Avatar03() {
  return (
    <div
      className="absolute contents inset-[14.84%_12%_66.17%_69.71%]"
      data-name="Avatar 03"
    >
      <div
        className="absolute inset-[14.84%_12%_66.17%_69.71%]"
        data-name="Mask"
      >
        <Image
          className="block max-w-none size-full"
          src={imgMask2}
          alt="User avatar"
          width={64}
          height={64}
        />
      </div>
      <div
        className="absolute bg-no-repeat bg-size-[100%_100%] bg-top-left inset-[9.87%_10.43%_57.2%_68.43%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[4.5px_16.75px] mask-size-[64px_64px]"
        data-name="383-ted0689-teddy"
        style={{
          backgroundImage: `url('${img383Ted0689Teddy}')`,
          maskImage: `url('${img383Ted0689Teddy1}')`,
        }}
      />
    </div>
  );
}

function ChatPopup() {
  return (
    <div
      className="absolute h-10 left-[178px] top-[221px] w-[140px]"
      data-name="chat popup"
    >
      <div className="absolute inset-[-105%_-90%_-235%_-7.14%]">
        <img className="block max-w-none size-full" src={imgChatPopup} />
      </div>
    </div>
  );
}

function ChatPopup1() {
  return (
    <div
      className="absolute h-10 left-[146px] top-6 w-[140px]"
      data-name="chat popup"
    >
      <div className="absolute inset-[-105%_-90%_-235%_-7.14%]">
        <img className="block max-w-none size-full" src={imgChatPopup} />
      </div>
    </div>
  );
}

function ChatPopup2() {
  return (
    <div
      className="absolute h-10 left-[60px] top-[131px] w-[140px]"
      data-name="chat popup"
    >
      <div className="absolute inset-[-105%_-90%_-235%_-7.14%]">
        <img className="block max-w-none size-full" src={imgChatPopup} />
      </div>
    </div>
  );
}

function Illustration() {
  return (
    <div
      className="absolute h-[337px] left-9 top-[75px] w-[350px]"
      data-name="Illustration"
    >
      <Avatar02 />
      <Avatar01 />
      <Avatar03 />
      <ChatPopup />
      <ChatPopup1 />
      <ChatPopup2 />
    </div>
  );
}

export default function Onboarding1() {
  return (
    <div
      className="overflow-clip relative rounded-[48px] size-full"
      data-name="Onboarding - 1"
    >
      <Background />
      <Content />
      <StatusBar />
      <HomeIndicator />
      <Dots />
      <Illustration />
    </div>
  );
}
