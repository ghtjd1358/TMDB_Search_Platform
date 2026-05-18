# TODO — 여기까지왔다 부활 로드맵

> 기획서(`여기까지왔다_기획설계.md.pdf`) 기준, RN + TS + Zustand 스택으로 재작성.
> 체크박스 순서는 **의존성 순서**. 위에서부터 내려가며 진행.

---

## Phase 0 — 환경 준비

- [ ] **Node/RN 환경 점검**: `node -v` ≥ 18, `npm run start`가 정상 기동하는지 확인
- [ ] **TypeScript 설정 강화**: `tsconfig.json` strict 모드 확인 (`strict: true`, `noImplicitAny`, `strictNullChecks`)
- [ ] **ESLint TS 규칙 추가**: `@typescript-eslint/parser`, `plugin:@typescript-eslint/recommended`
- [ ] **환경변수 셋업**: `react-native-config` 설치, `.env.example` 생성 (TMDB_API_KEY, CLAUDE_API_KEY, ANILIST_URL)
- [ ] **Git ignore 점검**: `.env`, `ios/Pods`, `android/build` 확실히 제외
- [ ] **패키지 설치**:
  - [ ] `zustand`
  - [ ] `@react-native-async-storage/async-storage`
  - [ ] `graphql-request` (AniList)
  - [ ] `react-native-view-shot`, `react-native-share` (공유 카드)
  - [ ] `react-native-config` (env)
- [ ] **패키지 제거**:
  - [ ] `@reduxjs/toolkit`, `react-redux`, `redux-persist`
  - [ ] `react-native-snap-carousel` (유지보수 중단 — `react-native-reanimated-carousel`로 교체 검토)

## Phase 1 — 레거시 정리

- [ ] `Reducer/` 폴더 **전체 삭제** (Zustand 전환)
- [ ] `src/screens/*.js` 중 재사용 안 할 스크린 삭제 목록 확정
  - [ ] `Actor.js` — 기획서에 없음, 삭제
  - [ ] `MoreMovie.js` — 기획서에 없음, 삭제
  - [ ] `Profile.js` — MVP 2차에서 재검토, 보류
  - [ ] `Search.js` — `ChatScreen.tsx`로 대체, 삭제
  - [ ] `Home.js` — `HomeScreen.tsx`(카테고리 선택)로 재작성
  - [ ] `Detail.js` — `ResultScreen.tsx`로 재작성 (상세는 카드 형태로)
  - [ ] `Login.js` — `LoginScreen.tsx`로 TS 전환 (MVP 2차, 일단 보류)
  - [ ] `Theme.js` → `src/theme/index.ts`로 이동
- [ ] `src/components/*.js` TS 전환 여부 결정
  - [ ] `FavoriteButton.js` — 기획서에 없음, 삭제
  - [ ] `Favorites.js` — 삭제
  - [ ] `starRating.js` — `src/components/common/StarRating.tsx`로 전환 (평점 표시에 사용)
- [ ] `App.js` → `App.tsx` 변환 + 네비게이터 재설계
- [ ] `firebase.js` 유지하되 import 제거 (MVP 2차 대비 보존)

## Phase 2 — 신규 구조 구축

- [ ] `src/` 아래 `screens/`, `components/`, `navigation/`, `store/`, `api/`, `hooks/`, `types/`, `utils/`, `constants/`, `theme/` 폴더 생성
- [ ] `src/types/content.ts` — Movie | Drama | Anime 통합 타입 정의
- [ ] `src/types/chat.ts` — ChatMessage, ChatRole, Guess 타입 정의
- [ ] `src/constants/categories.ts` — 4개 카테고리 상수 (영화/드라마/애니/전체)
- [ ] `src/theme/index.ts` — 색상/폰트 토큰, styled-components 테마 프로바이더
- [ ] `src/navigation/types.ts` — `RootStackParamList` (Home, Chat, Result, History)
- [ ] `src/navigation/RootNavigator.tsx` — Native Stack으로 4개 스크린 연결
- [ ] `App.tsx` — NavigationContainer + RootNavigator 최소 셋업

