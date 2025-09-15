import { XRPL_CONSTANTS } from '../constants';

/**
 * Convert drops (smallest unit) to XRP
 */
export const convertDropsToXRP = (drops: string | number): number => {
  const dropsValue = typeof drops === 'string' ? parseInt(drops, 10) : drops;
  
  if (isNaN(dropsValue)) {
    throw new Error('Invalid drops value');
  }
  
  return dropsValue / XRPL_CONSTANTS.DROPS_PER_XRP;
};

/**
 * Convert XRP to drops (smallest unit)
 */
export const convertXRPToDrops = (xrp: string | number): string => {
  const xrpValue = typeof xrp === 'string' ? parseFloat(xrp) : xrp;
  
  if (isNaN(xrpValue)) {
    throw new Error('Invalid XRP value');
  }
  
  if (xrpValue < 0) {
    throw new Error('XRP amount cannot be negative');
  }
  
  const drops = Math.round(xrpValue * XRPL_CONSTANTS.DROPS_PER_XRP);
  return drops.toString();
};

/**
 * Format XRP amount for display with specified decimal places
 */
export const formatXRP = (xrp: string | number, decimals: number = 6): string => {
  const xrpValue = typeof xrp === 'string' ? parseFloat(xrp) : xrp;
  
  if (isNaN(xrpValue)) {
    return '0.000000';
  }
  
  return xrpValue.toFixed(decimals);
};

/**
 * Format drops as XRP for display
 */
export const formatDropsAsXRP = (drops: string | number, decimals: number = 6): string => {
  try {
    const xrp = convertDropsToXRP(drops);
    return formatXRP(xrp, decimals);
  } catch (error) {
    return '0.000000';
  }
};

/**
 * Validate XRP amount
 */
export const isValidXRPAmount = (xrp: string | number): boolean => {
  try {
    const xrpValue = typeof xrp === 'string' ? parseFloat(xrp) : xrp;
    
    if (isNaN(xrpValue) || xrpValue < 0) {
      return false;
    }
    
    const xrpString = xrpValue.toString();
    const decimalIndex = xrpString.indexOf('.');
    
    if (decimalIndex !== -1) {
      const decimalPlaces = xrpString.length - decimalIndex - 1;
      if (decimalPlaces > 6) {
        return false;
      }
    }
    
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Calculate available (spendable) XRP balance after accounting for reserve requirements
 */
export const calculateAvailableXRP = (
  balance: string | number,
  ownerCount: number = 0,
  inXRP: boolean = true
): number => {
  const balanceInDrops = typeof balance === 'string' ? parseInt(balance, 10) : balance;
  
  if (isNaN(balanceInDrops) || balanceInDrops < 0) {
    return 0;
  }
  
  const BASE_RESERVE_DROPS = XRPL_CONSTANTS.BASE_RESERVE_XRP * XRPL_CONSTANTS.DROPS_PER_XRP;
  const OWNER_RESERVE_DROPS = XRPL_CONSTANTS.OWNER_RESERVE_XRP * XRPL_CONSTANTS.DROPS_PER_XRP;
  
  const totalReserveDrops = BASE_RESERVE_DROPS + (ownerCount * OWNER_RESERVE_DROPS);
  const availableDrops = Math.max(0, balanceInDrops - totalReserveDrops);
  
  return inXRP ? convertDropsToXRP(availableDrops) : availableDrops;
};

/**
 * Get the current XRPL reserve requirements
 */
export const getReserveRequirements = (ownerCount: number = 0) => {
  const baseReserveXRP = XRPL_CONSTANTS.BASE_RESERVE_XRP;
  const ownerReserveXRP = XRPL_CONSTANTS.OWNER_RESERVE_XRP;
  const totalReserveXRP = baseReserveXRP + (ownerCount * ownerReserveXRP);
  
  return {
    baseReserve: {
      xrp: baseReserveXRP,
      drops: baseReserveXRP * XRPL_CONSTANTS.DROPS_PER_XRP
    },
    ownerReserve: {
      xrp: ownerReserveXRP,
      drops: ownerReserveXRP * XRPL_CONSTANTS.DROPS_PER_XRP
    },
    totalReserve: {
      xrp: totalReserveXRP,
      drops: totalReserveXRP * XRPL_CONSTANTS.DROPS_PER_XRP
    },
    ownerCount
  };
};

/**
 * Check if an account has sufficient balance for a transaction
 */
export const canAffordTransaction = (
  balance: string | number,
  amount: string | number,
  ownerCount: number = 0,
  fee: number = 12
): boolean => {
  const amountInDrops = convertXRPToDrops(amount);
  const totalCostDrops = parseInt(amountInDrops) + fee;
  const availableDrops = calculateAvailableXRP(balance, ownerCount, false);
  
  return availableDrops >= totalCostDrops;
};

/**
 * Get the minimum XRP amount (1 drop = 0.000001 XRP)
 */
export const getMinimumXRP = (): number => {
  return XRPL_CONSTANTS.MINIMUM_XRP;
};