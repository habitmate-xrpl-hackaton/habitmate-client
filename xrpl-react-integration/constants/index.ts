// XRPL Constants
export const XRPL_SNAP_ID = 'npm:xrpl-snap';
export const DEFAULT_FEE = '12';

// Reserve and Amount Constants
export const XRPL_CONSTANTS = {
  DROPS_PER_XRP: 1000000,
  MINIMUM_XRP: 0.000001,
  MINIMUM_DROPS: '1',
  DEFAULT_FEE_DROPS: '12',
  DEFAULT_FEE_XRP: 0.000012,
  BASE_RESERVE_XRP: 1,
  OWNER_RESERVE_XRP: 0.2,
} as const;

// Network Configuration
export const XRPL_NETWORKS = {
  MAINNET: 'mainnet',
  TESTNET: 'testnet',
  DEVNET: 'devnet',
} as const;

export type XRPLNetwork = typeof XRPL_NETWORKS[keyof typeof XRPL_NETWORKS];