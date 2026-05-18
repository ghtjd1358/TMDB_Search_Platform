declare module 'react-native-config' {
  export interface NativeConfig {
    TMDB_API_KEY: string;
    TMDB_BASE_URL?: string;
    TMDB_IMAGE_BASE_URL?: string;

    ANILIST_GRAPHQL_URL?: string;

    CLAUDE_API_KEY: string;
    CLAUDE_MODEL?: string;
    CLAUDE_MAX_TOKENS?: string;

    ENABLE_ANILIST?: string;
    ENABLE_HISTORY_PERSIST?: string;
  }

  const Config: NativeConfig;
  export default Config;
}
