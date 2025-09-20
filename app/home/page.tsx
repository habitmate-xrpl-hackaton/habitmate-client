"use client";

import { Suspense } from "react";
import HomeScreen from "@/components/HomeScreen";
import { useApp } from "@/lib/context/AppContext";
import { Toaster } from "sonner";

function HomePageContent() {
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

  return <HomeScreen {...commonProps} />;
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
      <Toaster />
    </Suspense>
  );
}
