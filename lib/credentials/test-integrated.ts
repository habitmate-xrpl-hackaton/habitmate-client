// TypeScript 버전 통합 테스트 스크립트
// tsx로 실행 가능

import { Client, Wallet } from "xrpl";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "..", "..", ".env.local") });

async function testCredentialAccept(): Promise<{
  success: boolean;
  txHash?: string;
  sequence?: number;
  subject?: string;
  issuer?: string;
  error?: string;
}> {
  console.log("🚀 Credential Accept 테스트 시작");

  const client = new Client("wss://s.devnet.rippletest.net:51233");
  await client.connect();

  try {
    const issuerSeed = process.env.ADMIN_SEED;
    const subjectSeed = process.env.USER_SEED;

    if (!issuerSeed || !subjectSeed) {
      throw new Error("환경변수 ADMIN_SEED, USER_SEED가 필요합니다.");
    }

    const issuer = Wallet.fromSeed(issuerSeed);
    const subject = Wallet.fromSeed(subjectSeed);

    console.log(`📋 발급자: ${issuer.address}`);
    console.log(`👤 수락자: ${subject.address}`);

    // Get account info for sequence number
    const subjectAccountInfo = await client.request({
      command: "account_info",
      account: subject.address,
    });

    const sequence = subjectAccountInfo.result.account_data.Sequence;

    // Get fee
    const feeResult = await client.request({
      command: "fee",
    });

    console.log(`📊 Sequence: ${sequence}`);
    console.log(`💰 Fee: ${feeResult.result.drops.open_ledger_fee}`);

    // CredentialAccept 트랜잭션
    const tx = {
      TransactionType: "CredentialAccept",
      Account: subject.address,
      Issuer: issuer.address,
      CredentialType: Buffer.from("DRIVER_LICENCE", "utf8")
        .toString("hex")
        .toUpperCase(),
      Sequence: sequence,
      Fee: feeResult.result.drops.open_ledger_fee,
      SigningPubKey: subject.publicKey,
    } as any;

    console.log("📝 트랜잭션 준비:", JSON.stringify(tx, null, 2));

    // autofill로 LastLedgerSequence 등 자동 채우기
    const prepared = await client.autofill(tx as any);

    // 서명 및 제출
    const signed = subject.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    console.log("✅ CredentialAccept 성공!");
    console.log("📋 결과:", JSON.stringify(result, null, 2));

    return {
      success: true,
      txHash: result.result.hash,
      sequence: sequence,
      subject: subject.address,
      issuer: issuer.address,
    };
  } catch (error) {
    console.error("❌ CredentialAccept 실패:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  } finally {
    await client.disconnect();
    console.log("🔄 연결 종료");
  }
}

async function testEscrowCreate(): Promise<{
  success: boolean;
  txHash?: string;
  source?: string;
  destination?: string;
  error?: string;
}> {
  console.log("🚀 Escrow Create 테스트 시작");

  const client = new Client("wss://s.devnet.rippletest.net:51233");
  await client.connect();

  try {
    const sourceSeed = process.env.ADMIN_SEED;
    const destinationAddress = process.env.USER_ADDRESS;

    if (!sourceSeed || !destinationAddress) {
      throw new Error("환경변수 ADMIN_SEED, USER_ADDRESS가 필요합니다.");
    }

    const source = Wallet.fromSeed(sourceSeed);

    console.log(`📋 소스: ${source.address}`);
    console.log(`🎯 목적지: ${destinationAddress}`);

    // EscrowCreate 트랜잭션
    const tx = {
      TransactionType: "EscrowCreate",
      Account: source.address,
      Destination: destinationAddress,
      Amount: "10000000", // 10 XRP in drops
      FinishAfter: Math.floor(Date.now() / 1000) - 946_684_800 + 30, // 30초 후
      CancelAfter: Math.floor(Date.now() / 1000) - 946_684_800 + 120, // 120초 후
    } as any;

    console.log("📝 트랜잭션 준비:", JSON.stringify(tx, null, 2));

    // autofill로 LastLedgerSequence 등 자동 채우기
    const prepared = await client.autofill(tx as any);

    // 서명 및 제출
    const signed = source.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    console.log("✅ EscrowCreate 성공!");
    console.log("📋 결과:", JSON.stringify(result, null, 2));

    return {
      success: true,
      txHash: result.result.hash,
      source: source.address,
      destination: destinationAddress,
    };
  } catch (error) {
    console.error("❌ EscrowCreate 실패:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  } finally {
    await client.disconnect();
    console.log("🔄 연결 종료");
  }
}

async function testCredentialAcceptOnly(): Promise<void> {
  console.log("🎯 Credential Accept 단독 테스트");
  console.log("=".repeat(50));

  try {
    const result = await testCredentialAccept();

    if (result.success) {
      console.log("\n🎉 Credential Accept 테스트 성공!");
      console.log("📊 결과:");
      console.log(`  📋 TX Hash: ${result.txHash}`);
      console.log(`  👤 Subject: ${result.subject}`);
      console.log(`  🏛️ Issuer: ${result.issuer}`);
      console.log(`  📝 Sequence: ${result.sequence}`);
    } else {
      throw new Error(`Credential Accept 실패: ${result.error}`);
    }
  } catch (error) {
    console.error("❌ 테스트 실패:", error);
    process.exit(1);
  }
}

async function testEscrowCreateOnly(): Promise<void> {
  console.log("🎯 Escrow Create 단독 테스트");
  console.log("=".repeat(50));

  try {
    const result = await testEscrowCreate();

    if (result.success) {
      console.log("\n🎉 Escrow Create 테스트 성공!");
      console.log("📊 결과:");
      console.log(`  🔗 TX Hash: ${result.txHash}`);
      console.log(`  📋 Source: ${result.source}`);
      console.log(`  🎯 Destination: ${result.destination}`);
    } else {
      throw new Error(`Escrow Create 실패: ${result.error}`);
    }
  } catch (error) {
    console.error("❌ 테스트 실패:", error);
    process.exit(1);
  }
}

async function runIntegratedTest(): Promise<void> {
  console.log("🎯 통합 테스트 시작: Escrow + Credential");
  console.log("=".repeat(50));

  try {
    // 1. Escrow 생성 테스트
    console.log("\n📝 1단계: Escrow 생성");
    const escrowResult = await testEscrowCreate();

    if (!escrowResult.success) {
      throw new Error(`Escrow 생성 실패: ${escrowResult.error}`);
    }

    console.log("✅ Escrow 생성 성공!");

    // 잠시 대기
    console.log("⏳ 3초 대기 중...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 2. Credential 수락 테스트
    console.log("\n📋 2단계: Credential 수락");
    const credentialResult = await testCredentialAccept();

    if (!credentialResult.success) {
      throw new Error(`Credential 수락 실패: ${credentialResult.error}`);
    }

    console.log("✅ Credential 수락 성공!");

    // 3. 결과 요약
    console.log("\n🎉 통합 테스트 완료!");
    console.log("=".repeat(50));
    console.log("📊 결과 요약:");
    console.log(`  🔗 Escrow TX Hash: ${escrowResult.txHash}`);
    console.log(`  📋 Credential TX Hash: ${credentialResult.txHash}`);
    console.log(`  👤 Subject: ${credentialResult.subject}`);
    console.log(`  🏛️ Issuer: ${credentialResult.issuer}`);
    console.log(`  📝 Credential Type: DRIVER_LICENCE`);
    console.log(`  📋 Source: ${escrowResult.source}`);
    console.log(`  🎯 Destination: ${escrowResult.destination}`);

    console.log("\n🎊 모든 테스트가 성공적으로 완료되었습니다!");
  } catch (error) {
    console.error("❌ 통합 테스트 실패:", error);
    process.exit(1);
  }
}

// 명령행 인수에 따라 다른 테스트 실행
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "credential":
      await testCredentialAcceptOnly();
      break;
    case "escrow":
      await testEscrowCreateOnly();
      break;
    case "integrated":
    default:
      await runIntegratedTest();
      break;
  }
}

// 직접 실행 시 main 함수 실행
if (require.main === module) {
  main().catch((error) => {
    console.error("💥 예상치 못한 오류:", error);
    process.exit(1);
  });
}

export {
  testCredentialAccept,
  testEscrowCreate,
  testCredentialAcceptOnly,
  testEscrowCreateOnly,
  runIntegratedTest,
};
