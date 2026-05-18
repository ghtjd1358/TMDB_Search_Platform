import { tmdbClient } from './client';
import type { TmdbMovie, TmdbSearchResponse } from './types';

export async function searchMovies(
  query: string,
  page = 1,
): Promise<TmdbSearchResponse<TmdbMovie>> {
  const { data } = await tmdbClient.get<TmdbSearchResponse<TmdbMovie>>(
    '/search/movie',
    { params: { query, page, include_adult: false } },
  );
  return data;
}

export async function getMovieDetail(id: number): Promise<TmdbMovie> {
  const { data } = await tmdbClient.get<TmdbMovie>(`/movie/${id}`);
  return data;
}
