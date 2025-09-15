"use client";

import ProofDetailsScreen from "@/components/ProofDetailsScreen";
import { AppProvider, useApp } from "@/lib/context/AppContext";

function ProofDetailsPageContent() {
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

  return <ProofDetailsScreen {...commonProps} />;
}

export default function ProofDetailsPage() {
  return (
    <AppProvider>
      <ProofDetailsPageContent />
    </AppProvider>
  );
}
