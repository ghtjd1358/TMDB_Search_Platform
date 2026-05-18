/**
 * 디자인 토큰. 기획서 11번 마스코트 방향(돋보기 든 추리 캐릭터)에 맞춰
 * 약간 따뜻한 톤. 다크모드는 MVP 2차에서 도입.
 */
export const colors = {
  background: '#FFFFFF',
  surface: '#F7F7F7',
  text: '#111111',
  textSecondary: '#666666',
  muted: '#999999',
  border: '#E5E5E5',
  primary: '#FF6B6B',
  success: '#4ADE80',
  danger: '#EF4444',
  // 카테고리별 악센트
  categoryMovie: '#FF6B6B',
  categoryDrama: '#6B9FFF',
  categoryAnime: '#FFB86B',
  categoryAll: '#A06BFF',
} as const;

export const typography = {
  title: { fontSize: 28, fontWeight: '700' as const },
  heading: { fontSize: 20, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
  pill: 999,
} as const;

export type Colors = typeof colors;
export type Spacing = typeof spacing;
