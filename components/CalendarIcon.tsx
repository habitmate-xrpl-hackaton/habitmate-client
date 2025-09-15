import Image from "next/image";
import React from 'react';
import { imgLeftIcon } from '../imports/svg-rtlec';

export function CalendarIcon() {
  return (
    <div className="w-12 h-12">
      <img className="block max-w-none size-full" src={imgLeftIcon} alt="Calendar" />
    </div>
  );
}