import { DEFAULT_FEE, XRPL_SNAP_ID } from '../constants';
import type {
  MetamaskInstance,
  SendXRPParams,
  SendXRPResponse,
  XRPLAccount,
  XRPLAccountData,
  XRPLAccountInfoResponse,
  XRPLRPCService
} from '../types';
import { convertXRPToDrops } from '../utils';

// Memo encoding utility function
const memoEncodeForSendXRP = (memo: string) => {
  return {
    Memos: [
      {
        Memo: {
          MemoData: Buffer.from(memo, 'utf8').toString('hex').toUpperCase(),
        },
      },
    ],
  };
};

export const createXRPLRPCService = (metamask: MetamaskInstance): XRPLRPCService => {

  const getAccount = async (): Promise<XRPLAccount> => {
    try {
      const account = await metamask.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: XRPL_SNAP_ID,
          request: {
            method: 'xrpl_getAccount'
          }
        },
      });

      return account;
    } catch (error) {
      console.error('[XRPL RPC] Failed to get account:', error);
      throw error;
    }
  };

  const getAccountInfo = async (address?: string): Promise<XRPLAccountData> => {
    try {
      const accountInfo: XRPLAccountInfoResponse = await metamask.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: XRPL_SNAP_ID,
          request: {
            method: 'xrpl_request',
            params: {
              command: 'account_info',
              account: address ?? (await getAccount()).account,
            },
          },
        },
      });

      console.log('[XRPL RPC] Account info retrieved successfully');
      return accountInfo.result.account_data;
    } catch (error) {
      console.error('[XRPL RPC] Failed to get account info:', error);
      throw error;
    }
  };

  const sendXRP = async ({ destination, amount, destinationTag, memo }: SendXRPParams): Promise<SendXRPResponse> => {
    try {
      console.log('[XRPL RPC] Initiating XRP transaction:', { destination, amount, destinationTag });
      
      const xrplAccount = await getAccountInfo();
      const Amount = convertXRPToDrops(amount)
      const DestinationTag = parseInt(destinationTag, 10)

      const response = await metamask.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: XRPL_SNAP_ID,
          request: {
            method: 'xrpl_signAndSubmit',
            params: {
              TransactionType: 'Payment',
              Destination: destination,
              Account: xrplAccount.Account,
              Fee: DEFAULT_FEE,
              Amount,
              DestinationTag,
              ...(memo && memoEncodeForSendXRP(memo))
            },
          },
        },
      });

      console.log('[XRPL RPC] Transaction completed successfully:', response?.hash || 'No hash available');
      return response;
    } catch (error) {
      console.error('[XRPL RPC] Transaction failed:', error);
      throw error;
    }
  };

  const requestSnap = async (): Promise<void> => {
    try {
      console.log('[XRPL RPC] Requesting XRPL Snap installation...');
      
      await metamask.request({
        method: 'wallet_requestSnaps',
        params: {
          [XRPL_SNAP_ID]: {},
        },
      });

      console.log('[XRPL RPC] XRPL Snap requested successfully');
    } catch (error) {
      console.error('[XRPL RPC] Failed to request XRPL Snap:', error);
      throw error;
    }
  };

  const checkSnapInstallation = async (): Promise<boolean> => {
    try {
      const snaps = await metamask.request({
        method: 'wallet_getSnaps',
      });
      
      const isInstalled = XRPL_SNAP_ID in snaps;
      console.log('[XRPL RPC] Snap installation check:', { isInstalled });
      
      return isInstalled;
    } catch (error) {
      console.error('[XRPL RPC] Failed to check XRPL Snap installation:', error);
      return false;
    }
  };

  return {
    getAccountInfo,
    sendXRP,
    requestSnap,
    checkSnapInstallation,
  };
};