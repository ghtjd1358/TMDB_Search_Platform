import type { Content } from '@/types/content';
import { posterUrl } from './tmdb/client';
import { TMDB_GENRES } from './tmdb/types';
import type { TmdbMovie, TmdbTV } from './tmdb/types';
import type { AnilistMedia } from './anilist/types';

/**
 * TMDB/AniList 원본 응답 → 앱 내부 통합 Content 타입으로 변환.
 * 매퍼는 순수 함수로만 구현 (네트워크/side effect 없음).
 */

export function mapTmdbMovie(m: TmdbMovie): Content {
  return {
    id: `tmdb:${m.id}`,
    source: 'tmdb',
    externalId: m.id,
    category: 'movie',
    title: m.title,
    originalTitle: m.original_title,
    genres: m.genre_ids.map((id) => TMDB_GENRES[id] ?? '기타'),
    year: m.release_date ? Number(m.release_date.slice(0, 4)) : undefined,
    posterUrl: posterUrl(m.poster_path),
    rating: m.vote_average,
    overview: m.overview || undefined,
  };
}

export function mapTmdbTV(t: TmdbTV): Content {
  return {
    id: `tmdb:${t.id}`,
    source: 'tmdb',
    externalId: t.id,
    category: 'drama',
    title: t.name,
    originalTitle: t.original_name,
    genres: t.genre_ids.map((id) => TMDB_GENRES[id] ?? '기타'),
    year: t.first_air_date ? Number(t.first_air_date.slice(0, 4)) : undefined,
    posterUrl: posterUrl(t.poster_path),
    rating: t.vote_average,
    overview: t.overview || undefined,
  };
}

export function mapAnilistMedia(a: AnilistMedia): Content {
  return {
    id: `anilist:${a.id}`,
    source: 'anilist',
    externalId: a.id,
    category: 'anime',
    // AniList는 한국어 타이틀 필드가 없어 english → romaji → native 순서로 폴백.
    title:
      a.title.english ??
      a.title.romaji ??
      a.title.native ??
      `AniList ${a.id}`,
    originalTitle: a.title.native ?? undefined,
    genres: a.genres,
    year: a.seasonYear ?? undefined,
    posterUrl: a.coverImage.large ?? a.coverImage.medium ?? undefined,
    // 0~100 스케일 → 0~10로 통일
    rating: a.averageScore != null ? a.averageScore / 10 : undefined,
    overview: a.description ?? undefined,
  };
}
