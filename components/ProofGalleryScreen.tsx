import Image from "next/image";
import React from "react";
import { ArrowLeft, CheckSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { HashtagList } from "./HashtagChip";

interface ProofGalleryScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  appState: any;
}

export default function ProofGalleryScreen({
  navigateToScreen,
  appState,
}: ProofGalleryScreenProps) {
  // Mock data for all user proofs
  const allProofs = [
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
      hashtags: ["MorningRun", "Fitness", "Healthy", "Endurance"],
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
      hashtags: ["Meditation", "Mindfulness", "Wellness", "Peace"],
    },
    {
      id: 3,
      challengeName: "Daily Reading",
      date: "Jan 13",
      type: "checklist",
      status: "pending",
      description:
        'Read 30 pages of "The Power of Habit" today. Great insights on building better routines.',
      hashtags: ["Reading", "SelfDevelopment"],
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
      hashtags: ["Workout", "Strength", "Fitness", "FullBody"],
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
      hashtags: ["HealthyEating", "Nutrition", "Salad"],
    },
    {
      id: 6,
      challengeName: "Sleep Tracking",
      date: "Jan 10",
      type: "checklist",
      status: "failed",
      description:
        "Unfortunately missed the 10 PM bedtime target due to work commitments.",
      hashtags: ["Sleep", "Bedtime"],
    },
    {
      id: 7,
      challengeName: "Morning Walk",
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=400&fit=crop",
      date: "Jan 9",
      type: "photo",
      status: "approved",
      description: "Beautiful sunrise walk in the park for 30 minutes.",
      hashtags: ["MorningWalk", "Nature", "Sunrise", "Peaceful"],
    },
    {
      id: 8,
      challengeName: "Yoga Practice",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      date: "Jan 8",
      type: "photo",
      status: "approved",
      description:
        "Morning yoga session focusing on flexibility and mindfulness.",
      hashtags: ["Yoga", "Flexibility", "Mindfulness"],
    },
    {
      id: 9,
      challengeName: "Water Intake",
      date: "Jan 7",
      type: "checklist",
      status: "approved",
      description: "Successfully drank 8 glasses of water throughout the day.",
      hashtags: ["WaterIntake", "Hydration"],
    },
    {
      id: 10,
      challengeName: "Cycling Challenge",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      date: "Jan 6",
      type: "photo",
      status: "approved",
      description: "10km cycling session through the city trails.",
      hashtags: ["Cycling", "Cardio", "Outdoor", "Adventure"],
    },
  ];

  const handleProofClick = (proof: any) => {
    navigateToScreen("proof-detail", {
      proof: {
        ...proof,
        uploadDate: "2024-01-15",
        uploadTime: "7:32 AM",
      },
    });
  };

  const handleHashtagClick = (hashtag: string) => {
    // Navigate to search screen with hashtag pre-filled
    navigateToScreen("search", { searchQuery: hashtag });
  };

  return (
    <div className="min-h-screen bg-[#f6f9ff] flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-[#eaecf0] crypto-shadow">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => navigateToScreen("profile")}
          >
            <ArrowLeft className="h-5 w-5 text-[#040415]" />
          </Button>
          <h1 className="text-lg font-medium text-[#040415]">My Proofs</h1>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="flex-1 px-6 py-6 pb-24">
        <div className="grid grid-cols-3 gap-4">
          {allProofs.map((proof) => (
            <div key={proof.id} className="space-y-2">
              {/* Proof Thumbnail */}
              <div
                className="aspect-square cursor-pointer"
                onClick={() => handleProofClick(proof)}
              >
                <Card className="w-full h-full overflow-hidden crypto-shadow hover:scale-105 transition-transform">
                  {proof.type === "photo" && proof.image ? (
                    <div className="relative w-full h-full">
                      <img
                        src={proof.image}
                        alt={proof.challengeName}
                        className="w-full h-full object-cover"
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

              {/* Hashtags */}
              {proof.hashtags && proof.hashtags.length > 0 && (
                <div className="px-1">
                  <HashtagList
                    hashtags={proof.hashtags}
                    limit={2}
                    onHashtagClick={handleHashtagClick}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
