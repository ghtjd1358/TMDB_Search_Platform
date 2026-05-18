import type { Recommendation } from './content';

export type ChatRole = 'user' | 'assistant' | 'system';

export interface TextMessage {
  id: string;
  role: ChatRole;
  kind: 'text';
  content: string;
  createdAt: number;
}

/** AI가 확신도 70% 이상일 때 던지는 중간 추측 */
export interface GuessMessage {
  id: string;
  role: 'assistant';
  kind: 'guess';
  /** 작품명 추측 */
  title: string;
  /** 추측 근거 한줄 */
  reason: string;
  /** 유저 답변 — null이면 아직 미답변 */
  answered: 'yes' | 'no' | null;
  createdAt: number;
}

/** 최종 추천 목록 (3~5개) */
export interface RecommendationMessage {
  id: string;
  role: 'assistant';
  kind: 'recommendations';
  items: Recommendation[];
  createdAt: number;
}

export type ChatMessage = TextMessage | GuessMessage | RecommendationMessage;

/** 히스토리에 저장되는 대화 세션 단위 */
export interface ChatSession {
  id: string;
  category: Exclude<import('@/constants/categories').Category, never>;
  messages: ChatMessage[];
  startedAt: number;
  endedAt?: number;
  /** 세션 목록 표시용 요약 (첫 유저 메시지 앞부분) */
  summary: string;
}
