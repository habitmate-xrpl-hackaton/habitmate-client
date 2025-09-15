import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface FollowingScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  appState: any;
}

export default function FollowingScreen({
  navigateToScreen,
}: FollowingScreenProps) {
  return (
    <div className="min-h-screen bg-[#f6f9ff] flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-[#eaecf0]">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen("profile")}
            className="w-10 h-10 p-0 hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5 text-[#040415]" />
          </Button>
          <h1 className="text-lg font-medium text-[#040415]">Following</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4">
        <div className="flex flex-col items-center justify-center py-20">
          <h3 className="text-lg font-medium text-[#040415] mb-2">
            Following Screen
          </h3>
          <p className="text-sm text-[#9b9ba1] text-center px-8">
            This is the following screen
          </p>
        </div>
      </div>
    </div>
  );
}
