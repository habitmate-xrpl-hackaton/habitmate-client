"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

export type Screen =
  | "onboarding"
  | "google-login"
  | "home"
  | "select-challenge"
  | "proof-upload"
  | "proof-details"
  | "nft-issuance"
  | "badge-reward"
  | "feed"
  | "search"
  | "proof-detail"
  | "proof-gallery"
  | "challenges"
  | "challenge-detail"
  | "payment-confirmation"
  | "create-challenge"
  | "challenge-preview"
  | "leaderboard"
  | "profile"
  | "edit-profile"
  | "settings"
  | "notification-center"
  | "explore"
  | "progress-calendar"
  | "followers"
  | "following";

export type ScreenString = string;

export interface AppState {
  currentScreen: Screen;
  user: {
    name: string;
    email: string;
    avatar: string;
    isLoggedIn: boolean;
  };
  wallet: {
    isConnected: boolean;
    address: string | null;
  };
  selectedChallenge: any;
  selectedProof: any;
  selectedUser: any;
  notifications: any[];
  capturedImage: string | null;
  selectedTab?: string;
  fromScreen?: Screen;
  selectedSearchQuery?: string;
  soloChallenges: any[];
  groupChallenges: any[];
}

export type AppAction =
  | { type: "NAVIGATE_TO_SCREEN"; payload: { screen: Screen; data?: any } }
  | { type: "UPDATE_USER"; payload: Partial<AppState["user"]> }
  | { type: "ADD_CHALLENGE"; payload: any }
  | { type: "CONNECT_WALLET"; payload: { address: string } }
  | { type: "DISCONNECT_WALLET" }
  | { type: "SET_SELECTED_CHALLENGE"; payload: any }
  | { type: "SET_SELECTED_PROOF"; payload: any }
  | { type: "SET_SELECTED_USER"; payload: any }
  | { type: "SET_CAPTURED_IMAGE"; payload: string | null }
  | { type: "SET_SELECTED_TAB"; payload: string }
  | { type: "SET_FROM_SCREEN"; payload: Screen }
  | { type: "SET_SEARCH_QUERY"; payload: string };

