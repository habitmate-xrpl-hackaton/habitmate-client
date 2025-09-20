import { baseFetcher, swrFetcher } from "@/lib/swr/ClientSWRConfig";
import { ChallengeRequest } from "./types";

// API 베이스 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 인증 토큰을 가져오는 헬퍼 함수
const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};

  // Access Token은 sessionStorage에서 가져오기
  const accessToken = sessionStorage.getItem("accessToken");

  if (!accessToken) {
    return {};
  }

  // Bearer 토큰 형태로 처리 (Bearer 접두사가 없으면 추가)
  const bearerToken = accessToken.startsWith("Bearer ")
    ? accessToken
    : `Bearer ${accessToken}`;

  return { Authorization: bearerToken };
};

// Challenge API 클라이언트
export const challengeApi = {
  // 챌린지 생성 (SWR mutation용)
  create: async (url: string, { arg }: { arg: ChallengeRequest }) => {
    const response = await baseFetcher.post(`${API_BASE_URL}/challenges`, {
      json: arg,
    });
    return response.json();
  },

  // 공개 챌린지 목록 조회 / 검색 가능
  getPublicChallenges: async () => {
    return swrFetcher(`${API_BASE_URL}/public-challenges`);
  },

  // 챌린지 상세 조회
  getChallenge: async (id: string) => {
    return swrFetcher(`${API_BASE_URL}/challenges/${id}`);
  },

  // 챌린지 참여 (SWR mutation용)
  join: async (url: string, { arg }: { arg: { id: string; data: any } }) => {
    const response = await baseFetcher.post(
      `${API_BASE_URL}/challenges/${arg.id}/join`,
      {
        json: arg.data,
      }
    );
    return response.json();
  },
};

// 기본 API 클라이언트 (다른 API들도 확장 가능)
export const apiClient = {
  challenges: challengeApi,
};
