# 개발자 가이드

## 프로젝트 구조

```
interactive-edu-mang/
├── frontend/                 # React 프론트엔드
├── backend/                  # Flask 백엔드
├── data/                     # 데이터 파일
├── docker/                   # Docker 설정
├── scripts/                  # 유틸리티 스크립트
├── tests/                    # 통합 테스트
└── docs/                     # 문서화
```

## 개발 환경 설정

### 필수 요구사항
- Node.js 18+
- Python 3.9+
- Docker & Docker Compose
- Git

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/interactive-edu-mang.git
cd interactive-edu-mang
```

### 2. 개발 환경 시작
```bash
# 스크립트 실행 권한 부여
chmod +x scripts/*.sh

# 개발 환경 설정
./scripts/setup.sh

# 개발 서버 시작
./scripts/dev.sh
```

### 3. 개별 서비스 실행

#### 프론트엔드 (React)
```bash
cd frontend
npm install
npm start
```

#### 백엔드 (Flask)
```bash
cd backend
pip install -r requirements.txt
python app/main.py
```

## 개발 가이드라인

### 코드 스타일

#### JavaScript/TypeScript
- ESLint + Prettier 사용
- 함수형 컴포넌트 선호
- TypeScript 타입 정의 필수

#### Python
- PEP 8 스타일 가이드 준수
- Black 포맷터 사용
- 타입 힌트 사용 권장

### 커밋 메시지 규칙
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 프로세스 또는 보조 도구 변경
```

### 브랜치 전략
- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치
- `feature/기능명`: 새로운 기능 개발
- `hotfix/버그명`: 긴급 버그 수정

## 테스트

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

## 배포

### 개발 환경 배포
```bash
./scripts/deploy.sh
```

### 프로덕션 배포
1. GitHub Actions를 통한 자동 배포
2. 수동 배포 시 `./scripts/deploy-prod.sh` 실행

## API 개발

### 새로운 엔드포인트 추가
1. `backend/app/api/` 폴더에 새 파일 생성
2. Blueprint 정의
3. 라우트 함수 구현
4. `backend/app/__init__.py`에 Blueprint 등록

### 예시
```python
# backend/app/api/example.py
from flask import Blueprint, jsonify

bp = Blueprint('example', __name__, url_prefix='/api/example')

@bp.route('/', methods=['GET'])
def get_example():
    return jsonify({'message': 'Hello World'})
```

## 데이터 관리

### 카드 데이터 추가
1. `data/raw/` 폴더에 새 카드 폴더 생성
2. `metadata.json` 파일 작성
3. 필요한 코드 및 설명 파일 추가

### 데이터베이스 마이그레이션
```bash
cd backend
python manage.py migrate
```

## 디버깅

### 로그 확인
```bash
# Docker 로그
docker-compose logs -f

# 개별 서비스 로그
docker-compose logs -f frontend
docker-compose logs -f backend
```

### 개발자 도구
- 브라우저 개발자 도구
- Flask Debug 모드
- React Developer Tools

## 성능 최적화

### 프론트엔드
- React.memo 사용
- 코드 스플리팅
- 이미지 최적화

### 백엔드
- 데이터베이스 인덱싱
- 캐싱 전략
- 비동기 처리

## 보안

### 인증/인가
- JWT 토큰 기반 인증
- 역할 기반 접근 제어 (RBAC)

### 데이터 보안
- 입력 데이터 검증
- SQL 인젝션 방지
- XSS 방지

## 모니터링

### 로깅
- 구조화된 로그 포맷
- 로그 레벨 설정
- 로그 집계

### 메트릭
- 애플리케이션 성능 모니터링
- 시스템 리소스 모니터링
- 사용자 행동 분석

