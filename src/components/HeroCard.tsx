import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import type { HeroStat } from '../types';

interface HeroCardProps {
  favoriteCount: number;
  onBrowsePress: () => void;
  resultCount: number;
  stats: HeroStat[];
}

export function HeroCard({ favoriteCount, onBrowsePress, resultCount, stats }: HeroCardProps) {
  return (
    <View style={styles.wrapper}>
      <Image
        cachePolicy="memory-disk"
        contentFit="cover"
        source="https://images.unsplash.com/photo-1586523969643-3bf7eb8e0d34?auto=format&fit=crop&w=1200&q=80"
        style={styles.heroImage}
        transition={400}
      />
      <LinearGradient
        colors={['rgba(17, 39, 31, 0.08)', 'rgba(17, 39, 31, 0.36)', theme.colors.overlay]}
        locations={[0, 0.5, 0.92]}
        style={styles.overlay}
      >
        <View style={styles.topRow}>
          <View style={styles.locationChip}>
            <View style={styles.locationDot} />
            <Text style={styles.locationChipText}>Kandy, Sri Lanka</Text>
          </View>
          <View style={styles.savedChip}>
            <Text style={styles.savedChipText}>{favoriteCount} saved</Text>
          </View>
        </View>

        <View style={styles.copyBlock}>
          <Text style={styles.kicker}>Kandy sightseeing guide</Text>
          <Text style={styles.title}>Explore Kandy through views, culture, and local lifestyle finds.</Text>
          <Text style={styles.description}>
            Discover a focused travel experience with top attractions, curated shopping, and a
            lighter mobile flow built to feel intentional from the first screen.
          </Text>
          <Pressable onPress={onBrowsePress} style={styles.ctaButton}>
            <Text style={styles.ctaText}>Browse Products</Text>
          </Pressable>
        </View>

        <View style={styles.statRow}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}

          <View style={[styles.statCard, styles.highlightStatCard]}>
            <Text style={styles.statValue}>{resultCount.toString().padStart(2, '0')}</Text>
            <Text style={styles.statLabel}>Visible now</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: theme.radii.xlarge,
    minHeight: 420,
    overflow: 'hidden',
    position: 'relative',
    ...theme.shadows.elevated,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 420,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xl,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationChip: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 250, 240, 0.14)',
    borderColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 10,
  },
  locationDot: {
    backgroundColor: theme.colors.gold,
    borderRadius: 999,
    height: 7,
    width: 7,
  },
  locationChipText: {
    color: theme.colors.inkInverse,
    fontFamily: theme.fonts.bodySemi,
    fontSize: theme.typography.footnote,
  },
  savedChip: {
    backgroundColor: 'rgba(255, 250, 240, 0.14)',
    borderColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 10,
  },
  savedChipText: {
    color: theme.colors.inkInverse,
    fontFamily: theme.fonts.bodySemi,
    fontSize: theme.typography.footnote,
  },
  copyBlock: {
    marginTop: theme.spacing.xxxl,
    paddingRight: 10,
  },
  kicker: {
    color: 'rgba(255, 247, 235, 0.92)',
    fontFamily: theme.fonts.bodySemi,
    fontSize: theme.typography.footnote,
    letterSpacing: 1.6,
    marginBottom: theme.spacing.md,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.inkInverse,
    fontFamily: theme.fonts.displayBold,
    fontSize: 42,
    lineHeight: 44,
    marginBottom: theme.spacing.md,
  },
  description: {
    color: 'rgba(255, 250, 242, 0.86)',
    fontFamily: theme.fonts.bodyRegular,
    fontSize: theme.typography.callout,
    lineHeight: 23,
    maxWidth: 520,
  },
  ctaButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 250, 240, 0.94)',
    borderRadius: 999,
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.md,
    ...theme.shadows.card,
  },
  ctaText: {
    color: theme.colors.ink,
    fontFamily: theme.fonts.bodyBold,
    fontSize: theme.typography.body,
  },
  statRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
  },
  statCard: {
    backgroundColor: 'rgba(255, 250, 240, 0.12)',
    borderColor: 'rgba(255, 250, 240, 0.18)',
    borderRadius: 24,
    borderWidth: 1,
    minWidth: 94,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  highlightStatCard: {
    backgroundColor: 'rgba(212, 164, 91, 0.22)',
    borderColor: 'rgba(212, 164, 91, 0.32)',
  },
  statValue: {
    color: theme.colors.inkInverse,
    fontFamily: theme.fonts.displayBold,
    fontSize: theme.typography.title1,
    lineHeight: 30,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    color: 'rgba(255, 250, 242, 0.82)',
    fontFamily: theme.fonts.body,
    fontSize: theme.typography.caption,
  },
});
