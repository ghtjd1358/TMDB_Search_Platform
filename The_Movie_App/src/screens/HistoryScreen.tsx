import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import type { RootStackScreenProps } from '@/navigation/types';

const HistoryScreen = ({}: RootStackScreenProps<'History'>): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.center}>
        <Text style={styles.title}>최근 대화</Text>
        <Text style={styles.phase}>Phase 5에서 AsyncStorage persist 연동 예정</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.lg },
  title: { ...typography.title, color: colors.text },
  phase: { ...typography.caption, color: colors.muted, marginTop: spacing.xl },
});

export default HistoryScreen;
