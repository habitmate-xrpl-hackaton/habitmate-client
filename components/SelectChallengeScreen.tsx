import React from "react";
import { ArrowLeft, Users, User, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface SelectChallengeScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
}

export default function SelectChallengeScreen({
  navigateToScreen,
}: SelectChallengeScreenProps) {
  const challenges = [
    {
      id: 1,
      name: "30-Day Morning Run",
      type: "Solo",
      progress: "Day 15 of 30",
      status: "in-progress",
      color: "bg-blue-100",
      icon: "🏃",
      daysLeft: 15,
      completedToday: false,
    },
    {
      id: 2,
      name: "Daily Reading Club",
      type: "Club",
      progress: "Day 22 of 30",
      status: "in-progress",
      color: "bg-green-100",
      icon: "📚",
      daysLeft: 8,
      completedToday: true,
    },
    {
      id: 3,
      name: "Meditation Challenge",
      type: "Solo",
      progress: "Day 5 of 21",
      status: "near-deadline",
      color: "bg-purple-100",
      icon: "🧘",
      daysLeft: 16,
      completedToday: false,
    },
    {
      id: 4,
      name: "Swimming Squad",
      type: "Club",
      progress: "Day 28 of 30",
      status: "near-deadline",
      color: "bg-cyan-100",
      icon: "🏊",
      daysLeft: 2,
      completedToday: false,
    },
  ];

  const handleSelectChallenge = (challenge: any) => {
    navigateToScreen("proof-upload", { selectedChallenge: challenge });
  };

  const getStatusBadge = (status: string, completedToday: boolean) => {
    if (completedToday) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    }

    if (status === "near-deadline") {
      return (
        <Badge className="bg-orange-100 text-orange-800 border-orange-200">
          <Clock className="h-3 w-3 mr-1" />
          Due Soon
        </Badge>
      );
    }

    return (
      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
        In Progress
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f9ff] flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-[#eaecf0]">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen("home")}
            className="w-12 h-12 p-0 bg-white border border-[#eaecf0] rounded-2xl hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5 text-[#040415]" />
          </Button>
          <h1 className="text-2xl font-bold text-[#040415] tracking-tight">
            Select Challenge
          </h1>
          <div className="w-12 h-12"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#040415] mb-2">
            Active Challenges
          </h2>
          <p className="text-sm text-[#9b9ba1]">
            Choose which challenge you want to upload proof for
          </p>
        </div>

        {/* Challenge List */}
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white rounded-2xl p-4 crypto-shadow border border-[#eaecf0] transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div
                    className={`w-12 h-12 ${challenge.color} rounded-xl flex items-center justify-center`}
                  >
                    <span className="text-xl">{challenge.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[#040415] mb-1">
                      {challenge.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1 text-xs text-[#9b9ba1]">
                        {challenge.type === "Club" ? (
                          <Users className="h-3 w-3" />
                        ) : (
                          <User className="h-3 w-3" />
                        )}
                        <span>{challenge.type}</span>
                      </div>
                      <span className="text-xs text-[#9b9ba1]">•</span>
                      <span className="text-xs text-[#9b9ba1]">
                        {challenge.progress}
                      </span>
                    </div>
                    {getStatusBadge(challenge.status, challenge.completedToday)}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-[#eaecf0] rounded-full h-2">
                  <div
                    className="bg-[#3843ff] h-2 rounded-full transition-all"
                    style={{
                      width: `${
                        (parseInt(challenge.progress.split(" ")[1]) /
                          parseInt(challenge.progress.split(" ")[3])) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-[#9b9ba1]">
                    {challenge.progress}
                  </span>
                  <span className="text-xs text-[#9b9ba1]">
                    {challenge.daysLeft} days left
                  </span>
                </div>
              </div>

              {/* Choose Button */}
              <Button
                onClick={() => handleSelectChallenge(challenge)}
                disabled={challenge.completedToday}
                className={`w-full rounded-xl py-3 ${
                  challenge.completedToday
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "crypto-gradient text-white hover:opacity-90"
                }`}
              >
                {challenge.completedToday
                  ? "Already Completed"
                  : "Choose This Challenge"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
