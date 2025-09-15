declare global {
  interface Window {
    ethereum?: MetamaskInstance;
  }
}

export interface MetamaskInstance {
  request: (args: { method: string; params?: any }) => Promise<any>;
  on: (eventName: string, handler: (...args: any[]) => void) => void;
  removeListener: (eventName: string, handler: (...args: any[]) => void) => void;
}

// Core XRPL Account Types
export interface XRPLAccount {
  account: string;
  publicKey: string;
  balance: string;
}

export interface XRPLAccountData {
  Account: string;
  Balance: string;
  Flags: number;
  LedgerEntryType: string;
  OwnerCount: number;
  PreviousTxnID: string;
  PreviousTxnLgrSeq: number;
  Sequence: number;
  index: string;
}

// Transaction Types
export interface SendXRPParams {
  destination: string;
  destinationTag: string;
  amount: string;
  memo?: string;
}

// Service Interface
export interface XRPLRPCService {
  getAccountInfo: (address?: string) => Promise<XRPLAccountData>;
  sendXRP: (params: SendXRPParams) => Promise<SendXRPResponse>;
  requestSnap: () => Promise<void>;
  checkSnapInstallation: () => Promise<boolean>;
}

// Context State Types
export interface XRPLState {
  // MetaMask state
  isMetaMaskConnected: boolean;
  ethereumAccount: string | null;
  ethereumBalance: string | null;
  provider: any;
  
  // XRPL state
  isXRPLConnected: boolean;
  xrplAccount: XRPLAccountData | null;
  
  // Loading and error states
  isLoading: boolean;
  error: string | null;
  
  // RPC service
  rpcService: XRPLRPCService | null;
}

// Context Interface
export interface XRPLContextType extends XRPLState {
  // MetaMask methods
  connectMetaMask: () => Promise<void>;
  disconnectMetaMask: () => void;
  
  // XRPL methods
  connectXRPL: () => Promise<XRPLAccountData>;
  disconnectXRPL: () => void;
  sendXRP: (params: SendXRPParams) => Promise<SendXRPResponse>;
  isXRPLSnapInstalled: () => Promise<boolean>;
  refreshXRPLAccountInfo: () => Promise<XRPLAccountData>;
  
  // Combined methods
  disconnect: () => void;
  isFullyConnected: boolean;
  
  // Utility methods
  convertDropsToXRP: (drops: string | number) => number;
  convertXRPToDrops: (xrp: string | number) => string;
  formatDropsAsXRP: (drops: string | number, decimals?: number) => string;
  formatXRPBalance: (decimals?: number) => string;
  isValidXRPAmount: (xrp: string | number) => boolean;
  calculateAvailableXRP: (balance: string | number, ownerCount?: number, inXRP?: boolean) => number;
  getReserveRequirements: (ownerCount?: number) => any;
  canAffordTransaction: (balance: string | number, amount: string | number, ownerCount?: number, fee?: number) => boolean;
}

// Account Info Response Types
interface XRPLAccountFlags {
  allowTrustLineClawback: boolean;
  defaultRipple: boolean;
  depositAuth: boolean;
  disableMasterKey: boolean;
  disallowIncomingCheck: boolean;
  disallowIncomingNFTokenOffer: boolean;
  disallowIncomingPayChan: boolean;
  disallowIncomingTrustline: boolean;
  disallowIncomingXRP: boolean;
  globalFreeze: boolean;
  noFreeze: boolean;
  passwordSpent: boolean;
  requireAuthorization: boolean;
  requireDestinationTag: boolean;
}

export interface XRPLAccountInfoResult {
  account_data: XRPLAccountData;
  account_flags: XRPLAccountFlags;
  ledger_current_index: number;
  status: string;
  validated: boolean;
}

export interface XRPLAccountInfoResponse {
  result: XRPLAccountInfoResult;
}

// - SendXRP Response -

// Memo Interface
interface Memo {
  MemoData: string; // 메모 데이터 (hexadecimal string)
}

// Memos Array Interface
interface MemoWrapper {
  Memo: Memo;
}

// Transaction JSON Interface
export interface TxJson {
  Account: string; // 송신 계정
  Amount: string; // 송금 금액
  Destination: string; // 수신 계정
  DestinationTag?: number; // 수신 태그 (nullable)
  Fee: string; // 수수료
  Flags: number; // 플래그 비트마스크
  LastLedgerSequence: number; // 마지막 원장 시퀀스
  Memos?: MemoWrapper[]; // 메모 배열 (optional)
  Sequence: number; // 계정 시퀀스 번호
  SigningPubKey: string; // 서명 공개키
  TransactionType: string; // 트랜잭션 타입
  TxnSignature: string; // 트랜잭션 서명
  hash: string; // 트랜잭션 해시
}

// Root Interface for response
export interface SendXRPResponse {
  result: SendXRPTransactionData
}

export interface SendXRPTransactionData {
  accepted: boolean; // 트랜잭션이 승인됐는지 여부
  account_sequence_available: number; // 사용 가능한 계정 시퀀스
  account_sequence_next: number; // 다음 계정 시퀀스
  applied: boolean; // 트랜잭션이 적용됐는지 여부
  broadcast: boolean; // 트랜잭션이 브로드캐스팅됐는지 여부
  engine_result: string; // 엔진 결과 코드
  engine_result_code: number; // 엔진 결과 숫자 코드
  engine_result_message: string; // 엔진 결과 메시지
  kept: boolean; // 트랜잭션이 유지됐는지 여부
  open_ledger_cost: string; // 오픈 원장의 비용
  queued: boolean; // 트랜잭션이 대기열에 있는지 여부
  status: string; // 상태 메시지 (예: success)
  tx_blob: string; // 트랜잭션 블롭 (hexadecimal string)
  tx_json: TxJson; // 트랜잭션 JSON 데이터
  validated_ledger_index: number; // 검증된 원장 인덱스
}
