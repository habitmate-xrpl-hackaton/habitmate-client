"use client";

import PaymentConfirmationScreen from "@/components/PaymentConfirmationScreen";
import { useApp } from "@/lib/context/AppContext";

export default function PaymentConfirmationPage() {
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

  return <PaymentConfirmationScreen {...commonProps} />;
}
