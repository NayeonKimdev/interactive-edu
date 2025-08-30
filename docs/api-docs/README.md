# API 문서

## 개요
Interactive Educational Platform의 REST API 문서입니다.

## 기본 URL
- 개발 환경: `http://localhost:5000/api`
- 프로덕션 환경: `https://api.interactive-edu.com/api`

## 인증
현재 버전에서는 인증이 필요하지 않습니다.

## 엔드포인트

### 카드 관련 API

#### GET /api/cards
모든 학습 카드 목록을 반환합니다.

**응답 예시:**
```json
{
  "cards": [
    {
      "id": "quadratic-formula",
      "title": "이차함수 공식",
      "category": "math",
      "subcategory": "algebra",
      "difficulty": "intermediate",
      "description": "이차함수의 근의 공식을 학습합니다.",
      "tags": ["이차함수", "근의공식", "대수학"],
      "learningObjectives": ["이차함수 이해", "근의공식 적용"],
      "estimatedTime": 30,
      "prerequisites": ["일차함수", "제곱근"]
    }
  ],
  "count": 1
}
```

#### GET /api/cards/{card_id}
특정 카드의 상세 정보를 반환합니다.

**응답 예시:**
```json
{
  "id": "quadratic-formula",
  "title": "이차함수 공식",
  "category": "math",
  "subcategory": "algebra",
  "difficulty": "intermediate",
  "description": "이차함수의 근의 공식을 학습합니다.",
  "tags": ["이차함수", "근의공식", "대수학"],
  "learningObjectives": ["이차함수 이해", "근의공식 적용"],
  "estimatedTime": 30,
  "prerequisites": ["일차함수", "제곱근"]
}
```

#### GET /api/cards/category/{category}
특정 카테고리의 카드 목록을 반환합니다.

### 헬스체크 API

#### GET /api/health
API 서버의 상태를 확인합니다.

**응답 예시:**
```json
{
  "status": "healthy",
  "timestamp": "2023-08-30T18:30:00.000Z",
  "uptime": 3600,
  "version": "1.0.0"
}
```

#### GET /api/health/ping
간단한 ping 응답을 반환합니다.

**응답 예시:**
```json
{
  "message": "pong"
}
```

## 에러 응답

### 404 Not Found
```json
{
  "error": "Card not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

