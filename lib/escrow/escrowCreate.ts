import { Client, Wallet, Transaction } from "xrpl";
import { encodeForSigning, encode } from "ripple-binary-codec";
import { sign as kpSign, deriveKeypair } from "ripple-keypairs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "..", "..", ".env.local") });

// XRPL 리플 에폭 시간 변환
function Now() {
  return Math.floor(Date.now() / 1000) - 946_684_800;
}

export interface EscrowCreateParams {
  sourceSeed: string;
  destinationAddress: string;
  amount: string | { mpt_issuance_id: string; value: string };
  finishAfter?: number;
  cancelAfter?: number;
  condition?: string;
}

export async function escrowCreate(params: EscrowCreateParams) {
  const client = new Client("wss://s.devnet.rippletest.net:51233");
  await client.connect();

  try {
    const source = Wallet.fromSeed(params.sourceSeed);

    // 📝 EscrowCreate 트랜잭션
    const tx: Transaction = {
      TransactionType: "EscrowCreate",
      Account: source.address, // 소스
      Destination: params.destinationAddress, // 목적지
      Amount: params.amount,
      ...(params.finishAfter && { FinishAfter: params.finishAfter }),
    } as any;

    // 1) autofill → 기본 필드 채움 (Sequence, Fee 등)
    const prepared = await client.autofill(tx as any);

    // 2) 서명 대상 객체에 SigningPubKey를 넣음
    const toSign = {
      ...prepared,
      SigningPubKey: source.publicKey,
    };

    // 3) seed 기반 keypair 생성
    const { privateKey } = deriveKeypair(params.sourceSeed);

    // 4) 프리픽스 포함 데이터 서명
    const signingData = encodeForSigning(toSign as any);
    const signature = kpSign(signingData, privateKey);

    // 5) 최종 트랜잭션에 TxnSignature 추가 후 인코딩
    const signedTx = { ...toSign, TxnSignature: signature };
    const tx_blob = encode(signedTx);

    // 6) 제출 & 결과 확인
    const result = await client.submitAndWait(tx_blob);

    console.log(
      `✅ EscrowCreate 성공: Owner=${source.address}, Sequence=${prepared.Sequence}`
    );
    console.log(JSON.stringify(result, null, 2));

    return {
      success: true,
      txHash: result.result.hash,
      sequence: prepared.Sequence,
      owner: source.address,
      destination: params.destinationAddress,
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

// XRP 에스크로 생성 (간단한 버전)
export async function escrowCreateXRP(
  sourceSeed: string,
  destinationAddress: string,
  amountXRP: string,
  // finishAfterSeconds: number = 30,
  finishAfterSeconds: number = 1,
  cancelAfterSeconds: number = 120
) {
  const amountDrops = (parseFloat(amountXRP) * 1000000).toString(); // XRP to drops

  return escrowCreate({
    sourceSeed,
    destinationAddress,
    amount: amountDrops,
    finishAfter: Now() + finishAfterSeconds,
    cancelAfter: Now() + cancelAfterSeconds,
  });
}

// MPT 에스크로 생성
export async function escrowCreateMPT(
  sourceSeed: string,
  destinationAddress: string,
  issuanceId: string,
  amount: string,
  finishAfterSeconds: number = 30,
  cancelAfterSeconds: number = 120
) {
  return escrowCreate({
    sourceSeed,
    destinationAddress,
    amount: {
      mpt_issuance_id: issuanceId,
      value: amount,
    },
    finishAfter: Now() + finishAfterSeconds,
    cancelAfter: Now() + cancelAfterSeconds,
  });
}

// 직접 실행 테스트
if (require.main === module) {
  const testEscrow = async () => {
    const sourceSeed = process.env.USER_SEED;
    const destinationAddress = process.env.USER2_ADDRESS;

    if (!sourceSeed || !destinationAddress) {
      console.error("❌ 환경변수 USER_SEED, USER2_ADDRESS가 필요합니다.");
      return;
    }

    // XRP 에스크로 테스트
    await escrowCreateXRP(sourceSeed, destinationAddress, "10", 30, 120);
  };

  testEscrow().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
