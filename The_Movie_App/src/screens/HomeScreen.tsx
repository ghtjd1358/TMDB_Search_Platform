import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { CATEGORIES, CATEGORY_EMOJIS, CATEGORY_LABELS } from '@/constants/categories';
import { useCategoryStore } from '@/store/categoryStore';
import { colors, radius, spacing, typography } from '@/theme';
import type { RootStackScreenProps } from '@/navigation/types';

const HomeScreen = ({ navigation }: RootStackScreenProps<'Home'>): React.JSX.Element => {
  const select = useCategoryStore((s) => s.select);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>여기까지왔다</Text>
        <Text style={styles.subtitle}>설명하면 찾아드림</Text>
      </View>

      <View style={styles.grid}>
        {CATEGORIES.map((c) => (
          <Pressable
            key={c}
            style={styles.card}
            onPress={() => {
              select(c);
              navigation.navigate('Chat', { category: c });
            }}
          >
            <Text style={styles.emoji}>{CATEGORY_EMOJIS[c]}</Text>
            <Text style={styles.label}>{CATEGORY_LABELS[c]}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={styles.historyLink}
        onPress={() => navigation.navigate('History')}
      >
        <Text style={styles.historyText}>최근 대화 →</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.lg },
  header: { marginTop: spacing.xl, marginBottom: spacing.xl },
  title: { ...typography.title, color: colors.text },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.sm },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.md,
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: { fontSize: 48 },
  label: { ...typography.heading, color: colors.text, marginTop: spacing.sm },
  historyLink: { marginTop: 'auto', alignItems: 'center', padding: spacing.md },
  historyText: { ...typography.body, color: colors.primary },
});

export default HomeScreen;
