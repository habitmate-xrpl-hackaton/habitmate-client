import imgIPadPro from "figma:asset/56ff09fb1b8128670eae01169be6c5e9fe8ec530.png";
import imgScreen from "figma:asset/6a941314feafedbbbee844a8a750039ae251e9a0.png";

function IPadPro() {
  return (
    <div className="absolute contents left-[215px] top-[426px]" data-name="iPad Pro">
      <div className="absolute flex h-[742px] items-center justify-center left-[215px] top-[426px] w-[970px]">
        <div className="flex-none rotate-[270deg] scale-y-[-100%]">
          <div className="bg-center bg-cover bg-no-repeat h-[970px] w-[742px]" data-name="iPad Pro" style={{ backgroundImage: `url('${imgIPadPro}')` }} />
        </div>
      </div>
      <div className="absolute bg-center bg-cover bg-no-repeat h-[679px] left-[245px] rounded-[11px] top-[458px] w-[909px]" data-name="Screen" style={{ backgroundImage: `url('${imgScreen}')` }} />
    </div>
  );
}

function MiddleFill() {
  return (
    <div className="absolute inset-[32.2%_42.29%_62.8%_42.29%]" data-name="Middle - Fill">
      <div className="absolute bg-[#e93a7d] inset-0 rounded-[100px]" data-name="Rectangle" />
      <div className="absolute flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] text-[18px] text-center text-nowrap text-white top-1/2 translate-x-[-50%] translate-y-[-50%]" style={{ fontVariationSettings: "'opsz' 14", left: "calc(50% + 0.5px)" }}>
        <p className="leading-[26px] whitespace-pre">Download Our App</p>
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className="absolute contents inset-[10%_27.5%_73.2%_27.57%] leading-[0] text-center" data-name="Title">
      <div className="absolute font-['DM_Sans:Medium',_sans-serif] font-medium inset-[17.2%_27.5%_73.2%_27.57%] text-[22px] text-[rgba(21,20,57,0.4)]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[32px]">We have created a new product that will help designers, developers and companies create websites for their startups quickly and easily.</p>
      </div>
      <div className="absolute font-['DM_Sans:Bold',_sans-serif] font-bold left-[31.96%] right-[31.89%] text-[#1e0e62] text-[42px] text-nowrap tracking-[-0.4px]" style={{ top: "calc(50% - 400.001px)", fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[52px] whitespace-pre">Multi Useful Components</p>
      </div>
    </div>
  );
}

export default function Feature30() {
  return (
    <div className="bg-white relative size-full" data-name="feature_30">
      <IPadPro />
      <MiddleFill />
      <Title />
    </div>
  );
}