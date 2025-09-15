"use client";

import ProofDetailScreen from "@/components/ProofDetailScreen";
import { useApp } from "@/lib/context/AppContext";

export default function ProofDetailPage() {
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

  return <ProofDetailScreen {...commonProps} />;
}
