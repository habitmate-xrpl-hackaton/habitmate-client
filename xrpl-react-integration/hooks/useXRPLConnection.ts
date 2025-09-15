"use client";

import { useCallback } from "react";
import { useXRPL } from "../context/XRPLContext";

/**
 * Hook for managing XRPL connection state and actions
 */
export const useXRPLConnection = () => {
  const {
    isMetaMaskConnected,
    isXRPLConnected,
    isFullyConnected,
    isLoading,
    error,
    connectMetaMask,
    connectXRPL,
    disconnect,
    isXRPLSnapInstalled,
  } = useXRPL();

  const connectFull = useCallback(async () => {
    if (!isMetaMaskConnected) {
      await connectMetaMask();
    }
    if (isMetaMaskConnected && !isXRPLConnected) {
      await connectXRPL();
    }
  }, [isMetaMaskConnected, isXRPLConnected, connectMetaMask, connectXRPL]);

  return {
    // Connection states
    isMetaMaskConnected,
    isXRPLConnected,
    isFullyConnected,
    isLoading,
    error,

    // Connection actions
    connectMetaMask,
    connectXRPL,
    connectFull,
    disconnect,
    isXRPLSnapInstalled,
  };
};
