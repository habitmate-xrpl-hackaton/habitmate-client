# 🚀 XRPL React Integration

A modular React integration package for XRPL with MetaMask Snap support, featuring comprehensive utility functions, context management, and TypeScript support.

## ✨ Features

- 🔗 **MetaMask Integration**: Seamless connection to MetaMask with XRPL Snap
- 💰 **Reserve Calculations**: Accurate XRPL reserve handling with current rates
- 🎣 **React Hooks**: Purpose-built hooks for different use cases
- 🌐 **Context Provider**: Global state management for XRPL connections
- 🛠 **Utility Functions**: Comprehensive XRP/drops conversion and validation
- 📝 **TypeScript**: Full type safety and IntelliSense support
- 🧩 **Modular Design**: Import only what you need

## 📦 Installation

```bash
npm install @habitmate/xrpl-react-integration
# or
yarn add @habitmate/xrpl-react-integration
```

## 🚀 Quick Start

### 1. Setup Provider

```tsx
import React from 'react';
import { XRPLProvider } from '@habitmate/xrpl-react-integration';

function App() {
  return (
    <XRPLProvider
      onError={(error) => console.error('XRPL Error:', error)}
      onConnection={(account) => console.log('Connected:', account)}
      onDisconnection={() => console.log('Disconnected')}
    >
      <YourApp />
    </XRPLProvider>
  );
}
```

### 2. Use Connection Hook

```tsx
import { useXRPLConnection } from '@habitmate/xrpl-react-integration';

function WalletConnection() {
  const { 
    isFullyConnected, 
    connectFull, 
    disconnect,
    isLoading 
  } = useXRPLConnection();

  if (isFullyConnected) {
    return <button onClick={disconnect}>Disconnect</button>;
  }

  return (
    <button onClick={connectFull} disabled={isLoading}>
      {isLoading ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
```

### 3. Use Account Hook

```tsx
import { useXRPLAccount } from '@habitmate/xrpl-react-integration';

function AccountInfo() {
  const { 
    xrplAccount, 
    getAvailableBalance, 
    getTotalBalance,
    getReserveInfo 
  } = useXRPLAccount();

  if (!xrplAccount) return <div>Not connected</div>;

  const reserves = getReserveInfo();

  return (
    <div>
      <p>Address: {xrplAccount.Account}</p>
      <p>Total: {getTotalBalance()} XRP</p>
      <p>Available: {getAvailableBalance()} XRP</p>
      <p>Reserved: {reserves?.totalReserve.xrp} XRP</p>
    </div>
  );
}
```

### 4. Send Transactions

```tsx
import { useXRPLAccount } from '@habitmate/xrpl-react-integration';

function SendXRP() {
  const { sendTransaction, validateTransaction } = useXRPLAccount();

  const handleSend = async () => {
    try {
      const result = await sendTransaction({
        destination: 'rDestinationAddress...',
        destinationTag: '12345',
        amount: '1.5',
        memo: 'Payment memo'
      });
      console.log('Transaction successful:', result);
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return <button onClick={handleSend}>Send XRP</button>;
}
```

## 🎣 Available Hooks

### `useXRPLConnection`
Manages MetaMask and XRPL Snap connections.

```tsx
const {
  isMetaMaskConnected,
  isXRPLConnected,
  isFullyConnected,
  connectMetaMask,
  connectXRPL,
  connectFull,
  disconnect,
  isLoading,
  error
} = useXRPLConnection();
```

### `useXRPLAccount`
Handles account data and transactions.

```tsx
const {
  xrplAccount,
  getTotalBalance,
  getAvailableBalance,
  getReserveInfo,
  sendTransaction,
  validateTransaction,
  refreshAccountInfo,
  isLoading,
  error
} = useXRPLAccount();
```

### `useXRPLUtils`
Provides utility functions for XRP operations.

```tsx
const {
  convertDropsToXRP,
  convertXRPToDrops,
  formatDropsAsXRP,
  isValidXRPAmount,
  calculateAvailableXRP,
  getReserveRequirements,
  canAffordTransaction
} = useXRPLUtils();
```

### `useXRPL` (Main Context)
Access to all context values and methods.

```tsx
const {
  // All state and methods from other hooks combined
  ...state,
  ...methods
} = useXRPL();
```

