import { Client, Wallet, Transaction } from "xrpl";
import { encodeForSigning, encode } from "ripple-binary-codec";
import { sign as kpSign, deriveKeypair } from "ripple-keypairs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "..", "..", ".env.local") });

export interface CredentialAcceptParams {
  issuerSeed: string;
  subjectSeed: string;
  credentialType: string;
  sequence?: number;
}

export async function credentialAccept(params: CredentialAcceptParams) {
  const client = new Client("wss://s.devnet.rippletest.net:51233");
  await client.connect();

  try {
    const issuer = Wallet.fromSeed(params.issuerSeed);
    const subject = Wallet.fromSeed(params.subjectSeed);

    // Get account info for sequence number
    const subjectAccountInfo = await client.request({
      command: "account_info",
      account: subject.address,
    });

    const sequence =
      params.sequence || subjectAccountInfo.result.account_data.Sequence;

    // Get fee
    const feeResult = await client.request({
      command: "fee",
    });

    // 📝 CredentialAccept 트랜잭션
    const tx: Transaction = {
      TransactionType: "CredentialAccept",
      Account: subject.address, // subject (수락하는 사람)
      Issuer: issuer.address, // issuer (발급자)
      CredentialType: Buffer.from(params.credentialType, "utf8")
        .toString("hex")
        .toUpperCase(),
      Sequence: sequence,
      Fee: feeResult.result.drops.open_ledger_fee,
      SigningPubKey: subject.publicKey,
    } as any;

    // 1) autofill → 기본 필드 채움 (Sequence, Fee 등)
    const prepared = await client.autofill(tx as any);

    // 2) 서명 대상 객체에 SigningPubKey를 넣음
    const toSign = {
      ...prepared,
      SigningPubKey: subject.publicKey,
    };

    // 3) seed 기반 keypair 생성
    const { privateKey } = deriveKeypair(params.subjectSeed);

    // 4) 프리픽스 포함 데이터 서명
    const signingData = encodeForSigning(toSign as any);
    const signature = kpSign(signingData, privateKey);

    // 5) 최종 트랜잭션에 TxnSignature 추가 후 인코딩
    const signedTx = { ...toSign, TxnSignature: signature };
    const tx_blob = encode(signedTx);

    // 6) 제출 & 결과 확인
    const result = await client.submitAndWait(tx_blob);

    console.log(
      `✅ CredentialAccept 성공: Subject=${subject.address}, Issuer=${issuer.address}, Sequence=${prepared.Sequence}`
    );
    console.log(JSON.stringify(result, null, 2));

    return {
      success: true,
      txHash: result.result.hash,
      sequence: prepared.Sequence,
      subject: subject.address,
      issuer: issuer.address,
      credentialType: params.credentialType,
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

// 간단한 버전 - 드라이버 라이센스 수락
export async function acceptDriverLicense(
  issuerSeed: string,
  subjectSeed: string,
  sequence?: number
) {
  return credentialAccept({
    issuerSeed,
    subjectSeed,
    credentialType: "DRIVER_LICENCE",
    sequence,
  });
}

// 직접 실행 테스트
if (require.main === module) {
  const testCredentialAccept = async () => {
    const issuerSeed = process.env.ADMIN_SEED;
    const subjectSeed = process.env.USER_SEED;

    if (!issuerSeed || !subjectSeed) {
      console.error("❌ 환경변수 ADMIN_SEED, USER_SEED가 필요합니다.");
      return;
    }

    // 드라이버 라이센스 수락 테스트
    await acceptDriverLicense(issuerSeed, subjectSeed);
  };

  testCredentialAccept().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
