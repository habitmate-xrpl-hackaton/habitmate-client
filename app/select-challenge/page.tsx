"use client";

import SelectChallengeScreen from "@/components/SelectChallengeScreen";
import { AppProvider, useApp } from "@/lib/context/AppContext";

function SelectChallengePageContent() {
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

  return <SelectChallengeScreen {...commonProps} />;
}

export default function SelectChallengePage() {
  return (
    <AppProvider>
      <SelectChallengePageContent />
    </AppProvider>
  );
}
