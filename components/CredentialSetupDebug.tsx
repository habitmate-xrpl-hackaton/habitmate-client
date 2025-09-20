"use client";

import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { credentialSetupDebug } from "@/lib/credentials/useCredentialSetup";

export default function CredentialSetupDebug() {
  const [status, setStatus] = React.useState<any>(null);

  const checkStatus = () => {
    const currentStatus = credentialSetupDebug.getStatus();
    setStatus(currentStatus);
    console.log("📊 Credential Setup Status:", currentStatus);
  };

  const resetAll = () => {
    credentialSetupDebug.resetAll();
    checkStatus();
  };

  const resetForCurrentUser = () => {
    // 현재 사용자 이메일을 가져와서 리셋 (실제로는 세션에서 가져와야 함)
    const email = prompt("리셋할 사용자 이메일을 입력하세요:");
    if (email) {
      credentialSetupDebug.resetForUser(email);
      checkStatus();
    }
  };

  const forceShowForUser = () => {
    const email = prompt("강제 표시할 사용자 이메일을 입력하세요:");
    if (email) {
      credentialSetupDebug.forceShow(email);
      checkStatus();
    }
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
          <Button onClick={resetAll} variant="destructive" size="sm">
            Reset All
          </Button>
        </div>

        <div className="flex space-x-2">
          <Button onClick={resetForCurrentUser} variant="outline" size="sm">
            Reset User
          </Button>
          <Button onClick={forceShowForUser} variant="outline" size="sm">
            Force Show
          </Button>
        </div>

        {status && (
          <div className="mt-4 p-3 bg-white rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">Current Status:</h4>
            <div className="text-sm space-y-1">
              <p>
                <strong>Has Shown Before:</strong>{" "}
                {status.hasShownBefore ? "✅ Yes" : "❌ No"}
              </p>
              <p>
                <strong>User Email:</strong> {status.userEmail || "None"}
              </p>
              <p>
                <strong>Last Check:</strong> {status.timestamp}
              </p>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-600 mt-3">
          <p>
            <strong>Usage:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>Status Check: 현재 상태 확인</li>
            <li>Reset All: 모든 사용자 데이터 리셋</li>
            <li>Reset User: 특정 사용자 데이터 리셋</li>
            <li>Force Show: 특정 사용자에게 모달 강제 표시</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
