import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey!);

// Storage 관련 유틸리티 함수들
export const uploadImage = async (
  file: File,
  bucket: string = "challenge-images"
) => {
  try {
    console.log("📦 Supabase 업로드 함수 시작");
    console.log("📁 파일 정보:", {
      name: file.name,
      size: file.size,
      type: file.type,
    });
    console.log("🪣 버킷:", bucket);

    // 고유한 파일명 생성 (타임스탬프 + 랜덤 문자열)
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
    const filePath = `challenges/${fileName}`;

    console.log("📝 생성된 파일명:", fileName);
    console.log("🛤️ 파일 경로:", filePath);

    console.log("⬆️ Supabase Storage 업로드 시작...");
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("❌ Supabase 업로드 에러:", error);
      throw error;
    }

    console.log("✅ Supabase 업로드 성공:", data);

    // 업로드된 파일의 공개 URL 가져오기
    console.log("🔗 공개 URL 생성 중...");
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    console.log("🌐 공개 URL:", urlData.publicUrl);

    const result = {
      success: true,
      path: data.path,
      url: urlData.publicUrl,
    };

    console.log("📋 최종 결과:", result);
    return result;
  } catch (error) {
    console.error("💥 이미지 업로드 실패:", error);
    return {
      success: false,
      error: error,
    };
  }
};

export const deleteImage = async (
  filePath: string,
  bucket: string = "challenge-images"
) => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      console.error("Delete error:", error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error("Image delete failed:", error);
    return {
      success: false,
      error: error,
    };
  }
};
