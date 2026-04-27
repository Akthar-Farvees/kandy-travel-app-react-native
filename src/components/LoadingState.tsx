import { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';

function ShimmerBar({ style }: { style: object }) {
  const shimmer = useRef(new Animated.Value(0.3)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 0.65, duration: 850, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0.3, duration: 850, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [shimmer]);
  return <Animated.View style={[style, { opacity: shimmer }]} />;
}

export function LoadingState() {
  return (
    <LinearGradient
      colors={[theme.colors.canopy, theme.colors.forest, theme.colors.cream]}
      locations={[0, 0.42, 1]}
      style={styles.screen}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.heroPlaceholder}>
            <Text style={styles.eyebrow}>Preparing Kandy</Text>
            <Text style={styles.title}>Loading the sightseeing and lifestyle experience...</Text>
            <ActivityIndicator color={theme.colors.gold} size="small" />
          </View>

          <View style={styles.row}>
            <ShimmerBar style={styles.chip} />
            <ShimmerBar style={[styles.chip, styles.chipShort]} />
          </View>

          <View style={styles.panel}>
            <ShimmerBar style={styles.searchBar} />
            <View style={styles.filterRow}>
              <ShimmerBar style={styles.filterPill} />
              <ShimmerBar style={styles.filterPill} />
              <ShimmerBar style={styles.filterPill} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safeArea: { flex: 1 },
  content: { flex: 1, gap: theme.spacing.xl, justifyContent: 'center', paddingHorizontal: theme.spacing.xl },
  heroPlaceholder: {
    backgroundColor: 'rgba(255,250,240,0.12)',
    borderColor: 'rgba(255,250,240,0.16)',
    borderRadius: theme.radii.xlarge,
    borderWidth: 1,
    gap: theme.spacing.lg,
    minHeight: 260,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.xxl,
  },
  eyebrow: {
    color: 'rgba(248,243,233,0.8)',
    fontFamily: theme.fonts.bodySemi,
    fontSize: theme.typography.footnote,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.inkInverse,
    fontFamily: theme.fonts.displayBold,
    fontSize: theme.typography.title1,
    lineHeight: 34,
  },
  row: { flexDirection: 'row', gap: 10 },
  chip: { backgroundColor: 'rgba(255,250,240,0.16)', borderRadius: 999, height: 44, width: 140 },
  chipShort: { width: 108 },
  panel: {
    backgroundColor: 'rgba(255,252,245,0.94)',
    borderRadius: theme.radii.large,
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  searchBar: { backgroundColor: theme.colors.ivory, borderRadius: 22, height: 52 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  filterPill: { backgroundColor: theme.colors.parchment, borderRadius: 999, height: 42, width: 110 },
});
