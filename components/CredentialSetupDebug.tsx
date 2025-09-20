"use client";

import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { credentialSetupDebug } from "@/lib/credentials/useCredentialSetup";

export default function CredentialSetupDebug() {
  const [status, setStatus] = React.useState<string>("Ready");

  const checkStatus = () => {
    setStatus("Credential Setup 모달이 매번 로그인 시 표시됩니다");
    console.log("📊 Credential Setup Status: 매번 표시 모드");
  };

  const forceShow = () => {
    credentialSetupDebug.forceShow();
    setStatus("강제 표시 설정됨");
    console.log("🔧 Credential Setup 강제 표시 설정");
  };

  React.useEffect(() => {
    checkStatus();
  }, []);

  return (
    <Card className="p-4 bg-yellow-50 border-yellow-200">
      <h3 className="text-lg font-semibold text-yellow-800 mb-4">
        🔧 Credential Setup Debug Panel
      </h3>

      <div className="space-y-3">
        <div className="flex space-x-2">
          <Button onClick={checkStatus} variant="outline" size="sm">
            Status Check
          </Button>
          <Button onClick={forceShow} variant="outline" size="sm">
            Force Show
          </Button>
        </div>

        <div className="mt-4 p-3 bg-white rounded-lg border">
          <h4 className="font-medium text-gray-900 mb-2">Current Status:</h4>
          <div className="text-sm">
            <p>{status}</p>
          </div>
        </div>

        <div className="text-xs text-gray-600 mt-3">
          <p>
            <strong>Usage:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>Status Check: 현재 상태 확인</li>
            <li>Force Show: 모달 강제 표시</li>
          </ul>
          <p className="mt-2 text-gray-500">
            현재 매번 로그인 시 Credential Setup 모달이 표시됩니다.
          </p>
        </div>
      </div>
    </Card>
  );
}
