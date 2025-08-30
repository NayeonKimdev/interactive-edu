# 🎓 Interactive Edu - 인터랙티브 학습 플랫폼

현대적이고 사용자 친화적인 웹 기반 교육 플랫폼입니다. 다양한 학습 도구와 인터랙티브한 기능을 제공하여 효과적인 학습 경험을 제공합니다.

## ✨ 주요 기능

### 🧠 스마트 퀴즈
- JavaScript, HTML, CSS, Git 관련 퀴즈
- 실시간 진도 표시
- 점수 계산 및 결과 분석
- 즉시 피드백 제공

### 📚 플래시카드 학습
- 플립 애니메이션이 있는 양면 카드
- 프로그래밍 개념과 정의 학습
- 직관적인 카드 네비게이션

### 📊 학습 진도 관리
- 개인별 학습 통계
- 완료한 퀴즈 수 추적
- 평균 점수 계산
- 배지 시스템으로 동기부여

### 🏆 성취 시스템
- 첫 퀴즈 완료 배지
- 연속 학습 배지  
- 완벽한 점수 배지
- 진도에 따른 자동 잠금해제

## 🚀 시작하기

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 시작 (PM2 사용)
npm install -g pm2
mkdir -p logs
pm2 start ecosystem.config.js

# 서비스 상태 확인
pm2 status

# 로그 확인
pm2 logs interactive-edu --nostream
```

### 빌드 (선택사항)

```bash
# 프로덕션 빌드
npm run build

# 빌드된 파일 미리보기
npm run preview
```

## 🌐 접속 방법

서버가 실행되면 다음 URL로 접속할 수 있습니다:

- **메인 애플리케이션**: `http://localhost:3000`
- **개발 모드**: `http://localhost:3000/dev`
- **헬스 체크**: `http://localhost:3000/api/health`

## 📁 프로젝트 구조

```
interactive-edu/
├── src/                    # 소스 코드
│   ├── index.html         # 메인 HTML 파일
│   ├── js/
│   │   └── main.js        # 메인 JavaScript 로직
│   └── styles/
│       └── main.css       # 스타일시트
├── public/                # 정적 파일
├── dist/                  # 빌드 결과물 (생성됨)
├── logs/                  # PM2 로그 파일
├── server.js              # Express 서버
├── ecosystem.config.js    # PM2 설정
├── vite.config.js         # Vite 빌드 설정
└── package.json           # 프로젝트 설정
```

## 🛠 기술 스택

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Build Tool**: Vite
- **Process Manager**: PM2
- **Styling**: CSS Grid, Flexbox, CSS Animations
- **Storage**: LocalStorage (클라이언트 사이드)

## 🎨 디자인 특징

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **모던 UI**: 그라디언트, 블러 효과, 부드러운 애니메이션
- **접근성**: 키보드 네비게이션 및 시각적 피드백
- **사용자 경험**: 직관적인 인터페이스와 즉시 응답

## 📱 반응형 지원

- 📱 모바일 (< 768px): 세로 레이아웃, 터치 친화적 버튼
- 📋 태블릿 (768px - 1024px): 그리드 레이아웃 조정
- 🖥 데스크톱 (> 1024px): 풀 기능 레이아웃

## 🔧 개발자 정보

- **개발**: GenSpark AI Developer
- **라이선스**: MIT
- **버전**: 1.0.0

## 📝 사용 방법

1. **홈페이지**: 학습 도구 개요 및 빠른 접근
2. **퀴즈**: 문제를 선택하고 다음/이전 버튼으로 네비게이션
3. **플래시카드**: 카드를 클릭하여 뒤집고 답 확인
4. **진도**: 학습 통계와 달성한 배지 확인

## 🚨 문제 해결

### 서버가 시작되지 않는 경우:
```bash
# 포트 사용 확인
lsof -i :3000

# PM2 프로세스 정리
pm2 stop all
pm2 delete all
pm2 start ecosystem.config.js
```

### 의존성 문제:
```bash
# 캐시 정리 후 재설치
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 🤝 기여하기

프로젝트 개선을 위한 제안이나 버그 리포트는 언제든 환영합니다!

---

Made with ❤️ by GenSpark AI