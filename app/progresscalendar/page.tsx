"use client";

import ProgressCalendarScreen from "@/components/ProgressCalendarScreen";
import { AppProvider, useApp } from "@/lib/context/AppContext";

function ProgressCalendarPageContent() {
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

  return <ProgressCalendarScreen {...commonProps} />;
}

export default function ProgressCalendarPage() {
  return (
    <AppProvider>
      <ProgressCalendarPageContent />
    </AppProvider>
  );
}
