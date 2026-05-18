# 여기까지왔다 (The_Movie_App) — Claude 작업 가이드

> AI 대화로 영화/드라마/애니를 추천해주는 React Native 앱.
> 유저가 설명하면 AI가 질문으로 좁혀가며 추천 목록을 뽑아줍니다.

---

## 프로젝트 개요

- **앱 이름**: 여기까지왔다
- **컨셉**: 유저 설명 → AI 질문으로 좁혀감 (3~5회) → 추천 목록 3~5개 + 한줄 이유
- **바이럴 포인트**: "이미 정해놓고 떠보기" — AI가 못 맞추게 하는 게임성
- **타겟**: 영화/드라마/애니 시청자, 콘텐츠 추천 피로감 있는 유저
- **플랫폼**: React Native (iOS + Android). **PWA/Next.js/Vercel은 사용하지 않습니다.**
- **기획서 원본**: `C:\Users\hoseo\OneDrive\바탕 화면\FE\여기까지왔다_기획설계.md.pdf`

## 기술 스택

| 영역 | 기술 | 비고 |
|---|---|---|
| 프레임워크 | React Native 0.74.2 | iOS + Android |
| 언어 | **TypeScript** | 기존 `.js` → `.tsx/.ts` 전환 대상 |
| 네비게이션 | React Navigation v6 (Native Stack + Bottom Tabs) | 타입 정의 필수 |
| 상태관리 | **Zustand** | Redux Toolkit에서 전환. 기존 `Reducer/` 폴더는 제거 대상 |
| 로컬 저장 | `@react-native-async-storage/async-storage` | 기획서의 IndexedDB 대체 |
| AI | Claude API (`claude-sonnet-4-6` 권장) | 직접 fetch로 호출 |
| 영화/드라마 | TMDB REST API | 기존 axios 유지 |
| 애니 | AniList GraphQL API | `graphql-request` 권장 |
| 공유 카드 | `react-native-view-shot` + RN Share API | html2canvas 대체 |
| 스타일링 | `styled-components` | 기존 유지 |
| 인증 | Firebase Auth (선택사항) | MVP 2차에서 재검토 |

## 폴더 구조

```
src/
├── screens/              # 스크린 컴포넌트 (PascalCase.tsx)
│   ├── HomeScreen.tsx           # 카테고리 선택 (기획서 "/")
│   ├── ChatScreen.tsx           # AI 대화 (기획서 "/chat")
│   ├── ResultScreen.tsx         # 추천 결과 (기획서 "/result")
│   ├── HistoryScreen.tsx        # 최근 대화 (기획서 "/history")
│   └── LoginScreen.tsx          # 선택 — MVP 2차
│
├── components/           # 재사용 컴포넌트 (PascalCase.tsx)
│   ├── common/                  # Button, Text, Card 등
│   ├── chat/                    # ChatBubble, TypingIndicator, GuessCard
│   └── result/                  # RecommendationCard, ShareCard
│
├── navigation/           # 네비게이션 설정
│   ├── RootNavigator.tsx
│   └── types.ts                 # RootStackParamList 등
│
├── store/                # Zustand stores (camelCase.ts, 접미사 Store)
│   ├── chatStore.ts             # 대화 히스토리
│   ├── categoryStore.ts         # 선택된 카테고리
│   └── historyStore.ts          # 과거 세션 (persist 적용)
│
├── api/                  # 외부 API 클라이언트
│   ├── tmdb/
│   │   ├── client.ts            # axios 인스턴스
│   │   ├── movies.ts            # 엔드포인트 함수
│   │   ├── tv.ts
│   │   └── types.ts
│   ├── anilist/
│   │   ├── client.ts            # graphql-request 인스턴스
│   │   ├── queries.ts           # GraphQL 쿼리 문자열
│   │   └── types.ts
│   └── claude/
│       ├── client.ts            # Claude API 호출
│       ├── prompts.ts           # 시스템 프롬프트 (기획서 4-4 반영)
│       └── types.ts             # Message, ChatRole 등
│
├── hooks/                # 커스텀 훅 (camelCase.ts, 접두사 use)
│   ├── useChat.ts               # 대화 흐름 통합 훅
│   └── useRecommendations.ts
│
├── types/                # 글로벌 공용 타입
│   ├── content.ts               # Movie | Drama | Anime 통합 타입
│   └── chat.ts
│
├── utils/                # 순수 유틸 함수
├── constants/            # Categories, API endpoints, 색상 토큰
└── theme/                # styled-components 테마
```

### 레거시 폴더 — 제거 대상

- `Reducer/` → Zustand 전환으로 **전체 삭제**
- `src/screens/*.js` → 각 스크린을 `src/screens/*Screen.tsx`로 재작성하며 삭제
- `src/components/*.js` → `src/components/**/*.tsx`로 이동하며 삭제
- `firebase.js` → Firebase Auth 재도입 결정될 때까지 **유지 but 미사용**

