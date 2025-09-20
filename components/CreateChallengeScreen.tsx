import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Users,
  Info,
  Eye,
  HelpCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { toast } from "sonner";
import { apiClient, ChallengeRequest } from "@/lib/api";
import useSWRMutation from "swr/mutation";
import { uploadImage } from "@/lib/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CreateChallengeScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  addChallenge: (challenge: any) => void;
}

export default function CreateChallengeScreen({
  navigateToScreen,
  addChallenge,
}: CreateChallengeScreenProps) {
  const [challengeType, setChallengeType] = useState<"solo" | "group">("solo");
  const [uploadedImage, setUploadedImage] = useState<{
    file: File | null;
    preview: string | null;
    url: string | null;
  }>({
    file: null,
    preview: null,
    url: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    durationUnit: "days",
    startDate: (() => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split("T")[0];
    })(), // Default to tomorrow
    endDate: "",
    proofFrequency: "",
    participationFee: "",
    serviceFee: "10", // Default 10% for group challenges
    proofType: "",
    maxParticipants: "",
    difficulty: "",
    rewardTitle: "",
    rewardType: "",
    rewardDescription: "",
    rewardValue: "",
  });
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  // SWR mutation for creating challenge
  const { trigger: createChallenge, isMutating } = useSWRMutation(
    "/api/challenges",
    apiClient.challenges.create
  );

  // 이미지 업로드 핸들러
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("🖼️ 이미지 업로드 시작:", file.name, file.size, file.type);

    // 파일 크기 체크 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      console.error("❌ 파일 크기 초과:", file.size);
      toast.error("파일 크기는 5MB를 초과할 수 없습니다.");
      return;
    }

    // 이미지 파일 타입 체크
    if (!file.type.startsWith("image/")) {
      console.error("❌ 잘못된 파일 타입:", file.type);
      toast.error("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 미리보기 생성
    const preview = URL.createObjectURL(file);
    setUploadedImage((prev) => ({
      ...prev,
      file,
      preview,
    }));

    // Supabase에 바로 업로드
    setIsUploading(true);
    console.log("🚀 Supabase 업로드 시작...");

    try {
      const result = await uploadImage(file);
      console.log("📤 업로드 결과:", result);

      if (result.success) {
        console.log("✅ 업로드 성공!");
        console.log("🔗 이미지 URL:", (result as any).url);
        console.log("📁 파일 경로:", (result as any).path);

        setUploadedImage((prev) => ({
          ...prev,
          url: (result as any).url || null,
        }));
        toast.success("이미지가 성공적으로 업로드되었습니다!");
      } else {
        console.error("❌ 업로드 실패:", (result as any).error);
        toast.error("이미지 업로드에 실패했습니다.");
        setUploadedImage({
          file: null,
          preview: null,
          url: null,
        });
      }
    } catch (error) {
      console.error("💥 업로드 에러:", error);
      toast.error("이미지 업로드 중 오류가 발생했습니다.");
      setUploadedImage({
        file: null,
        preview: null,
        url: null,
      });
    } finally {
      setIsUploading(false);
      console.log("🏁 업로드 프로세스 완료");
    }
  };

  // 이미지 제거 핸들러
  const handleImageRemove = () => {
    if (uploadedImage.preview) {
      URL.revokeObjectURL(uploadedImage.preview);
    }
    setUploadedImage({
      file: null,
      preview: null,
      url: null,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    // participationFee 필드에 대해서만 정규식으로 1~100 범위 체크
    if (field === "participationFee") {
      // 빈 값이거나 1~100 범위의 숫자만 허용하는 정규식
      const validPattern = /^(|([1-9]|[1-9][0-9]|100))$/;
      if (!validPattern.test(value)) {
        return; // 유효하지 않은 값이면 업데이트하지 않음
      }
    }

    // serviceFee 필드에 대해서만 정규식으로 0~50 범위 체크
    if (field === "serviceFee") {
      // 빈 값이거나 0~50 범위의 숫자만 허용하는 정규식
      const validPattern = /^(|(0|[1-9]|[1-4][0-9]|50))$/;
      if (!validPattern.test(value)) {
        return; // 유효하지 않은 값이면 업데이트하지 않음
      }
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Auto-calculate end date when duration or start date changes
  useEffect(() => {
    if (formData.duration && formData.startDate && formData.durationUnit) {
      const startDate = new Date(formData.startDate);
      const durationInDays =
        parseInt(formData.duration) *
        (formData.durationUnit === "weeks" ? 7 : 1);
      const endDate = new Date(
        startDate.getTime() + durationInDays * 24 * 60 * 60 * 1000
      );
      const endDateString = endDate.toISOString().split("T")[0];

      setFormData((prev) => ({
        ...prev,
        endDate: endDateString,
      }));
    }
  }, [formData.duration, formData.startDate, formData.durationUnit]);

  const handlePreview = () => {
    // Basic validation for preview
    if (!formData.title || !formData.description || !formData.duration) {
      toast.error(
        "Please fill in at least the title, description, and duration to preview"
      );
      return;
    }

    navigateToScreen("challenge-preview", {
      challenge: {
        ...formData,
        challengeType,
        proofFrequencyPerWeek: formData.proofFrequency,
      },
    });
  };

  const handleSubmit = async () => {
    console.log("handleSubmit called", { challengeType, formData });

    // Validation for Solo Challenge
    if (challengeType === "solo") {
      console.log("Validating solo challenge fields...");
      const missingFields = [];

      if (!formData.title) missingFields.push("title");
      if (!formData.description) missingFields.push("description");
      if (!formData.category) missingFields.push("category");
      if (!formData.duration) missingFields.push("duration");
      if (!formData.startDate) missingFields.push("startDate");
      if (!formData.endDate) missingFields.push("endDate");
      if (!formData.proofFrequency) missingFields.push("proofFrequency");
      if (!formData.participationFee) missingFields.push("participationFee");
      if (!formData.proofType) missingFields.push("proofType");

      if (missingFields.length > 0) {
        console.log(
          "Solo challenge validation failed. Missing fields:",
          missingFields
        );
        toast.error("Please fill in all required fields for Solo Challenge");
        return;
      }

      console.log("Solo challenge validation passed!");
    }

    // Validation for Group Challenge
    if (challengeType === "group") {
      if (
        !formData.title ||
        !formData.description ||
        !formData.category ||
        !formData.duration ||
        !formData.startDate ||
        !formData.endDate ||
        !formData.proofFrequency ||
        !formData.maxParticipants ||
        !formData.difficulty ||
        !formData.participationFee ||
        !formData.proofType
      ) {
        toast.error("Please fill in all required fields for Group Challenge");
        return;
      }

      if (parseInt(formData.maxParticipants) < 2) {
        toast.error("Group challenges must have at least 2 participants");
        return;
      }
    }

    // Date validation
    console.log("Starting date validation...");

    // 날짜 문자열을 YYYY-MM-DD 형식으로 파싱
    const startDateStr = formData.startDate;
    const endDateStr = formData.endDate;

    // 오늘 날짜를 YYYY-MM-DD 형식으로 가져오기
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    console.log("Date strings:", { startDateStr, endDateStr, todayStr });

    // 문자열로 날짜 비교 (YYYY-MM-DD 형식이므로 문자열 비교가 가능)
    if (startDateStr < todayStr) {
      console.log("Start date validation failed - past date");
      toast.error("Start date cannot be in the past");
      return;
    }

    if (endDateStr <= startDateStr) {
      console.log("End date validation failed - not after start date");
      toast.error("End date must be after start date");
      return;
    }

    console.log("Date validation passed!");

    try {
      console.log("Starting API call...");

      // API 요청 데이터 구성
      const apiData: ChallengeRequest = {
        type: challengeType === "solo" ? "SOLO" : "GROUP",
        title: formData.title,
        description: formData.description,
        category: formData.category.toUpperCase() as
          | "FITNESS"
          | "WELLNESS"
          | "PRODUCTIVITY"
          | "LEARNING"
          | "CREATIVITY"
          | "SOCIAL",
        difficulty: (formData.difficulty || "MEDIUM").toUpperCase() as
          | "EASY"
          | "MEDIUM"
          | "HARD",
        start_date: formData.startDate,
        end_date: formData.endDate,
        proof_frequency: parseInt(formData.proofFrequency),
        entry_fee: {
          currency: "XRP",
          amount: parseInt(formData.participationFee),
        },
        service_fee: {
          currency: "PERCENT",
          amount: challengeType === "group" ? parseInt(formData.serviceFee) : 0,
        },
        proof_type: "PHOTO",
        rules: [
          `Complete ${formData.proofFrequency} times per week`,
          "Upload photo proof as required",
          "Follow challenge guidelines",
        ],
        max_participants:
          challengeType === "group" ? parseInt(formData.maxParticipants) : 1,
        image_url: uploadedImage.url || undefined, // 업로드된 이미지 URL 추가
      };

      console.log("📋 API 요청 데이터 준비 완료:", apiData);
      console.log("🖼️ 포함된 이미지 URL:", uploadedImage.url);

      // SWR mutation으로 API 호출
      const result = (await createChallenge(apiData)) as any;
      console.log("Challenge created successfully:", result);

      // Create new challenge object for local state
      const newChallenge = {
        id: result?.id || Date.now(), // Use API response ID if available
        title: formData.title,
        description: formData.description,
        duration: `${formData.duration} ${formData.durationUnit}`,
        type: challengeType,
        progress: 0,
        total:
          parseInt(formData.duration) *
          (formData.durationUnit === "weeks" ? 7 : 1),
        timeLeft: "24h 0m", // Default for new challenges
        entryFee: parseInt(formData.participationFee),
        refundRate: 100,
        category: formData.category,
        difficulty: formData.difficulty || "Medium",
        successRate: 0, // New challenge starts at 0%
        rules: [
          `Complete ${formData.proofFrequency} times per week`,
          "Upload photo proof as required",
          "Follow challenge guidelines",
        ],
        rewards: [
          "Refund based on completion rate",
          "Achievement badge upon completion",
          "Community recognition",
        ],
        ...(challengeType === "group" && {
          participants: 1, // Creator is first participant
          groupName: "My Challenge Group",
        }),
      };

      // Add challenge to app state
      addChallenge(newChallenge);

      toast.success(
        `${
          challengeType === "solo" ? "Solo" : "Group"
        } challenge created successfully! 🎉`
      );

      // Navigate based on challenge type
      if (challengeType === "solo") {
        navigateToScreen("home");
      } else {
        navigateToScreen("explore");
      }
    } catch (error) {
      console.error("Error creating challenge:", error);
      toast.error("Failed to create challenge. Please try again.");
    }
  };

  const getDifficultyDisplay = (value: string) => {
    switch (value) {
      case "easy":
        return "🙂 Easy";
      case "medium":
        return "😐 Medium";
      case "hard":
        return "😓 Hard";
      default:
        return "Select difficulty";
    }
  };

  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const convertXRPToUSD = (xrpAmount: string | number) => {
    // Mock XRP to USD conversion rate (in a real app, this would be fetched from an API)
    const xrpToUsdRate = 0.52; // Example rate
    const xrp =
      typeof xrpAmount === "string" ? parseFloat(xrpAmount) || 0 : xrpAmount;
    return (xrp * xrpToUsdRate).toFixed(2);
  };

  const calculateTotalPayment = () => {
    if (!formData.participationFee)
      return { participation: 0, service: 0, total: 0 };

    const participation = parseFloat(formData.participationFee) || 0;
    const serviceRate = parseFloat(formData.serviceFee) || 0;
    const service = participation * (serviceRate / 100);
    const total = participation + service;

    return { participation, service, total };
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      handleInputChange("startDate", dateString);
      setStartDateOpen(false);

      // If end date is earlier than new start date, clear it
      if (formData.endDate && new Date(formData.endDate) <= date) {
        handleInputChange("endDate", "");
      }
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date && formData.startDate) {
      const dateString = date.toISOString().split("T")[0];
      const startDate = new Date(formData.startDate);

      // Validate that end date is after start date
      if (date <= startDate) {
        toast.error("End date must be after start date");
        return;
      }

      handleInputChange("endDate", dateString);
      setEndDateOpen(false);
    }
  };

  const getMinEndDate = () => {
    if (formData.startDate) {
      const startDate = new Date(formData.startDate);
      const minEndDate = new Date(startDate);
      minEndDate.setDate(startDate.getDate() + 1); // At least one day after start date
      return minEndDate;
    }
    return new Date();
  };

  const getRewardSummaryText = () => {
    if (challengeType === "solo") {
      return {
        items: [
          "Your participation fee (XRP) is divided by the challenge days.",
          "At the end of the challenge, your refund is calculated based on the number of successful proofs.",
          "The amount for failed days will not be refunded and is donated.",
        ],
      };
    } else {
      return {
        items: [
          "At the end of the challenge, your refund is calculated based on your success rate.",
          "After deducting the service fee, the remaining participation fee is distributed proportionally to each participant's success rate.",
          "No refunds are made during the challenge. Settlement happens only at the end.",
        ],
      };
    }
  };

  const rewardText = getRewardSummaryText();

  return (
    <TooltipProvider>
      <div className="h-screen bg-[#f6f9ff] flex flex-col">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-[#eaecf0]">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="w-12 h-12 p-0 bg-white border border-[#eaecf0] rounded-2xl hover:bg-gray-50"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-[#040415] tracking-tight flex-1 text-center">
              Create Challenge
            </h1>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Challenge Type Toggle */}
          <Card className="p-6 bg-[#f6f9ff] border border-[#eaecf0] crypto-shadow">
            <h3 className="text-lg text-[#040415] mb-4 font-medium">
              Challenge Type
            </h3>
            <div className="flex bg-white rounded-2xl p-1 border border-[#eaecf0]">
              <Button
                variant={challengeType === "solo" ? "default" : "ghost"}
                onClick={() => setChallengeType("solo")}
                className={`flex-1 rounded-xl cursor-pointer ${
                  challengeType === "solo"
                    ? "bg-[#3843ff] text-white hover:bg-[#3843ff]/90"
                    : "text-[#686873] hover:text-[#040415] hover:bg-gray-50"
                }`}
              >
                Solo
              </Button>
              <Button
                variant={challengeType === "group" ? "default" : "ghost"}
                onClick={() => setChallengeType("group")}
                className={`flex-1 rounded-xl cursor-pointer ${
                  challengeType === "group"
                    ? "bg-[#3843ff] text-white hover:bg-[#3843ff]/90"
                    : "text-[#686873] hover:text-[#040415] hover:bg-gray-50"
                }`}
              >
                Group
              </Button>
            </div>
          </Card>

          {/* Basic Info */}
          <Card className="p-6 bg-white border border-[#eaecf0] crypto-shadow">
            <h3 className="text-lg text-[#040415] mb-4 font-medium">
              Basic Info
            </h3>
            <div className="space-y-4">
              {/* Challenge Title */}
              <div>
                <Label htmlFor="title">Challenge Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., 30-Day Morning Run"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="mt-1 bg-[#f6f9ff] border-[#eaecf0]"
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what participants need to do..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="mt-1 min-h-[100px] bg-[#f6f9ff] border-[#eaecf0]"
                />
              </div>

              {/* Category */}
              <div>
                <Label>Category *</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger className="mt-1 bg-[#f6f9ff] border-[#eaecf0] cursor-pointer">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fitness">💪 Fitness</SelectItem>
                    <SelectItem value="wellness">🧘 Wellness</SelectItem>
                    <SelectItem value="productivity">
                      ⚡ Productivity
                    </SelectItem>
                    <SelectItem value="learning">📚 Learning</SelectItem>
                    <SelectItem value="creativity">🎨 Creativity</SelectItem>
                    <SelectItem value="social">👥 Social</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Schedule */}
          <Card className="p-6 bg-white border border-[#eaecf0] crypto-shadow">
            <h3 className="text-lg text-[#040415] mb-4 font-medium flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-[#3843ff]" />
              Schedule
            </h3>
            <div className="space-y-4">
              {/* Duration */}
              <div>
                <Label>Duration *</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="number"
                    placeholder="30"
                    value={formData.duration}
                    onChange={(e) =>
                      handleInputChange("duration", e.target.value)
                    }
                    className="flex-1 bg-[#f6f9ff] border-[#eaecf0]"
                    min="1"
                  />
                  <Select
                    value={formData.durationUnit}
                    onValueChange={(value) =>
                      handleInputChange("durationUnit", value)
                    }
                  >
                    <SelectTrigger className="w-24 bg-[#f6f9ff] border-[#eaecf0]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Start and End Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal h-10 px-3 bg-[#f6f9ff] border-[#eaecf0] hover:bg-[#f6f9ff] hover:text-[#040415]"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {formData.startDate ? (
                          formatDateDisplay(formData.startDate)
                        ) : (
                          <span className="text-[#686873]">
                            Select start date
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={
                          formData.startDate
                            ? new Date(formData.startDate)
                            : undefined
                        }
                        onSelect={handleStartDateSelect}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="rounded-md border shadow-md"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="endDate">End Date *</Label>
                  <Popover
                    open={endDateOpen && !!formData.startDate}
                    onOpenChange={(open) => {
                      if (formData.startDate) {
                        setEndDateOpen(open);
                      }
                    }}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal h-10 px-3 bg-[#f6f9ff] border-[#eaecf0] ${
                          !formData.startDate
                            ? "cursor-not-allowed opacity-50"
                            : "hover:bg-[#f6f9ff] hover:text-[#040415]"
                        }`}
                        disabled={!formData.startDate}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {formData.endDate ? (
                          formatDateDisplay(formData.endDate)
                        ) : (
                          <span className="text-[#686873]">
                            Select end date
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={
                          formData.endDate
                            ? new Date(formData.endDate)
                            : undefined
                        }
                        onSelect={handleEndDateSelect}
                        disabled={(date) =>
                          date <= new Date(formData.startDate)
                        }
                        initialFocus
                        className="rounded-md border shadow-md"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Proof Frequency */}
              <div>
                <Label>Proof Frequency *</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("proofFrequency", value)
                  }
                >
                  <SelectTrigger className="mt-1 bg-[#f6f9ff] border-[#eaecf0]">
                    <SelectValue placeholder="How many times per week?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 time per week</SelectItem>
                    <SelectItem value="2">2 times per week</SelectItem>
                    <SelectItem value="3">3 times per week</SelectItem>
                    <SelectItem value="4">4 times per week</SelectItem>
                    <SelectItem value="5">5 times per week</SelectItem>
                    <SelectItem value="6">6 times per week</SelectItem>
                    <SelectItem value="7">Daily (7 times per week)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Group Challenge: Rewards */}
          {challengeType === "group" && (
            <Card className="p-6 bg-white border border-[#eaecf0] crypto-shadow">
              <h3 className="text-lg text-[#040415] mb-4 font-medium flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-[#3843ff]" />
                Rewards
              </h3>
              <div className="space-y-4">
                {/* Reward Title */}
                <div>
                  <Label htmlFor="rewardTitle">Reward Title</Label>
                  <Input
                    id="rewardTitle"
                    placeholder="e.g., Bonus Token, NFT, Gift"
                    value={formData.rewardTitle}
                    onChange={(e) =>
                      handleInputChange("rewardTitle", e.target.value)
                    }
                    className="mt-1 bg-[#f6f9ff] border-[#eaecf0]"
                  />
                </div>

                {/* Reward Type */}
                <div>
                  <Label>Reward Type</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("rewardType", value)
                    }
                  >
                    <SelectTrigger className="mt-1 bg-[#f6f9ff] border-[#eaecf0]">
                      <SelectValue placeholder="Select reward type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="token">Token</SelectItem>
                      <SelectItem value="nft">NFT</SelectItem>
                      <SelectItem value="item">Item</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Reward Description */}
                <div>
                  <Label htmlFor="rewardDescription">Reward Description</Label>
                  <Textarea
                    id="rewardDescription"
                    placeholder="Describe the reward details…"
                    value={formData.rewardDescription}
                    onChange={(e) =>
                      handleInputChange("rewardDescription", e.target.value)
                    }
                    className="mt-1 min-h-[80px] bg-[#f6f9ff] border-[#eaecf0]"
                  />
                </div>

                {/* Reward Value */}
                <div>
                  <Label htmlFor="rewardValue">Reward Value (Optional)</Label>
                  <Input
                    id="rewardValue"
                    type="number"
                    placeholder="e.g., 100 USDT"
                    value={formData.rewardValue}
                    onChange={(e) =>
                      handleInputChange("rewardValue", e.target.value)
                    }
                    className="mt-1 bg-[#f6f9ff] border-[#eaecf0]"
                    min="0"
                  />
                </div>
              </div>

              {/* Helper Text */}
              <div className="mt-4 p-3 bg-[#f6f9ff] rounded-lg border border-[#3843ff]/20">
                <p className="text-sm text-[#686873]">
                  <Info className="h-4 w-4 inline mr-1 text-[#3843ff]" />
                  These rewards are provided to successful participants in
                  addition to their refund.
                </p>
              </div>
            </Card>
          )}

          {/* Group Challenge: Participants */}
          {challengeType === "group" && (
            <Card className="p-6 bg-white border border-[#eaecf0] crypto-shadow">
              <h3 className="text-lg text-[#040415] mb-4 font-medium flex items-center">
                <Users className="h-5 w-5 mr-2 text-[#3843ff]" />
                Participants
              </h3>
              <div>
                <Label htmlFor="maxParticipants">Max Participants *</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  placeholder="e.g., 50"
                  value={formData.maxParticipants}
                  onChange={(e) =>
                    handleInputChange("maxParticipants", e.target.value)
                  }
                  className="mt-1 bg-[#f6f9ff] border-[#eaecf0]"
                  min="2"
                />
                <p className="text-xs text-[#686873] mt-1">
                  Minimum 2 participants required
                </p>
              </div>
            </Card>
          )}

          {/* Group Challenge: Difficulty */}
          {challengeType === "group" && (
            <Card className="p-6 bg-white border border-[#eaecf0] crypto-shadow">
              <h3 className="text-lg text-[#040415] mb-4 font-medium">
                Difficulty *
              </h3>
              <div>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("difficulty", value)
                  }
                >
                  <SelectTrigger className="mt-1 bg-[#f6f9ff] border-[#eaecf0]">
                    <SelectValue
                      placeholder={getDifficultyDisplay(formData.difficulty)}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">🙂 Easy</SelectItem>
                    <SelectItem value="medium">😐 Medium</SelectItem>
                    <SelectItem value="hard">😓 Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          )}

          {/* Participation Fee */}
          <Card className="p-6 bg-white border border-[#eaecf0] crypto-shadow">
            <h3 className="text-lg text-[#040415] mb-4 font-medium flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-[#3843ff]" />
              Fees
            </h3>
            <div className="space-y-4">
              {/* Participation Fee */}
              <div>
                <Label htmlFor="participationFee">
                  Participation Fee (XRP){" "}
                  {challengeType === "solo"
                    ? "(deposit amount)"
                    : "(per participant)"}{" "}
                  *
                </Label>
                <div className="mt-1">
                  <Input
                    id="participationFee"
                    type="text"
                    placeholder="50"
                    value={formData.participationFee}
                    onChange={(e) =>
                      handleInputChange("participationFee", e.target.value)
                    }
                    className="bg-[#f6f9ff] border-[#eaecf0]"
                  />
                  {/* {formData.participationFee && (
                    <p className="text-xs text-[#686873] mt-1">
                      ≈ ${convertXRPToUSD(formData.participationFee)} USD
                    </p>
                  )} */}
                </div>
              </div>

              {/* Service Fee for Group Challenges */}
              {challengeType === "group" && (
                <div>
                  <Label htmlFor="serviceFee">Service Fee (%)</Label>
                  <div className="mt-1">
                    <Input
                      id="serviceFee"
                      type="text"
                      placeholder="10"
                      value={formData.serviceFee}
                      onChange={(e) =>
                        handleInputChange("serviceFee", e.target.value)
                      }
                      className="bg-[#f6f9ff] border-[#eaecf0]"
                    />
                    <p className="text-xs text-[#686873] mt-1">
                      Service Fee is the amount kept by the challenge creator.
                    </p>
                  </div>
                </div>
              )}

              {/* Total Payment Calculation for Group Challenges */}
              {/* {challengeType === "group" &&
                formData.participationFee &&
                formData.serviceFee && (
                  <div className="mt-4 p-3 bg-[#f6f9ff] rounded-lg border border-[#3843ff]/20">
                    <h4 className="text-sm font-medium text-[#040415] mb-2">
                      Payment Breakdown:
                    </h4>
                    <div className="space-y-1 text-sm text-[#686873]">
                      <div className="flex justify-between">
                        <span>Participation Fee:</span>
                        <span>{calculateTotalPayment().participation} XRP</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service Fee ({formData.serviceFee}%):</span>
                        <span>
                          {calculateTotalPayment().service.toFixed(2)} XRP
                        </span>
                      </div>
                      <div className="flex justify-between font-medium text-[#040415] pt-1 border-t border-[#eaecf0]">
                        <span>Total Payment:</span>
                        <span>
                          {calculateTotalPayment().total.toFixed(2)} XRP (≈ $
                          {convertXRPToUSD(calculateTotalPayment().total)} USD)
                        </span>
                      </div>
                    </div>
                  </div>
                )} */}
            </div>
          </Card>

          {/* Proof Requirements */}
          <Card className="p-6 bg-white border border-[#eaecf0] crypto-shadow">
            <h3 className="text-lg text-[#040415] mb-4 font-medium">
              Proof Requirements
            </h3>
            <div>
              <Label>Proof Type *</Label>
              <Select
                onValueChange={(value) => handleInputChange("proofType", value)}
              >
                <SelectTrigger className="mt-1 bg-[#f6f9ff] border-[#eaecf0]">
                  <SelectValue placeholder="How should participants prove completion?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photo">📸 Photo Upload</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Challenge Image Upload */}
            <div className="mt-4">
              <Label>Challenge Image</Label>
              <div className="mt-2">
                {uploadedImage.preview ? (
                  <div className="relative">
                    <Image
                      src={uploadedImage.preview}
                      alt="Challenge preview"
                      className="w-full h-48 object-contain rounded-lg border border-[#eaecf0]"
                      width={366}
                      height={143}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={handleImageRemove}
                      className="absolute top-2 right-2"
                      disabled={isUploading}
                    >
                      ✕
                    </Button>
                    {isUploading && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                        <div className="text-white text-sm">업로드 중...</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-[#eaecf0] rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={isUploading}
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <div className="text-4xl">📷</div>
                      <div className="text-sm text-gray-600">
                        {isUploading ? "업로드 중..." : "이미지를 업로드하세요"}
                      </div>
                      <div className="text-xs text-gray-400">
                        JPG, PNG, GIF (최대 5MB)
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Reward Summary */}
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-green-800 font-medium flex items-center">
                <Info className="h-5 w-5 mr-2" />
                Reward Summary
              </h3>
              <Tooltip>
                <TooltipTrigger>
                  <div className="p-1 h-6 w-6 hover:bg-green-100 rounded cursor-pointer">
                    <HelpCircle className="h-4 w-4 text-green-600" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="p-2 max-w-xs">
                    {challengeType === "solo" ? (
                      <>
                        <p className="font-semibold mb-2">Example:</p>
                        <p className="text-sm">
                          10-day challenge, participation fee = 100 XRP → 10 XRP
                          per day
                        </p>
                        <p className="text-sm">
                          7 days success → 70 XRP refund
                        </p>
                        <p className="text-sm">
                          3 days failed → 30 XRP donated
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold mb-2">Example:</p>
                        <p className="text-sm">
                          Participation fee 100 XRP × 10 participants = 1000 XRP
                        </p>
                        <p className="text-sm">
                          Service fee 10% = 100 XRP (non-refundable)
                        </p>
                        <p className="text-sm">Remaining pool = 900 XRP</p>
                        <p className="text-sm font-semibold">
                          If your success rate is 80% and total success rates =
                          160%, refund = 900 × (80 ÷ 160) = 450 XRP
                        </p>
                      </>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="space-y-2">
              {/* Both Solo and Group Challenge - List format */}
              {rewardText.items?.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-700 mr-2">•</span>
                  <p className="text-green-700 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="bg-white border-t border-[#eaecf0] p-6 space-y-3">
          <Button
            onClick={handlePreview}
            variant="outline"
            className="w-full border-[#3843ff] text-[#3843ff] hover:bg-[#f6f9ff] py-3 rounded-2xl flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Eye className="h-4 w-4" />
            <span>Preview Challenge</span>
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isMutating}
            className="w-full crypto-gradient text-white hover:opacity-90 py-3 rounded-2xl disabled:opacity-50 font-medium cursor-pointer"
          >
            {isMutating ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Challenge...</span>
              </div>
            ) : (
              "Create Challenge"
            )}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}
