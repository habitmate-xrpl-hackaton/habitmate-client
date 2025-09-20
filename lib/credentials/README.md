# XRPL Credential Accept 기능

이 폴더는 XRPL의 Credential Accept 트랜잭션을 처리하는 기능들을 포함합니다.

## 📁 파일 구조

```
lib/credentials/
├── credentialAccept.ts    # Credential Accept 트랜잭션 구현
├── index.ts              # 통합 export 및 테스트 함수
└── README.md             # 이 파일
```

## 🚀 주요 기능

### 1. CredentialAccept 트랜잭션

- 드라이버 라이센스, 여권, 주민등록증 등 크리덴셜 수락
- Raw signing을 통한 MPT 지원
- DevNet 환경에서 테스트 가능

### 2. 통합 테스트

- Escrow 생성 + Credential 수락 동시 테스트
- 여러 크리덴셜 타입 순차 테스트
- 결과 요약 및 검증

## 📋 사용 방법

### 1. 환경 변수 설정

`.env.local` 파일에 다음 환경 변수들을 추가하세요:

```bash
# XRPL 지갑 시드들
ADMIN_SEED=sEd...  # 발급자(issuer) 지갑 시드
USER_SEED=sEd...   # 수락자(subject) 지갑 시드

# XRPL 지갑 주소들
ADMIN_ADDRESS=r...  # 발급자 지갑 주소
USER_ADDRESS=r...   # 수락자 지갑 주소
```

### 2. 기본 사용법

```typescript
import { credentialAccept, acceptDriverLicense } from "@/lib/credentials";

// 드라이버 라이센스 수락
const result = await acceptDriverLicense(
  process.env.ADMIN_SEED!, // 발급자 시드
  process.env.USER_SEED! // 수락자 시드
);

if (result.success) {
  console.log("크리덴셜 수락 성공:", result.txHash);
} else {
  console.error("크리덴셜 수락 실패:", result.error);
}
```

### 3. 통합 테스트 실행

```typescript
import { runIntegratedTest } from "@/lib/credentials";

// Escrow + Credential 통합 테스트
const testResult = await runIntegratedTest();
console.log("통합 테스트 결과:", testResult);
```

## 🔧 직접 테스트 실행

### 1. Credential Accept만 테스트

```bash
# 드라이버 라이센스 수락만 테스트
npx tsx lib/credentials/test-credential-only.ts

# 다중 크리덴셜 타입 테스트
npx tsx lib/credentials/test-credential-only.ts multiple
```

### 2. 통합 테스트 실행

```bash
# 전체 통합 테스트 (기본)
npx tsx lib/credentials/test-integrated.ts

# Credential Accept만 테스트
npx tsx lib/credentials/test-integrated.ts credential

# Escrow Create만 테스트
npx tsx lib/credentials/test-integrated.ts escrow

# 통합 테스트 (명시적)
npx tsx lib/credentials/test-integrated.ts integrated
```

### 3. 쉘 스크립트로 간편 실행

```bash
# 실행 권한 부여 (최초 1회만)
chmod +x lib/credentials/run-tests.sh

# 통합 테스트 (기본)
./lib/credentials/run-tests.sh

# Credential Accept만 테스트
./lib/credentials/run-tests.sh credential

# 다중 크리덴셜 테스트
./lib/credentials/run-tests.sh credential-multiple

# Escrow Create만 테스트
./lib/credentials/run-tests.sh escrow

# 모든 테스트 실행
./lib/credentials/run-tests.sh all
```

### 4. 개별 함수 테스트

```bash
# credentialAccept.ts 직접 실행
npx tsx lib/credentials/credentialAccept.ts

# index.ts 통합 함수 실행
npx tsx lib/credentials/index.ts
```

## 📊 지원되는 크리덴셜 타입

- `DRIVER_LICENCE` - 운전면허증
- `PASSPORT` - 여권
- `NATIONAL_ID` - 주민등록증
- `STUDENT_ID` - 학생증
- `EMPLOYEE_ID` - 직원증

## 🔄 트랜잭션 플로우

