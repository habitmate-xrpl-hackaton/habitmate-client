# XRPL 에스크로 기능 구현

XRPL 에스크로 트랜잭션을 처리하는 TypeScript 라이브러리입니다.

## 📦 설치된 패키지

```bash
npm install xrpl ripple-binary-codec ripple-keypairs dotenv
```

## 📁 폴더 구조

```
lib/
├── escrow/
│   ├── index.ts           # 메인 export 파일
│   ├── escrowCreate.ts    # 에스크로 생성
│   └── README.md          # 이 파일
└── env.example            # 환경변수 예시
```

## 🔧 환경 설정

`.env.local` 파일에 다음 환경변수를 설정하세요:

```env
# XRPL 지갑 시드들
ADMIN_SEED=sEd...  # 관리자 지갑 시드
USER_SEED=sEd...   # 사용자1 지갑 시드
USER2_SEED=sEd...  # 사용자2 지갑 시드

# XRPL 지갑 주소들
ADMIN_ADDRESS=r...  # 관리자 지갑 주소
USER_ADDRESS=r...   # 사용자1 지갑 주소
USER2_ADDRESS=r...  # 사용자2 지갑 주소

# MPT 발행 ID (createIssuance 실행 후 복사)
MPT_ISSUANCE_ID=0049CE349E4215DD8AC6196A0A5027DF489AEC3B17BD6211
```

## 🚀 사용법

### 1. XRP 에스크로 생성

```typescript
import { escrowCreateXRP } from "@/lib/escrow";

const result = await escrowCreateXRP(
  process.env.USER_SEED!, // 소스 지갑 시드
  process.env.USER2_ADDRESS!, // 목적지 주소
  "10", // XRP 금액
  30, // FinishAfter (초)
  120 // CancelAfter (초)
);

console.log(result);
```

### 2. MPT 에스크로 생성

```typescript
import { escrowCreateMPT } from "@/lib/escrow";

const result = await escrowCreateMPT(
  process.env.USER_SEED!, // 소스 지갑 시드
  process.env.USER2_ADDRESS!, // 목적지 주소
  process.env.MPT_ISSUANCE_ID!, // MPT 발행 ID
  "50", // MPT 금액
  30, // FinishAfter (초)
  120 // CancelAfter (초)
);

console.log(result);
```

### 3. 시나리오 실행

```typescript
import { ESCROW_SCENARIOS } from "@/lib/escrow";

// 생성 → 완료 시나리오
const createAndFinish = await ESCROW_SCENARIOS.createAndFinish(
  process.env.USER_SEED!,
  process.env.USER2_ADDRESS!,
  "10", // XRP 금액
  30, // 30초 후 완료 가능
  120 // 120초 후 취소 가능
);

// 생성 → 취소 시나리오
const createAndCancel = await ESCROW_SCENARIOS.createAndCancel(
  process.env.USER_SEED!,
  process.env.USER2_ADDRESS!,
  "10", // XRP 금액
  30, // 30초 후 완료 가능
  60 // 60초 후 취소 가능
);
```

## 🔍 주요 특징

### Raw 서명 방식 사용

- `xrpl.js`의 MPT 지원 한계로 인해 raw 서명 방식 사용
- `encodeForSigning` + `ripple-keypairs.sign`으로 검증 우회
- 서버에서 정상 처리됨

### 에스크로 타입 지원

- **XRP**: drops 문자열로 처리
- **MPT**: `{ mpt_issuance_id, value }` 객체로 처리

### 시간 관리

- XRPL 에폭 시간 자동 변환
- FinishAfter/CancelAfter 시간 설정

### 에러 처리

- 모든 함수가 `{ success: boolean, ... }` 형태로 결과 반환
- 상세한 에러 메시지 제공

## ⚠️ 주의사항

1. **IOU/MPT 에스크로 생성 전에** Admin 계정에 `asfAllowTrustLineLocking` 플래그 설정 필요
2. **발행자가 Source인 경우** 에스크로 생성 불가
3. **RequireAuth 토큰**인 경우 사전 승인 필요
4. **DevNet 환경**에서만 테스트 (메인넷 사용 시 주의)

## 🧪 테스트 실행

개별 파일을 직접 실행하여 테스트할 수 있습니다:

```bash
# 에스크로 생성 테스트
npx tsx lib/escrow/escrowCreate.ts

```

## 📚 참고 자료

- [XRPL 에스크로 공식 문서](https://xrpl.org/escrowcreate.html)
- [XRPL DevNet 테스트 도구](https://xspence.co.uk/devnet)