const initialState: AppState = {
  currentScreen: "onboarding",
  user: {
    name: "Alex Chen",
    email: "alex.chen@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isLoggedIn: false,
  },
  wallet: {
    isConnected: false,
    address: null,
  },
  selectedChallenge: null,
  selectedProof: null,
  selectedUser: null,
  notifications: [
    {
      id: 1,
      type: "proof-reminder",
      message: "Don't forget to upload today's proof!",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "refund-success",
      message: "Refund of $50 processed successfully",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "challenge-update",
      message: "New challenge: 30-Day Reading Challenge",
      time: "2 days ago",
    },
  ],
  capturedImage: null,
  selectedTab: undefined,
  fromScreen: undefined,
  selectedSearchQuery: undefined,
  soloChallenges: [
    {
      id: 1,
      title: "30-Day Morning Run",
      description: "Complete a morning run every day for 30 days",
      duration: "30 days",
      type: "solo",
      progress: 15,
      total: 30,
      timeLeft: "6h 23m",
      entryFee: 50,
      refundRate: 100,
      category: "Fitness",
      difficulty: "Medium",
      successRate: 82,
      rules: [
        "Complete at least 30 minutes of running each morning",
        "Upload photo proof within 2 hours of completion",
        "Start run before 9 AM",
        "Track distance and time",
      ],
      rewards: [
        "100% refund of entry fee upon completion",
        "Morning warrior achievement badge",
        "Access to premium running guides",
      ],
    },
    {
      id: 2,
      title: "Daily Meditation",
      description: "Meditate for 15 minutes every morning",
      duration: "21 days",
      type: "solo",
      progress: 12,
      total: 21,
      timeLeft: "8h 45m",
      entryFee: 30,
      refundRate: 100,
      category: "Wellness",
      difficulty: "Beginner",
      successRate: 91,
      rules: [
        "Meditate for minimum 15 minutes daily",
        "Use guided meditation app or silence",
        "Upload screenshot or photo as proof",
        "Complete before 10 AM each day",
      ],
      rewards: [
        "100% refund of entry fee upon completion",
        "Zen master achievement badge",
        "Access to premium meditation content",
      ],
    },
    {
      id: 3,
      title: "Cold Shower Challenge",
      description: "Take a cold shower every morning for 14 days",
      duration: "14 days",
      type: "solo",
      progress: 5,
      total: 14,
      timeLeft: "2h 12m",
      entryFee: 20,
      refundRate: 100,
      category: "Health",
      difficulty: "Hard",
      successRate: 73,
      rules: [
        "Take cold shower for minimum 2 minutes",
        "Water temperature below 70°F",
        "Upload photo or video as proof",
        "Complete within 1 hour of waking up",
      ],
      rewards: [
        "100% refund of entry fee upon completion",
        "Ice warrior achievement badge",
        "Access to wellness community",
      ],
    },
  ],
  groupChallenges: [
    {
      id: 4,
      title: "Reading Challenge by BookLovers Group",
      description: "Read for at least 30 minutes daily with our community",
      duration: "21 days",
      type: "group",
      progress: 8,
      total: 21,
      timeLeft: "4h 15m",
      entryFee: 25,
      participants: 234,
      groupName: "BookLovers Group",
      category: "Self-Development",
      difficulty: "Beginner",
      successRate: 89,
      rules: [
        "Read for minimum 30 minutes daily",
        "Upload photo of book/e-reader with progress",
        "Write brief summary of what you read",
        "Complete before 11 PM each day",
      ],
      rewards: [
        "100% refund of entry fee upon completion",
        "Bookworm achievement badge",
        "Access to exclusive book recommendations",
      ],
    },
    {
      id: 5,
      title: "Fitness Challenge by Nike Community",
      description: "Daily workout routine with Nike trainers",
      duration: "30 days",
      type: "group",
      progress: 18,
      total: 30,
      timeLeft: "5h 30m",
      entryFee: 75,
      participants: 512,
      groupName: "Nike Community",
      category: "Fitness",
      difficulty: "Medium",
      successRate: 84,
      rules: [
        "Complete daily 45-minute workout",
        "Follow Nike Training Club app routines",
        "Upload workout completion screenshot",
        "Share progress with community",
      ],
      rewards: [
        "100% refund of entry fee upon completion",
        "Nike fitness achievement badge",
        "Exclusive Nike merchandise discount",
      ],
    },
  ],
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "NAVIGATE_TO_SCREEN":
      return {
        ...state,
        currentScreen: action.payload.screen,
        ...(action.payload.data?.challenge && {
          selectedChallenge: action.payload.data.challenge,
        }),
        ...(action.payload.data?.proof && {
          selectedProof: action.payload.data.proof,
        }),
        ...(action.payload.data?.user && {
          selectedUser: action.payload.data.user,
        }),
        ...(action.payload.data?.capturedImage && {
          capturedImage: action.payload.data.capturedImage,
        }),
        ...(action.payload.data?.selectedTab && {
          selectedTab: action.payload.data.selectedTab,
        }),
        ...(action.payload.data?.fromScreen && {
          fromScreen: action.payload.data.fromScreen,
        }),
        ...(action.payload.data?.searchQuery && {
          selectedSearchQuery: action.payload.data.searchQuery,
        }),
      };

    case "UPDATE_USER":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    case "ADD_CHALLENGE":
      return {
        ...state,
        ...(action.payload.type === "solo"
          ? { soloChallenges: [...state.soloChallenges, action.payload] }
          : { groupChallenges: [...state.groupChallenges, action.payload] }),
      };

    case "CONNECT_WALLET":
      return {
        ...state,
        wallet: {
          isConnected: true,
          address: action.payload.address,
        },
      };

    case "DISCONNECT_WALLET":
      return {
        ...state,
        wallet: {
          isConnected: false,
          address: null,
        },
      };

    case "SET_SELECTED_CHALLENGE":
      return {
        ...state,
        selectedChallenge: action.payload,
      };

    case "SET_SELECTED_PROOF":
      return {
        ...state,
        selectedProof: action.payload,
      };

    case "SET_SELECTED_USER":
      return {
        ...state,
        selectedUser: action.payload,
      };

    case "SET_CAPTURED_IMAGE":
      return {
        ...state,
        capturedImage: action.payload,
      };

    case "SET_SELECTED_TAB":
      return {
        ...state,
        selectedTab: action.payload,
      };

    case "SET_FROM_SCREEN":
      return {
        ...state,
        fromScreen: action.payload,
      };

    case "SET_SEARCH_QUERY":
      return {
        ...state,
        selectedSearchQuery: action.payload,
      };

    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  navigateToScreen: (screen: Screen, data?: any) => void;
  updateUser: (userData: Partial<AppState["user"]>) => void;
  addChallenge: (challenge: any) => void;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const navigateToScreen = (screen: Screen, data?: any) => {
    dispatch({ type: "NAVIGATE_TO_SCREEN", payload: { screen, data } });
  };

  const updateUser = (userData: Partial<AppState["user"]>) => {
    dispatch({ type: "UPDATE_USER", payload: userData });
  };

  const addChallenge = (challenge: any) => {
    dispatch({ type: "ADD_CHALLENGE", payload: challenge });
  };

  const connectWallet = async () => {
    try {
      // Mock MetaMask connection - in real app, this would connect to MetaMask
      const mockAddress = "0x1234567890abcdef1234567890abcdef12343fA2";
      dispatch({ type: "CONNECT_WALLET", payload: { address: mockAddress } });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnectWallet = () => {
    dispatch({ type: "DISCONNECT_WALLET" });
  };

  const value: AppContextType = {
    state,
    dispatch,
    navigateToScreen,
    updateUser,
    addChallenge,
    connectWallet,
    disconnectWallet,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