## Phase 3 — API 레이어

- [ ] **TMDB**
  - [ ] `src/api/tmdb/client.ts` — axios 인스턴스 + baseURL + API 키
  - [ ] `src/api/tmdb/types.ts` — Movie, TVShow 응답 타입
  - [ ] `src/api/tmdb/movies.ts` — `searchMovies`, `getMovieDetail`
  - [ ] `src/api/tmdb/tv.ts` — `searchTV`, `getTVDetail`
- [ ] **AniList**
  - [ ] `src/api/anilist/client.ts` — graphql-request 인스턴스
  - [ ] `src/api/anilist/types.ts` — Anime 타입
  - [ ] `src/api/anilist/queries.ts` — searchAnime 쿼리
- [ ] **Claude**
  - [ ] `src/api/claude/client.ts` — fetch 기반 호출 (Messages API)
  - [ ] `src/api/claude/prompts.ts` — 카테고리별 시스템 프롬프트 (기획서 4-4 반영)
  - [ ] `src/api/claude/types.ts` — Message, ContentBlock 타입
- [ ] **통합 타입 매퍼** `src/api/mappers.ts` — TMDB/AniList 응답을 `Content` 공용 타입으로 변환

## Phase 4 — MVP 1차 (기획서 10번 체크리스트)

- [ ] **카테고리 선택 화면** (`HomeScreen.tsx`)
  - [ ] 4개 카드 UI (영화/드라마/애니/전체)
  - [ ] 카테고리 선택 시 `categoryStore` 업데이트 + `ChatScreen`으로 이동
- [ ] **AI 대화 화면** (`ChatScreen.tsx`)
  - [ ] `chatStore`로 메시지 히스토리 관리
  - [ ] 유저 입력창 (초기 메시지: "어떤 작품이 보고 싶은지 설명해주세요")
  - [ ] Claude API 스트리밍 응답 처리 (옵션: 비스트리밍으로 먼저 구현)
  - [ ] `ChatBubble` 컴포넌트 (role=user/assistant 구분)
  - [ ] "그냥 추천해줘" 단축 버튼 → 즉시 추천 생성
- [ ] **중간 추측 기능**
  - [ ] 시스템 프롬프트에 확신도 70% 이상이면 추측 지시
  - [ ] `GuessCard` 컴포넌트 (작품명 + "맞나요?" + 예/아니요 버튼)
  - [ ] "아니야" → 자연스러운 이어가기
- [ ] **추천 결과 화면** (`ResultScreen.tsx`)
  - [ ] 3~5개 추천 카드 리스트
  - [ ] 카드 구조: 작품명 / 장르+연도 / 한줄 이유 / 평점 / 공식 링크
  - [ ] TMDB/AniList 평점 호출 통합

## Phase 5 — MVP 2차

- [ ] **결과 카드 공유**
  - [ ] `ShareCard` 컴포넌트 (대화 흐름 요약 + 최종 추천)
  - [ ] `react-native-view-shot`으로 이미지 캡처
  - [ ] "나는 못 맞추게 했다😈" / "딱 맞춰버림 ㄷㄷ" 템플릿 2종
  - [ ] "AI가 N번 만에 추천해줬다" 문구 자동 생성
- [ ] **대화 히스토리 저장** (`HistoryScreen.tsx`)
  - [ ] `historyStore` + AsyncStorage persist
  - [ ] 최근 세션 목록 (타이틀 = 첫 유저 메시지 요약)
  - [ ] 세션 재진입 시 대화 복원
- [ ] **스트리밍 서비스 링크**
  - [ ] 작품별 왓챠/넷플릭스/라프텔 딥링크 매핑
- [ ] **취향 학습** (좋아요/싫어요 누적)
  - [ ] `preferenceStore` 추가
  - [ ] 다음 세션 시스템 프롬프트에 선호 컨텍스트 주입
