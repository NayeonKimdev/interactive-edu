# Interactive Educational Platform

## 프로젝트 개요
Interactive Educational Platform은 인터랙티브한 학습 카드를 통해 수학, 물리학, 화학, 프로그래밍 등의 개념을 시각적이고 체험적으로 학습할 수 있는 웹 기반 교육 플랫폼입니다.

## 주요 기능

### 🎯 인터랙티브 학습 카드
- **수학**: 함수의 도메인과 범위, 미분, 적분 등
- **물리학**: 운동학, 역학, 전자기학 등
- **화학**: 화학결합, 반응메커니즘 등
- **프로그래밍**: 알고리즘, 자료구조 등

### 🚀 실시간 코드 실행
- Python 코드를 브라우저에서 직접 실행
- Docker 기반 안전한 실행 환경
- 실시간 결과 시각화

### 📊 다양한 시각화 도구
- **2D 시각화**: D3.js, Plotly.js
- **3D 시각화**: Three.js
- **수학 그래프**: Matplotlib, SymPy

### 🎨 직관적인 UI/UX
- Material-UI 기반 모던한 디자인
- 반응형 웹 디자인
- 애니메이션과 전환 효과

## 기술 스택

### Frontend
- **React.js + TypeScript**: 컴포넌트 기반 개발
- **Material-UI**: UI 컴포넌트 라이브러리
- **Three.js**: 3D 시각화
- **D3.js**: 2D 데이터 시각화
- **Monaco Editor**: 코드 편집기
- **Framer Motion**: 애니메이션

### Backend
- **Node.js + Express.js**: 서버 프레임워크
- **Socket.io**: 실시간 통신
- **MongoDB**: 카드 메타데이터 저장
- **PostgreSQL**: 사용자 데이터 저장

### 코드 실행 환경
- **Docker**: Python 환경 격리
- **Pyodide**: 브라우저에서 Python 실행

## 프로젝트 구조

```
interactive-edu-platform/
├── frontend/          # React 프론트엔드
├── backend/           # Node.js 백엔드
├── docker/            # Docker 설정
├── data/              # 샘플 데이터
├── docs/              # 문서
└── scripts/           # 실행 스크립트
```

## 빠른 시작

### 1. 프로젝트 클론
```bash
git clone <repository-url>
cd interactive-edu-platform
```

### 2. 의존성 설치
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. 개발 서버 실행
```bash
# 루트 디렉토리에서
./scripts/dev.sh

# 또는 Docker Compose 사용
docker-compose up -d
```

### 4. 브라우저에서 접속
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 학습 카드 예제

### 수학 - 함수의 도메인과 범위
- **위치**: `data/sample-cards/math/domain-range/`
- **내용**: 이차함수, 분수함수, 제곱근함수의 도메인과 범위 분석
- **시각화**: matplotlib을 사용한 함수 그래프

## 개발 가이드

### 새로운 학습 카드 추가
1. `data/sample-cards/` 디렉토리에 카테고리별 폴더 생성
2. `metadata.json`, `code.py`, `description.md` 파일 작성
3. 카테고리 정보를 `data/categories.json`에 추가

### 백엔드 API 확장
1. `backend/src/routes/`에 새로운 라우트 추가
2. `backend/src/models/`에 데이터 모델 정의
3. `backend/src/services/`에 비즈니스 로직 구현

### 프론트엔드 컴포넌트 추가
1. `frontend/src/components/`에 새 컴포넌트 생성
2. TypeScript 타입 정의 추가
3. Material-UI 스타일링 적용

## 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 연락처

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요.

---

**Interactive Educational Platform** - 학습을 더욱 흥미롭고 효과적으로 만들어갑니다! 🚀
