"use client";

import React from "react";
import { X, CheckCircle, Shield, Link, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "sonner";
// credentialAccept 함수는 동적으로 import (서버사이드에서만 실행)

interface CredentialSetupModalWithXRPLProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
  issuerSeed?: string;
  subjectSeed?: string;
  credentialType?: string;
  credentialAcceptCompleted?: boolean;
}

export default function CredentialSetupModalWithXRPL({
  isOpen,
  onClose,
  onAccept,
  issuerSeed,
  subjectSeed,
  credentialType = "DRIVER_LICENCE",
  credentialAcceptCompleted = false,
}: CredentialSetupModalWithXRPLProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleAccept = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 보안상 클라이언트에서는 시뮬레이션만 실행
      if (typeof window !== "undefined") {
        console.log("🌐 브라우저 환경에서 시뮬레이션 실행");

        // 시뮬레이션 지연
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // 시뮬레이션 성공
        console.log("✅ XRPL Credential Accept 시뮬레이션 성공!");

        toast.success("XRPL Credential accepted successfully! 🎉", {
          description: "Simulation mode - Transaction Hash: SIM_123456789",
        });

        onAccept?.();
        onClose();
        return;
      }

      // 보안상 모든 환경에서 시뮬레이션 실행
      console.log("🔒 보안상 실제 XRPL 트랜잭션은 실행되지 않습니다");

      // 시뮬레이션 성공
      toast.success("XRPL Credential accepted successfully! 🎉", {
        description: "Simulation mode - 실제 배포 시 서버에서 처리됩니다",
      });

      onAccept?.();
      onClose();
    } catch (error) {
      console.error("❌ Credential Accept 실패:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setError(errorMessage);

      toast.error("Failed to accept credential", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={!isLoading ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4">
        <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  Complete XRPL Credential Setup
                </h2>
              </div>
              {!isLoading && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              For secure use of this service, you need to accept your XRPL
              Credential. Please click the button below to proceed.
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-red-800">
                    <p className="font-medium">Error</p>
                    <p className="text-xs mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Accept Button */}
            <Button
              onClick={handleAccept}
              disabled={isLoading || !credentialAcceptCompleted}
              className={`w-full font-medium py-3 px-6 rounded-xl transition-all duration-200 disabled:cursor-not-allowed ${
                credentialAcceptCompleted
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Credential...</span>
                </div>
              ) : !credentialAcceptCompleted ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  <span>Waiting for Credential Accept...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Accept Credential</span>
                </div>
              )}
            </Button>

            {/* Additional Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2 text-gray-500 text-xs">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                <span>This step is required only once.</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 text-xs">
                <Link className="h-3 w-3 text-gray-400" />
                <span>Your credential will be linked to your account.</span>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="px-6 pb-6 pt-2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Shield className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-800">
                  <p className="font-medium mb-1">XRPL Blockchain Security</p>
                  <p className="leading-relaxed">
                    Your XRPL credential is stored on the XRP Ledger blockchain,
                    ensuring maximum security and decentralization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Hook for managing modal state with XRPL integration
export function useCredentialSetupModalWithXRPL() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [issuerSeed, setIssuerSeed] = React.useState<string | undefined>();
  const [subjectSeed, setSubjectSeed] = React.useState<string | undefined>();
  const [credentialType, setCredentialType] = React.useState("DRIVER_LICENCE");

  const openModal = (options?: {
    issuerSeed?: string;
    subjectSeed?: string;
    credentialType?: string;
  }) => {
    if (options?.issuerSeed) setIssuerSeed(options.issuerSeed);
    if (options?.subjectSeed) setSubjectSeed(options.subjectSeed);
    if (options?.credentialType) setCredentialType(options.credentialType);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    issuerSeed,
    subjectSeed,
    credentialType,
    openModal,
    closeModal,
  };
}
