#!/bin/bash

echo "🚀 Interactive Educational Platform 배포 시작..."

# Docker 이미지 빌드
echo "🐳 Docker 이미지 빌드 중..."
docker-compose build

# 서비스 시작
echo "▶️ 서비스 시작 중..."
docker-compose up -d

echo "✅ 배포 완료!"
echo "🌐 프론트엔드: http://localhost:3000"
echo "🔧 백엔드 API: http://localhost:5000"
echo "🐍 Python Runner: http://localhost:8000"

