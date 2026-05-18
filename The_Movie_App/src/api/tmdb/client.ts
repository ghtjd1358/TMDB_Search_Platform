import axios from 'axios';
import { env } from '@/api/config';

export const tmdbClient = axios.create({
  baseURL: env.tmdb.baseUrl,
  params: {
    api_key: env.tmdb.apiKey,
    language: 'ko-KR',
  },
  timeout: 10000,
});

export type TmdbImageSize = 'w185' | 'w342' | 'w500' | 'original';

export function posterUrl(
  path: string | null,
  size: TmdbImageSize = 'w342',
): string | undefined {
  return path ? `${env.tmdb.imageBaseUrl}/${size}${path}` : undefined;
}
