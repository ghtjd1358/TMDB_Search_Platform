import Config from 'react-native-config';

/**
 * 앱 전역에서 환경변수에 접근할 때 반드시 이 파일을 경유합니다.
 * react-native-config의 모든 값은 string이므로 number/boolean 캐스팅을 여기서 처리.
 */
export const env = {
  tmdb: {
    apiKey: Config.TMDB_API_KEY ?? '',
    baseUrl: Config.TMDB_BASE_URL ?? 'https://api.themoviedb.org/3',
    imageBaseUrl: Config.TMDB_IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p',
  },
  anilist: {
    url: Config.ANILIST_GRAPHQL_URL ?? 'https://graphql.anilist.co',
    enabled: Config.ENABLE_ANILIST !== 'false',
  },
  claude: {
    apiKey: Config.CLAUDE_API_KEY ?? '',
    model: Config.CLAUDE_MODEL ?? 'claude-sonnet-4-6',
    maxTokens: Number(Config.CLAUDE_MAX_TOKENS ?? '1024'),
  },
  flags: {
    historyPersist: Config.ENABLE_HISTORY_PERSIST !== 'false',
  },
};

export function assertClaudeKey(): void {
  if (!env.claude.apiKey) {
    throw new Error('CLAUDE_API_KEY is not set. See .env.example');
  }
}

export function assertTmdbKey(): void {
  if (!env.tmdb.apiKey) {
    throw new Error('TMDB_API_KEY is not set. See .env.example');
  }
}
