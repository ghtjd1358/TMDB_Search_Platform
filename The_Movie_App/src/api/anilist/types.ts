export interface AnilistTitle {
  romaji: string | null;
  english: string | null;
  native: string | null;
}

export interface AnilistCoverImage {
  large: string | null;
  medium: string | null;
}

export type AnilistFormat =
  | 'TV'
  | 'MOVIE'
  | 'OVA'
  | 'ONA'
  | 'SPECIAL'
  | 'MUSIC'
  | 'TV_SHORT';

export interface AnilistMedia {
  id: number;
  title: AnilistTitle;
  description: string | null;
  coverImage: AnilistCoverImage;
  /** 0~100 스케일 — mapper에서 /10 해서 Content.rating(0~10)으로 통일 */
  averageScore: number | null;
  seasonYear: number | null;
  genres: string[];
  format: AnilistFormat | null;
  type: 'ANIME' | 'MANGA';
}

export interface AnilistPageInfo {
  hasNextPage: boolean;
  currentPage: number;
}

export interface AnilistSearchResponse {
  Page: {
    pageInfo: AnilistPageInfo;
    media: AnilistMedia[];
  };
}
