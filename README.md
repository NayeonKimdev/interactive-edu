# Interactive Educational Platform

수학 학습을 위한 인터랙티브 교육 플랫폼입니다. 다양한 수학 주제를 카드 형태로 제공하며, 실시간 그래프 조작과 인터랙티브한 학습 경험을 제공합니다.

## 🚀 빠른 시작

### 개발 환경 실행
```bash
# 저장소 클론
git clone https://github.com/your-username/interactive-edu-mang.git
cd interactive-edu-mang

# 개발 환경 설정
./scripts/setup.sh

# 개발 서버 시작
./scripts/dev.sh
```

### Docker로 실행
```bash
# Docker Compose로 전체 서비스 실행
docker-compose up -d

# 개별 서비스 실행
docker-compose up frontend
docker-compose up backend
```

## 📁 프로젝트 구조

```
interactive-edu-mang/
├── README.md
├── .gitignore
├── package.json
├── requirements.txt
├── docker-compose.yml
├── Dockerfile
│
├── docs/                           # 문서화
│   ├── README.md
│   ├── api-docs/                   # API 문서
│   ├── user-guide/                 # 사용자 가이드
│   └── developer-guide/            # 개발자 가이드
│
├── frontend/                       # React 프론트엔드
│   ├── package.json
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/             # 공통 컴포넌트
│   │   │   ├── admin/              # 관리자 컴포넌트
│   │   │   ├── gallery/            # 갤러리 컴포넌트
│   │   │   ├── card/               # 카드 컴포넌트
│   │   │   └── interactive/        # 수학 인터랙티브 컴포넌트
│   │   ├── pages/                  # 페이지 컴포넌트
│   │   ├── hooks/                  # 커스텀 훅
│   │   ├── utils/                  # 유틸리티 함수
│   │   ├── styles/                 # 스타일 파일
│   │   ├── types/                  # TypeScript 타입 정의
│   │   └── App.tsx
│   └── build/                      # 빌드 결과물
│
├── backend/                        # Flask 백엔드
│   ├── requirements.txt
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── api/                    # API 라우터
│   │   ├── models/                 # 데이터 모델
│   │   ├── services/               # 비즈니스 로직
│   │   ├── utils/                  # 유틸리티
│   │   └── config/                 # 설정 파일
│   └── tests/                      # 백엔드 테스트
│
├── data/                          # 데이터 관련 파일
│   ├── raw/                       # 원본 데이터
│   ├── processed/                 # 처리된 데이터
│   └── migrations/                # 데이터베이스 마이그레이션
│
├── docker/                        # Docker 관련 파일
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   ├── docker-compose.dev.yml
│   └── nginx.conf
│
├── scripts/                       # 스크립트 모음
│   ├── dev.sh
│   ├── setup.sh
│   ├── build.sh
│   └── deploy.sh
│
├── tests/                         # 통합 테스트
│   ├── e2e/                       # End-to-End 테스트
│   └── integration/               # 통합 테스트
│
└── .github/                       # GitHub Actions 워크플로우
    └── workflows/
        ├── ci.yml
        └── deploy.yml
```

## 🛠 기술 스택

### 프론트엔드
- **React 18** - 사용자 인터페이스
- **TypeScript** - 타입 안전성
- **Material-UI** - UI 컴포넌트
- **Chart.js** - 그래프 시각화
- **React Router** - 라우팅

### 백엔드
- **Flask** - 웹 프레임워크
- **Python 3.9+** - 서버 사이드 로직
- **SQLite** - 데이터베이스 (개발)
- **PostgreSQL** - 데이터베이스 (프로덕션)

### DevOps
- **Docker** - 컨테이너화
- **Docker Compose** - 멀티 서비스 관리
- **GitHub Actions** - CI/CD
- **Nginx** - 리버스 프록시

## 🎯 주요 기능

### 📚 수학 카드 갤러리
- 다양한 수학 주제별 카드 제공
- 카테고리별 필터링 및 검색
- 난이도별 정렬

### 📊 인터랙티브 그래프
- 실시간 그래프 조작
- 매개변수 변경으로 즉시 결과 확인
- 다양한 그래프 타입 지원

### 🎓 학습 진행 추적
- 개인 학습 진도 확인
- 완료된 카드 표시
- 학습 히스토리 관리

### 🔧 관리자 기능
- 카드 추가/수정/삭제
- 사용자 관리
- 학습 통계 확인

## 📖 지원되는 수학 주제

### 대수학
- 일차함수와 그래프
- 이차함수와 근의공식
- 지수함수와 로그함수
- 부등식과 해집합

### 기하학
- 도형의 성질
- 좌표평면과 그래프
- 도형의 변환

### 미적분학
- 함수의 극한
- 도함수와 미분
- 적분과 면적

## 🚀 배포

### 개발 환경
```bash
./scripts/dev.sh
```

### 프로덕션 환경
```bash
./scripts/deploy.sh
```

### Docker 배포
```bash
docker-compose -f docker/docker-compose.prod.yml up -d
```

## 🧪 테스트

### 프론트엔드 테스트
```bash
cd frontend
npm test
```

### 백엔드 테스트
```bash
cd backend
pytest
```

### 통합 테스트
```bash
./scripts/test.sh
```

## 📚 문서

- [API 문서](./docs/api-docs/README.md)
- [사용자 가이드](./docs/user-guide/README.md)
- [개발자 가이드](./docs/developer-guide/README.md)

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 연락처

- 프로젝트 링크: [https://github.com/your-username/interactive-edu-mang](https://github.com/your-username/interactive-edu-mang)
- 이메일: support@interactive-edu.com

## 🙏 감사의 말

- [React](https://reactjs.org/) - 프론트엔드 프레임워크
- [Flask](https://flask.palletsprojects.com/) - 백엔드 프레임워크
- [Material-UI](https://material-ui.com/) - UI 컴포넌트 라이브러리
- [Chart.js](https://www.chartjs.org/) - 그래프 라이브러리