## 🛠 Utility Functions

### Currency Conversion
```tsx
import { convertDropsToXRP, convertXRPToDrops } from '@habitmate/xrpl-react-integration';

const xrp = convertDropsToXRP(1500000); // 1.5
const drops = convertXRPToDrops(1.5); // "1500000"
```

### Reserve Calculations
```tsx
import { calculateAvailableXRP, getReserveRequirements } from '@habitmate/xrpl-react-integration';

// Calculate spendable balance (accounts for 1 XRP + 0.2 XRP per object reserves)
const available = calculateAvailableXRP(15000000, 2); // 13.6 XRP available

// Get reserve breakdown
const reserves = getReserveRequirements(3);
// { baseReserve: {xrp: 1}, ownerReserve: {xrp: 0.2}, totalReserve: {xrp: 1.6} }
```

### Transaction Validation
```tsx
import { canAffordTransaction, isValidXRPAmount } from '@habitmate/xrpl-react-integration';

const canSend = canAffordTransaction(balance, "1.5", ownerCount); // boolean
const isValid = isValidXRPAmount("1.234567"); // true (max 6 decimals)
```

## 🏗 Architecture

### Modular Structure
```
src/xrpl-react-integration/
├── index.ts              # Main exports
├── types/                # TypeScript definitions
├── constants/            # XRPL constants and configurations
├── utils/                # Pure utility functions
├── services/             # RPC and MetaMask services
├── context/              # React context provider
└── hooks/                # Specialized React hooks
```

### Services Layer
- **`MetaMaskService`**: Handles Ethereum wallet operations
- **`createXRPLRPCService`**: Factory for XRPL Snap RPC operations

### Context Layer
- **`XRPLProvider`**: Global state management with event callbacks
- **`useXRPL`**: Main context hook for full access

### Hook Layer
- **`useXRPLConnection`**: Connection management
- **`useXRPLAccount`**: Account and transaction operations
- **`useXRPLUtils`**: Utility function access

## 💡 Best Practices

### Error Handling
```tsx
<XRPLProvider
  onError={(error) => {
    // Log to monitoring service
    console.error('[XRPL]', error);
    // Show user notification
    toast.error(error);
  }}
>
```

### Transaction Monitoring
```tsx
const { sendTransaction } = useXRPLAccount();

const handleSend = async (params) => {
  try {
    const result = await sendTransaction(params);
    // Log successful transaction
    analytics.track('xrp_transaction_success', {
      amount: params.amount,
      destination: params.destination,
      hash: result.hash
    });
  } catch (error) {
    // Log failed transaction
    analytics.track('xrp_transaction_failed', {
      error: error.message,
      amount: params.amount
    });
  }
};
```

## 🔧 Configuration

### Custom Network (Future)
```tsx
<XRPLProvider
  network="testnet" // mainnet | testnet | devnet
  snapId="custom-snap-id"
>
```

## 📝 TypeScript Support

Full TypeScript definitions included:

```tsx
import type { 
  XRPLAccountData, 
  SendXRPParams, 
  XRPLContextType 
} from '@habitmate/xrpl-react-integration';
```

## 🚀 Integration Examples

### Next.js App
```tsx
// pages/_app.tsx
import { XRPLProvider } from '@habitmate/xrpl-react-integration';

export default function App({ Component, pageProps }) {
  return (
    <XRPLProvider>
      <Component {...pageProps} />
    </XRPLProvider>
  );
}
```

### Existing React App
```tsx
// src/App.tsx
import { XRPLProvider } from '@habitmate/xrpl-react-integration';

function App() {
  return (
    <XRPLProvider>
      <Router>
        <Routes>
          {/* Your routes */}
        </Routes>
      </Router>
    </XRPLProvider>
  );
}
```

## 📊 Bundle Size

- **Full package**: ~15KB gzipped
- **Tree-shakeable**: Import only what you need
- **Zero external dependencies**: Except peer dependencies (React, MetaMask detect-provider)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Add tests for new features
4. Ensure TypeScript types are updated
5. Submit a pull request

## 📄 License

MIT License - feel free to use in commercial and open-source projects.

---

**Ready to integrate XRPL into your React app?** Start with the Quick Start guide above! 🚀