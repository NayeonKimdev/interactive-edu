#!/bin/bash

echo "🚀 Interactive Educational Platform 빌드 시작..."

# 프론트엔드 빌드
echo "📦 프론트엔드 빌드 중..."
cd frontend
npm install
npm run build
cd ..

# 백엔드 빌드
echo "🐍 백엔드 빌드 중..."
cd backend
pip install -r requirements.txt
cd ..

echo "✅ 빌드 완료!"

