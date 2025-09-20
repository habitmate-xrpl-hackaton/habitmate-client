"use client";

import React from "react";
import { X, CheckCircle, Shield, Link } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { tokenManager } from "@/lib/auth/tokenManager";

interface CredentialSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  isLoading?: boolean;
  credentialAcceptCompleted?: boolean;
}

export default function CredentialSetupModal({
  isOpen,
  onClose,
  onAccept,
  isLoading = false,
  credentialAcceptCompleted = false,
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
                  <span>Processing KYC & Credential...</span>
                </div>
              ) : !credentialAcceptCompleted ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  <span>Waiting for Credential Accept...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Complete KYC & Accept Credential</span>
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
      console.log("🚀 KYC 인증 및 XRPL Credential Accept 시작...");

      // 1. KYC API 호출
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      console.log("🔍 API Base URL:", apiBaseUrl);

      // sessionStorage에서 직접 확인
      const directToken = sessionStorage.getItem("accessToken");
      console.log("🔍 sessionStorage에서 직접 가져온 토큰:", directToken);

      // 액세스 토큰 가져오기
      console.log("🔍 토큰 매니저에서 액세스 토큰 가져오는 중...");
      const accessToken = await tokenManager.getAccessToken();
      console.log("🔄 액세스 토큰:", accessToken);

      if (!accessToken) {
        console.error("❌ 액세스 토큰이 없습니다!");
        console.log(
          "🔍 sessionStorage 직접 확인:",
          sessionStorage.getItem("accessToken")
        );
        throw new Error("액세스 토큰을 찾을 수 없습니다. 다시 로그인해주세요.");
      }

      // URL 객체로 안전하게 결합하여 // 이중 슬래시 방지
      const kycUrl = new URL("/api/v1/user/kyc", apiBaseUrl);
      const kycResponse = await fetch(kycUrl.toString(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken, // Bearer 토큰 포함
        },
      });
      console.log("🔄 KYC API 호출 완료:", kycResponse);

      if (!kycResponse.ok) {
        throw new Error(
          `KYC API 호출 실패: ${kycResponse.status} ${kycResponse.statusText}`
        );
      }

      const kycResult = await kycResponse.json();
      console.log("✅ KYC API 호출 완료:", kycResult);

      // 2. XRPL Credential Accept (기존 로직)
      console.log("🚀 XRPL Credential Accept 시작...");

      // 실제 credentialAccept 함수 호출 (필요시)
      // await credentialAccept({...});

      // 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("✅ 전체 프로세스 완료!");
      closeModal();

      // 성공 토스트 (필요시)
      // toast.success("KYC 인증 및 Credential 설정이 완료되었습니다!");
    } catch (error) {
      console.error("❌ 프로세스 실패:", error);
      // 에러 토스트 (필요시)
      // toast.error("인증 과정에서 오류가 발생했습니다. 다시 시도해주세요.");
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
