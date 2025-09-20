import React, { useState } from "react";
import {
  ArrowLeft,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Smartphone,
  Wallet,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { WalletConnectButton } from "./WalletConnectButton";
import { useRouter } from "next/navigation";

interface SettingsScreenProps {
  navigateToScreen: (screen: string) => void;
  updateUser?: (userData: any) => void;
  appState: any;
  connectWallet?: () => void;
  disconnectWallet?: () => void;
  onClose?: () => void;
}

export default function SettingsScreen({
  navigateToScreen,
  updateUser,
  appState,
  connectWallet,
  disconnectWallet,
  onClose,
}: SettingsScreenProps) {
  const [settings, setSettings] = useState({
    notifications: {
      proofReminders: true,
      challengeUpdates: true,
      refundAlerts: true,
      community: false,
      marketing: false,
    },
    privacy: {
      profileVisible: true,
      activityVisible: false,
      leaderboardVisible: true,
    },
    preferences: {
      darkMode: false,
      language: "English",
      currency: "USD",
    },
  });

  const router = useRouter();

  const handleSettingChange = (
    category: string,
    setting: string,
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...(prev as any)[category],
        [setting]: value,
      },
    }));
  };

  const handleLogout = async () => {
    try {
      // AppContext 사용자 상태 초기화
      updateUser?.({ isLoggedIn: false });
      toast.success("Logged out successfully");
      router.push("/onboarding");
    } catch (error) {
      console.error("로그아웃 에러:", error);
      // 에러가 발생해도 로컬 상태는 초기화
      updateUser?.({ isLoggedIn: false });
      navigateToScreen("onboarding");
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose || (() => navigateToScreen("profile"))}
              className="p-2 mr-2 cursor-pointer"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-lg text-gray-900">Settings</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Notifications */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4 flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">Proof Reminders</p>
                  <p className="text-sm text-gray-600">
                    Daily reminders to upload proof
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.proofReminders}
                  onCheckedChange={(checked) =>
                    handleSettingChange(
                      "notifications",
                      "proofReminders",
                      checked
                    )
                  }
                />
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">Challenge Updates</p>
                  <p className="text-sm text-gray-600">
                    New challenges and updates
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.challengeUpdates}
                  onCheckedChange={(checked) =>
                    handleSettingChange(
                      "notifications",
                      "challengeUpdates",
                      checked
                    )
                  }
                />
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">Refund Alerts</p>
                  <p className="text-sm text-gray-600">
                    Payment and refund notifications
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.refundAlerts}
                  onCheckedChange={(checked) =>
                    handleSettingChange(
                      "notifications",
                      "refundAlerts",
                      checked
                    )
                  }
                />
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">Community Activity</p>
                  <p className="text-sm text-gray-600">
                    Likes, comments, and follows
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.community}
                  onCheckedChange={(checked) =>
                    handleSettingChange("notifications", "community", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">Marketing</p>
                  <p className="text-sm text-gray-600">
                    Promotional emails and offers
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.marketing}
                  onCheckedChange={(checked) =>
                    handleSettingChange("notifications", "marketing", checked)
                  }
                />
              </div>
            </div>
          </Card>

          {/* Privacy */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4 flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Privacy</span>
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">Public Profile</p>
                  <p className="text-sm text-gray-600">
                    Others can see your profile
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.profileVisible}
                  onCheckedChange={(checked) =>
                    handleSettingChange("privacy", "profileVisible", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">Activity Sharing</p>
                  <p className="text-sm text-gray-600">
                    Share your challenge activity
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.activityVisible}
                  onCheckedChange={(checked) =>
                    handleSettingChange("privacy", "activityVisible", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">Leaderboard</p>
                  <p className="text-sm text-gray-600">
                    Appear on public leaderboards
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.leaderboardVisible}
                  onCheckedChange={(checked) =>
                    handleSettingChange(
                      "privacy",
                      "leaderboardVisible",
                      checked
                    )
                  }
                />
              </div>
            </div>
          </Card>

          {/* Wallets */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4 flex items-center space-x-2">
              <Wallet className="h-5 w-5" />
              <span>Wallets</span>
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-900 mb-2">MetaMask Wallet</p>
                <p className="text-sm text-gray-600 mb-4">
                  Connect your MetaMask wallet for secure transactions
                </p>
                <WalletConnectButton
                  isConnected={appState.wallet.isConnected}
                  address={appState.wallet.address}
                  onConnect={connectWallet || (() => {})}
                  onDisconnect={disconnectWallet}
                />
              </div>
            </div>
          </Card>

          {/* Payout */}
          <Card className="p-6 gap-2">
            <h3 className="text-lg text-gray-900 font-bold">
              Payout Wallet (for refunds)
            </h3>
            <div className="space-y-4 text-sm text-gray-900 ">
              <div className="flex justify-center bg-gray-100 rounded-lg p-2 font-bold hover:bg-gray-200 cursor-pointer">
                <button>Set Address</button>
              </div>
              <div>
                <p className="">
                  Refunds will only be processed to this address.
                </p>
                <p className="">Changes will take effect after 24 hours.</p>
              </div>
            </div>
          </Card>

          {/* Preferences */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4 flex items-center space-x-2">
              <Smartphone className="h-5 w-5" />
              <span>Preferences</span>
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-600">Use dark theme</p>
                </div>
                <Switch
                  checked={settings.preferences.darkMode}
                  onCheckedChange={(checked) =>
                    handleSettingChange("preferences", "darkMode", checked)
                  }
                />
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">Language</p>
                  <p className="text-sm text-gray-600">English (US)</p>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  Change
                </Button>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">Currency</p>
                  <p className="text-sm text-gray-600">USD ($)</p>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  Change
                </Button>
              </div>
            </div>
          </Card>

          {/* Support */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4 flex items-center space-x-2">
              <HelpCircle className="h-5 w-5" />
              <span>Support</span>
            </h3>
            <div className="space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start p-3 h-auto"
              >
                <div className="text-left">
                  <p className="text-gray-900">Help Center</p>
                  <p className="text-sm text-gray-600">
                    Find answers to common questions
                  </p>
                </div>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start p-3 h-auto"
              >
                <div className="text-left">
                  <p className="text-gray-900">Contact Support</p>
                  <p className="text-sm text-gray-600">
                    Get help from our team
                  </p>
                </div>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start p-3 h-auto"
              >
                <div className="text-left">
                  <p className="text-gray-900">Terms of Service</p>
                  <p className="text-sm text-gray-600">
                    Read our terms and conditions
                  </p>
                </div>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start p-3 h-auto"
              >
                <div className="text-left">
                  <p className="text-gray-900">Privacy Policy</p>
                  <p className="text-sm text-gray-600">
                    How we handle your data
                  </p>
                </div>
              </Button>
            </div>
          </Card>

          {/* Account */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Account</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">App Version</p>
                  <p className="text-sm text-gray-600">1.2.0</p>
                </div>
              </div>

              <Separator />

              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full justify-start p-3 h-auto text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p>Sign Out</p>
                  <p className="text-sm opacity-75">Sign out of your account</p>
                </div>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
