"use client";

import React from "react";
import { Home, List, Search, Award, User } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "next/navigation";

interface GlobalBottomNavigationProps {
  currentScreen?: string;
  navigateToScreen?: (screen: string) => void;
}

export default function GlobalBottomNavigation({
  currentScreen,
  navigateToScreen,
}: GlobalBottomNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      id: "home",
      icon: Home,
      path: "/home",
    },
    {
      id: "feed",
      icon: List,
      path: "/feeds",
    },
    {
      id: "explore",
      icon: Search,
      path: "/explore",
    },
    {
      id: "leaderboard",
      icon: Award,
      path: "/leaderboard",
      hasNotification: true,
    },
    {
      id: "profile",
      icon: User,
      path: "/profile",
    },
  ];

  const isActive = (tabPath: string) => {
    // Check if current pathname matches the tab path
    if (pathname === tabPath) return true;

    // Handle path families
    if (tabPath === "/home" && pathname?.startsWith("/home")) return true;
    if (tabPath === "/feeds" && pathname?.startsWith("/feeds")) return true;
    if (tabPath === "/explore" && pathname?.startsWith("/explore")) return true;
    if (tabPath === "/leaderboard" && pathname?.startsWith("/leaderboard"))
      return true;
    if (tabPath === "/profile" && pathname?.startsWith("/profile")) return true;

    return false;
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="px-4 pt-4">
      <div className="bg-white rounded-[64px] px-6 py-5 shadow-[58px_26px_68px_0px_rgba(35,44,93,0.06)] border border-[#cdcdd0]/50">
        <div className="flex justify-around items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab.path);

            return (
              <Button
                key={tab.id}
                variant="ghost"
                className="p-0 cursor-pointer"
                onClick={() => handleNavigation(tab.path)}
              >
                <div className="relative">
                  <Icon
                    className={`h-6 w-6 ${
                      active ? "text-[#3843ff]" : "text-[#bdbdbd]"
                    }`}
                  />
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
