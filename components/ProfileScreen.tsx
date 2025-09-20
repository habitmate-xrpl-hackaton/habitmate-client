import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Edit,
  Settings,
  Trophy,
  Calendar,
  DollarSign,
  Users,
  Filter,
  Target,
  Flame,
  Star,
  Dumbbell,
  Brain,
  Heart,
  CheckSquare,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { WalletConnectButton } from "./WalletConnectButton";
import SettingsScreen from "./SettingsScreen";
import EditProfileScreen from "./EditProfileScreen";
import { useSession } from "next-auth/react";

interface ProfileScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  appState: any;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

export default function ProfileScreen({
  navigateToScreen,
  appState,
  connectWallet,
  disconnectWallet,
}: ProfileScreenProps) {
  // Check if viewing another user's profile
  const viewingUser = appState.selectedUser || appState.user;
  const isOwnProfile =
    !appState.selectedUser || appState.selectedUser.name === appState.user.name;
  const [activeTab, setActiveTab] = useState("weekly");
  const [contentTab, setContentTab] = useState("activity"); // New tab state for Activity/Achievements
  const [showSettings, setShowSettings] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const { data: session } = useSession();

  // 모달이 열릴 때 body에 클래스 추가/제거
  useEffect(() => {
    if (showSettings) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    // 컴포넌트 언마운트 시 클래스 제거
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showSettings]);

  // Touch/drag functionality
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
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
        navigateToScreen("home");
      } else {
        navigateToScreen("leaderboard");
      }
    }

    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;

    setIsMouseDown(true);
    setTouchStart({ x: e.clientX, y: e.clientY });
    setTouchEnd({ x: 0, y: 0 });
    setIsDragging(false);
    e.preventDefault();
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
          navigateToScreen("home");
        } else {
          navigateToScreen("leaderboard");
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

  const userStats = {
    totalChallenges: 15,
    completed: 244,
    successRate: 98,
    totalEarned: 450,
    totalSpent: 520,
    currentStreak: 23,
    longestStreak: 45,
    level: "Gold",
    nextLevel: "Platinum",
    progressToNext: 75,
    pointsEarned: 322,
    bestStreakDay: 22,
    skipped: 4,
    failed: 2,
  };

  const badges = [
    { id: 1, name: "First Challenge", icon: "🎯", earned: true },
    { id: 2, name: "Week Warrior", icon: "📅", earned: true },
    { id: 3, name: "Streak Master", icon: "🔥", earned: true },
    { id: 4, name: "Fitness Fanatic", icon: "💪", earned: true },
    { id: 5, name: "Mindful Master", icon: "🧘", earned: false },
    { id: 6, name: "Social Star", icon: "⭐", earned: false },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: "refund",
      amount: 50,
      challenge: "Morning Run Challenge",
      date: "2 days ago",
    },
    {
      id: 2,
      type: "payment",
      amount: -30,
      challenge: "Meditation Challenge",
      date: "5 days ago",
    },
    {
      id: 3,
      type: "refund",
      amount: 25,
      challenge: "Reading Challenge",
      date: "1 week ago",
    },
    {
      id: 4,
      type: "payment",
      amount: -40,
      challenge: "Cold Shower Challenge",
      date: "2 weeks ago",
    },
  ];

  // Chart data for success rate over weeks - Figma에서 가져온 실제 데이터
  const chartData = [
    { week: "4", rate: 45, height: 20 },
    { week: "5", rate: 65, height: 35 },
    { week: "6", rate: 55, height: 28 },
    { week: "7", rate: 75, height: 48 },
    { week: "8", rate: 68, height: 40 },
    { week: "9", rate: 85, height: 58 },
    { week: "10", rate: 78, height: 52 },
    { week: "11", rate: 92, height: 70 },
  ];

  // EditProfileScreen을 보여주는 경우
  if (showEditProfile) {
    return (
      <EditProfileScreen
        navigateToScreen={(screen, data) => {
          if (screen === "back") {
            setShowEditProfile(false);
          } else {
            navigateToScreen(screen, data);
          }
        }}
        appState={appState}
        updateUser={(userData) => {
          // Update user data in app state
          if (appState.updateUser) {
            appState.updateUser(userData);
          }
        }}
      />
    );
  }

  return (
    <div className="bg-[#f6f9ff] overflow-hidden relative rounded-[32px] size-full">
      {/* Profile Header */}
      <div className="bg-white p-6 crypto-shadow border-b border-[#eaecf0]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={viewingUser.avatar} alt={viewingUser.name} />
              <AvatarFallback>
                {session?.user?.name?.split(" ")[0] || "User"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-medium text-[#040415]">
                {viewingUser.name}
              </h1>
              <div className="flex items-center space-x-2 mt-1">
                <Badge
                  variant="secondary"
                  className="bg-[#d5ece0] text-[#3ba935] border-none w-fit"
                >
                  {userStats.currentStreak} day streak
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-[#fff3da] text-[#fea800] border-none w-fit"
                >
                  {userStats.level}
                </Badge>
              </div>
            </div>
          </div>
          {isOwnProfile && (
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEditProfile(true)}
                className="w-10 h-10 p-0 bg-[#f6f9ff] border border-[#eaecf0] rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                <Edit className="h-4 w-4 text-[#040415]" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="w-10 h-10 p-0 bg-[#f6f9ff] border border-[#eaecf0] rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                <Settings className="h-4 w-4 text-[#040415]" />
              </Button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => navigateToScreen("followers")}
            className="text-center hover:bg-[#f6f9ff] rounded-lg p-2 transition-colors"
          >
            <div className="text-lg font-medium text-[#040415]">247</div>
            <div className="text-xs text-[#9b9ba1]">Followers</div>
          </button>
          <button
            onClick={() => navigateToScreen("following")}
            className="text-center hover:bg-[#f6f9ff] rounded-lg p-2 transition-colors"
          >
            <div className="text-lg font-medium text-[#040415]">1.2k</div>
            <div className="text-xs text-[#9b9ba1]">Following</div>
          </button>
          <button
            onClick={() => navigateToScreen("proof-gallery")}
            className="text-center hover:bg-[#f6f9ff] rounded-lg p-2 transition-colors"
          >
            <div className="text-lg font-medium text-[#040415]">198</div>
            <div className="text-xs text-[#9b9ba1]">Feeds</div>
          </button>
        </div>

        {/* Wallet Connect Button */}
        {isOwnProfile && (
          <div className="mt-4 cursor-pointer">
            <WalletConnectButton
              isConnected={appState.wallet.isConnected}
              address={appState.wallet.address}
              onConnect={connectWallet}
              onDisconnect={disconnectWallet}
            />
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-[#eaecf0] mt-4">
          <button
            onClick={() => setContentTab("activity")}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors text-center ${
              contentTab === "activity"
                ? "border-[#3843ff] text-[#3843ff] font-semibold"
                : "border-transparent text-[#9b9ba1] hover:text-[#686873]"
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setContentTab("achievements")}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors text-center ${
              contentTab === "achievements"
                ? "border-[#3843ff] text-[#3843ff] font-semibold"
                : "border-transparent text-[#9b9ba1] hover:text-[#686873]"
            }`}
          >
            Achievements
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="box-border flex flex-col gap-2 items-start justify-start px-6 py-0 relative w-full">
        {contentTab === "activity" ? (
          <>
            {/* Stats Card */}
            <div
              className="bg-white relative rounded-[16px] w-full mt-2"
              style={{
                boxShadow: "58px 26px 68px 0px rgba(35, 44, 93, 0.06)",
                border: "1px solid #eaecf0",
              }}
            >
              <div className="flex flex-col justify-center relative size-full">
                <div className="box-border flex flex-col gap-3 items-start justify-center p-[16px] relative w-full">
                  {/* Header */}
                  <div className="flex gap-3 items-center justify-start relative w-full">
                    <div className="bg-gray-100 box-border flex flex-col gap-2 items-center justify-center p-[8px] relative rounded-[8px] size-9">
                      <div className="font-medium leading-[0] relative text-[#040415] text-[18px] text-center">
                        <p className="leading-[24px] whitespace-pre">👀</p>
                      </div>
                    </div>
                    <div className="basis-0 flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px relative">
                      <div className="font-medium relative text-[#040415] text-[14px] w-full">
                        <p className="leading-[20px]">All Challenges</p>
                      </div>
                      <div className="font-normal relative text-[#9b9ba1] text-[12px] w-full">
                        <p className="leading-[16px]">Summary</p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigateToScreen("progress-calendar")}
                      className="w-9 h-9 bg-white border border-[#eaecf0] rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-[#040415]" />
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-col gap-1 items-start justify-start relative w-full">
                    {/* Stats Row 1 */}
                    <div className="flex gap-3 items-start justify-start relative w-full">
                      <div className="basis-0 flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px relative">
                        <div className="font-bold relative text-[#9b9ba1] text-[10px] tracking-[1px] uppercase w-full">
                          <p className="leading-[16px]">SUCCESS RATE</p>
                        </div>
                        <div className="font-medium relative text-[#3ba935] text-[18px] w-full">
                          <p className="leading-[24px]">
                            {userStats.successRate}%
                          </p>
                        </div>
                      </div>
                      <div className="basis-0 flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px relative">
                        <div className="font-bold relative text-[#9b9ba1] text-[10px] tracking-[1px] uppercase w-full">
                          <p className="leading-[16px]">COMPLETED</p>
                        </div>
                        <div className="font-medium relative text-[#040415] text-[18px] w-full">
                          <p className="leading-[24px]">
                            {userStats.completed}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stats Row 2 */}
                    <div className="flex gap-3 items-start justify-start relative w-full">
                      <div className="basis-0 flex flex-col grow items-start justify-start min-h-px min-w-px relative">
                        <div
                          className="font-bold leading-[0] min-w-full relative text-[#9b9ba1] text-[10px] tracking-[1px] uppercase"
                          style={{ width: "min-content" }}
                        >
                          <p className="leading-[16px]">POINTS EARNED</p>
                        </div>
                        <div className="bg-[#fff3da] box-border flex items-center justify-start px-1 py-0.5 relative rounded-[8px]">
                          <div className="w-4 h-4">
                            <svg viewBox="0 0 16 16" fill="none">
                              <path
                                d="M4.84056 6.56548C5.67173 5.80048 6.78131 5.33333 8 5.33333C9.21869 5.33333 10.3283 5.80048 11.1594 6.56548L13.2067 2.81219C13.5702 2.14581 13.0879 1.33333 12.3288 1.33333H10.1179C9.63369 1.33333 9.18753 1.59586 8.95237 2.01914L7.99998 3.73344L7.04759 2.01914C6.81243 1.59586 6.36627 1.33333 5.88205 1.33333H3.6712C2.91214 1.33333 2.42983 2.14581 2.7933 2.81219L4.84056 6.56548Z"
                                fill="#FFCD6D"
                              />
                              <path
                                d="M12.6667 10C12.6667 12.5773 10.5773 14.6667 8 14.6667C5.42267 14.6667 3.33333 12.5773 3.33333 10C3.33333 7.42267 5.42267 5.33333 8 5.33333C10.5773 5.33333 12.6667 7.42267 12.6667 10Z"
                                fill="#FEA800"
                              />
                              <path
                                d="M8 11.3333C8.73638 11.3333 9.33333 10.7364 9.33333 10C9.33333 9.26362 8.73638 8.66667 8 8.66667C7.26362 8.66667 6.66667 9.26362 6.66667 10C6.66667 10.7364 7.26362 11.3333 8 11.3333Z"
                                fill="#FFCD6D"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col font-medium justify-center leading-[0] relative text-[#fea800] text-[14px]">
                            <p className="leading-[20px] whitespace-pre">
                              {userStats.pointsEarned}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px relative">
                        <div className="font-bold relative text-[#9b9ba1] text-[10px] tracking-[1px] uppercase w-full">
                          <p className="leading-[16px]">BEST STREAK DAY</p>
                        </div>
                        <div className="font-medium relative text-[#040415] text-[18px] w-full">
                          <p className="leading-[24px]">
                            {userStats.bestStreakDay}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stats Row 3 */}
                    <div className="flex gap-3 items-start justify-start relative w-full">
                      <div className="basis-0 flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px relative">
                        <div className="font-bold relative text-[#9b9ba1] text-[10px] tracking-[1px] uppercase w-full">
                          <p className="leading-[16px]">SKIPPED</p>
                        </div>
                        <div className="font-medium relative text-[#040415] text-[18px] w-full">
                          <p className="leading-[24px]">{userStats.skipped}</p>
                        </div>
                      </div>
                      <div className="basis-0 flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px relative">
                        <div className="font-bold relative text-[#9b9ba1] text-[10px] tracking-[1px] uppercase w-full">
                          <p className="leading-[16px]">FAILED</p>
                        </div>
                        <div className="font-medium relative text-[#e3524f] text-[18px] w-full">
                          <p className="leading-[24px]">{userStats.failed}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* My Proofs Gallery */}
            <div className="bg-white rounded-2xl p-4 crypto-shadow w-full">
              <h3 className="text-sm font-medium text-[#040415] mb-4 flex items-center space-x-2">
                <span>📷</span>
                <span>My Proofs</span>
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  {
                    id: 1,
                    challengeName: "Morning Run Challenge",
                    image:
                      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
                    date: "Jan 15",
                    type: "photo",
                    status: "approved",
                    description:
                      "Completed my 5K morning run today! The weather was perfect and I felt great throughout the entire run.",
                  },
                  {
                    id: 2,
                    challengeName: "Meditation Practice",
                    image:
                      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
                    date: "Jan 14",
                    type: "photo",
                    status: "approved",
                    description:
                      "20 minutes of mindfulness meditation completed this morning.",
                  },
                  {
                    id: 3,
                    challengeName: "Daily Reading",
                    date: "Jan 13",
                    type: "checklist",
                    status: "pending",
                    description:
                      'Read 30 pages of "The Power of Habit" today. Great insights on building better routines.',
                  },
                  {
                    id: 4,
                    challengeName: "Workout Challenge",
                    image:
                      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop",
                    date: "Jan 12",
                    type: "photo",
                    status: "approved",
                    description:
                      "Full body workout completed - 45 minutes of strength training.",
                  },
                  {
                    id: 5,
                    challengeName: "Healthy Eating",
                    image:
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
                    date: "Jan 11",
                    type: "photo",
                    status: "approved",
                    description:
                      "Prepared a nutritious salad with quinoa, vegetables, and grilled chicken.",
                  },
                  {
                    id: 6,
                    challengeName: "Sleep Tracking",
                    date: "Jan 10",
                    type: "checklist",
                    status: "failed",
                    description:
                      "Unfortunately missed the 10 PM bedtime target due to work commitments.",
                  },
                ]
                  .slice(0, 6)
                  .map((proof) => (
                    <div
                      key={proof.id}
                      className="aspect-square cursor-pointer"
                      onClick={() =>
                        navigateToScreen("proof-detail", {
                          proof: {
                            ...proof,
                            uploadDate: "2024-01-15",
                            uploadTime: "7:32 AM",
                          },
                        })
                      }
                    >
                      <Card className="w-full h-full overflow-hidden crypto-shadow hover:scale-105 transition-transform">
                        {proof.type === "photo" && proof.image ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={proof.image}
                              alt={proof.challengeName}
                              className="w-full h-full object-cover"
                              width={200}
                              height={200}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                              <p className="text-white text-xs font-medium">
                                {proof.date}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full bg-[#d7d9ff] flex flex-col items-center justify-center p-3 relative">
                            <CheckSquare className="h-8 w-8 text-[#3843ff] mb-2" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                              <p className="text-white text-xs font-medium">
                                {proof.date}
                              </p>
                            </div>
                          </div>
                        )}
                      </Card>
                    </div>
                  ))}
              </div>

              {/* View More Button */}
              <Button
                variant="outline"
                className="w-full border-[#3843ff] text-[#3843ff] hover:bg-[#3843ff] hover:text-white"
                onClick={() => navigateToScreen("proof-gallery")}
              >
                View More
              </Button>
            </div>

            {/* Habits Chart - Figma 디자인을 따라 구현 */}
            <div
              className="bg-white relative rounded-[16px] w-full"
              style={{
                boxShadow: "58px 26px 68px 0px rgba(35, 44, 93, 0.06)",
                border: "1px solid #eaecf0",
              }}
            >
              <div className="flex flex-col justify-center relative size-full">
                <div className="box-border flex flex-col gap-3 items-start justify-center p-[16px] relative w-full">
                  {/* Header */}
                  <div className="flex gap-3 items-center justify-start relative w-full">
                    <div className="bg-gray-100 box-border flex flex-col gap-2 items-center justify-center p-[8px] relative rounded-[8px] size-9">
                      <div className="font-medium leading-[0] relative text-[#040415] text-[18px] text-center">
                        <p className="leading-[24px] whitespace-pre">📈</p>
                      </div>
                    </div>
                    <div className="basis-0 flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px relative">
                      <div className="font-medium relative text-[#040415] text-[14px] w-full">
                        <p className="leading-[20px]">Challenges</p>
                      </div>
                      <div className="font-normal relative text-[#9b9ba1] text-[12px] w-full">
                        <p className="leading-[16px]">Comparison by week</p>
                      </div>
                    </div>
                  </div>

                  {/* Chart - Figma Graphics 구현 */}
                  <div className="h-[113px] relative w-full">
                    {/* 그리드 라인 */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[0, 24, 48, 72, 96].map((top, index) => (
                        <div
                          key={index}
                          className="absolute left-0 right-0 h-0 border-t border-dashed border-[#eaecf0]"
                          style={{ top: `${top}px` }}
                        />
                      ))}
                    </div>

                    {/* X축 라벨들 */}
                    <div className="absolute bottom-0 w-full h-4 flex justify-between px-2">
                      {["4", "5", "6", "7", "8", "9", "10", "11"].map(
                        (label, index) => (
                          <div
                            key={index}
                            className="font-bold text-[#cdcdd0] text-[10px] tracking-[1px] uppercase leading-[16px]"
                          >
                            {label}
                          </div>
                        )
                      )}
                    </div>

                    {/* 차트 곡선 - Area Chart */}
                    <div className="absolute inset-0 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={chartData}
                          margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
                        >
                          <defs>
                            <linearGradient
                              id="chartGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#B09FFF"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="100%"
                                stopColor="#8D79F6"
                                stopOpacity={0}
                              />
                            </linearGradient>
                            <linearGradient
                              id="lineGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#6B73FF" />
                              <stop offset="100%" stopColor="#000DFF" />
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="week"
                            axisLine={false}
                            tickLine={false}
                            tick={false}
                            height={0}
                          />
                          <YAxis domain={[30, 100]} hide={true} />
                          <Area
                            type="monotone"
                            dataKey="rate"
                            stroke="url(#lineGradient)"
                            strokeWidth={2}
                            fill="url(#chartGradient)"
                            dot={{
                              fill: "#3843ff",
                              strokeWidth: 2,
                              r: 4,
                              stroke: "#ffffff",
                            }}
                            activeDot={{
                              r: 6,
                              fill: "#3843ff",
                              stroke: "#ffffff",
                              strokeWidth: 2,
                            }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Tooltip - Figma 디자인을 따라 구현 */}
                    <div className="absolute right-2 top-2">
                      <div className="bg-white border border-[#eaecf0] rounded-lg px-2 py-1 shadow-lg text-xs">
                        <div className="text-[#040415] font-normal">
                          <p className="leading-[16px]">🔥 Burn!</p>
                        </div>
                        <div className="text-[#9b9ba1] font-normal">
                          <p className="leading-[16px]">32 days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Level Progress */}
            {isOwnProfile && (
              <div className="bg-white rounded-2xl p-4 crypto-shadow w-full">
                <h3 className="text-sm font-medium text-[#040415] mb-3 flex items-center space-x-2">
                  <Trophy className="h-4 w-4" />
                  <span>Level Progress</span>
                </h3>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-[#fff3da] px-2 py-1 rounded-lg">
                    <span className="text-xs font-medium text-[#fea800]">
                      {userStats.level}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-[#9b9ba1] mb-1">
                      <span>Progress to {userStats.nextLevel}</span>
                      <span>{userStats.progressToNext}%</span>
                    </div>
                    <Progress
                      value={userStats.progressToNext}
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div className="space-y-3 pb-24 w-full">
              <h3 className="text-sm font-medium text-[#040415]">
                Recent Activity
              </h3>

              <div className="bg-white rounded-2xl p-4 crypto-shadow">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-[#040415] mb-1">
                      112 points earned!
                    </h4>
                    <p className="text-xs text-[#9b9ba1]">Today, 12:34 PM</p>
                  </div>
                  <div className="w-9 h-9 bg-white border border-[#eaecf0] rounded-xl flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-[#3ba935]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 crypto-shadow">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-[#040415] mb-1">
                      Challenge completed!
                    </h4>
                    <p className="text-xs text-[#9b9ba1]">
                      Yesterday, 14:12 PM
                    </p>
                  </div>
                  <div className="w-9 h-9 bg-white border border-[#eaecf0] rounded-xl flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-[#fea800]" />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Achievement Badges */}
            <div className="bg-white rounded-2xl p-4 crypto-shadow w-full mt-2">
              <h3 className="text-sm font-medium text-[#040415] mb-4">
                Achievement Badges
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`relative rounded-2xl p-4 border-2 transition-all ${
                      badge.earned
                        ? "border-[#3843ff] bg-white"
                        : "border-[#eaecf0] bg-[#f6f9ff] opacity-50"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">
                        {badge.id === 1 && (
                          <Target className="h-8 w-8 mx-auto text-[#e3524f]" />
                        )}
                        {badge.id === 2 && (
                          <Calendar className="h-8 w-8 mx-auto text-[#3843ff]" />
                        )}
                        {badge.id === 3 && (
                          <Flame className="h-8 w-8 mx-auto text-[#fea800]" />
                        )}
                        {badge.id === 4 && (
                          <Dumbbell className="h-8 w-8 mx-auto text-[#fea800]" />
                        )}
                        {badge.id === 5 && (
                          <Brain className="h-8 w-8 mx-auto text-[#686873]" />
                        )}
                        {badge.id === 6 && (
                          <Star className="h-8 w-8 mx-auto text-[#686873]" />
                        )}
                      </div>
                      <p className="text-xs font-medium text-[#040415] leading-tight">
                        {badge.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings Summary */}
            <div className="bg-white rounded-2xl p-4 crypto-shadow w-full">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-[#040415]" />
                <h3 className="text-sm font-medium text-[#040415]">
                  Earnings Summary
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-[#9b9ba1] mb-1">Total Earned</p>
                  <p className="text-lg font-medium text-[#3ba935]">
                    ${userStats.totalEarned}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#9b9ba1] mb-1">Total Invested</p>
                  <p className="text-lg font-medium text-[#040415]">
                    ${userStats.totalSpent}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#eaecf0]">
                <p className="text-xs text-[#9b9ba1] mb-1">Net Profit</p>
                <p
                  className={`text-lg font-medium ${
                    userStats.totalEarned - userStats.totalSpent >= 0
                      ? "text-[#3ba935]"
                      : "text-[#e3524f]"
                  }`}
                >
                  $
                  {userStats.totalEarned - userStats.totalSpent >= 0 ? "+" : ""}
                  {userStats.totalEarned - userStats.totalSpent}
                </p>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl p-4 crypto-shadow w-full mb-24">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-[#040415]" />
                <h3 className="text-sm font-medium text-[#040415]">
                  Recent Transactions
                </h3>
              </div>

              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#040415] mb-1">
                        {transaction.challenge}
                      </p>
                      <p className="text-xs text-[#9b9ba1]">
                        {transaction.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-medium ${
                          transaction.type === "refund"
                            ? "text-[#3ba935]"
                            : "text-[#e3524f]"
                        }`}
                      >
                        {transaction.type === "refund" ? "+" : ""}$
                        {Math.abs(transaction.amount)}
                      </p>
                      <p className="text-xs text-[#9b9ba1]">
                        {transaction.type === "refund" ? "Refund" : "Payment"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowSettings(false);
            }
          }}
        >
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <SettingsScreen
              navigateToScreen={navigateToScreen}
              appState={appState}
              onClose={() => setShowSettings(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
