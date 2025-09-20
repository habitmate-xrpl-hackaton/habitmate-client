import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Plus,
  Users,
  Target,
  Calendar,
  DollarSign,
  Clock,
  FolderOpen,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import useSWR from "swr";
import ky from "ky";
import { log } from "console";

interface ChallengesScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  appState?: any;
}

export default function ChallengesScreen({
  navigateToScreen,
  appState,
}: ChallengesScreenProps) {
  // Check if we should open Brand Challenges tab based on navigation data
  const initialTab = appState?.selectedTab || "group";
  const [activeTab, setActiveTab] = useState(initialTab);
  // const { data } = useSWR("/api/getChallenges");
  // console.log("data : ", data);
  // const { data: logs } = useSWR(`/api/getChallenges`);
  // console.log("logs : ", logs);

  // useEffect(() => {
  //   async function fetchChallenges() {
  //     const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  //     const response = await ky.get(`${API_BASE_URL}/public-challenges`);
  //     console.log("response : ", response);
  //   }
  //   fetchChallenges();
  // }, []);

  // async function fetchChallenges() {
  //   const response = await ky.get(
  //     `https://xrpl-4mf9.onrender.com/api/v1/getChallenges`
  //   );
  //   const data = await response.json();
  //   console.log("data : ", data);
  // }

  // useEffect(() => {
  //   fetchChallenges();
  // }, []);

  const groupChallenges = [
    {
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
      timeLeft: "2 days to join",
      successRate: 78,
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
    },
    {
      id: 2,
      title: "Digital Detox Challenge",
      description:
        "Take a complete break from social media platforms and reclaim your time",
      duration: 7,
      participationFee: 40,
      maxRefund: 25,
      refundRate: 100,
      participants: 128,
      category: "Digital Detox",
      difficulty: "Hard",
      startDate: "Sept 15",
      timeLeft: "5 days to join",
      successRate: 65,
      sponsorLogo:
        "https://images.unsplash.com/photo-1670850664664-d8ed42d767fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYW55JTIwbG9nbyUyMGJyYW5kJTIwc3ltYm9sfGVufDF8fHx8MTc1NzA5MjQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      sponsorName: "Focus Labs",
      rules: [
        "Avoid all social media platforms",
        "Upload a screenshot of your screen time daily",
        "Write a brief reflection on your experience",
        "Use alternative activities when feeling urges",
      ],
      rewards: [
        "Partial refund up to $25",
        "🎖 NFT Achievement Badge",
        "Sponsor Reward: Premium productivity tools voucher",
      ],
    },
    {
      id: 3,
      title: "Daily Journaling Habit",
      description:
        "Write down your thoughts, reflections, and daily experiences",
      duration: 30,
      participationFee: 60,
      maxRefund: 40,
      refundRate: 80,
      participants: 89,
      category: "Self-Development",
      difficulty: "Medium",
      startDate: "Sept 12",
      timeLeft: "1 day to join",
      successRate: 72,
      sponsorLogo:
        "https://images.unsplash.com/photo-1670850664664-d8ed42d767fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYW55JTIwbG9nbyUyMGJyYW5kJTIwc3ltYm9sfGVufDF8fHx8MTc1NzA5MjQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      sponsorName: "Growth Books",
      rules: [
        "Write at least 300 words daily",
        "Upload a photo of your journal entry",
        "Reflect on your day and goals",
        "Complete before bedtime",
      ],
      rewards: [
        "Partial refund up to $40",
        "🎖 NFT Achievement Badge",
        "Sponsor Reward: Personal development eBook bundle",
      ],
    },
  ];

  const brandChallenges = [
    {
      id: 4,
      title: "Nike Run Club Marathon",
      description: "Run 100km in 30 days with Nike Run Club app tracking",
      duration: 30,
      participationFee: 60,
      maxRefund: 30,
      refundRate: 120,
      participants: 234,
      category: "Fitness",
      difficulty: "Hard",
      sponsorLogo:
        "https://images.unsplash.com/photo-1670850664664-d8ed42d767fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYW55JTIwbG9nbyUyMGJyYW5kJTIwc3ltYm9sfGVufDF8fHx8MTc1NzA5MjQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      sponsorName: "Nike",
      startDate: "Sept 20",
      timeLeft: "3 days to join",
      successRate: 85,
      rules: [
        "Complete at least 3.3km run daily",
        "Use Nike Run Club app to track runs",
        "Upload screenshot of completed runs",
        "Maintain consistent pace throughout challenge",
      ],
      rewards: [
        "Partial refund up to $30",
        "🎖 NFT Achievement Badge",
        "Sponsor Reward: Nike merchandise voucher",
      ],
    },
    {
      id: 5,
      title: "Headspace Mindfulness Journey",
      description:
        "Complete daily meditation sessions with Headspace premium content",
      duration: 14,
      participationFee: 50,
      maxRefund: 35,
      refundRate: 110,
      participants: 156,
      category: "Wellness",
      difficulty: "Beginner",
      sponsorLogo:
        "https://images.unsplash.com/photo-1670850664664-d8ed42d767fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYW55JTIwbG9nbyUyMGJyYW5kJTIwc3ltYm9sfGVufDF8fHx8MTc1NzA5MjQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      sponsorName: "Headspace",
      startDate: "Sept 18",
      timeLeft: "4 days to join",
      successRate: 88,
      rules: [
        "Complete daily 10-minute meditation",
        "Use Headspace app for sessions",
        "Upload screenshot of completed session",
        "Rate your mindfulness level daily",
      ],
      rewards: [
        "Partial refund up to $35",
        "🎖 NFT Achievement Badge",
        "Sponsor Reward: Headspace premium subscription (1 month)",
      ],
    },
  ];

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
        return "bg-[#f6f9ff] text-[#3843ff] border-[#3843ff]";
      case "Digital Detox":
        return "bg-[#fde8e8] text-[#e3524f] border-[#e3524f]";
      case "Self-Development":
        return "bg-[#fff3da] text-[#fea800] border-[#fea800]";
      case "Fitness":
        return "bg-[#d5ece0] text-[#3ba935] border-[#3ba935]";
      default:
        return "bg-[#eaecf0] text-[#686873] border-[#686873]";
    }
  };

  const ChallengeCard = ({ challenge }: { challenge: any }) => (
    <div
      className="bg-white rounded-[20px] p-6 cursor-pointer transition-all hover:shadow-lg border border-[#eaecf0] relative"
      style={{ boxShadow: "0px 4px 16px 0px rgba(35, 44, 93, 0.08)" }}
      onClick={() => navigateToScreen("challenge-detail", { challenge })}
    >
      {/* Sponsor Logo - Top Right */}
      {challenge.sponsorLogo && (
        <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-lg border border-[#eaecf0] flex items-center justify-center overflow-hidden">
          <img
            src={challenge.sponsorLogo}
            alt={challenge.sponsorName}
            className="w-6 h-6 object-contain"
          />
        </div>
      )}
      {/* Title + Description */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#040415] mb-2 leading-tight">
          {challenge.title}
        </h3>
        <p className="text-sm text-[#686873] leading-relaxed">
          {challenge.description}
        </p>
      </div>

      {/* Difficulty + Tag Badges */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getDifficultyColor(
            challenge.difficulty
          )}`}
        >
          {challenge.difficulty}
        </div>
        <div
          className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getCategoryColor(
            challenge.category
          )}`}
        >
          {challenge.category}
        </div>
      </div>

      {/* Certification Method */}
      <div className="flex items-center gap-2 mb-4 p-3 bg-[#f6f9ff] rounded-xl border border-[#eaecf0]">
        <FolderOpen className="h-4 w-4 text-[#3843ff]" />
        <span className="text-sm font-medium text-[#040415]">File Upload</span>
      </div>

      {/* Details Row */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-xs">
        <div className="text-center">
          <div className="font-semibold text-[#040415] mb-1">
            {challenge.duration} days
          </div>
          <div className="text-[#9b9ba1]">Duration</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-[#040415] mb-1">
            Starts {challenge.startDate}
          </div>
          <div className="text-[#9b9ba1]">Start Date</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-[#040415] mb-1">
            {challenge.participants} joined
          </div>
          <div className="text-[#9b9ba1]">Participants</div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="mb-4 space-y-2">
        {/* Max Refund */}
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <span className="text-base font-bold text-[#3843ff]">
            Max Refund: ${challenge.maxRefund}
          </span>
        </div>

        {/* Service Fee */}
        <div className="flex items-center gap-2">
          <span className="text-lg">💼</span>
          <span className="text-sm text-[#686873]">
            Service Fee: ${challenge.participationFee - challenge.maxRefund}{" "}
            (Non-refundable)
          </span>
        </div>
      </div>

      {/* Refund Rule */}
      <div className="mb-4 text-sm">
        <span className="text-[#3ba935] font-medium">
          ✅ Success → Daily refund
        </span>
        <span className="text-[#9b9ba1] mx-2">|</span>
        <span className="text-[#e3524f] font-medium">❌ Fail → Donation</span>
      </div>

      {/* Reward */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">🎖</span>
        <span className="text-sm font-medium text-[#040415]">
          Achievement NFT
        </span>
      </div>

      {/* CTA Button */}
      <div className="flex justify-end">
        <Button
          className="bg-[#3843ff] hover:bg-[#6b73ff] text-white px-6 py-2.5 rounded-xl font-medium transition-all"
          onClick={(e) => {
            e.stopPropagation();
            navigateToScreen("challenge-detail", { challenge });
          }}
        >
          View Details
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f6f9ff] flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-[#eaecf0]">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen("explore")}
            className="w-12 h-12 p-0 bg-white border border-[#eaecf0] rounded-2xl hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5 text-[#040415]" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#040415] text-center tracking-tight">
              Challenges
            </h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen("create-challenge")}
            className="w-12 h-12 p-0 bg-white border border-[#eaecf0] rounded-2xl hover:bg-gray-50"
          >
            <Plus className="h-5 w-5 text-[#040415]" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 pb-6">
        {/* Tab Selector */}
        <div className="bg-[#eaecf0] p-0.5 rounded-2xl mb-6 flex">
          <div
            className={`flex-1 py-3 px-4 rounded-2xl transition-all ${
              activeTab === "group" ? "bg-white shadow-sm" : ""
            }`}
          >
            <button
              onClick={() => setActiveTab("group")}
              className={`text-sm font-medium w-full text-center transition-colors ${
                activeTab === "group" ? "text-[#040415]" : "text-[#686873]"
              }`}
            >
              Group Challenges
            </button>
          </div>
          <div
            className={`flex-1 py-3 px-4 rounded-2xl transition-all ${
              activeTab === "brand" ? "bg-white shadow-sm" : ""
            }`}
          >
            <button
              onClick={() => setActiveTab("brand")}
              className={`text-sm font-medium w-full text-center transition-colors ${
                activeTab === "brand" ? "text-[#040415]" : "text-[#686873]"
              }`}
            >
              Brand Challenges
            </button>
          </div>
        </div>

        {/* Challenges List */}
        <div className="space-y-5">
          {activeTab === "group"
            ? groupChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))
            : brandChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
        </div>
      </div>
    </div>
  );
}
