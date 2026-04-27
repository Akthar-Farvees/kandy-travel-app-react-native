import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { theme } from '../theme';

interface ProductGridSkeletonProps {
  cardCount: number;
}

function ShimmerBlock({ style }: { style: object }) {
  const shimmer = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 0.7,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0.35,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [shimmer]);

  return <Animated.View style={[style, { opacity: shimmer }]} />;
}

export function ProductGridSkeleton({ cardCount }: ProductGridSkeletonProps) {
  return (
    <View style={styles.grid}>
      {Array.from({ length: cardCount }).map((_, index) => (
        <View key={`product-skeleton-${index}`} style={styles.card}>
          <ShimmerBlock style={styles.image} />
          <View style={styles.body}>
            <View style={styles.row}>
              <ShimmerBlock style={styles.badge} />
              <ShimmerBlock style={styles.price} />
            </View>
            <ShimmerBlock style={styles.titleLong} />
            <ShimmerBlock style={styles.titleShort} />
            <ShimmerBlock style={styles.descriptionLong} />
            <ShimmerBlock style={styles.descriptionShort} />
            <View style={styles.divider} />
            <View style={styles.footerRow}>
              <ShimmerBlock style={styles.footerLabel} />
              <ShimmerBlock style={styles.footerHint} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: 18,
    marginTop: 4,
  },
  card: {
    backgroundColor: theme.opacity.glassCard,
    borderRadius: 24,
    overflow: 'hidden',
    ...theme.shadows.card,
  },
  image: {
    backgroundColor: 'rgba(24, 48, 39, 0.09)',
    height: 200,
    width: '100%',
  },
  body: {
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: 'rgba(24, 48, 39, 0.08)',
    borderRadius: 999,
    height: 28,
    width: 84,
  },
  price: {
    backgroundColor: 'rgba(24, 48, 39, 0.08)',
    borderRadius: 999,
    height: 18,
    width: 58,
  },
  titleLong: {
    backgroundColor: 'rgba(24, 48, 39, 0.1)',
    borderRadius: 999,
    height: 18,
    width: '88%',
  },
  titleShort: {
    backgroundColor: 'rgba(24, 48, 39, 0.1)',
    borderRadius: 999,
    height: 18,
    width: '64%',
  },
  descriptionLong: {
    backgroundColor: 'rgba(24, 48, 39, 0.06)',
    borderRadius: 999,
    height: 14,
    width: '100%',
  },
  descriptionShort: {
    backgroundColor: 'rgba(24, 48, 39, 0.06)',
    borderRadius: 999,
    height: 14,
    width: '72%',
  },
  divider: {
    backgroundColor: 'rgba(24, 48, 39, 0.04)',
    height: 1,
    marginVertical: theme.spacing.xs,
    width: '100%',
  },
  footerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  footerLabel: {
    backgroundColor: 'rgba(24, 48, 39, 0.08)',
    borderRadius: 999,
    height: 14,
    width: '42%',
  },
  footerHint: {
    backgroundColor: 'rgba(24, 48, 39, 0.08)',
    borderRadius: 999,
    height: 14,
    width: 86,
  },
});
