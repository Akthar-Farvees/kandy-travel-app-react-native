import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

interface AppHeaderProps {
  favoriteCount: number;
}

export function AppHeader({ favoriteCount }: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.brandBlock}>
        <View style={styles.monogram}>
          <Text style={styles.monogramText}>KA</Text>
        </View>

        <View>
          <Text style={styles.brandEyebrow}>Sightseeing + lifestyle</Text>
          <Text style={styles.brandTitle}>Kandyan Atlas</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <View style={styles.miniPill}>
          <Ionicons color={theme.colors.ink} name="compass-outline" size={14} />
          <Text style={styles.miniPillText}>Explore</Text>
        </View>

        <View style={styles.iconPill}>
          <Ionicons color={theme.colors.clay} name="heart" size={16} />
          <Text style={styles.iconPillText}>{favoriteCount} saved</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  brandBlock: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  monogram: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 250, 240, 0.16)',
    borderColor: 'rgba(255, 250, 240, 0.24)',
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  monogramText: {
    color: theme.colors.inkInverse,
    fontFamily: theme.fonts.bodyBold,
    fontSize: 14,
    letterSpacing: 0.8,
  },
  brandEyebrow: {
    color: 'rgba(248, 243, 233, 0.72)',
    fontFamily: theme.fonts.body,
    fontSize: 11,
    letterSpacing: 1.2,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  brandTitle: {
    color: theme.colors.inkInverse,
    fontFamily: theme.fonts.displayBold,
    fontSize: 30,
    lineHeight: 30,
  },
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  miniPill: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 250, 240, 0.9)',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  miniPillText: {
    color: theme.colors.ink,
    fontFamily: theme.fonts.bodySemi,
    fontSize: 12,
  },
  iconPill: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 250, 240, 0.9)',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  iconPillText: {
    color: theme.colors.ink,
    fontFamily: theme.fonts.bodyBold,
    fontSize: 12,
  },
});
