"use client";

import ChallengesScreen from "@/components/ChallengesScreen";
import { AppProvider, useApp } from "@/lib/context/AppContext";

function ChallengeListPageContent() {
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

  return <ChallengesScreen {...commonProps} />;
}

export default function ChallengeListPage() {
  return (
    <AppProvider>
      <ChallengeListPageContent />
    </AppProvider>
  );
}
