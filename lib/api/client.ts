import { baseFetcher, swrFetcher } from "@/lib/swr/ClientSWRConfig";
import {
  ChallengeRequest,
  GetPublicChallengesParams,
  PublicChallengesResponse,
} from "./types";

// API 베이스 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
