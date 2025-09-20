"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Search, X, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface SearchScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  appState: any;
}

export default function SearchScreen({
  navigateToScreen,
  appState,
}: SearchScreenProps) {
  // Initialize with search query from navigation data if provided
  const initialQuery = appState?.selectedSearchQuery || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [currentSearchQuery, setCurrentSearchQuery] = useState(initialQuery); // Actual query used for search
  const [activeResultTab, setActiveResultTab] = useState<
    "challenges" | "proofs"
  >("challenges");
  const [recentSearches, setRecentSearches] = useState([
    "Morning Run",
    "Meditation",
    "Reading Challenge",
    "Fitness",
  ]);

  const suggestedKeywords = [
    "Fitness",
    "Study",
    "Diet",
    "Meditation",
    "Reading",
    "Workout",
    "Running",
    "Wellness",
    "Health",
    "Productivity",
  ];

  // Mock search results for proofs
  const mockProofResults = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      userName: "Alex Chen",
      userAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      challengeName: "Morning Run Challenge",
      date: "2 hours ago",
      comment:
        "Just completed my 5K morning run! Feeling energized and ready for the day 💪",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      userName: "Sarah Kim",
      userAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      challengeName: "Daily Meditation",
      date: "4 hours ago",
      comment:
        "20 minutes of mindful breathing meditation in my favorite spot. Such peaceful vibes today 🧘‍♀️",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop",
      userName: "Mike Johnson",
      userAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      challengeName: "Home Workout",
      date: "6 hours ago",
      comment:
        "Crushed today's HIIT workout! 45 minutes of pure dedication. The burn is real but so worth it 🔥",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
      userName: "Emma Davis",
      userAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      challengeName: "Healthy Eating",
      date: "8 hours ago",
      comment:
        "Prepared a colorful quinoa bowl with fresh veggies and avocado. Healthy eating never tasted so good! 🥗",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=400&fit=crop",
      userName: "David Liu",
      userAvatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      challengeName: "Cold Shower Challenge",
      date: "1 day ago",
      comment:
        "2 minutes of cold shower therapy! The initial shock is intense but the energy boost is incredible ❄️",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
      userName: "Lisa Park",
      userAvatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      challengeName: "Reading Challenge",
      date: "1 day ago",
      comment:
        'Finished 30 pages of "Atomic Habits" today. Learning so much about building sustainable routines! 📚',
    },
  ];

  // Combine app state challenges with additional mock challenges for search variety
  const additionalChallenges = [
    {
      id: 101,
      title: "Daily Water Challenge",
      category: "Health",
      participants: 1580,
      entryFee: 15,
      duration: "14 days",
      difficulty: "Beginner",
      type: "group",
      description: "Drink 8 glasses of water daily",
    },
    {
      id: 102,
      title: "No Phone Before Bed",
      category: "Wellness",
      participants: 945,
      entryFee: 20,
      duration: "21 days",
      difficulty: "Medium",
      type: "solo",
      description: "Avoid phone usage 1 hour before sleep",
    },
    {
      id: 103,
      title: "Daily Journaling",
      category: "Self-Development",
      participants: 672,
      entryFee: 25,
      duration: "30 days",
      difficulty: "Beginner",
      type: "group",
      description: "Write in journal for 10 minutes daily",
    },
  ];

  const allChallenges = [
    ...(appState.soloChallenges || []),
    ...(appState.groupChallenges || []),
    ...additionalChallenges,
  ];

  const executeSearch = (query: string) => {
    setCurrentSearchQuery(query);
    // Add to recent searches if not empty and not already there
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches((prev) => [query.trim(), ...prev.slice(0, 3)]);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    executeSearch(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      executeSearch(searchQuery.trim());
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    executeSearch(keyword);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    executeSearch(search);
  };

  const filteredProofs = mockProofResults.filter(
    (proof) =>
      currentSearchQuery === "" ||
      proof.challengeName
        .toLowerCase()
        .includes(currentSearchQuery.toLowerCase()) ||
      proof.userName.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
      proof.comment.toLowerCase().includes(currentSearchQuery.toLowerCase())
  );

  const filteredChallenges = allChallenges.filter(
    (challenge) =>
      currentSearchQuery === "" ||
      challenge.title
        .toLowerCase()
        .includes(currentSearchQuery.toLowerCase()) ||
      challenge.category
        .toLowerCase()
        .includes(currentSearchQuery.toLowerCase()) ||
      (challenge.description &&
        challenge.description
          .toLowerCase()
          .includes(currentSearchQuery.toLowerCase()))
  );

  const suggestedSearchKeywords = [
    "fitness",
    "meditation",
    "reading",
    "workout",
    "running",
    "health",
    "wellness",
    "productivity",
    "habits",
    "mindfulness",
    "nutrition",
    "exercise",
  ];

  return (
    <div className="min-h-screen bg-[#f6f9ff] flex flex-col">
      {/* Header with Search Bar */}
      <div className="bg-white px-6 py-4 border-b border-[#eaecf0]">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen("back")}
            className="p-1.5 hover:bg-gray-100 cursor-pointer"
          >
            <ArrowLeft className="h-6 w-6 text-[#040415]" />
          </Button>

          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search className="h-5 w-5 text-[#9b9ba1]" />
            </div>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search proofs, challenges, users..."
              className="pl-10 pr-10 bg-[#f6f9ff] border-[#eaecf0] rounded-xl focus:border-[#3843ff] focus:ring-1 focus:ring-[#3843ff]"
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-[#9b9ba1]" />
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            onClick={() => navigateToScreen("back")}
            className="text-[#3843ff] hover:bg-[#f6f9ff] cursor-pointer"
          >
            Cancel
          </Button>
        </div>
      </div>

      <div className="flex-1 px-6 py-4 space-y-6 pb-24">
        {/* No search query - show recent searches and suggestions */}
        {!currentSearchQuery && (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-[#040415]">
                    Recent Searches
                  </h3>
                  <Button
                    variant="ghost"
                    onClick={clearRecentSearches}
                    className="text-xs text-[#3843ff] p-0 h-auto hover:bg-transparent"
                  >
                    Clear All
                  </Button>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      onClick={() => handleRecentSearchClick(search)}
                      className="flex items-center space-x-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors"
                    >
                      <Search className="h-4 w-4 text-[#9b9ba1]" />
                      <span className="text-sm text-[#040415]">{search}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Keywords */}
            <div>
              <h3 className="text-sm font-medium text-[#040415] mb-3">
                Suggested Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {suggestedKeywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    variant="secondary"
                    onClick={() => handleKeywordClick(keyword)}
                    className="cursor-pointer bg-white border border-[#eaecf0] text-[#040415] hover:bg-[#f6f9ff] hover:border-[#3843ff] transition-colors"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Search Results */}
        {currentSearchQuery && (
          <>
            {/* Result Tabs */}
            <div className="bg-white p-1 rounded-xl border border-[#eaecf0] flex">
              <button
                onClick={() => setActiveResultTab("challenges")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  activeResultTab === "challenges"
                    ? "bg-[#3843ff] text-white"
                    : "text-[#686873] hover:text-[#040415]"
                }`}
              >
                Challenges ({filteredChallenges.length})
              </button>
              <button
                onClick={() => setActiveResultTab("proofs")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  activeResultTab === "proofs"
                    ? "bg-[#3843ff] text-white"
                    : "text-[#686873] hover:text-[#040415]"
                }`}
              >
                Proofs ({filteredProofs.length})
              </button>
            </div>

            {/* Challenge Results */}
            {activeResultTab === "challenges" && (
              <div className="space-y-3">
                {filteredChallenges.length > 0 ? (
                  filteredChallenges.map((challenge) => (
                    <Card
                      key={challenge.id}
                      onClick={() =>
                        navigateToScreen("challenge-detail", { challenge })
                      }
                      className="bg-white border border-[#eaecf0] rounded-xl p-4 cursor-pointer hover:border-[#3843ff] transition-colors crypto-shadow"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-[#040415] mb-1">
                              {challenge.title}
                            </h4>
                            <div className="flex items-center space-x-2 text-xs text-[#9b9ba1] mb-2">
                              <Badge
                                variant="secondary"
                                className="bg-[#f6f9ff] text-[#3843ff] border-[#d7d9ff]"
                              >
                                {challenge.category}
                              </Badge>
                              <span>•</span>
                              <span>
                                {challenge.participants ||
                                  challenge.total ||
                                  "New"}{" "}
                                participants
                              </span>
                              <span>•</span>
                              <span>{challenge.difficulty || "Medium"}</span>
                            </div>
                            {challenge.description && (
                              <p className="text-xs text-[#686873] mb-2">
                                {challenge.description}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-[#9b9ba1]">Entry Fee</p>
                            <p className="text-sm font-medium text-[#3ba935]">
                              ${challenge.entryFee}
                            </p>
                          </div>
                        </div>

                        <div className="text-xs text-[#9b9ba1]">
                          Duration: {challenge.duration}
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[#9b9ba1] mb-4">
                      No results found for &quot;{currentSearchQuery}&quot;
                    </p>
                    <div>
                      <p className="text-sm text-[#686873] mb-2">
                        Try searching for:
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {suggestedSearchKeywords.slice(0, 6).map((keyword) => (
                          <Badge
                            key={keyword}
                            variant="secondary"
                            onClick={() => handleKeywordClick(keyword)}
                            className="cursor-pointer bg-white border border-[#eaecf0] text-[#040415] hover:bg-[#f6f9ff] hover:border-[#3843ff] transition-colors"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Proof Results */}
            {activeResultTab === "proofs" && (
              <div className="space-y-3">
                {filteredProofs.length > 0 ? (
                  filteredProofs.map((proof) => (
                    <Card
                      key={proof.id}
                      onClick={() =>
                        navigateToScreen("proof-detail", { proof })
                      }
                      className="bg-white border border-[#eaecf0] rounded-xl p-4 cursor-pointer hover:border-[#3843ff] transition-colors crypto-shadow"
                    >
                      <div className="flex space-x-3">
                        {/* Proof Thumbnail */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#f6f9ff] flex-shrink-0">
                          <Image
                            src={proof.image}
                            alt={proof.challengeName}
                            className="w-full h-full object-cover"
                            width={64}
                            height={64}
                          />
                        </div>

                        {/* Proof Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={proof.userAvatar} />
                              <AvatarFallback className="text-xs">
                                {proof.userName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-[#040415]">
                              {proof.userName}
                            </span>
                            <span className="text-xs text-[#9b9ba1]">•</span>
                            <span className="text-xs text-[#9b9ba1]">
                              {proof.date}
                            </span>
                          </div>
                          <p className="text-sm text-[#040415] font-medium mb-2">
                            {proof.challengeName}
                          </p>
                          <p className="text-sm text-[#686873] line-clamp-2">
                            {proof.comment}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[#9b9ba1] mb-4">
                      No results found for &quot;{currentSearchQuery}&quot;
                    </p>
                    <div>
                      <p className="text-sm text-[#686873] mb-2">
                        Try searching for:
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {suggestedSearchKeywords.slice(0, 6).map((keyword) => (
                          <Badge
                            key={keyword}
                            variant="secondary"
                            onClick={() => handleKeywordClick(keyword)}
                            className="cursor-pointer bg-white border border-[#eaecf0] text-[#040415] hover:bg-[#f6f9ff] hover:border-[#3843ff] transition-colors"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
