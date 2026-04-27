import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { theme } from '../theme';
import type { HeroStat } from '../types';

interface HeroCardProps {
  favoriteCount: number;
  onBrowsePress: () => void;
  resultCount: number;
  stats: HeroStat[];
}

export function HeroCard({ favoriteCount, onBrowsePress, resultCount, stats }: HeroCardProps) {
  const { width } = useWindowDimensions();
  const isCompact = width < 380;
  const isWide = width >= 720;

  return (
    <View style={[styles.wrapper, isCompact && styles.wrapperCompact, isWide && styles.wrapperWide]}>
      <Image
        cachePolicy="memory-disk"
        contentFit="cover"
        source="https://images.unsplash.com/photo-1586523969643-3bf7eb8e0d34?auto=format&fit=crop&w=1200&q=80"
        style={styles.heroImage}
        transition={400}
      />
      <LinearGradient
        colors={['rgba(9, 24, 18, 0.08)', 'rgba(9, 24, 18, 0.34)', 'rgba(8, 23, 18, 0.76)']}
        locations={[0.06, 0.45, 1]}
        style={[styles.overlay, isCompact && styles.overlayCompact, isWide && styles.overlayWide]}
      >
        <View style={styles.topRow}>
          <View style={styles.locationRow}>
            <View style={styles.locationDot} />
            <Text style={styles.locationText}>Kandy, Sri Lanka</Text>
          </View>
          <Text style={styles.savedText}>{favoriteCount} saved</Text>
        </View>

        <View style={[styles.copyBlock, isWide && styles.copyBlockWide]}>
          <Text style={styles.kicker}>Curated city guide</Text>
          <Text style={[styles.title, isCompact && styles.titleCompact, isWide && styles.titleWide]}>
            Explore Kandy, beautifully.
          </Text>
          <Text style={styles.description}>
            Temple views, local craft, tea, and keepsakes, edited into a calmer way to discover the
            city.
          </Text>
          <Pressable
            accessibilityLabel="Browse curated Kandy products"
            accessibilityRole="button"
            hitSlop={8}
            onPress={onBrowsePress}
            style={({ pressed }) => [styles.ctaButton, pressed && styles.ctaButtonPressed]}
          >
            <Text style={styles.ctaText}>Browse Products</Text>
          </Pressable>
        </View>

        <View style={styles.metaRail}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.metaItem}>
              <Text style={styles.metaValue}>{stat.value}</Text>
              <Text style={styles.metaLabel}>{stat.label}</Text>
            </View>
          ))}

          <View style={styles.metaItem}>
            <Text style={styles.metaValue}>{resultCount.toString().padStart(2, '0')}</Text>
            <Text style={styles.metaLabel}>Visible now</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: theme.radii.xlarge,
    minHeight: 488,
    overflow: 'hidden',
    position: 'relative',
    ...theme.shadows.elevated,
  },
  wrapperCompact: {
    minHeight: 536,
  },
  wrapperWide: {
    minHeight: 460,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 488,
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.xxl,
  },
  overlayCompact: {
    minHeight: 536,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xl,
  },
  overlayWide: {
    minHeight: 460,
    paddingHorizontal: theme.spacing.xxxl,
    paddingVertical: theme.spacing.xxl,
  },
  topRow: {
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  locationRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    minHeight: 32,
  },
  locationDot: {
    backgroundColor: theme.colors.gold,
    borderRadius: 999,
    height: 8,
    width: 8,
  },
  locationText: {
    color: theme.colors.ivory,
    fontFamily: theme.fonts.bodySemi,
    fontSize: theme.typography.footnote,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  savedText: {
    color: 'rgba(255, 250, 242, 0.72)',
    fontFamily: theme.fonts.bodyRegular,
    fontSize: theme.typography.footnote,
    lineHeight: 32,
  },
  copyBlock: {
    marginTop: theme.spacing.xxxl,
    maxWidth: 500,
  },
  copyBlockWide: {
    maxWidth: 560,
  },
  kicker: {
    color: 'rgba(255, 250, 240, 0.76)',
    fontFamily: theme.fonts.bodySemi,
    fontSize: theme.typography.footnote,
    letterSpacing: 1.8,
    marginBottom: theme.spacing.lg,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.ivory,
    fontFamily: theme.fonts.displayBold,
    fontSize: 48,
    letterSpacing: -0.5,
    lineHeight: 49,
    marginBottom: theme.spacing.lg,
  },
  titleCompact: {
    fontSize: 40,
    lineHeight: 42,
  },
  titleWide: {
    fontSize: 56,
    lineHeight: 58,
  },
  description: {
    color: 'rgba(255, 250, 242, 0.82)',
    fontFamily: theme.fonts.bodyRegular,
    fontSize: theme.typography.callout,
    lineHeight: 24,
    maxWidth: 410,
  },
  ctaButton: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.ivory,
    borderRadius: 999,
    justifyContent: 'center',
    marginTop: theme.spacing.xxxl,
    minHeight: 52,
    paddingHorizontal: 30,
    paddingVertical: theme.spacing.lg,
    ...theme.shadows.card,
  },
  ctaButtonPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },
  ctaText: {
    color: theme.colors.ink,
    fontFamily: theme.fonts.bodyBold,
    fontSize: theme.typography.body,
  },
  metaRail: {
    borderTopColor: 'rgba(255, 250, 242, 0.18)',
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xl,
    marginTop: theme.spacing.xxxl,
    paddingTop: theme.spacing.lg,
  },
  metaItem: {
    flexGrow: 1,
    minWidth: 88,
  },
  metaValue: {
    color: theme.colors.ivory,
    fontFamily: theme.fonts.bodyBold,
    fontSize: theme.typography.callout,
    lineHeight: 20,
    marginBottom: theme.spacing.xs,
  },
  metaLabel: {
    color: 'rgba(255, 250, 242, 0.64)',
    fontFamily: theme.fonts.bodyRegular,
    fontSize: theme.typography.caption,
    letterSpacing: 0.3,
    lineHeight: 15,
    textTransform: 'uppercase',
  },
});
