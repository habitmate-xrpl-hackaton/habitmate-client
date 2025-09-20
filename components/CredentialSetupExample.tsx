"use client";

import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Shield, ArrowRight } from "lucide-react";
import CredentialSetupModal, {
  useCredentialSetupModal,
} from "./CredentialSetupModal";
import CredentialSetupModalWithXRPL, {
  useCredentialSetupModalWithXRPL,
} from "./CredentialSetupModalWithXRPL";

export default function CredentialSetupExample() {
  // 기본 모달 (시뮬레이션)
  const basicModal = useCredentialSetupModal();

  // XRPL 연동 모달
  const xrplModal = useCredentialSetupModalWithXRPL();

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-8 w-8 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              XRPL Credential Setup
            </h3>
            <p className="text-sm text-gray-600">
              Complete your credential setup to access blockchain features
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Basic Modal (Simulation) */}
          <Button
            onClick={basicModal.openModal}
            variant="outline"
            className="w-full justify-between border-blue-200 hover:bg-blue-50"
          >
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Demo Credential Setup</span>
            </div>
            <ArrowRight className="h-4 w-4" />
          </Button>

          {/* XRPL Integrated Modal */}
          <Button
            onClick={() =>
              xrplModal.openModal({
                credentialType: "DRIVER_LICENCE",
              })
            }
            className="w-full justify-between bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>XRPL Credential Setup</span>
            </div>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 p-3 bg-blue-100 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Note:</strong> XRPL Credential Setup requires proper
            environment variables (ADMIN_SEED, USER_SEED) to be configured in
            your .env.local file.
          </p>
        </div>
      </Card>

      {/* Challenge Example (like in the image) */}
      <Card className="p-6">
        <h4 className="font-semibold text-gray-900 mb-2">30-Day Morning Run</h4>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Entry Fee</span>
          <span className="font-medium">10 XRP</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Complete this challenge requires XRPL credential verification
        </p>
      </Card>

      {/* Modals */}
      <CredentialSetupModal
        isOpen={basicModal.isOpen}
        onClose={basicModal.closeModal}
        onAccept={() => {
          console.log("Demo credential accepted!");
          basicModal.closeModal();
        }}
        isLoading={basicModal.isLoading}
      />

      <CredentialSetupModalWithXRPL
        isOpen={xrplModal.isOpen}
        onClose={xrplModal.closeModal}
        onAccept={() => {
          console.log("XRPL credential accepted!");
        }}
        issuerSeed={xrplModal.issuerSeed}
        subjectSeed={xrplModal.subjectSeed}
        credentialType={xrplModal.credentialType}
      />
    </div>
  );
}
