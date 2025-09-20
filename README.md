# 🏆 HabitMate

블록체인 기술을 활용한 혁신적인 습관 관리 및 챌린지 플랫폼입니다.

## 📖 프로젝트 소개

HabitMate는 사용자들이 건강한 습관을 형성하고 유지할 수 있도록 돕는 소셜 플랫폼입니다. XRPL(XRP Ledger) 블록체인을 기반으로 하여 투명하고 신뢰할 수 있는 챌린지 시스템을 제공합니다.

### ✨ 주요 기능

#### 🎯 챌린지 시스템
- **개인/그룹 챌린지**: 혼자 또는 친구들과 함께 목표 달성
- **참가비 및 리워드**: 블록체인 기반의 투명한 보상 시스템
- **증명 시스템**: 사진/동영상으로 활동 인증
- **진행률 추적**: 실시간 목표 달성률 모니터링

#### 🌐 소셜 기능
- **피드**: 친구들의 활동 확인 및 응원
- **리더보드**: 실시간 순위 시스템
- **팔로우/팔로워**: 동기부여를 위한 소셜 네트워킹
- **알림 센터**: 실시간 활동 알림

#### 🎨 NFT 및 배지 시스템
- **성취 배지**: 목표 달성 시 NFT 배지 발급
- **디지털 자산**: 블록체인에 기록되는 성취 증명
- **수집 가능한 리워드**: 다양한 카테고리별 배지

#### 💰 블록체인 통합
- **XRPL 지갑 연동**: MetaMask 및 XRPL 지갑 지원
- **스마트 계약**: 자동화된 보상 및 환불 시스템
- **투명한 거래**: 모든 거래 내역 블록체인에 기록

### 📱 주요 화면

- **홈**: 오늘의 챌린지 및 진행 상황
- **탐색**: 새로운 챌린지 발견
- **챌린지 생성**: 나만의 챌린지 만들기
- **프로필**: 개인 통계 및 성취 기록
- **진행 캘린더**: 월별/일별 활동 추적

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0 이상
- npm, yarn, pnpm 또는 bun
- Git

### 설치 및 실행

1. **저장소 클론**
```bash
git clone [repository-url]
cd habitmate-client
```

2. **의존성 설치**
```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

3. **환경 변수 설정**
```bash
cp env.example .env.local
```
`.env.local` 파일을 열어 필요한 환경 변수를 설정하세요.

4. **개발 서버 실행**
```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

5. **브라우저에서 확인**
[http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

## 🛠 기술 스택

### Frontend
- **Next.js 15**: React 기반 풀스택 프레임워크
- **TypeScript**: 타입 안전성을 위한 정적 타입 체크
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크
- **Radix UI**: 접근성을 고려한 UI 컴포넌트 라이브러리

### 블록체인 & Web3
- **XRPL (XRP Ledger)**: 메인 블록체인 플랫폼
- **MetaMask**: 지갑 연동
- **XRPL.js**: XRPL 블록체인 통합

### 백엔드 & 데이터
- **Supabase**: 실시간 데이터베이스 및 인증
- **SWR**: 데이터 페칭 및 캐싱
- **Google OAuth**: 소셜 로그인

### 상태 관리 & 유틸리티
- **React Context**: 전역 상태 관리
- **React Hook Form**: 폼 상태 관리
- **Lucide React**: 아이콘 라이브러리

## 📁 프로젝트 구조

```
habitmate-client/
├── app/                    # Next.js App Router 페이지
│   ├── api/               # API 라우트
│   ├── auth-callback/     # 인증 콜백
│   └── [pages]/          # 각종 페이지 컴포넌트
├── components/            # React 컴포넌트
│   ├── ui/               # 재사용 가능한 UI 컴포넌트
│   └── [screens]/        # 메인 화면 컴포넌트
├── lib/                  # 핵심 라이브러리
│   ├── api/              # API 클라이언트
│   ├── auth/             # 인증 관련
│   ├── credentials/      # XRPL 자격증명
│   └── context/          # React Context
├── xrpl-react-integration/ # XRPL 블록체인 통합
└── public/               # 정적 파일
```

## 🔧 주요 설정

### 환경 변수
프로젝트에 필요한 주요 환경 변수들을 `.env.local`에 설정해야 합니다:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# XRPL 설정
NEXT_PUBLIC_XRPL_NETWORK=testnet
```

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 만듭니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📝 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE) 하에 배포됩니다.

## 🙋‍♂️ 문의 및 지원

프로젝트에 대한 질문이나 제안사항이 있으시면 언제든지 연락주세요.

---

**HabitMate와 함께 더 나은 습관을 만들어보세요! 🌟**
