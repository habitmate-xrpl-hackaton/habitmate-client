import detectEthereumProvider from '@metamask/detect-provider';

/**
 * MetaMask provider service for handling Ethereum wallet connections
 */
export class MetaMaskService {
  private provider: any = null;
  
  async initialize(): Promise<any> {
    try {
      const detectedProvider = await detectEthereumProvider();
      if (!detectedProvider) {
        throw new Error('MetaMask not detected');
      }
      
      this.provider = detectedProvider;
      console.log('[MetaMask] Provider initialized successfully');
      return this.provider;
    } catch (error) {
      console.error('[MetaMask] Failed to initialize provider:', error);
      throw error;
    }
  }

  async getAccounts(): Promise<string[]> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    try {
      const accounts = await this.provider.request({ method: 'eth_accounts' });
      return accounts;
    } catch (error) {
      console.error('[MetaMask] Failed to get accounts:', error);
      throw error;
    }
  }

  async requestAccounts(): Promise<string[]> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    try {
      console.log('[MetaMask] Requesting account access...');
      const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
      console.log('[MetaMask] Account access granted');
      return accounts;
    } catch (error) {
      console.error('[MetaMask] Failed to request accounts:', error);
      throw error;
    }
  }

  async getBalance(account: string): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    try {
      const balance = await this.provider.request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      });
      
      const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);
      return balanceInEth.toFixed(4);
    } catch (error) {
      console.error('[MetaMask] Failed to get balance:', error);
      throw error;
    }
  }

  addEventListener(eventName: string, handler: (...args: any[]) => void): void {
    if (this.provider) {
      this.provider.on(eventName, handler);
    }
  }

  removeEventListener(eventName: string, handler: (...args: any[]) => void): void {
    if (this.provider) {
      this.provider.removeListener(eventName, handler);
    }
  }

  getProvider(): any {
    return this.provider;
  }
}