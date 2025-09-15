import Image from "next/image";
import React from "react";
import {
  ArrowLeft,
  CheckCircle,
  CheckSquare,
  Clock,
  XCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { HashtagList } from "./HashtagChip";

interface ProofDetailScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  appState: any;
}

export default function ProofDetailScreen({
  navigateToScreen,
  appState,
}: ProofDetailScreenProps) {
  // Get proof data from app state or use default
  const proof = appState?.selectedProof || {
    id: 1,
    challengeName: "Morning Run Challenge",
    uploadDate: "2024-01-15",
    uploadTime: "07:32 AM",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
    description:
      "Completed my 5K morning run today! The weather was perfect and I felt great throughout the entire run. This challenge has really helped me build a consistent routine.",
    hashtags: ["MorningRun", "Fitness", "Healthy", "Challenge", "Motivation"],
    status: "approved", // 'approved', 'pending', 'failed'
  };

  const getStatusIcon = () => {
    switch (proof.status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-[#3ba935]" />;
      case "pending":
        return <Clock className="h-5 w-5 text-[#fea800]" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-[#e3524f]" />;
      default:
        return <Clock className="h-5 w-5 text-[#fea800]" />;
    }
  };

  const getStatusColor = () => {
    switch (proof.status) {
      case "approved":
        return "bg-[#d5ece0] text-[#3ba935] border-[#3ba935]/20";
      case "pending":
        return "bg-[#fff3da] text-[#fea800] border-[#fea800]/20";
      case "failed":
        return "bg-[#fce8e8] text-[#e3524f] border-[#e3524f]/20";
      default:
        return "bg-[#fff3da] text-[#fea800] border-[#fea800]/20";
    }
  };

  const getStatusText = () => {
    switch (proof.status) {
      case "approved":
        return "Approved";
      case "pending":
        return "Pending";
      case "failed":
        return "Failed";
      default:
        return "Pending";
    }
  };

  const formatDate = (date: string, time: string) => {
    const dateObj = new Date(date);
    return `${dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })} at ${time}`;
  };

  const handleBackNavigation = () => {
    // Navigate back to the screen we came from, default to 'profile' if not specified
    const targetScreen = appState?.fromScreen || "profile";
    navigateToScreen(targetScreen);
  };

  const handleHashtagClick = (hashtag: string) => {
    // Navigate to search screen with hashtag pre-filled
    navigateToScreen("search", { searchQuery: hashtag });
  };

  return (
    <div className="min-h-screen bg-[#f6f9ff] flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-[#eaecf0] crypto-shadow">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={handleBackNavigation}
          >
            <ArrowLeft className="h-5 w-5 text-[#040415]" />
          </Button>
          <div className="flex-1 text-center">
            <p className="text-sm text-[#686873]">
              {formatDate(proof.uploadDate, proof.uploadTime)}
            </p>
            <h1 className="font-medium text-[#040415]">
              {proof.challengeName}
            </h1>
          </div>
          <div className="w-9" /> {/* Spacer for centering header */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Large Proof Photo */}
        <div className="flex-1 bg-[rgba(0,0,0,0)] flex items-center justify-center p-4">
          {proof.image ? (
            <img
              src={proof.image}
              alt="Proof submission"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          ) : (
            <div className="w-full max-w-sm aspect-square bg-[#d7d9ff] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <CheckSquare className="h-16 w-16 text-[#3843ff] mx-auto mb-4" />
                <p className="text-[#3843ff] font-medium">
                  Checklist Completed
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Description and Status */}
        <div className="bg-white border-t border-[#eaecf0]">
          {/* User Description */}
          {proof.description && (
            <div className="px-6 py-4 border-b border-[#eaecf0] text-[rgba(255,255,255,1)]">
              <p className="text-[#040415] leading-relaxed mb-4">
                {proof.description}
              </p>

              {/* Hashtags - Always show with fallback */}
              <HashtagList
                hashtags={
                  proof.hashtags && proof.hashtags.length > 0
                    ? proof.hashtags
                    : [
                        "MorningRun",
                        "Fitness",
                        "Healthy",
                        "Challenge",
                        "Motivation",
                      ]
                }
                onHashtagClick={handleHashtagClick}
              />
            </div>
          )}

          {/* Status Badge */}
          <div className="px-6 py-6 flex justify-center">
            <div
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl border ${getStatusColor()}`}
            >
              {getStatusIcon()}
              <span className="font-medium">{getStatusText()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
