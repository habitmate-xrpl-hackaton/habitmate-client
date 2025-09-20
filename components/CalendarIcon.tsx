import Image from "next/image";
import React from "react";
import { imgLeftIcon } from "../imports/svg-rtlec";

export function CalendarIcon() {
  return (
    <div className="w-12 h-12">
      <Image
        className="block max-w-none size-full"
        src={imgLeftIcon}
        alt="Calendar"
        width={48}
        height={48}
      />
    </div>
  );
}
