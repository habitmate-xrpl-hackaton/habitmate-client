"use client";

import BadgeRewardScreen from "@/components/BadgeRewardScreen";
import { AppProvider, useApp } from "@/lib/context/AppContext";

function BadgeRewardPageContent() {
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

  return <BadgeRewardScreen {...commonProps} />;
}

export default function BadgeRewardPage() {
  return (
    <AppProvider>
      <BadgeRewardPageContent />
    </AppProvider>
  );
}
