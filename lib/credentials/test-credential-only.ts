// Credential Accept만 테스트하는 TypeScript 스크립트
// tsx로 실행 가능

import { credentialAccept, acceptDriverLicense } from "./credentialAccept";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "..", "..", ".env.local") });

async function testDriverLicenseAccept(): Promise<void> {
  console.log("🚀 드라이버 라이센스 수락 테스트");
  console.log("=".repeat(50));

  try {
    const issuerSeed = process.env.ADMIN_SEED;
    const subjectSeed = process.env.USER_SEED;

    if (!issuerSeed || !subjectSeed) {
      throw new Error("환경변수 ADMIN_SEED, USER_SEED가 필요합니다.");
    }

    console.log(`📋 발급자 시드: ${issuerSeed.substring(0, 10)}...`);
    console.log(`👤 수락자 시드: ${subjectSeed.substring(0, 10)}...`);

    // 드라이버 라이센스 수락
    const result = await acceptDriverLicense(issuerSeed, subjectSeed);

    if (result.success) {
      console.log("\n🎉 드라이버 라이센스 수락 성공!");
      console.log("📊 결과:");
      console.log(`  📋 TX Hash: ${result.txHash}`);
      console.log(`  👤 Subject: ${result.subject}`);
      console.log(`  🏛️ Issuer: ${result.issuer}`);
      console.log(`  📝 Credential Type: ${result.credentialType}`);
      console.log(`  🔢 Sequence: ${result.sequence}`);
    } else {
      throw new Error(`드라이버 라이센스 수락 실패: ${result.error}`);
    }
  } catch (error) {
    console.error("❌ 테스트 실패:", error);
    process.exit(1);
  }
}

async function testMultipleCredentials(): Promise<void> {
  console.log("🚀 다중 크리덴셜 수락 테스트");
  console.log("=".repeat(50));

  const credentialTypes = [
    "DRIVER_LICENCE",
    "PASSPORT",
    "NATIONAL_ID",
    "STUDENT_ID",
    "EMPLOYEE_ID",
  ];

  try {
    const issuerSeed = process.env.ADMIN_SEED;
    const subjectSeed = process.env.USER_SEED;

    if (!issuerSeed || !subjectSeed) {
      throw new Error("환경변수 ADMIN_SEED, USER_SEED가 필요합니다.");
    }

    const results = [];

    for (let i = 0; i < credentialTypes.length; i++) {
      const credentialType = credentialTypes[i];

      console.log(
        `\n📋 ${i + 1}/${credentialTypes.length}: ${credentialType} 수락 중...`
      );

      const result = await credentialAccept({
        issuerSeed,
        subjectSeed,
        credentialType,
      });

      if (result.success) {
        console.log(`✅ ${credentialType} 수락 성공!`);
        results.push({
          type: credentialType,
          txHash: result.txHash,
          success: true,
        });

        // 잠시 대기 (트랜잭션 간격)
        if (i < credentialTypes.length - 1) {
          console.log("⏳ 2초 대기 중...");
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      } else {
        console.log(`❌ ${credentialType} 수락 실패: ${result.error}`);
        results.push({
          type: credentialType,
          error: result.error,
          success: false,
        });
      }
    }

    // 결과 요약
    console.log("\n🎉 다중 크리덴셜 테스트 완료!");
    console.log("=".repeat(50));
    console.log("📊 결과 요약:");

    const successCount = results.filter((r) => r.success).length;
    const failCount = results.filter((r) => !r.success).length;

    console.log(`  ✅ 성공: ${successCount}개`);
    console.log(`  ❌ 실패: ${failCount}개`);

    results.forEach((result, index) => {
      if (result.success) {
        console.log(`  ${index + 1}. ${result.type}: ${result.txHash}`);
      } else {
        console.log(`  ${index + 1}. ${result.type}: 실패 - ${result.error}`);
      }
    });

    if (failCount > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ 다중 크리덴셜 테스트 실패:", error);
    process.exit(1);
  }
}

// 명령행 인수에 따라 다른 테스트 실행
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "multiple":
      await testMultipleCredentials();
      break;
    case "driver":
    default:
      await testDriverLicenseAccept();
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

export { testDriverLicenseAccept, testMultipleCredentials };
