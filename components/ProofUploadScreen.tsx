import Image from "next/image";
import React, { useState, useRef } from "react";
import { ArrowLeft, Upload, Camera, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { uploadImage } from "@/lib/supabase";

interface ProofUploadScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  appState: any;
}

export default function ProofUploadScreen({
  navigateToScreen,
}: ProofUploadScreenProps) {
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 업로드 핸들러 (이미지 + 동영상 지원)
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("📁 파일 업로드 시작:", file.name, file.size, file.type);

    // 파일 크기 체크 (10MB 제한)
    if (file.size > 10 * 1024 * 1024) {
      console.error("❌ 파일 크기 초과:", file.size);
      toast.error("파일 크기는 10MB를 초과할 수 없습니다.");
      return;
    }

    // 이미지 또는 동영상 파일 타입 체크
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      console.error("❌ 잘못된 파일 타입:", file.type);
      toast.error("이미지 또는 동영상 파일만 업로드 가능합니다.");
      return;
    }

    // 미리보기 생성 (이미지/동영상 모두 지원)
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
        toast.success("파일이 성공적으로 업로드되었습니다!");
      } else {
        console.error("❌ 업로드 실패:", (result as any).error);
        toast.error("파일 업로드에 실패했습니다.");
        setUploadedImage({
          file: null,
          preview: null,
          url: null,
        });
      }
    } catch (error) {
      console.error("💥 업로드 에러:", error);
      toast.error("파일 업로드 중 오류가 발생했습니다.");
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

  // 이미지 제거 핸들러 (CreateChallengeScreen과 동일)
  const handleImageRemove = () => {
    if (uploadedImage.preview) {
      URL.revokeObjectURL(uploadedImage.preview);
    }
    setUploadedImage({
      file: null,
      preview: null,
      url: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!uploadedImage.file) {
      toast.error("Please select a file to upload");
      return;
    }

    // 이미지가 이미 업로드되었으므로 바로 다음 단계로 진행
    toast.success("Proof submitted successfully! 🎉");

    // Navigate to proof details with the uploaded data
    navigateToScreen("proof-details", {
      capturedImage: uploadedImage.preview,
      fileName: uploadedImage.file.name,
      uploadedUrl: uploadedImage.url,
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/"))
      return <Camera className="h-8 w-8 text-gray-400" />;
    if (fileType.startsWith("video/"))
      return <Camera className="h-8 w-8 text-gray-400" />;
    return <FileText className="h-8 w-8 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-[#f6f9ff] flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="p-2 mr-2 cursor-pointer"
          >
            <ArrowLeft className="h-6 w-6 cursor-pointer" />
          </Button>
          <h1 className="text-lg text-gray-900">Upload Proof</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Challenge Info */}
        <div className="bg-white rounded-2xl p-4 crypto-shadow">
          <h3 className="text-lg text-gray-900 mb-2">30-Day Morning Run</h3>
          <p className="text-sm text-gray-600">
            Upload proof of today&apos;s morning run activity. You can upload
            photos or videos.
          </p>
        </div>

        {/* File Upload Section */}
        <div className="bg-white rounded-2xl p-6 crypto-shadow">
          <Label className="text-base text-gray-900 mb-4 block">
            Upload File
          </Label>

          {!uploadedImage.preview ? (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg text-gray-900 mb-2">
                Choose a file to upload
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Photos and videos (max 10MB)
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={isUploading}
              />

              <div className="space-y-3">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-3 cursor-pointer"
                  disabled={isUploading}
                >
                  <Upload className="h-5 w-5 mr-2 " />
                  {isUploading ? "Uploading..." : "Choose File"}
                </Button>

                <div className="text-xs text-gray-500">
                  Supported formats: JPG, PNG, GIF, MP4, MOV
                </div>
              </div>
            </div>
          ) : (
            <div className="relative py-2 px-4">
              {uploadedImage.file?.type.startsWith("video/") ? (
                <video
                  src={uploadedImage.preview}
                  controls
                  className="w-full h-48 object-contain rounded-lg bg-black"
                />
              ) : (
                <Image
                  src={uploadedImage.preview}
                  alt="Proof preview"
                  className="w-full h-48 object-contain rounded-lg"
                  width={366}
                  height={192}
                />
              )}
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleImageRemove}
                className="absolute top-2 right-2 cursor-pointer"
                disabled={isUploading}
              >
                ✕
              </Button>
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <div className="text-white text-sm">Uploading...</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Upload Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <h4 className="text-blue-900 text-sm font-medium mb-2">
            Upload Guidelines
          </h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Include timestamp or location data when possible</li>
            <li>• Make sure the image/video clearly shows your activity</li>
            <li>• You can add a description after uploading</li>
            <li>• File must be under 10MB in size</li>
            <li>
              • Supported formats: Images (JPG, PNG, GIF) and Videos (MP4, MOV)
            </li>
          </ul>
        </div>
      </div>

      {/* Upload Button */}
      <div className="bg-white border-t border-gray-200 p-4">
        <Button
          onClick={handleUpload}
          disabled={!uploadedImage.file || isUploading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Uploading...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Submit Proof</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
