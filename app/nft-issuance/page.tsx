"use client";

import NFTIssuanceScreen from "@/components/NFTIssuanceScreen";
import { AppProvider, useApp } from "@/lib/context/AppContext";

function NFTIssuancePageContent() {
  const {
    state,
    navigateToScreen,
    updateUser,
    addChallenge,
    connectWallet,
    disconnectWallet,
  } = useApp();

  const commonProps = {
    navigateToScreen: (screen: string, data?: Record<string, unknown>) =>
      navigateToScreen(screen as any, data),
    appState: state,
    updateUser,
    addChallenge,
    connectWallet,
    disconnectWallet,
  };

  return <NFTIssuanceScreen {...commonProps} />;
}

export default function NFTIssuancePage() {
  return (
    <AppProvider>
      <NFTIssuancePageContent />
    </AppProvider>
  );
}
