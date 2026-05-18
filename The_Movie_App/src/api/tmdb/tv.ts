import { tmdbClient } from './client';
import type { TmdbSearchResponse, TmdbTV } from './types';

export async function searchTV(
  query: string,
  page = 1,
): Promise<TmdbSearchResponse<TmdbTV>> {
  const { data } = await tmdbClient.get<TmdbSearchResponse<TmdbTV>>(
    '/search/tv',
    { params: { query, page, include_adult: false } },
  );
  return data;
}

export async function getTVDetail(id: number): Promise<TmdbTV> {
  const { data } = await tmdbClient.get<TmdbTV>(`/tv/${id}`);
  return data;
}
