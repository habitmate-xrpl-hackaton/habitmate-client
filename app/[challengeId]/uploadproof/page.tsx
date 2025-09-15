"use client";

import ProofUploadScreen from "@/components/ProofUploadScreen";
import { AppProvider, useApp } from "@/lib/context/AppContext";
import { useParams } from "next/navigation";

function UploadProofPageContent() {
  const {
    state,
    navigateToScreen,
    updateUser,
    addChallenge,
    connectWallet,
    disconnectWallet,
  } = useApp();
  const params = useParams();
  const challengeId = params.challengeId as string;

  const commonProps = {
    navigateToScreen: (screen: string, data?: Record<string, unknown>) =>
      navigateToScreen(screen as any, data),
    appState: state,
    updateUser,
    addChallenge,
    connectWallet,
    disconnectWallet,
  };

  // challengeId를 props로 전달
  return <ProofUploadScreen {...commonProps} challengeId={challengeId} />;
}

export default function UploadProofPage() {
  return (
    <AppProvider>
      <UploadProofPageContent />
    </AppProvider>
  );
}
