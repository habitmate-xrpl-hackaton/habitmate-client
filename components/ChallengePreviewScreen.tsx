import React from "react";
import {
  ArrowLeft,
  Users,
  Clock,
  DollarSign,
  Trophy,
  Target,
  Calendar,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ChallengePreviewScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  appState: any;
}

export default function ChallengePreviewScreen({
  navigateToScreen,
  appState,
}: ChallengePreviewScreenProps) {
  const challengeData = appState.selectedChallenge || {
    challengeType: "solo",
    title: "Sample Challenge",
    description: "This is a sample challenge description.",
    duration: "30",
    durationUnit: "days",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    category: "fitness",
    difficulty: "medium",
    entryFee: "50",
    currency: "USD",
    maxParticipants: "100",
    rules: ["Complete daily activity", "Upload proof within 24 hours"],
    proofType: "photo",
  };

  const getDifficultyDisplay = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return {
          label: "Easy",
          emoji: "🙂",
          color: "bg-green-100 text-green-800",
        };
      case "medium":
        return {
          label: "Medium",
          emoji: "😐",
          color: "bg-yellow-100 text-yellow-800",
        };
      case "hard":
        return { label: "Hard", emoji: "😓", color: "bg-red-100 text-red-800" };
      default:
        return {
          label: "Medium",
          emoji: "😐",
          color: "bg-yellow-100 text-yellow-800",
        };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "fitness":
        return "💪";
      case "wellness":
        return "🧘";
      case "productivity":
        return "⚡";
      case "learning":
        return "📚";
      case "creativity":
        return "🎨";
      case "social":
        return "👥";
      default:
        return "🎯";
    }
  };

  const difficultyInfo = getDifficultyDisplay(challengeData.difficulty);

  return (
    <div className="min-h-screen bg-[#f6f9ff] flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-[#eaecf0]">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen("create-challenge")}
            className="w-12 h-12 p-0 bg-white border border-[#eaecf0] rounded-2xl hover:bg-gray-50"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-[#040415] tracking-tight flex-1 text-center">
            Challenge Preview
          </h1>
          <div className="w-12"></div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-32">
        {/* Challenge Header */}
        <Card className="bg-white border border-[#eaecf0] crypto-shadow overflow-hidden">
          <div className="bg-gradient-to-br from-[#3843ff] to-[#6b73ff] p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 rounded-full p-3">
                  <span className="text-2xl">
                    {getCategoryIcon(challengeData.category)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold leading-tight">
                    {challengeData.title}
                  </h2>
                  <p className="text-white/80 capitalize">
                    {challengeData.category}
                  </p>
                </div>
              </div>
              <Badge className={`${difficultyInfo.color} font-medium`}>
                {difficultyInfo.emoji} {difficultyInfo.label}
              </Badge>
            </div>

            <p className="text-white/90 leading-relaxed mb-6">
              {challengeData.description}
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-white/80" />
                <p className="text-sm text-white/80">Duration</p>
                <p className="font-semibold">
                  {challengeData.duration} {challengeData.durationUnit}
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-white/80" />
                <p className="text-sm text-white/80">Entry Fee</p>
                <p className="font-semibold">
                  {challengeData.currency === "USD" ? "$" : ""}
                  {challengeData.entryFee}
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-white/80" />
                <p className="text-sm text-white/80">Type</p>
                <p className="font-semibold capitalize">
                  {challengeData.challengeType}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Schedule */}
        <Card className="p-6 bg-white border border-[#eaecf0] crypto-shadow">
          <h3 className="text-lg font-semibold text-[#040415] mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-[#3843ff]" />
            Schedule
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#f6f9ff] rounded-2xl p-4">
              <p className="text-sm text-[#686873] mb-1">Start Date</p>
              <p className="font-semibold text-[#040415]">
                {new Date(challengeData.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="bg-[#f6f9ff] rounded-2xl p-4">
              <p className="text-sm text-[#686873] mb-1">End Date</p>
              <p className="font-semibold text-[#040415]">
                {new Date(challengeData.endDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </Card>

        {/* Group Challenge Info */}
        {challengeData.challengeType === "group" &&
          challengeData.maxParticipants && (
            <Card className="p-6 bg-white border border-[#eaecf0] crypto-shadow">
              <h3 className="text-lg font-semibold text-[#040415] mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-[#3843ff]" />
                Group Details
              </h3>
              <div className="space-y-4">
                <div className="bg-[#f6f9ff] rounded-2xl p-4">
                  <p className="text-sm text-[#686873] mb-1">
                    Max Participants
                  </p>
                  <p className="font-semibold text-[#040415]">
                    {challengeData.maxParticipants} people
                  </p>
                </div>
                {challengeData.groupRules && (
                  <div>
                    <p className="text-sm text-[#686873] mb-2">Group Rules</p>
                    <p className="text-[#040415] leading-relaxed">
                      {challengeData.groupRules}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}

        {/* Reward Summary */}
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            Reward Summary
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-green-700">✅ Complete Challenge</span>
              <span className="font-semibold text-green-800">100% Refund</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-red-600">❌ Fail Challenge</span>
              <span className="font-semibold text-red-700">Deposit Kept</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white/50 rounded-lg">
            <p className="text-xs text-green-700">
              Complete all daily tasks and upload proof within 24 hours to earn
              your full refund plus any bonus rewards!
            </p>
          </div>
        </Card>

        {/* Rules */}
        <Card className="p-6 bg-white border border-[#eaecf0] crypto-shadow">
          <h3 className="text-lg font-semibold text-[#040415] mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-[#3843ff]" />
            Challenge Rules
          </h3>
          <div className="space-y-2">
            {challengeData.rules
              ?.filter((rule) => rule.trim())
              .map((rule, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#3843ff] text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-[#040415] leading-relaxed flex-1">
                    {rule}
                  </p>
                </div>
              )) || (
              <p className="text-[#686873] italic">No specific rules defined</p>
            )}
          </div>
        </Card>

        {/* Proof Requirements */}
        <Card className="p-6 bg-white border border-[#eaecf0] crypto-shadow">
          <h3 className="text-lg font-semibold text-[#040415] mb-4">
            Proof Requirements
          </h3>
          <div className="bg-[#f6f9ff] rounded-2xl p-4">
            <p className="text-sm text-[#686873] mb-1">Required Proof Type</p>
            <p className="font-semibold text-[#040415] capitalize">
              {challengeData.proofType || "Photo"}
            </p>
          </div>
        </Card>

        {/* Current Participants (Mock) */}
        <Card className="p-6 bg-white border border-[#eaecf0] crypto-shadow">
          <h3 className="text-lg font-semibold text-[#040415] mb-4">
            Interested Participants
          </h3>
          <div className="flex items-center justify-between mb-4">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <Avatar key={i} className="h-8 w-8 border-2 border-white">
                  <AvatarImage
                    src={`https://images.unsplash.com/photo-150${
                      7003211169 + i
                    }-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face`}
                  />
                  <AvatarFallback>U{i + 1}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <Badge variant="secondary" className="bg-[#f6f9ff] text-[#3843ff]">
              +23 more interested
            </Badge>
          </div>
          <p className="text-sm text-[#686873]">
            28 people have shown interest in joining this challenge
          </p>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="bg-white border-t border-[#eaecf0] p-6 space-y-3">
        <Button
          onClick={() => navigateToScreen("create-challenge")}
          variant="outline"
          className="w-full border-[#3843ff] text-[#3843ff] hover:bg-[#f6f9ff] py-3 rounded-2xl"
        >
          Edit Challenge
        </Button>
        <Button
          onClick={() => {
            // In a real app, this would create the challenge
            navigateToScreen("challenges");
          }}
          className="w-full crypto-gradient text-white hover:opacity-90 py-3 rounded-2xl font-medium"
        >
          Publish Challenge
        </Button>
      </div>
    </div>
  );
}
