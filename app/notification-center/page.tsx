"use client";

import NotificationCenterScreen from "@/components/NotificationCenterScreen";
import { useApp } from "@/lib/context/AppContext";

export default function NotificationCenterPage() {
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

  return <NotificationCenterScreen {...commonProps} />;
}
