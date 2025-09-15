"use client";

import HomeScreen from "@/components/HomeScreen";
import { useApp } from "@/lib/context/AppContext";
import { Toaster } from "sonner";

export default function HomePage() {
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

  return (
    <>
      <HomeScreen {...commonProps} />
      <Toaster />
    </>
  );
}
