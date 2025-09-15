import Image from "next/image";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

interface ProofDetailsScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  appState: any;
}

export default function ProofDetailsScreen({
  navigateToScreen,
  appState,
}: ProofDetailsScreenProps) {
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);

    // Show toast notification
    toast.success("Proof submitted successfully!");

    // Navigate to NFT Issuance screen
    navigateToScreen("nft-issuance");
  };

  const handleBack = () => {
    navigateToScreen("proof-upload");
  };

  return (
    <div className="min-h-screen bg-[#f6f9ff] flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-[#eaecf0]">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="w-12 h-12 p-0 bg-white border border-[#eaecf0] rounded-2xl hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5 text-[#040415]" />
          </Button>
          <h1 className="text-2xl font-bold text-[#040415] tracking-tight">
            Proof Details
          </h1>
          <div className="w-12 h-12"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-6">
        {/* Photo Preview */}
        <div className="bg-white rounded-2xl p-4 crypto-shadow">
          <h3 className="text-lg font-medium text-[#040415] mb-3">
            Your Proof
          </h3>
          {appState.capturedImage && (
            <div className="w-full h-48 rounded-xl overflow-hidden">
              <img
                src={appState.capturedImage}
                alt="Captured proof"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-4 crypto-shadow space-y-3">
          <Label
            htmlFor="description"
            className="text-sm font-medium text-[#040415]"
          >
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Add a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px] resize-none border-[#eaecf0] focus:border-[#3843ff] focus:ring-[#3843ff] rounded-xl"
            rows={4}
          />
          <p className="text-xs text-[#9b9ba1]">
            Share details about your proof - what did you accomplish?
          </p>
        </div>

        {/* Hashtags */}
        <div className="bg-white rounded-2xl p-4 crypto-shadow space-y-3">
          <Label
            htmlFor="hashtags"
            className="text-sm font-medium text-[#040415]"
          >
            Hashtags
          </Label>
          <Input
            id="hashtags"
            placeholder="Add hashtags... #morningrun #fitness"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            className="border-[#eaecf0] focus:border-[#3843ff] focus:ring-[#3843ff] rounded-xl"
          />
          <p className="text-xs text-[#9b9ba1]">
            Help others discover your proof with relevant hashtags
          </p>
        </div>

        {/* Challenge Info */}
        <div className="bg-[#f6f9ff] rounded-2xl p-4 border border-[#eaecf0]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#3843ff] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">🏃</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-[#040415]">
                30-Day Morning Run
              </h4>
              <p className="text-xs text-[#9b9ba1]">Day 15 of 30</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="px-6 pb-6">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full crypto-gradient text-white hover:opacity-90 rounded-2xl py-4 text-base font-medium"
        >
          {isSubmitting ? "Submitting..." : "Submit Proof"}
        </Button>
      </div>
    </div>
  );
}
