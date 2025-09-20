import React, { useState, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, Trophy, Medal, Award, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface LeaderboardScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  appState: any;
}

export default function LeaderboardScreen({
  navigateToScreen,
  appState,
}: LeaderboardScreenProps) {
  const [activeTab, setActiveTab] = useState("overall");
  const [timeFrame, setTimeFrame] = useState("weekly");

  // Touch/drag functionality
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Don't handle touch events for buttons and interactive elements
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest('[role="button"]') ||
      target.closest("a")
    ) {
      return;
    }

    // Don't handle touch events in bottom navigation area (bottom 120px)
    const touchY = e.targetTouches[0].clientY;
    const windowHeight = window.innerHeight;
    if (touchY > windowHeight - 120) {
      return;
    }

    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
    setTouchEnd({ x: 0, y: 0 });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart.x || !touchEnd.x) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = Math.abs(touchStart.y - touchEnd.y);
    const minSwipeDistance = 100;

    if (distanceY < 50 && Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0) {
        navigateToScreen("profile");
      } else {
        navigateToScreen("challenges");
      }
    }

    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;

    // Don't prevent default for buttons and interactive elements
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest('[role="button"]') ||
      target.closest("a")
    ) {
      return;
    }

    // Don't handle mouse events in bottom navigation area (bottom 120px)
    const mouseY = e.clientY;
    const windowHeight = window.innerHeight;
    if (mouseY > windowHeight - 120) {
      return;
    }

    setIsMouseDown(true);
    setTouchStart({ x: e.clientX, y: e.clientY });
    setTouchEnd({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !touchStart.x) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    const deltaX = Math.abs(currentX - touchStart.x);
    const deltaY = Math.abs(currentY - touchStart.y);

    if (!isDragging && (deltaX > 10 || deltaY > 10)) {
      setIsDragging(true);
      if (containerRef.current) {
        containerRef.current.style.cursor = "grabbing";
      }
    }

    if (isDragging) {
      setTouchEnd({ x: currentX, y: currentY });
    }
  };

  const handleMouseUp = () => {
    if (!isMouseDown) return;

    setIsMouseDown(false);

    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }

    if (isDragging && touchStart.x && touchEnd.x) {
      const distanceX = touchStart.x - touchEnd.x;
      const distanceY = Math.abs(touchStart.y - touchEnd.y);
      const minSwipeDistance = 80;

      if (distanceY < 50 && Math.abs(distanceX) > minSwipeDistance) {
        if (distanceX > 0) {
          navigateToScreen("profile");
        } else {
          navigateToScreen("challenges");
        }
      }
    }

    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isMouseDown) {
      handleMouseUp();
    }
  };

  const leaderboardData = {
    overall: [
      {
        id: 1,
        name: "Mert Kahveci",
        avatar: "/cfac0a29e5563ed53ec8e99885b80d1e418e1419.webp",
        score: 1452,
        completedChallenges: 12,
        successRate: 95,
        streak: 45,
        rank: 1,
        email: "mert.kahveci@email.com",
      },
      {
        id: 2,
        name: "MirayK",
        avatar: "/003d19569f74f3854de4000e422b5e42ec3426c8.webp",
        score: 1223,
        completedChallenges: 10,
        successRate: 88,
        streak: 23,
        rank: 2,
        email: "mirayk@email.com",
      },
      {
        id: 3,
        name: "Onur O.",
        avatar: "/00d4c13d0df04e33c75697bea7b24fb30065f6a5.webp",
        score: 968,
        completedChallenges: 9,
        successRate: 85,
        streak: 18,
        rank: 3,
        email: "onur.o@email.com",
      },
      {
        id: 4,
        name: "Jennings Stohler",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        score: 912,
        completedChallenges: 8,
        successRate: 82,
        streak: 12,
        rank: 4,
        email: "jennings.stohler@email.com",
      },
      {
        id: 5,
        name: "Scotty Tovias",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        score: 846,
        completedChallenges: 7,
        successRate: 79,
        streak: 8,
        rank: 5,
        email: "scotty.tovias@email.com",
      },
      {
        id: 6,
        name: "Amelina Aguila",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
        score: 771,
        completedChallenges: 6,
        successRate: 76,
        streak: 5,
        rank: 6,
        email: "amelina.aguila@email.com",
      },
      {
        id: 7,
        name: "Kally Cirrincione",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        score: 693,
        completedChallenges: 5,
        successRate: 73,
        streak: 3,
        rank: 7,
        email: "kally.cirrincione@email.com",
      },
      {
        id: 8,
        name: "Layla Schupbach",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        score: 555,
        completedChallenges: 4,
        successRate: 70,
        streak: 2,
        rank: 8,
        email: "layla.schupbach@email.com",
      },
    ],
    byChallenge: [
      {
        id: 1,
        challengeName: "30-Day Morning Run",
        participants: [
          {
            name: "Mert Kahveci",
            avatar: "/cfac0a29e5563ed53ec8e99885b80d1e418e1419.webp",
            progress: 28,
            total: 30,
          },
          {
            name: "MirayK",
            avatar: "/003d19569f74f3854de4000e422b5e42ec3426c8.webp",
            progress: 25,
            total: 30,
          },
          {
            name: "Onur O.",
            avatar: "/00d4c13d0df04e33c75697bea7b24fb30065f6a5.webp",
            progress: 22,
            total: 30,
          },
        ],
      },
    ],
  };

  // Find current user's rank
  const currentUserRank =
    leaderboardData.overall.findIndex(
      (user) => user.name === appState.user.name
    ) + 1;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-orange-600" />;
      default:
        return (
          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600">
            {rank}
          </div>
        );
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500";
      case 3:
        return "bg-gradient-to-r from-orange-400 to-orange-600";
      default:
        return "bg-white";
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#f6f9ff] flex flex-col max-w-md mx-auto overflow-hidden relative z-0"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{
        touchAction: "pan-y pinch-zoom",
      }}
    >
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-[#eaecf0]">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen("home")}
            className="p-3 bg-white rounded-2xl border border-[#eaecf0] hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5 text-[#040415]" />
          </Button>
          <h1 className="text-[24px] font-bold text-[#040415] font-['Airbnb_Cereal']">
            Leaderboard
          </h1>
          <Button
            variant="ghost"
            size="sm"
            className="p-3 bg-white rounded-2xl border border-[#eaecf0] hover:bg-gray-50"
          >
            <Search className="h-5 w-5 text-[#040415]" />
          </Button>
        </div>

        {/* Daily/Weekly/Monthly Tabs */}
        <div className="mt-3">
          <div className="bg-[#eaecf0] rounded-2xl p-0.5 flex">
            <button
              className={`flex-1 py-1 px-4 text-[14px] font-medium rounded-2xl transition-colors ${
                timeFrame === "daily"
                  ? "bg-white text-[#3843ff] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]"
                  : "text-[#686873]"
              }`}
              onClick={() => setTimeFrame("daily")}
            >
              Daily
            </button>
            <button
              className={`flex-1 py-1 px-4 text-[14px] font-medium rounded-2xl transition-colors ${
                timeFrame === "weekly"
                  ? "bg-white text-[#3843ff] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]"
                  : "text-[#686873]"
              }`}
              onClick={() => setTimeFrame("weekly")}
            >
              Weekly
            </button>
            <button
              className={`flex-1 py-1 px-4 text-[14px] font-medium rounded-2xl transition-colors ${
                timeFrame === "monthly"
                  ? "bg-white text-[#3843ff] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]"
                  : "text-[#686873]"
              }`}
              onClick={() => setTimeFrame("monthly")}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      {/* Blue Gradient Content with Circles */}
      <div className="flex-1 bg-gradient-to-b from-[#6b73ff] to-[#3843ff] relative overflow-hidden">
        {/* Circular Wave Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-7 left-1/2 transform -translate-x-1/2">
            {/* Large background circle */}
            <div className="absolute top-[117px] left-1/2 transform -translate-x-1/2 w-[392px] h-[392px] opacity-[0.24]">
              <Image
                className="w-full h-full"
                src="/52082776c222c04ea266d25b1c14000fb57174c6.webp"
                alt="Background circle"
                width={392}
                height={392}
              />
            </div>
            {/* Multiple concentric circles */}
            <div className="absolute bottom-[-101px] left-1/2 transform -translate-x-1/2 w-52 h-52 opacity-[0.32]">
              <div className="w-full h-full rounded-full border border-white"></div>
            </div>
            <div className="absolute bottom-[-59px] left-1/2 transform -translate-x-1/2 w-[124px] h-[124px] opacity-[0.4]">
              <div className="w-full h-full rounded-full border border-white"></div>
            </div>
            <div className="absolute bottom-[-21px] left-1/2 transform -translate-x-1/2 w-12 h-12 opacity-[0.4]">
              <div className="w-full h-full rounded-full border border-white"></div>
            </div>
            <div className="absolute bottom-[-159px] left-1/2 transform -translate-x-1/2 w-[324px] h-[324px] opacity-[0.16]">
              <div className="w-full h-full rounded-full border border-white"></div>
            </div>
            <div className="absolute bottom-[-234px] left-1/2 transform -translate-x-1/2 w-[474px] h-[474px] opacity-[0.08]">
              <div className="w-full h-full rounded-full border border-white"></div>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="relative z-10 px-4 py-4">
          <div className="flex items-end justify-center gap-6 mb-4">
            {/* 2nd Place - Left */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-2">
                <Image
                  className="w-full h-full rounded-full border-2 border-white"
                  src="/003d19569f74f3854de4000e422b5e42ec3426c8.webp"
                  alt="MirayK"
                  width={64}
                  height={64}
                />
              </div>
              <p className="text-white text-[14px] font-medium mb-2">MirayK</p>
              <div className="bg-white rounded-[80px] px-[29px] py-4 h-28 w-20 flex flex-col items-center justify-center gap-2">
                <div className="text-center">
                  <span className="text-[24px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3843ff] to-[#3843ff]">
                    2
                  </span>
                  <span className="text-[14px] text-transparent bg-clip-text bg-gradient-to-r from-[#3843ff] to-[#3843ff]">
                    nd
                  </span>
                </div>
                <div className="bg-[#fff3da] px-1 py-0.5 rounded-lg flex items-center gap-1">
                  <div className="w-4 h-4 text-[#fea800]">🏅</div>
                  <span className="text-[14px] text-[#fea800] font-medium">
                    1223
                  </span>
                </div>
              </div>
            </div>

            {/* 1st Place - Center (Taller) */}
            <div className="flex flex-col items-center">
              <div className="mb-3 flex flex-col items-center">
                <div className="w-6 h-[15px] mb-2 flex justify-center">
                  <svg
                    width="24"
                    height="16"
                    viewBox="0 0 24 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.8744 2.09018C20.7343 2.10951 19.7874 3.11434 19.8454 4.25444C19.8647 4.89212 20.1739 5.43318 20.6377 5.80033C18.2415 9.00806 15.8068 9.25927 12.9855 3.94526C13.9903 3.44284 14.5507 2.16748 13.8164 0.892116C13.4686 0.273759 12.7536 -0.0354201 12.0386 0.00322727C12.0193 0.00322727 12.0193 0.00322727 12 0.00322727C12 0.00322727 11.9807 0.00322727 11.9614 0.00322727C11.2464 -0.0160964 10.5507 0.273759 10.1836 0.892116C9.44928 2.16748 10.0097 3.44284 11.0145 3.94526C8.19324 9.25927 5.75845 9.00806 3.36232 5.80033C3.82609 5.43318 4.13527 4.87279 4.15459 4.25444C4.19324 3.11434 3.2657 2.10951 2.1256 2.09018C0.94686 2.07086 0 2.9984 0 4.17714C0 5.31724 0.927536 6.2641 2.08696 6.2641C2.16425 6.2641 2.26087 6.2641 2.33816 6.24477L3.13044 14.0129C3.18841 14.6312 3.71015 15.095 4.3285 15.095H19.6715C20.2899 15.095 20.8116 14.6312 20.8696 14.0129L21.6618 6.24477C21.7391 6.2641 21.8164 6.2641 21.913 6.2641C23.0531 6.2641 24 5.33656 24 4.17714C24 2.9984 23.0338 2.07086 21.8744 2.09018Z"
                      fill="#FFCA00"
                    />
                  </svg>
                </div>
                <div className="w-16 h-16 mb-2">
                  <Image
                    className="w-full h-full rounded-full border-2 border-white"
                    src="/cfac0a29e5563ed53ec8e99885b80d1e418e1419.webp"
                    alt="Mert Kahveci"
                    width={64}
                    height={64}
                  />
                </div>
              </div>
              <p className="text-white text-[14px] font-medium mb-2">
                Mert Kahveci
              </p>
              <div className="bg-white rounded-[80px] px-[29px] py-4 h-[140px] w-20 flex flex-col items-center justify-center gap-2">
                <div className="text-center">
                  <span className="text-[24px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3843ff] to-[#3843ff]">
                    1
                  </span>
                  <span className="text-[14px] text-transparent bg-clip-text bg-gradient-to-r from-[#3843ff] to-[#3843ff]">
                    st
                  </span>
                </div>
                <div className="bg-[#fff3da] px-1 py-0.5 rounded-lg flex items-center gap-1">
                  <div className="w-4 h-4 text-[#fea800]">🏅</div>
                  <span className="text-[14px] text-[#fea800] font-medium">
                    1452
                  </span>
                </div>
              </div>
            </div>

            {/* 3rd Place - Right */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-2">
                <Image
                  className="w-full h-full rounded-full border-2 border-white"
                  src="/00d4c13d0df04e33c75697bea7b24fb30065f6a5.webp"
                  alt="Onur O."
                  width={64}
                  height={64}
                />
              </div>
              <p className="text-white text-[14px] font-medium mb-2">Onur O.</p>
              <div className="bg-white rounded-[80px] px-[29px] py-4 h-[104px] w-20 flex flex-col items-center justify-center gap-2">
                <div className="text-center">
                  <span className="text-[24px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3843ff] to-[#3843ff]">
                    3
                  </span>
                  <span className="text-[14px] text-transparent bg-clip-text bg-gradient-to-r from-[#3843ff] to-[#3843ff]">
                    rd
                  </span>
                </div>
                <div className="bg-[#fff3da] px-1 py-0.5 rounded-lg flex items-center gap-1">
                  <div className="w-4 h-4 text-[#fea800]">🏅</div>
                  <span className="text-[14px] text-[#fea800] font-medium">
                    968
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4th Place and Below */}
        <div className="relative z-10 px-6 pb-24 space-y-2">
          {leaderboardData.overall.slice(3).map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity border border-[#eaecf0] shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)]"
              onClick={() => navigateToScreen("profile", { user })}
            >
              {/* Rank Circle */}
              <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center border border-[#eaecf0]">
                <span className="text-[14px] text-[#2F80ED] font-bold">
                  {user.rank}
                </span>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <p className="text-[14px] text-[#040415] font-medium">
                  {user.name}
                </p>
                <p className="text-[12px] text-[#9b9ba1]">
                  {user.score} Points
                </p>
              </div>

              {/* Success Rate and Streak */}
              <div className="text-right">
                <p className="text-[12px] text-[#27AE60]">
                  Success Rate: {user.successRate}%
                </p>
                <p className="text-[12px] text-[#F2994A]">
                  Streak: {user.streak} days
                </p>
              </div>

              {/* Avatar */}
              <div className="w-7 h-7">
                <Image
                  className="w-full h-full rounded-full"
                  src={user.avatar}
                  alt={user.name}
                  width={28}
                  height={28}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
