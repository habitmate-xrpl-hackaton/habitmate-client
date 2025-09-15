import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { CheckCircle, Sparkles, Wallet, ArrowLeft } from "lucide-react";

interface NFTIssuanceScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  appState?: any;
}

export default function NFTIssuanceScreen({
  navigateToScreen,
  appState,
}: NFTIssuanceScreenProps) {
  const [showAnimation, setShowAnimation] = useState(true);

  // Default challenge data if none provided
  const challenge = appState?.selectedChallenge || {
    title: "Morning Meditation Challenge",
    category: "Wellness",
  };

  // Mock proof data
  const proofData = {
    proofId: "#PROOF-2025-0912-001",
    date: "Sept 12, 2025",
    transactionHash: "0xABCD1234EF56789A",
    status: "Issued",
  };

  useEffect(() => {
    // Hide animation after 3 seconds
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Confetti animation components
  const ConfettiPiece = ({
    delay,
    duration,
    x,
    y,
  }: {
    delay: number;
    duration: number;
    x: number;
    y: number;
  }) => (
    <motion.div
      className="absolute w-2 h-2 bg-[#3843ff] rounded-sm"
      initial={{ opacity: 0, x: x, y: y, rotate: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: x + (Math.random() - 0.5) * 200,
        y: y + Math.random() * 300 + 100,
        rotate: 360,
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut",
      }}
    />
  );

  const generateConfetti = () => {
    const pieces = [];
    for (let i = 0; i < 20; i++) {
      pieces.push(
        <ConfettiPiece
          key={i}
          delay={i * 0.1}
          duration={2 + Math.random() * 1}
          x={Math.random() * 300 - 150}
          y={-50}
        />
      );
    }
    return pieces;
  };

  return (
    <div className="min-h-screen bg-[#f6f9ff] flex flex-col">
      {/* Confetti Animation Overlay */}
      {showAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {generateConfetti()}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-[#eaecf0]">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen("proof-details")}
            className="w-12 h-12 p-0 bg-white border border-[#eaecf0] rounded-2xl hover:bg-gray-50 mr-4"
          >
            <ArrowLeft className="h-5 w-5 text-[#040415]" />
          </Button>
          <h1 className="text-2xl font-bold text-[#040415] tracking-tight">
            NFT Issued
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 flex flex-col">
        {/* Celebratory Icon Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#3843ff] to-[#6b73ff] rounded-full mb-6 relative"
          >
            <CheckCircle className="h-10 w-10 text-white" />

            {/* Sparkles around the icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <Sparkles className="h-4 w-4 text-[#fea800] absolute -top-1 left-1/2 transform -translate-x-1/2" />
              <Sparkles className="h-3 w-3 text-[#fea800] absolute top-1/2 -right-1 transform -translate-y-1/2" />
              <Sparkles className="h-4 w-4 text-[#fea800] absolute -bottom-1 left-1/2 transform -translate-x-1/2" />
              <Sparkles className="h-3 w-3 text-[#fea800] absolute top-1/2 -left-1 transform -translate-y-1/2" />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-[#040415] mb-2"
          >
            Your Proof NFT is issued!
          </motion.h2>
        </div>

        {/* NFT Card Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <Card
            className="bg-white rounded-[20px] p-6 border border-[#eaecf0] relative overflow-hidden"
            style={{ boxShadow: "0px 4px 16px 0px rgba(35, 44, 93, 0.08)" }}
          >
            {/* NFT Card Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#3843ff]/10 to-transparent rounded-full -translate-y-16 translate-x-16" />

            {/* NFT Thumbnail */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3843ff] to-[#6b73ff] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">🎖</span>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#040415] mb-1">
                  {challenge.title}
                </h3>
                <p className="text-sm text-[#686873] mb-2">
                  Daily Proof Certification
                </p>
                <Badge className="bg-[#d5ece0] text-[#3ba935] border-[#3ba935] text-xs">
                  {proofData.status}
                </Badge>
              </div>
            </div>

            {/* NFT Details */}
            <div className="space-y-3 pt-4 border-t border-[#eaecf0]">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#686873]">Proof ID</span>
                <span className="text-sm font-medium text-[#040415]">
                  {proofData.proofId}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#686873]">Date</span>
                <span className="text-sm font-medium text-[#040415]">
                  {proofData.date}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-6"
        >
          <Card className="bg-[#f6f9ff] rounded-[16px] p-4 border border-[#eaecf0]">
            <h4 className="text-base font-semibold text-[#040415] mb-3">
              Transaction Details
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#686873]">Challenge</span>
                <span className="text-sm font-medium text-[#040415]">
                  {challenge.title}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#686873]">Date</span>
                <span className="text-sm font-medium text-[#040415]">
                  {proofData.date}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#686873]">Transaction Hash</span>
                <span className="text-xs font-mono text-[#3843ff] bg-white px-2 py-1 rounded">
                  {proofData.transactionHash}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Info Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center mb-8"
        >
          <p className="text-sm text-[#686873] leading-relaxed">
            This NFT certifies your daily proof and serves as permanent
            verification of your commitment.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-auto space-y-3"
        >
          {/* Primary Button */}
          <Button
            className="w-full bg-[#3843ff] hover:bg-[#6b73ff] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
            onClick={() => {
              // In a real app, this would open the wallet app or web3 wallet
              alert("Opening wallet to view NFT...");
            }}
          >
            <Wallet className="h-5 w-5" />
            View in Wallet
          </Button>

          {/* Secondary Button */}
          <Button
            variant="outline"
            className="w-full border-[#eaecf0] text-[#040415] py-4 rounded-xl font-semibold hover:bg-[#f6f9ff] transition-all"
            onClick={() => navigateToScreen("challenge-detail", { challenge })}
          >
            Back to Challenge
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
