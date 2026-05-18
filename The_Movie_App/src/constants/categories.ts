export const CATEGORIES = ['movie', 'drama', 'anime', 'all'] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  movie: '영화',
  drama: '드라마',
  anime: '애니',
  all: '전체',
};

export const CATEGORY_EMOJIS: Record<Category, string> = {
  movie: '🎬',
  drama: '📺',
  anime: '🎌',
  all: '🎲',
};