1. **발급자(Issuer)**: 크리덴셜을 발급하는 주체
2. **수락자(Subject)**: 크리덴셜을 수락하는 주체
3. **CredentialAccept**: 수락자가 크리덴셜을 수락하는 트랜잭션

```
Issuer → CredentialAccept → Subject
   ↓           ↓              ↓
발급자    크리덴셜 수락     수락자
```

## ⚠️ 주의사항

1. **DevNet 사용**: 실제 메인넷이 아닌 DevNet에서 테스트
2. **시드 보안**: 시드를 안전하게 관리하고 공개하지 마세요
3. **트랜잭션 수수료**: 각 트랜잭션마다 XRP 수수료가 발생합니다
4. **Sequence 번호**: 올바른 sequence 번호 사용 필요

## 🐛 문제 해결

### 자주 발생하는 에러들

1. **`tecNO_PERMISSION`**: 권한이 없음 - 발급자와 수락자 관계 확인
2. **`tefPAST_SEQ`**: 과거 sequence 번호 - 최신 sequence 사용
3. **`tefBAD_AUTH`**: 잘못된 서명 - 시드와 주소 확인

### 디버깅 팁

- DevNet Faucet에서 충분한 XRP를 받았는지 확인
- 지갑 주소와 시드가 올바른지 확인
- 트랜잭션 결과를 자세히 로그로 확인

## 🎨 UI 컴포넌트

### Credential Setup Modal

프로젝트에는 이미지와 동일한 디자인의 XRPL Credential Setup 모달이 포함되어 있습니다:

```typescript
import CredentialSetupModal, {
  useCredentialSetupModal,
} from "@/components/CredentialSetupModal";
import CredentialSetupModalWithXRPL from "@/components/CredentialSetupModalWithXRPL";

// 기본 사용법
const modal = useCredentialSetupModal();

// XRPL 연동 사용법
<CredentialSetupModalWithXRPL
  isOpen={isOpen}
  onClose={closeModal}
  onAccept={handleAccept}
  issuerSeed={adminSeed}
  subjectSeed={userSeed}
  credentialType="DRIVER_LICENCE"
/>;
```

### 예제 컴포넌트

`components/CredentialSetupExample.tsx`에서 실제 사용 예제를 확인할 수 있습니다.

### 자동 모달 표시 (로그인 후 첫 방문)

HomeScreen에서 로그인 후 첫 방문 시에만 자동으로 모달이 표시됩니다:

```typescript
import { useCredentialSetup } from "@/lib/credentials/useCredentialSetup";

function HomeScreen() {
  const {
    shouldShowModal,
    credentialType,
    issuerSeed,
    subjectSeed,
    markAsCompleted,
  } = useCredentialSetup({
    credentialType: "DRIVER_LICENCE",
    delay: 1000, // 1초 후 표시
    forceShow: false, // 개발용: true로 설정하면 강제 표시
  });

  return (
    <>
      {/* HomeScreen content */}

      <CredentialSetupModalWithXRPL
        isOpen={shouldShowModal}
        onClose={markAsCompleted}
        onAccept={markAsCompleted}
        issuerSeed={issuerSeed}
        subjectSeed={subjectSeed}
        credentialType={credentialType}
      />
    </>
  );
}
```

### 디버그 도구

개발 환경에서 Credential Setup 상태를 관리할 수 있는 디버그 컴포넌트:

```typescript
import CredentialSetupDebug from "@/components/CredentialSetupDebug";

// 개발 환경에서만 사용
<CredentialSetupDebug />;
```

**디버그 함수들:**

- `credentialSetupDebug.getStatus()`: 현재 상태 확인
- `credentialSetupDebug.resetAll()`: 모든 데이터 리셋
- `credentialSetupDebug.resetForUser(email)`: 특정 사용자 리셋
- `credentialSetupDebug.forceShow(email)`: 강제 모달 표시

## 📚 추가 리소스

- [XRPL DevNet Faucet](https://xrpl.org/xrp-testnet-faucet.html)
- [XRPL CredentialAccept 트랜잭션 문서](https://xrpl.org/credentialaccept.html)
- [XRPL DevNet Explorer](https://devnet.xrpl.org/)
