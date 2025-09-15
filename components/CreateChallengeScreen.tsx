import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Plus,
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
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { toast } from "sonner";

interface CreateChallengeScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  addChallenge: (challenge: any) => void;
}

export default function CreateChallengeScreen({
  navigateToScreen,
  addChallenge,
}: CreateChallengeScreenProps) {
  const [challengeType, setChallengeType] = useState<"solo" | "group">("solo");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    durationUnit: "days",
    startDate: new Date().toISOString().split("T")[0], // Default to today
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // Validation for Solo Challenge
    if (challengeType === "solo") {
      if (
        !formData.title ||
        !formData.description ||
        !formData.category ||
        !formData.duration ||
        !formData.startDate ||
        !formData.endDate ||
        !formData.proofFrequency ||
        !formData.participationFee ||
        !formData.proofType
      ) {
        toast.error("Please fill in all required fields for Solo Challenge");
        return;
      }
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
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      toast.error("Start date cannot be in the past");
      return;
    }

    if (endDate <= startDate) {
      toast.error("End date must be after start date");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create new challenge object
    const newChallenge = {
      id: Date.now(), // Simple ID generation
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

    setIsSubmitting(false);
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
              onClick={() => navigateToScreen("explore")}
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
                className={`flex-1 rounded-xl ${
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
                className={`flex-1 rounded-xl ${
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
                  <SelectTrigger className="mt-1 bg-[#f6f9ff] border-[#eaecf0]">
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
                    <PopoverTrigger>
                      <div className="w-full mt-1 justify-start text-left bg-[#f6f9ff] border border-[#eaecf0] hover:bg-[#f6f9ff] h-10 px-3 rounded-lg flex items-center cursor-pointer transition-colors">
                        <span
                          className={
                            formData.startDate
                              ? "text-[#040415]"
                              : "text-[#686873]"
                          }
                        >
                          {formData.startDate
                            ? formatDateDisplay(formData.startDate)
                            : "Select start date"}
                        </span>
                        <div className="ml-auto">
                          <Calendar className="h-4 w-4 text-[#686873]" />
                        </div>
                      </div>
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
                    <PopoverTrigger>
                      <div
                        className={`w-full mt-1 justify-start text-left bg-[#f6f9ff] border border-[#eaecf0] h-10 px-3 rounded-lg flex items-center transition-colors ${
                          !formData.startDate
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer hover:bg-[#f6f9ff]"
                        }`}
                        onClick={() => {
                          if (formData.startDate) {
                            setEndDateOpen(!endDateOpen);
                          }
                        }}
                      >
                        <span
                          className={
                            formData.endDate
                              ? "text-[#040415]"
                              : "text-[#686873]"
                          }
                        >
                          {formData.endDate
                            ? formatDateDisplay(formData.endDate)
                            : "Select end date"}
                        </span>
                        <div className="ml-auto">
                          <Calendar className="h-4 w-4 text-[#686873]" />
                        </div>
                      </div>
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
            className="w-full border-[#3843ff] text-[#3843ff] hover:bg-[#f6f9ff] py-3 rounded-2xl flex items-center justify-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>Preview Challenge</span>
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full crypto-gradient text-white hover:opacity-90 py-3 rounded-2xl disabled:opacity-50 font-medium"
          >
            {isSubmitting ? (
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
