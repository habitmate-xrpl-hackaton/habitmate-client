import React, { useState, useRef } from "react";
import Image from "next/image";
import { Search, Bell, Heart, MessageCircle, Share, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HashtagList } from "./HashtagChip";

interface FeedScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
}

export default function FeedScreen({ navigateToScreen }: FeedScreenProps) {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [followedUsers, setFollowedUsers] = useState<number[]>([]);

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

    if (
      distanceY < 80 &&
      Math.abs(distanceX) > minSwipeDistance &&
      Math.abs(distanceX) > distanceY * 2
    ) {
      if (distanceX > 0) {
        navigateToScreen("explore");
      } else {
        navigateToScreen("home");
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

    if (!isDragging && deltaX > 20 && deltaX > deltaY) {
      setIsDragging(true);
      if (containerRef.current) {
        containerRef.current.style.cursor = "grabbing";
      }
    }

    if (isDragging) {
      setTouchEnd({ x: currentX, y: currentY });
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
          navigateToScreen("explore");
        } else {
          navigateToScreen("home");
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

  const handleLikeToggle = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const handleFollowToggle = (userId: number) => {
    setFollowedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleHashtagClick = (hashtag: string) => {
    // Navigate to search screen with hashtag pre-filled
    navigateToScreen("search", { searchQuery: hashtag });
  };

  const mockPosts = [
    {
      id: 1,
      userId: 1,
      user: {
        name: "Alex Chen",
        subtitle: "Morning Runner",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      challengeName: "Morning Run Challenge",
      content:
        "Just completed my 5K morning run! The weather was perfect and I felt energized throughout the entire run. This challenge has really helped me build a consistent routine and I'm loving the progress.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      hashtags: ["MorningRun", "Fitness", "Healthy", "Challenge", "Motivation"],
      likes: 127,
      likedBy: {
        user: "Sarah Kim",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      },
      responses: 23,
      reactedUsers: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      ],
    },
    {
      id: 2,
      userId: 2,
      user: {
        name: "Sarah Kim",
        subtitle: "Mindfulness Practitioner",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      },
      challengeName: "Daily Meditation Challenge",
      content:
        "20 minutes of mindful breathing meditation in my favorite spot by the window. The morning light and peaceful atmosphere helped me center myself for the day ahead. Grateful for this practice! ✨",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      hashtags: ["Meditation", "Mindfulness", "Wellness", "Peace"],
      likes: 89,
      likedBy: {
        user: "Mike Johnson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      responses: 15,
      reactedUsers: [
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      ],
    },
    {
      id: 3,
      userId: 3,
      user: {
        name: "Mike Johnson",
        subtitle: "Fitness Enthusiast",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      challengeName: "Home Workout Challenge",
      content:
        "Crushed today's HIIT workout! 45 minutes of pure dedication with burpees, mountain climbers, and jump squats. The burn is real but so worth it. Consistency is key! 💪",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop",
      hashtags: [
        "HIIT",
        "HomeWorkout",
        "Fitness",
        "Strength",
        "NoExcuses",
        "Consistency",
      ],
      likes: 156,
      likedBy: {
        user: "Emma Davis",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      responses: 31,
      reactedUsers: [
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      ],
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-neutral-100 flex flex-col relative z-0"
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
        <div className="flex items-center justify-between">
          <div className="w-8"></div>

          <h1 className="text-[22px] font-semibold text-black">Feeds</h1>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="p-1.5 hover:bg-gray-100"
              onClick={() => navigateToScreen("search")}
            >
              <Search className="h-6 w-6 text-black" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1.5 hover:bg-gray-100 relative"
              onClick={() => navigateToScreen("notification-center")}
            >
              <Bell className="h-6 w-6 text-black" />
              <div className="absolute right-0 top-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white"></div>
            </Button>
          </div>
        </div>
      </div>

      {/* Feed Content */}
      <div className="flex-1 bg-white">
        <div className="space-y-0 pb-24">
          {mockPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-white border-0 rounded-none border-b border-[#eaecf0] shadow-none"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={post.user.avatar} />
                    <AvatarFallback>
                      {post.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-base font-semibold text-black leading-6">
                      {post.user.name}
                    </h4>
                    <p className="text-[12px] text-[#3843ff] leading-4">
                      {post.user.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  {(() => {
                    const isFollowing = followedUsers.includes(post.userId);
                    return (
                      <Button
                        size="sm"
                        onClick={() => handleFollowToggle(post.userId)}
                        className={`px-2.5 py-1 rounded-lg text-[12px] font-medium transition-colors ${
                          isFollowing
                            ? "bg-white border border-[#9e9e9e] text-[#757575] hover:bg-gray-50"
                            : "bg-[#3843ff] hover:bg-[#6b73ff] text-white"
                        }`}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </Button>
                    );
                  })()}
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-4">
                <p className="text-[14px] text-black leading-normal tracking-[0.25px] mb-4">
                  {post.content}
                </p>

                {/* Post Image */}
                <div className="mb-4">
                  <Image
                    src={post.image}
                    alt="Post content"
                    className="w-full rounded-lg object-cover"
                    style={{ aspectRatio: "16/9" }}
                    width={400}
                    height={300}
                  />
                </div>

                {/* Hashtags */}
                {post.hashtags && post.hashtags.length > 0 && (
                  <div className="mb-4">
                    <HashtagList
                      hashtags={post.hashtags}
                      limit={3}
                      onHashtagClick={handleHashtagClick}
                      showExpandable={true}
                    />
                  </div>
                )}

                {/* Action Icons */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto hover:bg-transparent"
                      onClick={() => handleLikeToggle(post.id)}
                    >
                      <Heart
                        className={`h-6 w-6 ${
                          likedPosts.includes(post.id)
                            ? "fill-red-500 text-red-500"
                            : "text-black"
                        }`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto hover:bg-transparent"
                      onClick={() =>
                        navigateToScreen("proof-detail", {
                          proof: {
                            ...post,
                            description: post.content,
                            uploadDate: "2024-01-15",
                            uploadTime: "07:32 AM",
                            status: "approved",
                          },
                          fromScreen: "feed",
                        })
                      }
                    >
                      <MessageCircle className="h-6 w-6 text-black" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto hover:bg-transparent"
                    >
                      <Share className="h-6 w-6 text-black" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto hover:bg-transparent"
                  >
                    <Plus className="h-6 w-6 text-black" />
                  </Button>
                </div>

                {/* Like Info */}
                <div className="mb-3">
                  <p className="text-[10px] text-black leading-4 tracking-[0.5px]">
                    Liked by {post.likedBy.user} and others{" "}
                    {post.likes.toLocaleString()}
                  </p>
                </div>

                {/* Engagement Info */}
                <div className="flex items-center justify-between">
                  {/* Overlapping Avatars */}
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {post.reactedUsers.slice(0, 5).map((avatar, index) => (
                        <Avatar
                          key={index}
                          className="h-5 w-5 border-2 border-white"
                        >
                          <AvatarImage src={avatar} />
                          <AvatarFallback className="text-xs">U</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>

                  {/* Response Count */}
                  <div className="bg-neutral-100 px-3 py-1 rounded-xl">
                    <span className="text-[10px] text-black leading-4 tracking-[0.5px]">
                      {post.responses} responses
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
