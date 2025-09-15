"use client";

import ProfileScreen from "@/components/ProfileScreen";
import { useApp } from "@/lib/context/AppContext";
import { Toaster } from "sonner";

export default function ProfilePage() {
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
      <ProfileScreen {...commonProps} />
      <Toaster />
    </>
  );
}
