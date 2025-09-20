// API 인터페이스 정의
export interface ChallengeRequest {
  type: "SOLO" | "GROUP";
  title: string;
  description: string;
  category:
    | "FITNESS"
    | "WELLNESS"
    | "PRODUCTIVITY"
    | "LEARNING"
    | "CREATIVITY"
    | "SOCIAL";
  difficulty: "EASY" | "MEDIUM" | "HARD";
  start_date: string;
  end_date: string;
  proof_frequency: number;
  entry_fee: {
    currency: string;
    amount: number;
  };
  service_fee: {
    currency: string;
    amount: number;
  };
  proof_type: "PHOTO" | "VIDEO" | "TEXT";
  rules: string[];
  max_participants: number;
}

export interface ChallengeResponse {
  id: string;
  type: "SOLO" | "GROUP";
  title: string;
  description: string;
  category: string;
  difficulty: string;
  start_date: string;
  end_date: string;
  proof_frequency: number;
  entry_fee: {
    currency: string;
    amount: number;
  };
  service_fee: {
    currency: string;
    amount: number;
  };
  proof_type: string;
  rules: string[];
  max_participants: number;
  created_at: string;
  updated_at: string;
}
