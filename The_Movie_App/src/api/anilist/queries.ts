import { anilistClient } from './client';
import type { AnilistSearchResponse } from './types';

export const SEARCH_ANIME_QUERY = `
  query SearchAnime($search: String!, $page: Int = 1, $perPage: Int = 10) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { hasNextPage currentPage }
      media(search: $search, type: ANIME, sort: SEARCH_MATCH) {
        id
        title { romaji english native }
        description(asHtml: false)
        coverImage { large medium }
        averageScore
        seasonYear
        genres
        format
        type
      }
    }
  }
`;

export async function searchAnime(
  search: string,
  page = 1,
  perPage = 10,
): Promise<AnilistSearchResponse> {
  return anilistClient.request<AnilistSearchResponse>(SEARCH_ANIME_QUERY, {
    search,
    page,
    perPage,
  });
}
