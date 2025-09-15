"use client";

import { createContext, useContext } from "react";
import { XRPLContextType } from "../types";

export const XRPLContext = createContext<XRPLContextType | undefined>(
  undefined
);

export const useXRPL = () => {
  const context = useContext(XRPLContext);
  if (context === undefined) {
    throw new Error("useXRPL must be used within an XRPLProvider");
  }
  return context;
};
