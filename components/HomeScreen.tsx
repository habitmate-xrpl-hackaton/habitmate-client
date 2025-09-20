"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Camera, Users, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import RightIcon from "../imports/RightIcon";
import LeftIcon from "../imports/LeftIcon-13-1947";
import { useRouter, useSearchParams } from "next/navigation";
import NotificationCenterScreen from "./NotificationCenterScreen";
import CredentialSetupModalWithXRPL from "./CredentialSetupModalWithXRPL";
import { useCredentialSetup } from "@/lib/credentials/useCredentialSetup";
import { useApp } from "@/lib/context/AppContext";

interface HomeScreenProps {
  navigateToScreen?: (screen: string, data?: any) => void;
  appState?: any;
}

export default function HomeScreen({
  appState,
  navigateToScreen,
}: HomeScreenProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateUser } = useApp();

  const [activeTab, setActiveTab] = useState("today");
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [showProofPopup, setShowProofPopup] = useState(false);

  // Google OAuth2 콜백 처리
  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const userName = searchParams.get("user_name");
    const userEmail = searchParams.get("user_email");

    if (accessToken) {
      console.log("🎉 Google OAuth2 로그인 성공!");
      console.log("📋 사용자 정보:", {
        hasAccessToken: !!accessToken,
        userName,
        userEmail,
      });

      // 사용자 정보 업데이트 (Refresh Token은 쿠키에서 관리)
      updateUser({
        isLoggedIn: true,
        name: userName || "Google 사용자",
        email: userEmail || "user@example.com",
        avatar: "",
        accessToken: accessToken || undefined,
      });

      // URL에서 토큰 파라미터 제거 (보안상)
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, [searchParams, updateUser]);

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Credential Setup Hook
  const {
    shouldShowModal,
    isLoading: credentialLoading,
    credentialType,
    issuerSeed,
    subjectSeed,
    markAsCompleted,
  } = useCredentialSetup({
    credentialType: "DRIVER_LICENCE",
    delay: 1000,
    // 개발 환경에서 강제 표시하려면 forceShow: true 추가
    forceShow: false,
  });

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

    // Only navigate if horizontal swipe is much greater than vertical movement
    if (
      distanceY < 80 &&
      Math.abs(distanceX) > minSwipeDistance &&
      Math.abs(distanceX) > distanceY * 2
    ) {
      if (distanceX > 0) {
        router.push("/feeds");
      } else {
        router.push("/profile");
      }
    }

    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };

  // Enhanced mouse events for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only handle left mouse button

    setIsMouseDown(true);
    setTouchStart({ x: e.clientX, y: e.clientY });
    setTouchEnd({ x: 0, y: 0 });
    setIsDragging(false);

    // Don't prevent default to allow normal scrolling
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !touchStart.x) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    const deltaX = Math.abs(currentX - touchStart.x);
    const deltaY = Math.abs(currentY - touchStart.y);

    // Only start dragging for horizontal movement and if horizontal movement is greater than vertical
    if (!isDragging && deltaX > 20 && deltaX > deltaY) {
      setIsDragging(true);
      if (containerRef.current) {
        containerRef.current.style.cursor = "grabbing";
      }
    }

    if (isDragging) {
      setTouchEnd({ x: currentX, y: currentY });
      // Prevent default only when actively dragging horizontally
      e.preventDefault();
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
          router.push("/feeds");
        } else {
          router.push("/profile");
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
  // Get challenges from app state
  const todayChallenges = appState.soloChallenges || [];
  const groupChallenges = appState.groupChallenges || [];

  const currentChallenges =
    activeTab === "today" ? todayChallenges : groupChallenges;

  // Mock proof data organized by day
  const proofsPerDay = {
    "2": [
      {
        id: 1,
        challengeName: "Morning Run Challenge",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
        uploadTime: "7:32 AM",
        status: "approved",
        description: "Completed my 5K morning run today!",
      },
    ],
    "3": [
      {
        id: 2,
        challengeName: "Meditation Practice",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
        uploadTime: "8:15 AM",
        status: "approved",
        description: "20 minutes of mindfulness meditation.",
      },
      {
        id: 3,
        challengeName: "Daily Reading",
        uploadTime: "9:45 PM",
        status: "approved",
        description: 'Read 30 pages of "The Power of Habit".',
      },
    ],
    "5": [
      {
        id: 4,
        challengeName: "Workout Challenge",
        image:
          "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop",
        uploadTime: "6:30 AM",
        status: "approved",
        description: "Full body workout completed.",
      },
    ],
    "7": [
      {
        id: 5,
        challengeName: "Cold Shower Challenge",
        image:
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=400&fit=crop",
        uploadTime: "7:00 AM",
        status: "approved",
        description: "2-minute cold shower completed!",
      },
      {
        id: 6,
        challengeName: "Healthy Eating",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
        uploadTime: "12:30 PM",
        status: "approved",
        description: "Nutritious lunch prepared.",
      },
      {
        id: 7,
        challengeName: "Sleep Tracking",
        uploadTime: "10:00 PM",
        status: "approved",
        description: "Went to bed at target time.",
      },
    ],
    "8": [
      {
        id: 8,
        challengeName: "Morning Walk",
        image:
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=400&fit=crop",
        uploadTime: "6:45 AM",
        status: "approved",
        description: "30-minute morning walk in the park.",
      },
    ],
  };

  const handleFireClick = (day: string, event: React.MouseEvent) => {
    const dayProofs = proofsPerDay[day as keyof typeof proofsPerDay] || [];

    if (dayProofs.length === 0) return;

    if (dayProofs.length === 1) {
      // Single proof - navigate directly to proof detail
      router.push("/proof-detail");
    } else {
      // Multiple proofs - show popup
      const rect = (event.target as Element).getBoundingClientRect();
      setPopupPosition({
        x: rect.left + rect.width / 2,
        y: rect.bottom + 8,
      });
      setSelectedDay(day);
      setShowProofPopup(true);
    }
  };

  const handleProofSelect = (proof: any) => {
    router.push("/proof-detail");
    setShowProofPopup(false);
    setSelectedDay(null);
  };

  const closePopup = () => {
    setShowProofPopup(false);
    setSelectedDay(null);
  };

  // NotificationCenterScreen을 보여주는 경우
  if (showNotificationCenter) {
    return (
      <NotificationCenterScreen
        navigateToScreen={(screen, data) => {
          if (screen === "back") {
            setShowNotificationCenter(false);
          } else if (navigateToScreen) {
            navigateToScreen(screen, data);
          } else {
            // fallback to router if navigateToScreen is not available
            router.push(`/${screen}`);
          }
        }}
        appState={appState || {}}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#f6f9ff] flex flex-col"
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
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/progresscalendar")}
            className="w-12 h-12 p-0 hover:bg-gray-50 cursor-pointer"
          >
            <div className="w-12 h-12">
              <LeftIcon />
            </div>
          </Button>
          <div className="flex-1"></div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotificationCenter(true)}
            className="w-12 h-12 p-0 rounded-2xl hover:bg-gray-50 cursor-pointer"
          >
            <div className="w-12 h-12">
              <RightIcon />
            </div>
          </Button>
        </div>

        {/* Greeting */}
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h2 className="text-lg text-[#040415] mb-1">
              Hi, {appState.user.name} 👋🏻
            </h2>
            <p className="text-sm text-[#9b9ba1]">
              Let&apos;s make habits together!
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/profile")}
            className="bg-[#ddf2fc] w-12 h-12 rounded-3xl flex items-center justify-center p-0 hover:bg-[#c7eaf7] transition-colors cursor-pointer"
          >
            {appState.user.avatar ? (
              <Image
                src={appState.user.avatar}
                width={48}
                height={48}
                alt="Profile"
                className="w-12 h-12 rounded-3xl object-cover"
              />
            ) : (
              <span className="text-2xl">😇</span>
            )}
          </Button>
        </div>

        {/* Tab Selector */}
        <div className="bg-[#eaecf0] p-0.5 rounded-2xl mt-4 flex">
          <div
            className={`flex-1 py-2 px-4 rounded-2xl cursor-pointer flex items-center justify-center ${
              activeTab === "today" ? "bg-white crypto-shadow" : ""
            }`}
            onClick={() => setActiveTab("today")}
          >
            <span
              className={`text-sm font-medium ${
                activeTab === "today" ? "text-[#040415]" : "text-[#686873]"
              }`}
            >
              Today
            </span>
          </div>
          <div
            className={`flex-1 py-2 px-4 rounded-2xl cursor-pointer flex items-center justify-center space-x-2 ${
              activeTab === "groups" ? "bg-white crypto-shadow" : ""
            }`}
            onClick={() => setActiveTab("groups")}
          >
            <span
              className={`text-sm font-medium ${
                activeTab === "groups" ? "text-[#040415]" : "text-[#686873]"
              }`}
            >
              Groups
            </span>
            <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
              <span className="text-xs font-bold text-[#3843ff] uppercase tracking-wide">
                2
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 space-y-4 pb-32">
        {/* Calendar */}
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { day: "2", dayName: "FRI", completed: true },
            { day: "3", dayName: "SAT", completed: true },
            { day: "4", dayName: "SUN", completed: false },
            { day: "5", dayName: "MON", completed: true },
            { day: "6", dayName: "TUE", completed: false },
            { day: "7", dayName: "WED", completed: true },
            { day: "8", dayName: "THU", completed: true },
            { day: "9", dayName: "FRI", completed: false },
          ].map((dayInfo, index) => (
            <div
              key={dayInfo.day}
              className={`flex-shrink-0 w-12 h-16 bg-white rounded-2xl border flex flex-col items-center justify-center relative ${
                index === 1 ? "border-2 border-[#6b73ff]" : "border-[#eaecf0]"
              }`}
            >
              {/* Success/Failure indicator - only for past days that weren't completed */}
              {!dayInfo.completed && index < 6 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#eaecf0] rounded-full"></div>
              )}

              {/* Day number or fire emoji */}
              {dayInfo.completed ? (
                <button
                  className="text-2xl cursor-pointer hover:scale-110 transition-transform"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFireClick(dayInfo.day, e);
                  }}
                >
                  🔥
                </button>
              ) : (
                <span
                  className={`text-xl font-medium ${
                    index === 1 ? "text-[#6b73ff]" : "text-[#040415]"
                  }`}
                >
                  {dayInfo.day}
                </span>
              )}

              <span
                className={`text-xs font-bold uppercase tracking-wide ${
                  index === 1 ? "text-[#6b73ff]" : "text-[#cdcdd0]"
                }`}
              >
                {dayInfo.dayName}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Card */}
        <div className="crypto-gradient rounded-2xl p-4 text-white">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-xs text-[#6b73ff] font-medium">25%</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium mb-1">
                Your daily goals almost done! 🔥
              </h3>
              <p className="text-xs text-[#afb4ff]">1 of 4 completed</p>
            </div>
          </div>
        </div>

        {/* Create Challenge Button */}
        <Button
          onClick={() => router.push("/createchallenge")}
          className="w-full crypto-gradient text-white hover:opacity-90 rounded-2xl py-4 flex items-center justify-center space-x-2 mb-4 cursor-pointer"
        >
          <Camera className="h-5 w-5" />
          <span>Create Challenge</span>
        </Button>

        {/* Active Challenges Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-[#040415]">
              {activeTab === "today" ? "Solo Challenges" : "Group Challenges"}
            </h3>
            {activeTab === "groups" && (
              <Button
                variant="ghost"
                onClick={() => router.push("/challengelist")}
                className="text-xs font-bold text-[#3843ff] uppercase tracking-wide p-0 cursor-pointer"
              >
                View All
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {currentChallenges.map((challenge: any) => (
              <div
                key={challenge.id}
                className="bg-white rounded-2xl p-4 crypto-shadow cursor-pointer hover:scale-105 transition-transform"
                onClick={() => router.push("/challenge-detail")}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-[#040415] mb-1">
                      {challenge.title}
                    </h4>
                    {activeTab === "today" ? null : (
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-xs text-[#9b9ba1]">
                          <Users className="h-3 w-3" />
                          <span>{challenge.participants} participants</span>
                        </div>
                        <div className="bg-[#f6f9ff] px-2 py-1 rounded-lg w-fit">
                          <span className="text-xs font-medium text-[#3843ff]">
                            {challenge.groupName}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#9b9ba1]">Entry Fee</p>
                    <p className="text-sm font-medium text-[#3ba935]">
                      ${challenge.entryFee}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-[#9b9ba1] mb-1">
                    <span>
                      {activeTab === "today" ? "My Progress" : "My Progress"}
                    </span>
                    <span>
                      {challenge.progress}/{challenge.total} days
                    </span>
                  </div>
                  <Progress
                    value={(challenge.progress / challenge.total) * 100}
                    className="h-2"
                  />
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#fea800] flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{challenge.timeLeft} left today</span>
                  </span>
                  <Button
                    size="sm"
                    className="bg-[#3843ff] hover:bg-[#6b73ff] text-white px-3 py-1 rounded-lg cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/uploadproof");
                    }}
                  >
                    Upload Proof
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Proof Popup for Multiple Proofs */}
      {showProofPopup && selectedDay && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={closePopup} />

          {/* Popup */}
          <div
            className="fixed z-50 bg-white rounded-2xl crypto-shadow border border-[#eaecf0] p-4 max-w-xs"
            style={{
              left: `${popupPosition.x}px`,
              top: `${popupPosition.y}px`,
              transform: "translateX(-50%)",
              maxWidth: "280px",
              width: "max-content",
            }}
          >
            <div className="space-y-3">
              <h3 className="font-medium text-[#040415] text-sm mb-3">
                Proofs for Day {selectedDay}
              </h3>

              {(
                proofsPerDay[selectedDay as keyof typeof proofsPerDay] || []
              ).map((proof: any) => (
                <div
                  key={proof.id}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-[#f6f9ff] rounded-lg p-2 -m-2 hover:scale-105 transition-transform"
                  onClick={() => handleProofSelect(proof)}
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#d7d9ff] flex-shrink-0">
                    {proof.image ? (
                      <Image
                        width={48}
                        height={48}
                        src={proof.image}
                        alt={proof.challengeName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[#3843ff] text-lg">✓</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#040415] text-sm truncate">
                      {proof.challengeName}
                    </p>
                    <p className="text-xs text-[#9b9ba1]">{proof.uploadTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Credential Setup Modal */}
      <CredentialSetupModalWithXRPL
        isOpen={shouldShowModal}
        onClose={() => {
          markAsCompleted();
        }}
        onAccept={() => {
          console.log(
            "✅ XRPL Credential accepted for user:",
            appState.user.email
          );
          markAsCompleted();
        }}
        issuerSeed={issuerSeed}
        subjectSeed={subjectSeed}
        credentialType={credentialType}
      />
    </div>
  );
}
