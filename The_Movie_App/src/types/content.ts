import type { Category } from '@/constants/categories';

/**
 * TMDB / AniList 응답을 통합한 앱 내부 표현.
 * 각 어댑터의 mapper가 원본 응답을 이 타입으로 변환합니다.
 */
export interface Content {
  /** 내부 고유 id — `${source}:${externalId}` 형식 */
  id: string;
  /** 원본 데이터 소스 */
  source: 'tmdb' | 'anilist';
  /** 외부 서비스의 고유 id (TMDB movie id, AniList media id 등) */
  externalId: number;
  /** 카테고리 */
  category: Exclude<Category, 'all'>;
  /** 작품명 (한국어 우선) */
  title: string;
  /** 원제 (원어) */
  originalTitle?: string;
  /** 장르 목록 (이미 한국어로 정규화된 문자열) */
  genres: string[];
  /** 개봉/방영 연도 */
  year?: number;
  /** 포스터 이미지 url (절대 경로) */
  posterUrl?: string;
  /** 평점 (0~10) */
  rating?: number;
  /** 한줄 설명 (TMDB overview / AniList description 정리본) */
  overview?: string;
}

/** 추천 결과 카드 — 내부 Content + AI가 붙인 추천 이유 */
export interface Recommendation {
  content: Content;
  /** AI가 생성한 한줄 추천 이유 */
  reason: string;
  /** 외부 스트리밍 서비스 딥링크 (MVP 2차) */
  streamingLinks?: {
    watcha?: string;
    netflix?: string;
    laftel?: string;
  };
}
