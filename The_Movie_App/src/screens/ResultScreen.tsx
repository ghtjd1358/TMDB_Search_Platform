import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import type { RootStackScreenProps } from '@/navigation/types';

const ResultScreen = ({ route }: RootStackScreenProps<'Result'>): React.JSX.Element => {
  const { sessionId } = route.params;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.center}>
        <Text style={styles.title}>추천 결과</Text>
        <Text style={styles.subtitle}>세션 id: {sessionId}</Text>
        <Text style={styles.phase}>Phase 4에서 추천 카드 3~5개 구현 예정</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.lg },
  title: { ...typography.title, color: colors.text },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.sm },
  phase: { ...typography.caption, color: colors.muted, marginTop: spacing.xl },
});

export default ResultScreen;
