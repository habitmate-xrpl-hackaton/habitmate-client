"use client";

import { useXRPL } from "../context/XRPLContext";

/**
 * Hook for accessing XRPL utility functions
 */
export const useXRPLUtils = () => {
  const {
    convertDropsToXRP,
    convertXRPToDrops,
    formatDropsAsXRP,
    formatXRPBalance,
    isValidXRPAmount,
    calculateAvailableXRP,
    getReserveRequirements,
    canAffordTransaction,
  } = useXRPL();

  return {
    // Conversion utilities
    convertDropsToXRP,
    convertXRPToDrops,

    // Formatting utilities
    formatDropsAsXRP,
    formatXRPBalance,

    // Validation utilities
    isValidXRPAmount,

    // Reserve utilities
    calculateAvailableXRP,
    getReserveRequirements,
    canAffordTransaction,
  };
};
