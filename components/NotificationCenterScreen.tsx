import React from "react";
import {
  ArrowLeft,
  Bell,
  Clock,
  DollarSign,
  Target,
  Users,
  Check,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface NotificationCenterScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  appState: any;
}

export default function NotificationCenterScreen({
  navigateToScreen,
  appState,
}: NotificationCenterScreenProps) {
  const notifications = [
    {
      id: 1,
      type: "proof-reminder",
      title: "Proof Upload Reminder",
      message:
        "Don't forget to upload today's proof for Morning Run Challenge!",
      time: "2 hours ago",
      read: false,
      action: { screen: "proof-upload", label: "Upload Proof" },
      icon: Target,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      type: "refund-success",
      title: "Refund Processed",
      message:
        "Congratulations! Your $50 refund for completing the Reading Challenge has been processed.",
      time: "1 day ago",
      read: false,
      action: { screen: "profile", label: "View Earnings" },
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      type: "challenge-update",
      title: "New Challenge Available",
      message:
        "A new 30-Day Reading Challenge has been added. Entry fee: $25, 100% refund rate.",
      time: "2 days ago",
      read: true,
      action: { screen: "challenges", label: "View Challenge" },
      icon: Bell,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      type: "community",
      title: "Someone liked your proof",
      message: "Sarah Kim liked your morning run proof from yesterday.",
      time: "3 days ago",
      read: true,
      action: { screen: "feed", label: "View Post" },
      icon: Users,
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: 5,
      type: "challenge-joined",
      title: "Challenge Joined Successfully",
      message:
        "You have successfully joined the Cold Shower Challenge. Good luck!",
      time: "1 week ago",
      read: true,
      action: { screen: "challenge-detail", label: "View Challenge" },
      icon: Check,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 6,
      type: "streak-milestone",
      title: "Streak Milestone!",
      message:
        "Amazing! You have reached a 20-day streak. Keep up the great work!",
      time: "1 week ago",
      read: true,
      action: { screen: "profile", label: "View Stats" },
      icon: Target,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: 7,
      type: "payment-reminder",
      title: "Payment Due",
      message: "Your entry fee for the Meditation Challenge is due in 2 days.",
      time: "2 weeks ago",
      read: true,
      action: { screen: "payment-confirmation", label: "Pay Now" },
      icon: Clock,
      color: "bg-red-100 text-red-600",
    },
    {
      id: 8,
      type: "weekly-summary",
      title: "Weekly Summary",
      message:
        "This week you completed 5/7 daily proofs across all your challenges.",
      time: "2 weeks ago",
      read: true,
      action: { screen: "home", label: "View Dashboard" },
      icon: Target,
      color: "bg-blue-100 text-blue-600",
    },
  ];

  const handleNotificationClick = (notification: any) => {
    if (notification.action) {
      navigateToScreen(notification.action.screen);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen("home")}
            className="p-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="text-center">
            <h1 className="text-lg text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-600">{unreadCount} unread</p>
            )}
          </div>
          <Button variant="ghost" size="sm" className="text-blue-600">
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Bell className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <Card
                  key={notification.id}
                  className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                    !notification.read
                      ? "border-l-4 border-l-blue-500 bg-blue-50/50"
                      : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.color}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4
                          className={`text-sm ${
                            !notification.read
                              ? "text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>

                      <p
                        className={`text-sm mb-2 ${
                          !notification.read ? "text-gray-800" : "text-gray-600"
                        }`}
                      >
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                        </div>

                        {notification.action && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs px-3 py-1 h-auto"
                          >
                            {notification.action.label}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => navigateToScreen("proof-upload")}
            className="flex items-center justify-center space-x-2 py-3"
          >
            <Target className="h-4 w-4" />
            <span>Upload Proof</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => navigateToScreen("challenges")}
            className="flex items-center justify-center space-x-2 py-3"
          >
            <Bell className="h-4 w-4" />
            <span>View Challenges</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