- [ ] **로그인** (`LoginScreen.tsx`)
  - [ ] Firebase Auth 재도입 여부 결정
  - [ ] 클라우드 히스토리 동기화 필요 시 진행

## Phase 6 — 리팩토링/품질

- [ ] `App.tsx`에서 로그아웃 버튼을 `Home`에 `children`으로 주입하는 패턴 제거
- [ ] 모든 네비게이션 `navigation.navigate` 호출 **타입 안전**하게 (`RootStackParamList` 기반)
- [ ] 에러 바운더리 추가 (`src/components/common/ErrorBoundary.tsx`)
- [ ] API 호출 공통 에러 핸들링 (네트워크/타임아웃/429 rate limit)
- [ ] Claude API rate limiting 가드 (기획서 9번 — 바이럴 폭발 대비)
- [ ] 유닛 테스트: prompts.ts, mappers.ts, store 액션

---

## 에이전트 호출 가이드

각 에이전트는 `@에이전트이름` 으로 라우팅. 호출 프롬프트 3요소: **(1) 리뷰 대상 파일 (2) 변경 배경 (3) 중점 확인 항목**.

### 🧑‍💻 `rn-code-reviewer`
**언제**: 스크린/컴포넌트/네비게이션 수정 후, `.js → .tsx` 변환 후

```
@rn-code-reviewer

[리뷰 대상]
- src/screens/ChatScreen.tsx (신규)
- src/components/chat/ChatBubble.tsx (신규)

[변경 배경]
Phase 4 중 AI 대화 화면 구현. FlatList 메시지 렌더링, Claude API 연동 포함.

[중점 확인]
1. FlatList 성능 (keyExtractor, renderItem memoization)
2. useEffect 의존성
3. navigation.navigate 타입 안전성
4. iOS/Android 플랫폼 분기
```

### 🗄️ `zustand-store-reviewer`
**언제**: `src/store/` 파일 추가·수정, 컴포넌트 store 구독 점검

```
@zustand-store-reviewer

[리뷰 대상]
- src/store/chatStore.ts
- src/store/historyStore.ts (persist)
- src/screens/ChatScreen.tsx (구독 지점)

[변경 배경]
대화/히스토리 store 분리. history만 AsyncStorage persist 적용.

[중점 확인]
1. 두 store 책임 경계
2. selector 없이 전체 구독 여부
3. persist partialize / version / migrate
4. messages 무한 증가 정책 (상한 or FIFO)
```

### 🔌 `api-layer-reviewer`
**언제**: `src/api/` 어댑터 추가·수정, 프롬프트 파일 변경

```
@api-layer-reviewer

[리뷰 대상]
- src/api/claude/client.ts
- src/api/claude/prompts.ts

[변경 배경]
Phase 3 Claude 어댑터 1차. 카테고리별 시스템 프롬프트, Messages API 비스트리밍.

[중점 확인]
1. API 키 노출 — .env 연동 / 주석 경고
2. 기획서 4-4 지침 전부 반영 (확신도 70%, 이어가기, 3~5개, 말투)
3. max_tokens 상한
4. 프롬프트 장황함 vs few-shot 효과 균형
```

### 조합 호출 (한 PR에 여러 레이어)

```
@rn-code-reviewer
@zustand-store-reviewer
@api-layer-reviewer

[리뷰 대상]
Phase 4 MVP 1차 완료 커밋 — 해당 파일들 전부.

각자 담당 영역만 리뷰. 중복 지적은 api-layer 우선.
```

---

## 체크리스트 외 기록

- **레퍼 repo** `TMDB_Search_Platform`은 현재 **비어있음** — 구조가 채워지면 CLAUDE.md의 폴더 구조를 맞춰 업데이트할 것.
- 기획서 7번(Next.js/Vercel/PWA/next-pwa/html2canvas)은 **이 프로젝트에 적용하지 않음**. RN 대응 기술로 대체 중.
