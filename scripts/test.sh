#!/bin/bash

echo "🧪 Interactive Educational Platform 테스트 시작..."

# 프론트엔드 테스트
echo "📦 프론트엔드 테스트 중..."
cd frontend
npm test -- --watchAll=false --passWithNoTests
cd ..

# 백엔드 테스트
echo "🐍 백엔드 테스트 중..."
cd backend
python -m pytest tests/ -v
cd ..

echo "✅ 테스트 완료!"

