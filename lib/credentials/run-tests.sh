#!/bin/bash

# XRPL Credential & Escrow 테스트 실행 스크립트
# 사용법: ./run-tests.sh [test_type]

echo "🚀 XRPL Credential & Escrow 테스트 스크립트"
echo "=============================================="

# 환경변수 확인
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local 파일이 없습니다."
    echo "   env.example을 참고하여 .env.local 파일을 생성하세요."
    exit 1
fi

# 테스트 타입 (기본값: integrated)
TEST_TYPE=${1:-integrated}

case $TEST_TYPE in
    "credential")
        echo "📋 Credential Accept 단독 테스트 실행 중..."
        npx tsx lib/credentials/test-credential-only.ts
        ;;
    "credential-multiple")
        echo "📋 다중 크리덴셜 테스트 실행 중..."
        npx tsx lib/credentials/test-credential-only.ts multiple
        ;;
    "escrow")
        echo "🔗 Escrow Create 단독 테스트 실행 중..."
        npx tsx lib/credentials/test-integrated.ts escrow
        ;;
    "integrated")
        echo "🎯 통합 테스트 (Escrow + Credential) 실행 중..."
        npx tsx lib/credentials/test-integrated.ts integrated
        ;;
    "all")
        echo "🎯 모든 테스트 실행 중..."
        echo ""
        echo "1️⃣ Escrow Create 테스트"
        npx tsx lib/credentials/test-integrated.ts escrow
        echo ""
        echo "2️⃣ Credential Accept 테스트"
        npx tsx lib/credentials/test-credential-only.ts
        echo ""
        echo "3️⃣ 통합 테스트"
        npx tsx lib/credentials/test-integrated.ts integrated
        ;;
    *)
        echo "❌ 잘못된 테스트 타입입니다."
        echo ""
        echo "사용 가능한 테스트 타입:"
        echo "  credential        - Credential Accept만 테스트"
        echo "  credential-multiple - 다중 크리덴셜 테스트"
        echo "  escrow            - Escrow Create만 테스트"
        echo "  integrated        - 통합 테스트 (기본값)"
        echo "  all               - 모든 테스트 실행"
        echo ""
        echo "사용법: ./run-tests.sh [test_type]"
        exit 1
        ;;
esac

echo ""
echo "✅ 테스트 완료!"


# # 통합 테스트 (기본)
# ./lib/credentials/run-tests.sh

# # Credential Accept만 테스트
# ./lib/credentials/run-tests.sh credential

# # 다중 크리덴셜 테스트
# ./lib/credentials/run-tests.sh credential-multiple

# # Escrow Create만 테스트
# ./lib/credentials/run-tests.sh escrow

# # 모든 테스트 실행
# ./lib/credentials/run-tests.sh all