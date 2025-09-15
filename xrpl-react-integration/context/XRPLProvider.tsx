"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { MetaMaskService, createXRPLRPCService } from "../services";
import {
  convertDropsToXRP,
  convertXRPToDrops,
  formatDropsAsXRP,
  isValidXRPAmount,
  calculateAvailableXRP,
  getReserveRequirements,
  canAffordTransaction,
} from "../utils";
import type {
  SendXRPParams,
  XRPLContextType,
  XRPLState,
  XRPLAccountData,
} from "../types";

import { XRPLContext } from "./XRPLContext";

interface XRPLProviderProps {
  children: React.ReactNode;
}

export const XRPLProvider: React.FC<XRPLProviderProps> = ({ children }) => {
  // Default callback functions
  const onError = (error: string) => {
    console.error("[XRPL Integration]", error);
  };

  const onConnection = (account: XRPLAccountData) => {
    console.log("[XRPL Integration] Connected to account:", account.Account);
  };

  const onDisconnection = () => {
    console.log("[XRPL Integration] Disconnected from wallet");
  };
  const [state, setState] = useState<XRPLState>({
    isMetaMaskConnected: false,
    ethereumAccount: null,
    ethereumBalance: null,
    provider: null,
    isXRPLConnected: false,
    xrplAccount: null,
    isLoading: false,
    error: null,
    rpcService: null,
  });

  const metaMaskService = useMemo(() => new MetaMaskService(), []);

  // Create RPC service when provider is available
  const rpcService = useMemo(() => {
    return state.provider ? createXRPLRPCService(state.provider) : null;
  }, [state.provider]);

  // Update RPC service in state when it changes
  useEffect(() => {
    setState((prev) => ({ ...prev, rpcService }));
  }, [rpcService]);

  // Initialize MetaMask provider
  useEffect(() => {
    const initializeProvider = async () => {
      try {
        const provider = await metaMaskService.initialize();
        setState((prev) => ({ ...prev, provider }));

        // Check if already connected
        const accounts = await metaMaskService.getAccounts();
        if (accounts.length > 0) {
          setState((prev) => ({
            ...prev,
            isMetaMaskConnected: true,
            ethereumAccount: accounts[0],
          }));
          await getEthereumBalance(accounts[0]);
        }

        // Set up event listeners
        metaMaskService.addEventListener(
          "accountsChanged",
          handleAccountsChanged
        );
        metaMaskService.addEventListener("chainChanged", handleChainChanged);
      } catch (error) {
        console.error("[XRPL Provider] Failed to initialize:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to initialize MetaMask";
        setState((prev) => ({ ...prev, error: errorMessage }));
        onError?.(errorMessage);
      }
    };

    initializeProvider();

    return () => {
      metaMaskService.removeEventListener(
        "accountsChanged",
        handleAccountsChanged
      );
      metaMaskService.removeEventListener("chainChanged", handleChainChanged);
    };
  }, []);

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length === 0) {
      console.log("[XRPL Provider] MetaMask disconnected");
      setState((prev) => ({
        ...prev,
        isMetaMaskConnected: false,
        ethereumAccount: null,
        ethereumBalance: null,
        isXRPLConnected: false,
        xrplAccount: null,
        error: null,
      }));
      onDisconnection?.();
    } else {
      console.log("[XRPL Provider] MetaMask account changed:", accounts[0]);
      setState((prev) => ({
        ...prev,
        ethereumAccount: accounts[0],
        isMetaMaskConnected: true,
      }));
      await getEthereumBalance(accounts[0]);
    }
  };

  const handleChainChanged = () => {
    console.log("[XRPL Provider] Chain changed, reloading...");
    window.location.reload();
  };

  const getEthereumBalance = async (account: string) => {
    try {
      const balance = await metaMaskService.getBalance(account);
      setState((prev) => ({ ...prev, ethereumBalance: balance }));
    } catch (error) {
      console.error("[XRPL Provider] Failed to get Ethereum balance:", error);
    }
  };

  const connectMetaMask = useCallback(async () => {
    if (!metaMaskService.getProvider()) {
      const errorMessage =
        "MetaMask is not installed. Please install MetaMask to continue.";
      setState((prev) => ({ ...prev, error: errorMessage }));
      onError?.(errorMessage);
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const accounts = await metaMaskService.requestAccounts();

      if (accounts.length > 0) {
        setState((prev) => ({
          ...prev,
          isMetaMaskConnected: true,
          ethereumAccount: accounts[0],
          isLoading: false,
        }));
        await getEthereumBalance(accounts[0]);
      }
    } catch (error: any) {
      const errorMessage = error.message || "Failed to connect MetaMask";
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      onError?.(errorMessage);
    }
  }, [onError]);

  const disconnectMetaMask = useCallback(() => {
    console.log("[XRPL Provider] Disconnecting MetaMask");

    setState((prev) => ({
      ...prev,
      isMetaMaskConnected: false,
      ethereumAccount: null,
      ethereumBalance: null,
      isXRPLConnected: false,
      xrplAccount: null,
      error: null,
    }));
    onDisconnection?.();
  }, [onDisconnection]);

  const connectXRPL = useCallback(async (): Promise<XRPLAccountData> => {
    if (!rpcService) {
      throw new Error("MetaMask not connected");
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      console.log("[XRPL Provider] Connecting to XRPL Snap...");
      await rpcService.requestSnap();

      const account = await rpcService.getAccountInfo();

      setState((prev) => ({
        ...prev,
        isXRPLConnected: true,
        xrplAccount: account,
        isLoading: false,
      }));

      console.log("[XRPL Provider] XRPL connection successful");
      onConnection?.(account);
      return account;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to connect to XRPL Snap";
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      onError?.(errorMessage);
      throw error;
    }
  }, [rpcService, onConnection, onError]);

  const disconnectXRPL = useCallback(() => {
    console.log("[XRPL Provider] Disconnecting XRPL");
    setState((prev) => ({
      ...prev,
      isXRPLConnected: false,
      xrplAccount: null,
    }));
  }, []);

  const refreshXRPLAccountInfo =
    useCallback(async (): Promise<XRPLAccountData> => {
      if (!state.xrplAccount || !rpcService) {
        throw new Error("XRPL account not connected");
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const account = await rpcService.getAccountInfo();

        setState((prev) => ({
          ...prev,
          xrplAccount: account,
          isLoading: false,
        }));

        return account;
      } catch (error: any) {
        const errorMessage =
          error.message || "Failed to refresh XRPL account info";
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        onError?.(errorMessage);
        throw error;
      }
    }, [state.xrplAccount, rpcService, onError]);

  const sendXRP = useCallback(
    async (params: SendXRPParams): Promise<any> => {
      if (!state.xrplAccount || !rpcService) {
        throw new Error("XRPL account not connected");
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const transaction = await rpcService.sendXRP(params);

        setState((prev) => ({ ...prev, isLoading: false }));

        // Refresh balance after successful transaction
        await refreshXRPLAccountInfo();

        return transaction;
      } catch (error: any) {
        const errorMessage = error.message || "Failed to send XRP";
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        onError?.(errorMessage);
        throw error;
      }
    },
    [state.xrplAccount, rpcService, refreshXRPLAccountInfo, onError]
  );

  const isXRPLSnapInstalled = useCallback(async (): Promise<boolean> => {
    try {
      if (!rpcService) return false;

      const isInstalled = await rpcService.checkSnapInstallation();
      return isInstalled;
    } catch (error) {
      console.error(
        "[XRPL Provider] Failed to check XRPL Snap installation:",
        error
      );
      return false;
    }
  }, [rpcService]);

  const disconnect = useCallback(() => {
    disconnectMetaMask();
  }, [disconnectMetaMask]);

  const isFullyConnected = state.isMetaMaskConnected && state.isXRPLConnected;

  // Utility method implementations
  const formatXRPBalance = useCallback(
    (decimals: number = 6): string => {
      if (!state.xrplAccount?.Balance) {
        return "0.000000";
      }
      return formatDropsAsXRP(state.xrplAccount.Balance, decimals);
    },
    [state.xrplAccount?.Balance]
  );

  const contextValue: XRPLContextType = {
    ...state,
    connectMetaMask,
    disconnectMetaMask,
    connectXRPL,
    disconnectXRPL,
    refreshXRPLAccountInfo,
    sendXRP,
    isXRPLSnapInstalled,
    disconnect,
    isFullyConnected,
    // Utility methods
    convertDropsToXRP,
    convertXRPToDrops,
    formatDropsAsXRP,
    formatXRPBalance,
    isValidXRPAmount,
    calculateAvailableXRP,
    getReserveRequirements,
    canAffordTransaction,
  };

  return (
    <XRPLContext.Provider value={contextValue}>{children}</XRPLContext.Provider>
  );
};
