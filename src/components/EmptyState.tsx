import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconShell}>
        <Ionicons color={theme.colors.gold} name="compass-outline" size={28} />
      </View>
      <Text style={styles.title}>No products match that path yet</Text>
      <Text style={styles.body}>
        Try a broader search or clear the filters to reopen the full Kandy collection.
      </Text>
      <Pressable onPress={onReset} style={styles.resetButton}>
        <Ionicons color={theme.colors.inkInverse} name="refresh-outline" size={16} />
        <Text style={styles.resetButtonText}>Show all products</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,251,243,0.96)',
    borderColor: 'rgba(229,216,196,0.4)',
    borderRadius: theme.radii.large,
    borderWidth: 1,
    gap: theme.spacing.md,
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.xxxl,
  },
  iconShell: {
    alignItems: 'center',
    backgroundColor: 'rgba(212,164,91,0.12)',
    borderRadius: 999,
    height: 60,
    justifyContent: 'center',
    width: 60,
  },
  title: {
    color: theme.colors.ink,
    fontFamily: theme.fonts.displayBold,
    fontSize: theme.typography.title1,
    lineHeight: 32,
    textAlign: 'center',
  },
  body: {
    color: theme.colors.muted,
    fontFamily: theme.fonts.bodyRegular,
    fontSize: theme.typography.body,
    lineHeight: 22,
    maxWidth: 290,
    textAlign: 'center',
  },
  resetButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.forestSoft,
    borderRadius: 999,
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    ...theme.shadows.card,
  },
  resetButtonText: {
    color: theme.colors.inkInverse,
    fontFamily: theme.fonts.bodyBold,
    fontSize: theme.typography.body,
  },
});
