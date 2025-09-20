// Credential 관련 함수들을 export
export { credentialAccept, acceptDriverLicense } from "./credentialAccept";
export type { CredentialAcceptParams } from "./credentialAccept";

// Escrow 관련 함수들도 함께 export
export {
  escrowCreate,
  escrowCreateXRP,
  escrowCreateMPT,
} from "../escrow/escrowCreate";
export type { EscrowCreateParams } from "../escrow/escrowCreate";

// 통합 테스트를 위한 import
import { acceptDriverLicense } from "./credentialAccept";

// 통합 테스트를 위한 유틸리티 함수들
export const XRPL_UTILS = {
  // DevNet 연결 정보
  DEVNET_URL: "wss://s.devnet.rippletest.net:51233",

  // 일반적인 크리덴셜 타입들
  CREDENTIAL_TYPES: {
    DRIVER_LICENCE: "DRIVER_LICENCE",
    PASSPORT: "PASSPORT",
    NATIONAL_ID: "NATIONAL_ID",
    STUDENT_ID: "STUDENT_ID",
    EMPLOYEE_ID: "EMPLOYEE_ID",
  },

  // 테스트용 시나리오들
  TEST_SCENARIOS: {
    // Escrow 생성 + Credential 수락 통합 테스트
    ESCROW_AND_CREDENTIAL: {
      name: "Escrow 생성 후 Credential 수락",
      description: "에스크로를 생성하고 동시에 크리덴셜을 수락하는 통합 테스트",
      steps: [
        "1. XRP 에스크로 생성",
        "2. 드라이버 라이센스 크리덴셜 수락",
        "3. 결과 확인",
      ],
    },

    // 여러 크리덴셜 타입 테스트
    MULTIPLE_CREDENTIALS: {
      name: "다중 크리덴셜 수락",
      description: "여러 종류의 크리덴셜을 순차적으로 수락하는 테스트",
      steps: [
        "1. 드라이버 라이센스 수락",
        "2. 여권 수락",
        "3. 주민등록증 수락",
      ],
    },
  },
};

// 통합 테스트 실행 함수
export async function runIntegratedTest() {
  console.log("🚀 통합 테스트 시작: Escrow + Credential");

  try {
    // 1. Escrow 생성
    console.log("\n📝 1단계: XRP 에스크로 생성");
    const issuerSeed = process.env.ADMIN_SEED;
    const subjectSeed = process.env.USER_SEED;

    if (!issuerSeed || !subjectSeed) {
      throw new Error("환경변수 ADMIN_SEED, USER_SEED가 필요합니다.");
    }

    const { escrowCreateXRP } = await import("../escrow/escrowCreate");
    const escrowResult = await escrowCreateXRP(
      issuerSeed,
      subjectSeed,
      "10", // 10 XRP
      30, // 30초 후 완료 가능
      120 // 120초 후 취소 가능
    );

    if (!escrowResult.success) {
      throw new Error(`Escrow 생성 실패: ${escrowResult.error}`);
    }

    console.log("✅ Escrow 생성 성공:", escrowResult.txHash);

    // 2. Credential 수락
    console.log("\n📋 2단계: 드라이버 라이센스 크리덴셜 수락");
    const credentialResult = await acceptDriverLicense(issuerSeed, subjectSeed);

    if (!credentialResult.success) {
      throw new Error(`Credential 수락 실패: ${credentialResult.error}`);
    }

    console.log("✅ Credential 수락 성공:", credentialResult.txHash);

    // 3. 결과 요약
    console.log("\n🎉 통합 테스트 완료!");
    console.log("📊 결과 요약:");
    console.log(`  - Escrow TX Hash: ${escrowResult.txHash}`);
    console.log(`  - Credential TX Hash: ${credentialResult.txHash}`);
    console.log(`  - Subject: ${credentialResult.subject}`);
    console.log(`  - Issuer: ${credentialResult.issuer}`);
    console.log(`  - Credential Type: ${credentialResult.credentialType}`);

    return {
      success: true,
      escrow: escrowResult,
      credential: credentialResult,
    };
  } catch (error) {
    console.error("❌ 통합 테스트 실패:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// 직접 실행 시 통합 테스트 실행
if (require.main === module) {
  runIntegratedTest().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
