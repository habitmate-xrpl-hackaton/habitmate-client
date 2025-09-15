"use client";

import { useCallback } from "react";
import { useXRPL } from "../context/XRPLContext";
import type { SendXRPParams } from "../types";

/**
 * Hook for managing XRPL account data and transactions
 */
export const useXRPLAccount = () => {
  const {
    xrplAccount,
    ethereumAccount,
    ethereumBalance,
    sendXRP,
    refreshXRPLAccountInfo,
    isLoading,
    error,
    // Utility functions
    calculateAvailableXRP,
    getReserveRequirements,
    canAffordTransaction,
    formatDropsAsXRP,
    formatXRPBalance,
  } = useXRPL();

  const getAvailableBalance = useCallback(
    (decimals: number = 6): string => {
      if (!xrplAccount?.Balance) return "0.000000";

      const availableDrops = calculateAvailableXRP(
        xrplAccount.Balance,
        xrplAccount.OwnerCount,
        false
      );
      return formatDropsAsXRP(availableDrops, decimals);
    },
    [xrplAccount, calculateAvailableXRP, formatDropsAsXRP]
  );

  const getTotalBalance = useCallback(
    (decimals: number = 6): string => {
      return formatXRPBalance(decimals);
    },
    [formatXRPBalance]
  );

  const getReserveInfo = useCallback(() => {
    if (!xrplAccount) return null;
    return getReserveRequirements(xrplAccount.OwnerCount);
  }, [xrplAccount, getReserveRequirements]);

  const validateTransaction = useCallback(
    (amount: string): boolean => {
      if (!xrplAccount) return false;
      return canAffordTransaction(
        xrplAccount.Balance,
        amount,
        xrplAccount.OwnerCount
      );
    },
    [xrplAccount, canAffordTransaction]
  );

  const sendTransaction = useCallback(
    async (params: SendXRPParams) => {
      // Validate before sending
      if (!validateTransaction(params.amount)) {
        const available = calculateAvailableXRP(
          xrplAccount?.Balance || "0",
          xrplAccount?.OwnerCount || 0
        );
        throw new Error(
          `Insufficient funds. Available: ${available.toFixed(6)} XRP`
        );
      }

      return await sendXRP(params);
    },
    [sendXRP, validateTransaction, calculateAvailableXRP, xrplAccount]
  );

  return {
    // Account data
    xrplAccount,
    ethereumAccount,
    ethereumBalance,

    // Balance information
    getTotalBalance,
    getAvailableBalance,
    getReserveInfo,

    // Transaction methods
    sendTransaction,
    validateTransaction,
    refreshAccountInfo: refreshXRPLAccountInfo,

    // States
    isLoading,
    error,
  };
};
