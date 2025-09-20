import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { useRouter } from "next/navigation";

interface ProgressCalendarScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  appState: any;
}

export default function ProgressCalendarScreen({
  navigateToScreen,
}: ProgressCalendarScreenProps) {
  const [activeTab, setActiveTab] = useState("solo");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [showDateDetail, setShowDateDetail] = useState(false);
  const [currentMonth] = useState(new Date(2024, 8, 1)); // September 2024

  const router = useRouter();
  // Mock data for calendar
  const soloData = {
    proofs: [1, 2, 3, 5, 6, 8, 9, 10, 12, 13, 15, 16, 17, 19, 20], // Days with proofs uploaded
    missed: [4, 7, 11, 14, 18], // Days with missed proofs
  };

  const clubsData = {
    proofs: [1, 2, 4, 5, 7, 8, 10, 11, 12, 14, 15, 17, 18, 19], // Days with proofs uploaded
    missed: [3, 6, 9, 13, 16, 20], // Days with missed proofs
  };

  const currentData = activeTab === "solo" ? soloData : clubsData;

  // Generate calendar days
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  // const lastDayOfMonth = new Date(
  //   currentMonth.getFullYear(),
  //   currentMonth.getMonth() + 1,
  //   0
  // );
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const calendarDays = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    calendarDays.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const today = new Date();
  const todayDate = today.getDate();
  const isCurrentMonth = (date: Date) =>
    date.getMonth() === currentMonth.getMonth();

  const getDateStatus = (date: Date) => {
    if (!isCurrentMonth(date)) return null;
    const day = date.getDate();
    if (currentData.proofs.includes(day)) return "completed";
    if (currentData.missed.includes(day)) return "missed";
    return null;
  };

  const handleDateClick = (date: Date) => {
    if (isCurrentMonth(date)) {
      setSelectedDate(date.getDate());
      setShowDateDetail(true);
    }
  };

  const getSelectedDateData = () => {
    if (!selectedDate) return null;

    const hasProof = currentData.proofs.includes(selectedDate);
    const isMissed = currentData.missed.includes(selectedDate);

    return {
      date: new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        selectedDate
      ),
      hasProof,
      isMissed,
      completedCount: hasProof ? Math.floor(Math.random() * 3) + 1 : 0,
      totalCount: 3,
      streak: 5 + Math.floor(Math.random() * 10),
    };
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const selectedDateData = getSelectedDateData();

  // Summary stats
  const totalChallenges = activeTab === "solo" ? 20 : 25;
  const completedChallenges = activeTab === "solo" ? 15 : 18;
  const onTimeProofs = activeTab === "solo" ? 88 : 92;
  const missedProofs = activeTab === "solo" ? 18 : 15;

  return (
    <div className="min-h-screen bg-[#f6f9ff] flex flex-col pb-14">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-[#eaecf0]">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/home")}
            className="w-12 h-12 p-0 bg-white border border-[#eaecf0] rounded-2xl hover:bg-gray-50 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5 text-[#040415]" />
          </Button>
          <h1 className="text-2xl font-bold text-[#040415] tracking-tight">
            Progress Calendar
          </h1>
          <div className="w-12 h-12"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-6">
        {/* Tab Selector */}
        <div className="bg-[#eaecf0] p-0.5 rounded-2xl flex">
          <div
            className={`flex-1 py-2 px-4 rounded-2xl ${
              activeTab === "solo" ? "bg-white crypto-shadow" : ""
            }`}
          >
            <button
              onClick={() => setActiveTab("solo")}
              className={`text-sm font-medium w-full text-center cursor-pointer ${
                activeTab === "solo" ? "text-[#040415]" : "text-[#686873]"
              }`}
            >
              Solo
            </button>
          </div>
          <div
            className={`flex-1 py-2 px-4 rounded-2xl ${
              activeTab === "clubs" ? "bg-white crypto-shadow" : ""
            }`}
          >
            <button
              onClick={() => setActiveTab("clubs")}
              className={`text-sm font-medium w-full text-center cursor-pointer ${
                activeTab === "clubs" ? "text-[#040415]" : "text-[#686873]"
              }`}
            >
              Clubs
            </button>
          </div>
        </div>

        {/* Calendar */}
        <Card className="p-4 crypto-shadow">
          {/* Month Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-[#040415]">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-[#9b9ba1] py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              const status = getDateStatus(date);
              const isToday =
                isCurrentMonth(date) && date.getDate() === todayDate;
              const isCurrentMonthDate = isCurrentMonth(date);

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`
                    relative w-10 h-10 rounded-lg flex items-center justify-center text-sm cursor-pointer
                    ${isCurrentMonthDate ? "text-[#040415]" : "text-[#cdcdd0]"}
                    ${isToday ? "ring-2 ring-[#3843ff] ring-offset-2" : ""}
                    ${isCurrentMonthDate ? "hover:bg-[#f6f9ff]" : ""}
                    transition-all duration-200
                  `}
                >
                  <span>{date.getDate()}</span>
                  {status && (
                    <div
                      className={`
                      absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full
                      ${
                        status === "completed"
                          ? activeTab === "solo"
                            ? "bg-[#3843ff]"
                            : "bg-[#6b73ff]"
                          : "border border-[#cdcdd0] bg-transparent"
                      }
                    `}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="space-y-3">
          {/* Total Challenges Completed */}
          <Card className="p-4 crypto-shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm font-medium text-[#040415]">
                Total Challenges Completed
              </h4>
              <span className="text-sm font-medium text-[#040415]">
                {completedChallenges} of {totalChallenges}
              </span>
            </div>
            <Progress
              value={(completedChallenges / totalChallenges) * 100}
              className="h-2 mb-2"
            />
            <p className="text-xs text-[#9b9ba1]">
              {Math.round((completedChallenges / totalChallenges) * 100)}%
              completion rate
            </p>
          </Card>

          {/* On-time Proofs */}
          <Card className="p-4 crypto-shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm font-medium text-[#040415]">
                On-time Proofs
              </h4>
              <span className="text-sm font-medium text-[#3ba935]">
                {onTimeProofs} of 100
              </span>
            </div>
            <div className="w-full bg-[#eaecf0] rounded-full h-2 mb-2">
              <div
                className="bg-[#3ba935] h-2 rounded-full transition-all duration-300"
                style={{ width: `${onTimeProofs}%` }}
              />
            </div>
            <p className="text-xs text-[#9b9ba1]">
              {onTimeProofs}% on-time submission rate
            </p>
          </Card>

          {/* Missed Proofs */}
          <Card className="p-4 crypto-shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm font-medium text-[#040415]">
                Missed Proofs
              </h4>
              <span className="text-sm font-medium text-[#e3524f]">
                {missedProofs} of 100
              </span>
            </div>
            <div className="w-full bg-[#eaecf0] rounded-full h-2 mb-2">
              <div
                className="bg-[#e3524f] h-2 rounded-full transition-all duration-300"
                style={{ width: `${missedProofs}%` }}
              />
            </div>
            <p className="text-xs text-[#9b9ba1]">
              {missedProofs}% missed submissions
            </p>
          </Card>
        </div>

        {/* Month Stats */}
        <Card className="p-4 crypto-shadow">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-medium text-[#040415] mb-1">
                Tasks This Month
              </h4>
              <p className="text-2xl font-bold text-[#040415]">
                {activeTab === "solo" ? "643" : "758"}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <div className="bg-[#3ba935] text-white text-xs px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <span>↗</span>
                  <span>9.2%</span>
                </div>
                <span className="text-xs text-[#9b9ba1]">
                  12% Increase from last month
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#9b9ba1] mb-1">Success Rate</p>
              <p className="text-lg font-bold text-[#3ba935]">
                {activeTab === "solo" ? "87%" : "91%"}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Date Detail Bottom Sheet */}
      <Sheet open={showDateDetail} onOpenChange={setShowDateDetail}>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-left">
              {selectedDateData &&
                selectedDateData.date.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
            </SheetTitle>
            <SheetDescription className="text-left">
              View your progress details for this date
            </SheetDescription>
          </SheetHeader>

          {selectedDateData && (
            <div className="space-y-4">
              {/* Proofs Status */}
              <div>
                <h4 className="text-sm font-medium text-[#040415] mb-2">
                  {activeTab === "solo" ? "Solo Challenges" : "Club Challenges"}{" "}
                  Progress
                </h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#9b9ba1]">
                    {selectedDateData.completedCount} of{" "}
                    {selectedDateData.totalCount} completed
                  </span>
                  <span className="text-sm font-medium text-[#040415]">
                    {Math.round(
                      (selectedDateData.completedCount /
                        selectedDateData.totalCount) *
                        100
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    (selectedDateData.completedCount /
                      selectedDateData.totalCount) *
                    100
                  }
                  className="h-2"
                />
              </div>

              {/* Streak Info */}
              <div className="bg-[#f6f9ff] rounded-lg p-3">
                <h5 className="text-sm font-medium text-[#040415] mb-1">
                  Current Streak
                </h5>
                <p className="text-lg font-bold text-[#3843ff]">
                  {selectedDateData.streak} days
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setShowDateDetail(false);
                    router.push("/home");
                  }}
                  className="w-full crypto-gradient text-white hover:opacity-90 rounded-2xl py-3 cursor-pointer"
                >
                  Upload Proof
                </Button>
                {/* <Button
                  onClick={() => {
                    setShowDateDetail(false);
                    navigateToScreen("home");
                  }}
                  variant="outline"
                  className="w-full border-[#eaecf0] text-[#040415] hover:bg-[#f6f9ff] rounded-2xl py-3"
                >
                  View Challenges
                </Button> */}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
