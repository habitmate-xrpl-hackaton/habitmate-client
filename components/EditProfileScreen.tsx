import React, { useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";

interface EditProfileScreenProps {
  navigateToScreen: (screen: string) => void;
  appState: any;
  updateUser: (userData: any) => void;
}

export default function EditProfileScreen({
  navigateToScreen,
  appState,
  updateUser,
}: EditProfileScreenProps) {
  const [formData, setFormData] = useState({
    name: appState.user.name,
    email: appState.user.email,
    avatar: appState.user.avatar,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = () => {
    // Simulate avatar change
    const avatars = [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    ];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    setFormData((prev) => ({
      ...prev,
      avatar: randomAvatar,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update user data
    updateUser(formData);

    setIsSaving(false);
    toast.success("Profile updated successfully! 🎉");
    navigateToScreen("profile");
  };

  const hasChanges = () => {
    return (
      formData.name !== appState.user.name ||
      formData.email !== appState.user.email ||
      formData.avatar !== appState.user.avatar
    );
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen("profile")}
            className="p-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg text-gray-900">Edit Profile</h1>
          <Button
            onClick={handleSave}
            disabled={!hasChanges() || isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Avatar Section */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Profile Picture</h3>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={formData.avatar} />
                  <AvatarFallback>
                    {formData.name
                      .split(" ")
                      .map((n: any) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  onClick={handleAvatarChange}
                  size="sm"
                  className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Tap the camera icon to change your profile picture
              </p>
            </div>
          </Card>

          {/* Personal Information */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-1"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-1"
                  placeholder="Enter your email address"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This email is used for login and notifications
                </p>
              </div>
            </div>
          </Card>

          {/* Account Settings */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">Account Status</p>
                  <p className="text-sm text-gray-600">Verified account</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900">Member Since</p>
                  <p className="text-sm text-gray-600">January 2024</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                >
                  Deactivate Account
                </Button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  This action will temporarily disable your account
                </p>
              </div>
            </div>
          </Card>

          {/* Privacy & Security */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Privacy & Security</h3>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>

              <Button variant="outline" className="w-full justify-start">
                Two-Factor Authentication
              </Button>

              <Button variant="outline" className="w-full justify-start">
                Download My Data
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Save Button (Mobile) */}
      <div className="bg-white border-t border-gray-200 p-4 md:hidden">
        <Button
          onClick={handleSave}
          disabled={!hasChanges() || isSaving}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl disabled:opacity-50"
        >
          {isSaving ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Saving Changes...</span>
            </div>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
}
