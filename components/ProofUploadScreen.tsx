import Image from "next/image";
import React, { useState, useRef } from "react";
import { ArrowLeft, Upload, Camera, FileText, X, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { toast } from "sonner";

interface ProofUploadScreenProps {
  navigateToScreen: (screen: string, data?: any) => void;
  appState: any;
}

export default function ProofUploadScreen({
  navigateToScreen,
  appState,
}: ProofUploadScreenProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsUploading(false);
    toast.success("Proof uploaded successfully! 🎉");

    // Navigate to proof details with the uploaded data
    navigateToScreen("proof-details", {
      capturedImage: filePreview,
      fileName: selectedFile.name,
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
    if (fileType.startsWith("image/")) return <Image className="h-8 w-8" />;
    if (fileType.startsWith("video/")) return <Camera className="h-8 w-8" />;
    return <FileText className="h-8 w-8" />;
  };

  return (
    <div className="min-h-screen bg-[#f6f9ff] flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen("home")}
            className="p-2 mr-2"
          >
            <ArrowLeft className="h-6 w-6" />
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
            Upload proof of today's morning run activity. You can upload photos,
            videos, or documents.
          </p>
        </div>

        {/* File Upload Section */}
        <div className="bg-white rounded-2xl p-6 crypto-shadow">
          <Label className="text-base text-gray-900 mb-4 block">
            Upload File
          </Label>

          {!selectedFile ? (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg text-gray-900 mb-2">
                Choose a file to upload
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Photos, videos, or documents (max 10MB)
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*,.pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="space-y-3">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-3"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Choose File
                </Button>

                <div className="text-xs text-gray-500">
                  Supported formats: JPG, PNG, MP4, PDF, DOC
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* File Preview */}
              <div className="border border-gray-200 rounded-2xl p-4">
                <div className="flex items-start space-x-4">
                  {filePreview ? (
                    <img
                      src={filePreview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                      {getFileIcon(selectedFile.type)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {selectedFile.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatFileSize(selectedFile.size)}
                    </p>
                    <div className="flex items-center mt-2">
                      <Check className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">
                        Ready to upload
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveFile}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Change File Button */}
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-gray-300 text-gray-700 rounded-2xl py-2"
              >
                <Upload className="h-4 w-4 mr-2" />
                Change File
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*,.pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />
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
          </ul>
        </div>
      </div>

      {/* Upload Button */}
      <div className="bg-white border-t border-gray-200 p-4">
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
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
