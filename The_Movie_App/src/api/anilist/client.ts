import { GraphQLClient } from 'graphql-request';
import { env } from '@/api/config';

export const anilistClient = new GraphQLClient(env.anilist.url, {
  headers: { 'Content-Type': 'application/json' },
});
