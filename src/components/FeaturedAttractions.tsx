import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import type { Attraction } from '../types';

interface FeaturedAttractionsProps {
  attractions: Attraction[];
}

export function FeaturedAttractions({ attractions }: FeaturedAttractionsProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Featured Attractions</Text>
        <Text style={styles.title}>Sightseeing stops that shape the shopping mood</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {attractions.map((attraction) => (
          <Pressable key={attraction.id} style={styles.card}>
            <View style={styles.imageWrapper}>
              <Image
                cachePolicy="memory-disk"
                contentFit="cover"
                source={attraction.image}
                style={styles.image}
                transition={240}
              />
              <View style={styles.imageGradient} />
            </View>

            <View style={styles.body}>
              <View style={styles.metaRow}>
                <View style={styles.locationIndicator}>
                  <Ionicons color={theme.colors.forestSoft} name="location-sharp" size={12} />
                  <Text style={styles.location}>{attraction.location}</Text>
                </View>
                <View style={styles.topBadge}>
                  <Text style={styles.metaLabel}>Top stop</Text>
                </View>
              </View>
              <Text style={styles.cardTitle}>{attraction.title}</Text>
              <Text style={styles.note}>{attraction.note}</Text>
              <View style={styles.cuePill}>
                <Ionicons color={theme.colors.forestSoft} name="bag-handle-outline" size={14} />
                <Text style={styles.cueText}>{attraction.shoppingCue}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.lg,
  },
  header: {
    gap: theme.spacing.xs,
  },
  kicker: {
    color: 'rgba(248, 243, 233, 0.78)',
    fontFamily: theme.fonts.bodySemi,
    fontSize: theme.typography.footnote,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.inkInverse,
    fontFamily: theme.fonts.display,
    fontSize: theme.typography.title1,
    lineHeight: 31,
  },
  scrollContent: {
    gap: theme.spacing.lg,
    paddingRight: 6,
  },
  card: {
    backgroundColor: theme.opacity.glassCard,
    borderRadius: theme.radii.large,
    overflow: 'hidden',
    width: 290,
    ...theme.shadows.card,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    height: 172,
    width: '100%',
  },
  imageGradient: {
    backgroundColor: 'rgba(0,0,0,0.04)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  body: {
    gap: 10,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    justifyContent: 'space-between',
  },
  locationIndicator: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  location: {
    color: theme.colors.forestSoft,
    fontFamily: theme.fonts.bodySemi,
    fontSize: theme.typography.caption,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  topBadge: {
    backgroundColor: 'rgba(212, 164, 91, 0.12)',
    borderRadius: 999,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  metaLabel: {
    color: theme.colors.gold,
    fontFamily: theme.fonts.bodySemi,
    fontSize: 10,
  },
  cardTitle: {
    color: theme.colors.ink,
    fontFamily: theme.fonts.displayBold,
    fontSize: theme.typography.title2,
    lineHeight: 28,
  },
  note: {
    color: theme.colors.muted,
    fontFamily: theme.fonts.bodyRegular,
    fontSize: theme.typography.body,
    lineHeight: theme.typography.title3,
  },
  cuePill: {
    alignItems: 'center',
    backgroundColor: 'rgba(76, 122, 101, 0.08)',
    borderRadius: 18,
    flexDirection: 'row',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 10,
  },
  cueText: {
    color: theme.colors.ink,
    flex: 1,
    fontFamily: theme.fonts.body,
    fontSize: theme.typography.footnote,
    lineHeight: 18,
  },
});
