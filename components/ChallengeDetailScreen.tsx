import Image from "next/image";
import React from "react";
import {
  ArrowLeft,
  Users,
  Calendar,
  DollarSign,
  Target,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface ChallengeDetailScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  appState: any;
}

export default function ChallengeDetailScreen({
  navigateToScreen,
  appState,
}: ChallengeDetailScreenProps) {
  const defaultChallenge = {
    id: 1,
    title: "Morning Meditation Challenge",
    description:
      "Start your day with 10 minutes of mindfulness and inner peace",
    duration: 21,
    participationFee: 50,
    maxRefund: 30,
    refundRate: 100,
    participants: 67,
    category: "Wellness",
    difficulty: "Beginner",
    startDate: "Sept 10",
    sponsorLogo:
      "https://images.unsplash.com/photo-1670850664664-d8ed42d767fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYW55JTIwbG9nbyUyMGJyYW5kJTIwc3ltYm9sfGVufDF8fHx8MTc1NzA5MjQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sponsorName: "Mindful Co.",
    rules: [
      "Meditate for at least 10 minutes each morning",
      "Upload a photo or screenshot of your meditation app",
      "Include a brief reflection in your post",
      "Complete before 10 AM each day",
    ],
    rewards: [
      "Partial refund up to $30",
      "🎖 NFT Achievement Badge",
      "Sponsor Reward: 50% off meditation app premium",
    ],
    timeLeft: "2 days left to join",
    successRate: 78,
  };

  const challenge = {
    ...defaultChallenge,
    ...appState.selectedChallenge,
    rules: appState.selectedChallenge?.rules || defaultChallenge.rules,
    rewards: appState.selectedChallenge?.rewards || defaultChallenge.rewards,
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-[#d5ece0] text-[#3ba935] border-[#3ba935]";
      case "Medium":
        return "bg-[#fff3da] text-[#fea800] border-[#fea800]";
      case "Hard":
        return "bg-[#fde8e8] text-[#e3524f] border-[#e3524f]";
      default:
        return "bg-[#eaecf0] text-[#686873] border-[#686873]";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Wellness":
        return "bg-[#f6f9ff] text-[#3843ff]";
      case "Digital Detox":
        return "bg-[#fde8e8] text-[#e3524f]";
      case "Self-Development":
        return "bg-[#fff3da] text-[#fea800]";
      case "Fitness":
        return "bg-[#d5ece0] text-[#3ba935]";
      default:
        return "bg-[#eaecf0] text-[#686873]";
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f9ff] flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-[#eaecf0]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateToScreen("challenges")}
              className="w-12 h-12 p-0 bg-white border border-[#eaecf0] rounded-2xl hover:bg-gray-50 mr-4"
            >
              <ArrowLeft className="h-5 w-5 text-[#040415]" />
            </Button>
            <h1 className="text-2xl font-bold text-[#040415] tracking-tight">
              Challenge Details
            </h1>
          </div>

          {/* Sponsor Logo Area - Top Right */}
          {challenge.sponsorLogo && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#686873] font-medium">
                Sponsored by
              </span>
              <div className="w-10 h-10 bg-white rounded-lg border border-[#eaecf0] flex items-center justify-center overflow-hidden">
                <img
                  src={challenge.sponsorLogo}
                  alt={challenge.sponsorName}
                  className="w-6 h-6 object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 pb-32">
        {/* Top Section - Challenge Details */}
        <div className="space-y-4">
          {/* Title */}
          <h2 className="text-2xl font-bold text-[#040415] leading-tight">
            {challenge.title}
          </h2>

          {/* Difficulty + Tag Badges */}
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getDifficultyColor(
                challenge.difficulty
              )}`}
            >
              {challenge.difficulty}
            </div>
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${getCategoryColor(
                challenge.category
              )}`}
            >
              #{challenge.category}
            </div>
          </div>

          {/* Short Description */}
          <p className="text-base text-[#686873] leading-relaxed">
            {challenge.description}
          </p>
        </div>

        {/* Challenge Information Card */}
        <Card
          className="bg-white p-6 rounded-[20px] border border-[#eaecf0]"
          style={{ boxShadow: "0px 4px 16px 0px rgba(35, 44, 93, 0.08)" }}
        >
          <h3 className="text-lg font-semibold text-[#040415] mb-5">
            Challenge Information
          </h3>

          <div className="space-y-4">
            {/* Duration */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#f6f9ff] rounded-xl flex items-center justify-center">
                <Calendar className="h-5 w-5 text-[#3843ff]" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[#686873]">
                  Duration
                </div>
                <div className="text-base font-semibold text-[#040415]">
                  {challenge.duration} days
                </div>
              </div>
            </div>

            {/* Start Date */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#f6f9ff] rounded-xl flex items-center justify-center">
                <Calendar className="h-5 w-5 text-[#3843ff]" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[#686873]">
                  Start Date
                </div>
                <div className="text-base font-semibold text-[#040415]">
                  {challenge.startDate}
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#d5ece0] rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-[#3ba935]" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[#686873]">
                  Participants
                </div>
                <div className="text-base font-semibold text-[#040415]">
                  {challenge.participants} joined
                </div>
              </div>
            </div>

            {/* Achievement NFT */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#fff3da] rounded-xl flex items-center justify-center">
                <span className="text-lg">🎖</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[#686873]">
                  Achievement NFT
                </div>
                <div className="text-base font-semibold text-[#040415]">
                  Completion Badge
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Breakdown Card */}
        <Card
          className="bg-white p-6 rounded-[20px] border border-[#eaecf0]"
          style={{ boxShadow: "0px 4px 16px 0px rgba(35, 44, 93, 0.08)" }}
        >
          <h3 className="text-lg font-semibold text-[#040415] mb-5 flex items-center gap-2">
            💰 Payment Breakdown
          </h3>

          <div className="space-y-4">
            {/* Entry Fee */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#686873]">
                Entry Fee (Refundable):
              </span>
              <span className="text-base font-semibold text-[#040415]">
                ${challenge.maxRefund}
              </span>
            </div>

            {/* Service Fee */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#686873]">
                Service Fee (Non-refundable):
              </span>
              <span className="text-base font-semibold text-[#040415]">
                ${challenge.participationFee - challenge.maxRefund}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-[#eaecf0] my-3"></div>

            {/* Total Payment */}
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-[#040415]">
                Total Payment:
              </span>
              <span className="text-lg font-bold text-[#040415]">
                ${challenge.participationFee}
              </span>
            </div>

            {/* Max Refund Highlight Box */}
            <div className="mt-4 p-4 bg-gradient-to-r from-[#f6f9ff] to-[#e8ecff] rounded-xl border border-[#3843ff]/20">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <div>
                  <div className="text-lg font-bold text-[#3843ff]">
                    Max Refund: ${challenge.maxRefund}
                  </div>
                  <div className="text-sm text-[#686873]">
                    Based on your success rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Challenge Stats Section */}
        <Card
          className="bg-white p-6 rounded-[20px] border border-[#eaecf0]"
          style={{ boxShadow: "0px 4px 16px 0px rgba(35, 44, 93, 0.08)" }}
        >
          <h3 className="text-lg font-semibold text-[#040415] mb-4">
            Challenge Stats
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#686873]">
                Success Rate
              </span>
              <span className="text-lg font-bold text-[#3843ff]">
                {challenge.successRate}%
              </span>
            </div>
            <Progress
              value={challenge.successRate}
              className="h-3 bg-[#eaecf0] rounded-full"
              style={{
                background: "#eaecf0",
              }}
            />
            <div className="text-xs text-[#9b9ba1] mt-2">
              Based on completion rate of previous participants
            </div>
          </div>
        </Card>

        {/* Challenge Rules Section */}
        <Card
          className="bg-white p-6 rounded-[20px] border border-[#eaecf0]"
          style={{ boxShadow: "0px 4px 16px 0px rgba(35, 44, 93, 0.08)" }}
        >
          <h3 className="text-lg font-semibold text-[#040415] mb-5 flex items-center gap-2">
            <Target className="h-5 w-5 text-[#3843ff]" />
            Challenge Rules
          </h3>

          <div className="space-y-4">
            {challenge.rules.map((rule, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#3843ff] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm text-[#040415] leading-relaxed flex-1 pt-1">
                  {rule}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Rewards Section */}
        <Card
          className="bg-white p-6 rounded-[20px] border border-[#eaecf0]"
          style={{ boxShadow: "0px 4px 16px 0px rgba(35, 44, 93, 0.08)" }}
        >
          <h3 className="text-lg font-semibold text-[#040415] mb-5 flex items-center gap-2">
            <Star className="h-5 w-5 text-[#fea800]" />
            Rewards
          </h3>

          <div className="space-y-4">
            {challenge.rewards.map((reward, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-3 h-3 bg-[#3ba935] rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-sm text-[#040415] leading-relaxed flex-1">
                  {reward}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* CTA Section - Bottom Fixed */}
      <div
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-[#eaecf0] p-6 space-y-3"
        style={{ boxShadow: "0px -4px 16px 0px rgba(35, 44, 93, 0.08)" }}
      >
        <Button
          onClick={() =>
            navigateToScreen("payment-confirmation", { challenge })
          }
          className="w-full bg-[#3843ff] hover:bg-[#6b73ff] text-white py-4 rounded-xl font-semibold text-base transition-all"
        >
          Join Challenge
        </Button>

        <p className="text-center text-xs text-[#9b9ba1]">
          Confirm payment on the next screen
        </p>
      </div>
    </div>
  );
}
