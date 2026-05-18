export interface TmdbMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface TmdbTV {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  origin_country: string[];
}

export interface TmdbSearchResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/**
 * TMDB 장르 id → 한국어 이름.
 * /genre/movie/list + /genre/tv/list 합본. id 충돌 없음.
 */
export const TMDB_GENRES: Record<number, string> = {
  28: '액션',
  12: '모험',
  16: '애니메이션',
  35: '코미디',
  80: '범죄',
  99: '다큐멘터리',
  18: '드라마',
  10751: '가족',
  14: '판타지',
  36: '역사',
  27: '공포',
  10402: '음악',
  9648: '미스터리',
  10749: '로맨스',
  878: 'SF',
  10770: 'TV 영화',
  53: '스릴러',
  10752: '전쟁',
  37: '서부',
  10759: '액션&어드벤처',
  10762: '키즈',
  10763: '뉴스',
  10764: '리얼리티',
  10765: 'SF&판타지',
  10766: '연속극',
  10767: '토크',
  10768: '전쟁&정치',
};
