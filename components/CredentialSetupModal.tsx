"use client";

import React from "react";
import { X, CheckCircle, Shield, Link } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface CredentialSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  isLoading?: boolean;
}

export default function CredentialSetupModal({
  isOpen,
  onClose,
  onAccept,
  isLoading = false,
}: CredentialSetupModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
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
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              For secure use of this service, you need to accept your XRPL
              Credential. Please click the button below to proceed.
            </p>

            {/* Accept Button */}
            <Button
              onClick={onAccept}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
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
                  <p className="font-medium mb-1">Security Notice</p>
                  <p className="leading-relaxed">
                    Your XRPL credential ensures secure access to blockchain
                    features and maintains the integrity of your digital
                    identity.
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

// Hook for managing modal state
export function useCredentialSetupModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      // Here you would integrate with your credentialAccept function
      console.log("🚀 XRPL Credential Accept 시작...");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("✅ XRPL Credential Accept 완료!");
      closeModal();

      // You can add success toast here
      // toast.success("XRPL Credential accepted successfully!");
    } catch (error) {
      console.error("❌ Credential Accept 실패:", error);
      // You can add error toast here
      // toast.error("Failed to accept credential. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isOpen,
    isLoading,
    openModal,
    closeModal,
    handleAccept,
  };
}
