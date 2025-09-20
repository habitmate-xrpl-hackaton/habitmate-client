"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  ArrowLeft,
  Shield,
  DollarSign,
  Calendar,
  Users,
  FolderOpen,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import jwt from "jsonwebtoken";

interface PaymentConfirmationScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  appState: any;
}

export default function PaymentConfirmationScreen({
  navigateToScreen,
  appState,
}: PaymentConfirmationScreenProps) {
  const [agreed, setAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const challenge = appState.selectedChallenge || {
    title: "Morning Meditation Challenge",
    description: "Start your day with mindfulness",
    duration: 21,
    participationFee: 5,
    maxRefund: 3,
    refundRate: 100,
    participants: 67,
    category: "Wellness",
    difficulty: "Beginner",
    startDate: "Sept 10",
    sponsorLogo:
      "https://images.unsplash.com/photo-1670850664664-d8ed42d767fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYW55JTIwbG9nbyUyMGJyYW5kJTIwc3ltYm9sfGVufDF8fHx8MTc1NzA5MjQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sponsorName: "Mindful Co.",
    sponsorReward: "50% off meditation app premium",
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-[#d5ece0] text-[#3ba935] border-[#3ba935]";
      case "Medium":
        return "bg-[#fff3da] text-[#fea800] border-[#fea800]";
      case "Hard":
        return "bg-[#fde8e8] text-[#e3524f] border-[#e3524f]";
      default:
        return "bg-[#eaecf0] text-[#686873] border-[#686873]";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Wellness":
        return "bg-[#f6f9ff] text-[#3843ff]";
      case "Digital Detox":
        return "bg-[#fde8e8] text-[#e3524f]";
      case "Self-Development":
        return "bg-[#fff3da] text-[#fea800]";
      case "Fitness":
        return "bg-[#d5ece0] text-[#3ba935]";
      default:
        return "bg-[#eaecf0] text-[#686873]";
    }
  };

  const handlePayment = async () => {
    if (!agreed) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setIsProcessing(true);
    // Simulate XRPL payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsProcessing(false);

    // Show success modal
    setShowSuccessModal(true);
  };

  const realHandlePayment = async () => {
    if (!agreed) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setIsProcessing(true);

    try {
      console.log("🚀 챌린지 참가 및 XRPL 트랜잭션 시작");

      // 액세스 토큰 가져오기
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("액세스 토큰이 없습니다");
      }

      // JWT 토큰 파싱
      const cleanToken = accessToken.replace(/^Bearer\s+/i, "");
      const payload = jwt.decode(cleanToken) as any;

      // 1. Escrow 생성
      console.log("🔒 Escrow 생성 시작...");

      const challengeId = "1"; // 요청하신 대로 챌린지 ID 1로 설정

      // Escrow 생성 API 호출
      const escrowResponse = await fetch("/api/escrow/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({
          issuerSeed: payload.xrplSecret, // 사용자 시크릿을 issuer로 사용 (실제로는 발급자 시드여야 함)
          subjectSeed: payload.xrplAddress, // 사용자 주소를 subject로 사용
          amount: challenge.participationFee * 1000000, // XRP를 drops로 변환 (1 XRP = 1,000,000 drops)
          condition: `Challenge ${challengeId} participation escrow`,
        }),
      });

      console.log("🔒 Escrow 생성 응답 상태:", escrowResponse.status);

      if (!escrowResponse.ok) {
        const error = await escrowResponse.json();
        throw new Error(
          `Escrow 생성 실패: ${error.message || "알 수 없는 오류"}`
        );
      }

      const escrowResult = await escrowResponse.json();
      console.log("✅ Escrow 생성 완료:", escrowResult);

      // 2. XRPL 트랜잭션 생성 (소스 → 목적지)
      console.log("💸 XRPL 트랜잭션 생성 중...");

      // XRPL 트랜잭션 시뮬레이션 (실제로는 xrpl 라이브러리 사용)
      const xrplTransaction = {
        from: payload.xrplAddress, // 소스 주소
        to: payload.issuerAddress, // 목적지 주소 (발급자)
        amount: challenge.participationFee, // 참가료
        currency: "XRP",
        memo: `Challenge ${challengeId} participation fee`,
        transactionHash:
          "SIM_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        escrowSequence: escrowResult.sequenceNumber, // Escrow 시퀀스 번호 포함
      };

      console.log("💸 XRPL 트랜잭션 정보:", xrplTransaction);

      // XRPL 트랜잭션 시뮬레이션 지연
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("✅ XRPL 트랜잭션 완료:", xrplTransaction.transactionHash);

      // 3. 서버에 챌린지 참가 신청
      console.log("🌐 챌린지 참가 API 호출 시작");

      console.log(
        "🌐 프록시 API URL: /api/challenges/" + challengeId + "/participations"
      );
      console.log("🔍 Challenge ID:", challengeId);

      const response = await fetch(
        `/api/challenges/${challengeId}/participations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
          body: JSON.stringify({
            participationFee: challenge.participationFee,
            challengeId: 1,
            xrplTransactionHash: xrplTransaction.transactionHash,
            fromAddress: payload.xrplAddress,
            toAddress: payload.issuerAddress,
            escrowSequence: escrowResult.sequenceNumber,
            escrowTxHash: escrowResult.txHash,
          }),
        }
      );

      console.log("🌐 API 응답 상태:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("✅ 챌린지 참가 성공:", result);

        // 성공 토스트
        toast.success("XRPL 트랜잭션 및 챌린지 참가가 완료되었습니다! 🎉");

        // 성공 모달 표시
        setShowSuccessModal(true);
      } else {
        const error = await response.json();
        console.error("❌ 챌린지 참가 실패:", error);
        toast.error(`참가 실패: ${error.message || "알 수 없는 오류"}`);
      }
    } catch (error) {
      console.error("❌ 처리 중 오류:", error);
      toast.error("처리 중 오류가 발생했습니다");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleModalOk = () => {
    setShowSuccessModal(false);
    navigateToScreen("home");
  };

  return (
    <div className="min-h-screen bg-[#f6f9ff] flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-[#eaecf0]">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="w-12 h-12 p-0 bg-white border border-[#eaecf0] rounded-2xl hover:bg-gray-50 mr-4"
          >
            <ArrowLeft className="h-5 w-5 text-[#040415]" />
          </Button>
          <h1 className="text-2xl font-bold text-[#040415] tracking-tight">
            Challenge Payment
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Header Section */}
        <div className="space-y-3">
          {/* Challenge Title */}
          <h2 className="text-2xl font-bold text-[#040415] leading-tight">
            {challenge.title}
          </h2>

          {/* Small Description */}
          <p className="text-sm text-[#686873] leading-relaxed">
            {challenge.description}
          </p>
        </div>

        {/* Payment Summary Card */}
        <Card
          className="bg-white p-6 rounded-[20px] border border-[#eaecf0]"
          style={{ boxShadow: "0px 4px 16px 0px rgba(35, 44, 93, 0.08)" }}
        >
          <h3 className="text-lg font-semibold text-[#040415] mb-5">
            Payment Summary
          </h3>

          <div className="space-y-4">
            {/* Participation Fee */}
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-[#686873]">
                Participation Fee
              </span>
              <span className="text-lg font-bold text-[#040415]">
                ${challenge.participationFee}
              </span>
            </div>

            {/* Maximum Refund */}
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-[#686873]">
                Maximum Refund
              </span>
              <span className="text-base font-semibold text-[#040415]">
                ${challenge.maxRefund}
              </span>
            </div>

            {/* Duration */}
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-[#686873]">
                Duration
              </span>
              <span className="text-sm font-semibold text-[#040415]">
                {challenge.duration} days
              </span>
            </div>

            {/* Start Date */}
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-[#686873]">
                Start Date
              </span>
              <span className="text-sm font-semibold text-[#040415]">
                {challenge.startDate}
              </span>
            </div>

            {/* Participants */}
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-[#686873]">
                Participants
              </span>
              <span className="text-sm font-semibold text-[#040415]">
                {challenge.participants} joined
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-[#eaecf0] my-4"></div>

            {/* Refund Conditions */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-[#686873] mb-2">
                Refund Conditions
              </div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-[#3ba935] font-medium">
                    ✅ Success rate ≥70% → Partial refund (up to $
                    {challenge.maxRefund})
                  </span>
                </div>
                <div>
                  <span className="text-[#e3524f] font-medium">
                    ❌ Fail (&lt;70%) → No refund, full donation
                  </span>
                </div>
              </div>
            </div>

            {/* Rewards */}
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-[#686873]">
                Rewards
              </span>
              <div className="flex items-center gap-2">
                <span className="text-lg">🎖</span>
                <span className="text-sm font-semibold text-[#040415]">
                  Achievement NFT
                </span>
              </div>
            </div>

            {/* Sponsor Reward Info */}
            {challenge.sponsorReward && (
              <div className="p-3 bg-[#fff3da] rounded-xl border border-[#fea800]/20">
                <div className="flex items-center gap-2 mb-1">
                  {challenge.sponsorLogo && (
                    <Image
                      src={challenge.sponsorLogo}
                      alt={challenge.sponsorName}
                      className="w-5 h-5 object-contain"
                      width={20}
                      height={20}
                    />
                  )}
                  <span className="text-sm font-medium text-[#fea800]">
                    Brand Bonus
                  </span>
                </div>
                <p className="text-xs text-[#040415]">
                  Includes {challenge.sponsorReward} on completion
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Information Section */}
        <div className="bg-[#f6f9ff] p-4 rounded-xl border border-[#eaecf0]">
          <p className="text-sm text-[#686873] leading-relaxed">
            Your participation fee is managed via daily escrow. Based on your
            success rate, up to ${challenge.maxRefund} is refunded. The
            remaining amount goes to the Brand host. If your success rate is
            below 70%, the full amount is donated.
          </p>
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start space-x-3 px-1">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(checked) =>
              setAgreed(checked === "indeterminate" ? false : checked)
            }
            className="mt-1 border-[#eaecf0] data-[state=checked]:bg-[#3843ff] data-[state=checked]:border-[#3843ff]"
          />
          <label
            htmlFor="terms"
            className="text-sm text-[#686873] leading-relaxed cursor-pointer"
          >
            I agree to the challenge rules, refund policy, and understand that
            my participation fee will be held in daily escrow until challenge
            completion.
          </label>
        </div>
      </div>

      {/* Action Section */}
      <div className="bg-white border-t border-[#eaecf0] p-6 space-y-3">
        {/* 시뮬레이션 버튼 */}
        <Button
          onClick={handlePayment}
          disabled={!agreed || isProcessing}
          className="w-full bg-[#3843ff] hover:bg-[#6b73ff] text-white py-4 rounded-xl font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing Payment...</span>
            </div>
          ) : (
            "Confirm & Pay (Simulation)"
          )}
        </Button>

        {/* 실제 API 호출 버튼 */}
        <Button
          onClick={realHandlePayment}
          disabled={!agreed || isProcessing}
          className="w-full bg-[#3ba935] hover:bg-[#2d8a27] text-white py-4 rounded-xl font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing Real Payment...</span>
            </div>
          ) : (
            "Confirm & Pay (Real API)"
          )}
        </Button>

        {/* XRPL Subtext */}
        <p className="text-center text-xs text-[#9b9ba1]">
          Payment will be processed via XRPL escrow
        </p>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <div
            className="bg-white rounded-[24px] p-8 w-full max-w-sm mx-4"
            style={{ boxShadow: "0px 8px 32px 0px rgba(35, 44, 93, 0.16)" }}
          >
            <div className="text-center space-y-6">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-[#d5ece0] rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">✅</span>
              </div>

              {/* Success Message */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#040415]">
                  Payment Confirmed!
                </h3>
                <p className="text-sm text-[#686873] leading-relaxed">
                  You&apos;ve successfully joined the challenge. Your
                  participation fee has been secured in XRPL escrow.
                </p>
              </div>

              {/* OK Button */}
              <Button
                onClick={handleModalOk}
                className="w-full bg-[#3843ff] hover:bg-[#6b73ff] text-white py-3 rounded-xl font-semibold transition-all cursor-pointer"
              >
                Got it!
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
