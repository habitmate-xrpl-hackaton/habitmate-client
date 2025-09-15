"use client";

import SearchScreen from "@/components/SearchScreen";
import { AppProvider, useApp } from "@/lib/context/AppContext";

function SearchPageContent() {
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

  return <SearchScreen {...commonProps} />;
}

export default function SearchPage() {
  return (
    <AppProvider>
      <SearchPageContent />
    </AppProvider>
  );
}
