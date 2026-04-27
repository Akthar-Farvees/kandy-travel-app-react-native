import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import type { CollectionStory } from '../types';

interface StoryStripProps {
  stories: CollectionStory[];
}

export function StoryStrip({ stories }: StoryStripProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Curated Theme Lenses</Text>
        <Text style={styles.title}>Three moods built into the same product page</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {stories.map((story) => (
          <LinearGradient
            colors={['rgba(255, 249, 240, 0.98)', 'rgba(248, 241, 228, 0.92)']}
            key={story.id}
            style={styles.storyCard}
          >
            <View style={[styles.accentDot, { backgroundColor: story.accentColor }]} />
            <Text style={styles.storySubtitle}>{story.subtitle}</Text>
            <Text style={styles.storyTitle}>{story.title}</Text>
            <Text style={styles.storyDetail}>{story.detail}</Text>
          </LinearGradient>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 14,
  },
  header: {
    gap: 4,
  },
  kicker: {
    color: 'rgba(248, 243, 233, 0.78)',
    fontFamily: theme.fonts.bodySemi,
    fontSize: 12,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.inkInverse,
    fontFamily: theme.fonts.display,
    fontSize: 28,
    lineHeight: 31,
  },
  scrollContent: {
    gap: 14,
    paddingRight: 6,
  },
  storyCard: {
    borderColor: 'rgba(255, 246, 234, 0.14)',
    borderRadius: theme.radii.large,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 18,
    width: 248,
  },
  accentDot: {
    borderRadius: 999,
    height: 12,
    marginBottom: 16,
    width: 12,
  },
  storySubtitle: {
    color: theme.colors.muted,
    fontFamily: theme.fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 1.2,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  storyTitle: {
    color: theme.colors.ink,
    fontFamily: theme.fonts.displayBold,
    fontSize: 25,
    lineHeight: 28,
    marginBottom: 10,
  },
  storyDetail: {
    color: theme.colors.muted,
    fontFamily: theme.fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 22,
  },
});