## 네이밍 컨벤션

| 종류 | 규칙 | 예시 |
|---|---|---|
| 스크린 | `PascalCase` + `Screen` 접미사 | `HomeScreen.tsx`, `ChatScreen.tsx` |
| 재사용 컴포넌트 | `PascalCase` | `ChatBubble.tsx`, `RecommendationCard.tsx` |
| 훅 | `camelCase` + `use` 접두사 | `useChat.ts` |
| Zustand store | `camelCase` + `Store` 접미사 | `chatStore.ts` |
| 타입/인터페이스 | `PascalCase` | `Movie`, `ChatMessage`, `RootStackParamList` |
| 상수 | `SCREAMING_SNAKE_CASE` | `TMDB_BASE_URL`, `CATEGORIES` |
| 파일 내 함수 | `camelCase` | `fetchMovieDetail`, `buildSystemPrompt` |

## TypeScript 전환 규칙

1. **신규 파일은 반드시 `.ts` 또는 `.tsx`**로 작성.
2. **기존 `.js` 파일을 수정하게 되면** 그 파일을 `.tsx`로 변환하며 타입을 입힌다 (부분 전환 OK).
3. `any` 금지. 외부 API 응답은 반드시 `types.ts`에 인터페이스로 정의.
4. `tsconfig.json` strict 모드 유지. `strictNullChecks`, `noImplicitAny` 켠 채 진행.
5. React Navigation 스크린 props는 `NativeStackScreenProps<RootStackParamList, 'ScreenName'>` 패턴 사용.

## Zustand 패턴

```ts
// src/store/chatStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ChatState {
  messages: ChatMessage[];
  appendMessage: (msg: ChatMessage) => void;
  reset: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      appendMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
      reset: () => set({ messages: [] }),
    }),
    { name: 'chat-storage', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
```

**규칙**:
- store는 **도메인별로 분리**. 대화/카테고리/히스토리를 한 store에 몰지 않는다.
- 영속화가 필요한 store만 `persist` 미들웨어 적용 (`historyStore`).
- 컴포넌트에서 selector로 구독해 리렌더 최소화: `useChatStore((s) => s.messages)`.

## API 레이어 패턴

- 각 외부 API는 `src/api/<provider>/` 아래에 **`client.ts`(인스턴스) + 도메인별 함수 파일 + `types.ts`** 조합으로 분리.
- 컴포넌트에서 `axios`/`fetch`를 **직접 호출하지 않는다** — 반드시 `api/*` 레이어 경유.
- 환경변수는 `react-native-config` 또는 `.env` + `react-native-dotenv`로 관리. API 키는 **절대 커밋 금지**.
- Claude API 호출은 클라이언트에서 **직접 하지 않는 게 보안상 바람직**하지만, MVP 1차에서는 학습용으로 직접 호출 허용. 단 키 노출 위험은 주석으로 남긴다.

## AI 대화 규칙 (기획서 4-4)

시스템 프롬프트는 `src/api/claude/prompts.ts`에 정의하고 다음 규칙을 따른다:

- 카테고리별 특성에 맞게 질문 (애니: 장르/분기, 드라마: 국가/화수, 영화: 러닝타임/장르)
- 확신도 70% 이상이면 중간 추측 허용 ("혹시 ○○ 아닌가요?")
- 추측이 틀렸을 때 자연스럽게 이어가기 ("아쉽 ㅋㅋ 그럼...")
- 최종 추천은 3~5개, 각 항목에 한줄 이유 포함
- 말투: 친근하고 가볍게, 이모지 적절히

## 자주 쓰는 커맨드

```bash
npm start               # Metro 번들러 실행
npm run android         # 안드로이드 빌드 + 실행
npm run ios             # iOS 빌드 + 실행
npm run lint            # ESLint
npm test                # Jest
```

## 리팩토링 진행 시 Claude 주의사항

1. **기획서의 Next.js/PWA/Vercel 관련 내용은 무시**. RN 스택으로 재해석.
2. **Redux 코드 수정 요청은 거절하고 Zustand 전환을 제안**. `Reducer/` 폴더 내부는 새로 추가하지 않는다.
3. **기존 `.js` 파일을 수정할 때는 `.tsx`로 변환**을 기본으로 제안.
4. 스크린/컴포넌트/스토어/API는 **항상 위 폴더 구조를 따라 배치**. 루트에 새 파일을 만들지 않는다.
5. **TypeScript 타입을 생략하지 않는다**. props, store state, API 응답 모두 명시.
6. 기획서 기능 외 **임의의 추가 기능 제안 금지** (과도한 일반화 회피).
