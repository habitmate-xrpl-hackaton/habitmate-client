import React from "react";
import Image from "next/image";
import {
  Clock,
  Folder,
  Search,
  Users,
  Briefcase,
  BookOpen,
  Target,
  Plus,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface ExploreScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  appState: any;
}

export default function ExploreScreen({
  navigateToScreen,
  appState,
}: ExploreScreenProps) {
  // Recommended Challenges (formerly Suggested for You)
  const recommendedChallenges = [
    {
      emoji: "🏃‍♂️",
      name: "Morning Run",
      description: "Start your day with energy",
      duration: "30 days",
      participants: 234,
      bgColor: "bg-[#fcdcd3]",
    },
    {
      emoji: "🧘‍♀️",
      name: "Meditation",
      description: "Find your inner peace",
      duration: "21 days",
      participants: 156,
      bgColor: "bg-[#d7d9ff]",
    },
    {
      emoji: "📚",
      name: "Reading",
      description: "Expand your knowledge",
      duration: "14 days",
      participants: 89,
      bgColor: "bg-[#d5ece0]",
    },
  ];

  // Group Challenges - combine hardcoded with user-created ones
  const hardcodedGroupChallenges = [
    {
      emoji: "🏊‍♂️",
      name: "Swimming Squad",
      description: "Daily swimming with the community",
      participants: 127,
      timeLeft: "3 days to join",
    },
    {
      emoji: "🚴‍♀️",
      name: "Cycling Group",
      description: "50km weekly cycling challenge",
      participants: 203,
      timeLeft: "5 days to join",
    },
    {
      emoji: "✍️",
      name: "Writers Circle",
      description: "Daily journaling and reflection",
      participants: 78,
      timeLeft: "2 days to join",
    },
  ];

  // Convert user-created group challenges to display format
  const userGroupChallenges = (appState.groupChallenges || []).map(
    (challenge) => ({
      emoji: "✨", // Default emoji for user-created challenges
      name: challenge.title,
      description: challenge.description,
      participants: challenge.participants || 1,
      timeLeft: "Active now",
    })
  );

  // Combine hardcoded and user-created challenges
  const groupChallenges = [...userGroupChallenges, ...hardcodedGroupChallenges];

  // Brand Challenges (new section)
  const brandChallenges = [
    {
      emoji: "👟",
      name: "Nike Run Group",
      description: "100km in 30 days with Nike",
      sponsor: "Nike",
      participants: 567,
      reward: "120% refund + merch",
      bgColor: "bg-gradient-to-br from-orange-500 to-red-600",
    },
    {
      emoji: "🧘‍♂️",
      name: "Headspace Mindfulness",
      description: "14-day meditation journey",
      sponsor: "Headspace",
      participants: 234,
      reward: "110% refund + premium",
      bgColor: "bg-gradient-to-br from-purple-500 to-indigo-600",
    },
    {
      emoji: "💪",
      name: "Fitbit Step Challenge",
      description: "10,000 steps daily for 21 days",
      sponsor: "Fitbit",
      participants: 445,
      reward: "115% refund + device",
      bgColor: "bg-gradient-to-br from-green-500 to-teal-600",
    },
  ];

  // Resources (formerly Learning)
  const resources = [
    {
      title: "Why should we drink water often?",
      image: "/ce427f7c805cbab99de05e414833474a4c2bd0cf.webp",
      category: "Health",
      readTime: "5 min read",
      bgColor: "bg-gradient-to-br from-blue-600 to-indigo-700",
    },
    {
      title: "Benefits of regular walking",
      image: "/e49e1b41aa4c1dfbe9b36ce2bd48d4d1c05ae1ef.webp",
      category: "Fitness",
      readTime: "3 min read",
      bgColor: "bg-gradient-to-br from-green-600 to-teal-700",
    },
    {
      title: "Building sustainable habits",
      image: "/ce427f7c805cbab99de05e414833474a4c2bd0cf.webp",
      category: "Psychology",
      readTime: "7 min read",
      bgColor: "bg-gradient-to-br from-purple-600 to-pink-700",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f9ff] flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            onClick={() => navigateToScreen("search")}
          >
            <Search className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 pb-24">
        {/* Recommended Challenges */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-sm text-[#040415] font-medium">
              Recommended Challenges
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-[#3843ff] uppercase tracking-wide font-bold"
              onClick={() => navigateToScreen("challenges")}
            >
              View All
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {recommendedChallenges.map((challenge, index) => (
              <Card
                key={index}
                className={`${challenge.bgColor} min-w-[140px] p-4 cursor-pointer hover:scale-105 transition-transform crypto-shadow`}
                onClick={() => navigateToScreen("challenges")}
              >
                <div className="flex flex-col items-start space-y-2">
                  <div className="bg-white rounded-xl p-1.5">
                    <span className="text-lg">{challenge.emoji}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm text-[#040415] font-medium">
                      {challenge.name}
                    </h3>
                    <p className="text-xs text-[#686873]">
                      {challenge.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-[#9b9ba1]">
                      <Users className="h-3 w-3" />
                      <span>{challenge.participants}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Group Challenges */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-sm text-[#040415] font-medium">
              Group Challenges
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-[#3843ff] uppercase tracking-wide font-bold"
              onClick={() => navigateToScreen("challenges")}
            >
              View All
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {groupChallenges.map((challenge, index) => (
              <Card
                key={index}
                className="bg-white min-w-[160px] p-4 cursor-pointer hover:scale-105 transition-transform crypto-shadow border border-[#eaecf0]"
                onClick={() => navigateToScreen("challenges")}
              >
                <div className="flex flex-col items-start space-y-3">
                  <div className="bg-[#f6f9ff] rounded-xl p-1.5 border border-[#eaecf0]">
                    <span className="text-lg">{challenge.emoji}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1 mb-1">
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        Group
                      </Badge>
                    </div>
                    <h3 className="text-sm text-[#040415] font-medium">
                      {challenge.name}
                    </h3>
                    <p className="text-xs text-[#686873]">
                      {challenge.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#9b9ba1] pt-1">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{challenge.participants}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{challenge.timeLeft}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Brand Challenges */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-sm text-[#040415] font-medium">
              Brand Challenges
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-[#3843ff] uppercase tracking-wide font-bold"
              onClick={() =>
                navigateToScreen("challenges", { selectedTab: "brand" })
              }
            >
              View All
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {brandChallenges.map((challenge, index) => (
              <Card
                key={index}
                className={`${challenge.bgColor} min-w-[180px] p-4 text-white cursor-pointer hover:scale-105 transition-transform crypto-shadow`}
                onClick={() => navigateToScreen("challenges")}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{challenge.emoji}</span>
                    <Badge className="bg-white/20 text-white text-xs">
                      Brand
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs opacity-80">
                      Sponsored by {challenge.sponsor}
                    </p>
                    <h3 className="text-sm font-medium">{challenge.name}</h3>
                    <p className="text-xs opacity-90">
                      {challenge.description}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1 opacity-80">
                        <Users className="h-3 w-3" />
                        <span>{challenge.participants} joined</span>
                      </div>
                    </div>
                    <div className="text-xs font-medium bg-white/20 px-2 py-1 rounded-lg">
                      {challenge.reward}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-sm text-[#040415] font-medium">Resources</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-[#3843ff] uppercase tracking-wide font-bold"
            >
              View All
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className={`${resource.bgColor} min-w-[200px] h-32 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform crypto-shadow`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30"
                  style={{ backgroundImage: `url(${resource.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="space-y-2 text-white">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-white/20 text-white text-xs">
                        {resource.category}
                      </Badge>
                      <div className="flex items-center space-x-1 text-xs opacity-80">
                        <BookOpen className="h-3 w-3" />
                        <span>{resource.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-medium leading-tight">
                      {resource.title}
                    </h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={() => navigateToScreen("create-challenge")}
        className="fixed bottom-28 right-6 w-16 h-16 rounded-full bg-[#DDFB24] hover:bg-[#c5e019] text-white shadow-2xl z-50 flex items-center justify-center transition-all duration-200 hover:scale-105"
        style={{
          boxShadow:
            "0 8px 32px rgba(221, 251, 36, 0.4), 0 4px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Plus className="h-8 w-8 text-white" strokeWidth={3} />
        <span className="sr-only">Create Challenge</span>
      </Button>
    </div>
  );
}
