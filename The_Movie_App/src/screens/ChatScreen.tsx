import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { CATEGORY_EMOJIS, CATEGORY_LABELS } from '@/constants/categories';
import { colors, spacing, typography } from '@/theme';
import type { RootStackScreenProps } from '@/navigation/types';

const ChatScreen = ({ route }: RootStackScreenProps<'Chat'>): React.JSX.Element => {
  const { category } = route.params;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.center}>
        <Text style={styles.emoji}>{CATEGORY_EMOJIS[category]}</Text>
        <Text style={styles.title}>AI 대화</Text>
        <Text style={styles.subtitle}>카테고리: {CATEGORY_LABELS[category]}</Text>
        <Text style={styles.phase}>Phase 4에서 Claude API 연동 예정</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.lg },
  emoji: { fontSize: 64, marginBottom: spacing.md },
  title: { ...typography.title, color: colors.text },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.sm },
  phase: { ...typography.caption, color: colors.muted, marginTop: spacing.xl },
});

export default ChatScreen;
