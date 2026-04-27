import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View,
} from 'react-native';
import { categoryPalette, theme } from '../theme';
import type { ProductCategory, PromptShortcut, QuickFilter, QuickFilterId } from '../types';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const animatePanel = () => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

function VoicePulse({ active }: { active: boolean }) {
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (active) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.25, duration: 700, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    } else { pulse.setValue(1); }
  }, [active, pulse]);
  if (!active) return null;
  return (
    <Animated.View
      style={[styles.voicePulseRing, {
        transform: [{ scale: pulse }],
        opacity: pulse.interpolate({ inputRange: [1, 1.25], outputRange: [0.5, 0] }),
      }]}
    />
  );
}

interface FilterPanelProps {
  categories: readonly ('All' | ProductCategory)[];
  isPending: boolean;
  promptShortcuts: PromptShortcut[];
  quickFilters: QuickFilter[];
  resultsLabel: string;
  searchQuery: string;
  selectedCategory: 'All' | ProductCategory;
  selectedQuickFilter: QuickFilterId | null;
  voiceTranscript: string;
  onCategoryPress: (category: 'All' | ProductCategory) => void;
  onQuickFilterPress: (quickFilterId: QuickFilterId) => void;
  onResetFilters: () => void;
  onSearchChange: (text: string) => void;
  onVoicePromptPress: (prompt: PromptShortcut) => void;
}

export function FilterPanel({
  categories, isPending, promptShortcuts, quickFilters, resultsLabel,
  searchQuery, selectedCategory, selectedQuickFilter, voiceTranscript,
  onCategoryPress, onQuickFilterPress, onResetFilters, onSearchChange, onVoicePromptPress,
}: FilterPanelProps) {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isVoiceTrayOpen, setIsVoiceTrayOpen] = useState(false);
  const trimmedSearchQuery = searchQuery.trim();
  const selectedQuickFilterLabel = quickFilters.find((f) => f.id === selectedQuickFilter)?.label ?? 'All filters';
  const selectedCategoryLabel = selectedCategory === 'All' ? 'All categories' : selectedCategory;
  const activeFilters = [
    trimmedSearchQuery ? `Search: ${trimmedSearchQuery}` : null,
    selectedCategory !== 'All' ? `Category: ${selectedCategory}` : null,
    selectedQuickFilter ? `Filter: ${selectedQuickFilterLabel}` : null,
    voiceTranscript ? `Voice: ${voiceTranscript}` : null,
  ].filter(Boolean) as string[];

  const toggleCategoryMenu = () => { animatePanel(); setIsCategoryMenuOpen((v) => !v); };
  const toggleVoiceTray = () => { animatePanel(); setIsVoiceTrayOpen((v) => !v); };
  const handleCategorySelection = (cat: 'All' | ProductCategory) => {
    animatePanel(); onCategoryPress(cat); setIsCategoryMenuOpen(false);
  };

  return (
    <View style={styles.panel}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.sectionLabel}>Product Search</Text>
          <Text style={styles.sectionTitle}>Filter Kandy lifestyle finds</Text>
        </View>
        {activeFilters.length > 0 ? (
          <Pressable
            accessibilityLabel="Clear all search and product filters"
            accessibilityRole="button"
            hitSlop={8}
            onPress={onResetFilters}
            style={styles.clearButton}
          >
            <Ionicons color={theme.colors.ink} name="close-circle-outline" size={14} />
            <Text style={styles.clearButtonText}>Clear</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.controlRow}>
        <View style={styles.searchShell}>
          <View style={styles.searchIcon}>
            <Ionicons color={theme.colors.jade} name="search-outline" size={18} />
          </View>
          <TextInput
            accessibilityLabel="Search products"
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            onChangeText={onSearchChange}
            placeholder="Search tea, jewelry, spices, or batik..."
            placeholderTextColor="#93A095"
            returnKeyType="search"
            selectionColor={theme.colors.gold}
            style={styles.input}
            value={searchQuery}
          />
        </View>
        <View style={styles.voiceButtonWrapper}>
          <VoicePulse active={isVoiceTrayOpen} />
          <Pressable
            accessibilityLabel={isVoiceTrayOpen ? 'Close voice prompt shortcuts' : 'Open voice prompt shortcuts'}
            accessibilityRole="button"
            hitSlop={8}
            onPress={toggleVoiceTray}
            style={[styles.voiceButton, isVoiceTrayOpen && styles.voiceButtonActive]}
          >
            <Ionicons color={isVoiceTrayOpen ? '#FFF' : theme.colors.ink} name={isVoiceTrayOpen ? 'mic' : 'mic-outline'} size={20} />
          </Pressable>
        </View>
      </View>

      <View style={styles.secondaryRow}>
        <Pressable
          accessibilityLabel={`Select product category. Current category is ${selectedCategoryLabel}`}
          accessibilityRole="button"
          hitSlop={8}
          onPress={toggleCategoryMenu}
          style={styles.categoryDropdownTrigger}
        >
          <View style={styles.dropdownCopy}>
            <Text style={styles.dropdownLabel}>Category</Text>
            <Text style={styles.dropdownValue}>{selectedCategoryLabel}</Text>
          </View>
          <Ionicons color={theme.colors.ink} name={isCategoryMenuOpen ? 'chevron-up' : 'chevron-down'} size={18} />
        </Pressable>
        <View style={styles.summaryPill}>
          <Text style={styles.summaryPillLabel}>Results</Text>
          <Text style={styles.summaryPillValue}>{resultsLabel}</Text>
        </View>
      </View>

      {isCategoryMenuOpen ? (
        <View style={styles.dropdownMenu}>
          {categories.map((category) => {
            const active = selectedCategory === category;
            const palette = category === 'All' ? { accent: theme.colors.gold, textColor: theme.colors.ink } : categoryPalette[category];
            return (
              <Pressable
                accessibilityLabel={`Filter by ${category === 'All' ? 'all categories' : category}`}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                key={category}
                onPress={() => handleCategorySelection(category)}
                style={[styles.dropdownItem, active && styles.dropdownItemActive]}
              >
                <View style={styles.dropdownItemLeft}>
                  <View style={[styles.dropdownAccent, { backgroundColor: palette.accent }]} />
                  <Text style={[styles.dropdownItemText, { color: palette.textColor }]}>{category}</Text>
                </View>
                {active ? <Ionicons color={theme.colors.forestSoft} name="checkmark-circle" size={20} /> : null}
              </Pressable>
            );
          })}
        </View>
      ) : null}

      <View style={styles.filterGrid}>
        {quickFilters.map((filter) => {
          const active = selectedQuickFilter === filter.id;
          return (
            <Pressable
              accessibilityLabel={`Toggle ${filter.label} filter`}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              key={filter.id}
              onPress={() => onQuickFilterPress(filter.id)}
              style={[styles.filterCard, active && styles.filterCardActive]}
            >
              <View style={styles.filterCardHeader}>
                <Text style={[styles.filterCardLabel, active && styles.filterCardLabelActive]}>{filter.label}</Text>
                {active ? <Ionicons color={theme.colors.forestSoft} name="checkmark-circle" size={16} /> : null}
              </View>
              <Text style={styles.filterCardHint}>{filter.hint}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>{activeFilters.length > 0 ? activeFilters.join('  |  ') : 'All Kandy products are visible'}</Text>
        <Text style={styles.summaryState}>{isPending ? 'Refreshing...' : 'Frontend-only browsing'}</Text>
      </View>

      {isVoiceTrayOpen ? (
        <View style={styles.voiceTray}>
          <View style={styles.voiceTrayHeader}>
            <View style={styles.voiceTrayTitleRow}>
              <Ionicons color={theme.colors.gold} name="mic" size={20} />
              <View>
                <Text style={styles.sectionLabel}>Voice Prompt</Text>
                <Text style={styles.voiceTrayTitle}>Tap a sample phrase for this build</Text>
              </View>
            </View>
            <Text style={styles.voiceTrayHint}>Live speech capture is not wired in this frontend-only version.</Text>
          </View>
          {voiceTranscript ? (
            <View style={styles.transcriptCard}>
              <View style={styles.transcriptHeader}>
                <Ionicons color={theme.colors.forestSoft} name="chatbubble-ellipses-outline" size={14} />
                <Text style={styles.transcriptLabel}>Transcript</Text>
              </View>
              <Text style={styles.transcriptText}>{voiceTranscript}</Text>
            </View>
          ) : null}
          <View style={styles.promptRow}>
            {promptShortcuts.map((prompt) => (
              <Pressable
                accessibilityLabel={`Apply voice prompt: ${prompt.chipLabel}`}
                accessibilityRole="button"
                key={prompt.chipLabel}
                onPress={() => onVoicePromptPress(prompt)}
                style={styles.promptChip}
              >
                <Ionicons color={theme.colors.gold} name="chatbubble-outline" size={14} />
                <Text style={styles.promptChipText}>{prompt.chipLabel}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { backgroundColor: 'rgba(255,252,245,0.96)', borderColor: 'rgba(229,216,196,0.56)', borderRadius: theme.radii.large, borderWidth: 1, gap: theme.spacing.lg, paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.xl, ...theme.shadows.card },
  headerRow: { alignItems: 'center', flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  sectionLabel: { color: theme.colors.muted, fontFamily: theme.fonts.bodySemi, fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase' },
  sectionTitle: { color: theme.colors.ink, fontFamily: theme.fonts.bodyBold, fontSize: 17, marginTop: 4 },
  clearButton: { alignItems: 'center', backgroundColor: 'rgba(24,48,39,0.06)', borderRadius: 999, flexDirection: 'row', gap: 4, paddingHorizontal: 12, paddingVertical: 8 },
  clearButtonText: { color: theme.colors.ink, fontFamily: theme.fonts.bodySemi, fontSize: 12 },
  controlRow: { alignItems: 'center', flexDirection: 'row', gap: 12 },
  searchShell: { alignItems: 'center', backgroundColor: theme.colors.ivory, borderColor: 'rgba(28,55,44,0.08)', borderRadius: 24, borderWidth: 1, flex: 1, flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12 },
  searchIcon: { marginRight: 10 },
  input: { color: theme.colors.ink, flex: 1, fontFamily: theme.fonts.bodyRegular, fontSize: 14, paddingVertical: 4 },
  voiceButtonWrapper: { alignItems: 'center', justifyContent: 'center' },
  voicePulseRing: { backgroundColor: 'rgba(212,164,91,0.3)', borderRadius: 999, height: 54, position: 'absolute', width: 54 },
  voiceButton: { alignItems: 'center', backgroundColor: 'rgba(212,164,91,0.16)', borderColor: 'rgba(212,164,91,0.18)', borderRadius: 22, borderWidth: 1, height: 50, justifyContent: 'center', width: 50 },
  voiceButtonActive: { backgroundColor: theme.colors.gold, borderColor: theme.colors.gold },
  secondaryRow: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryDropdownTrigger: { alignItems: 'center', backgroundColor: theme.colors.ivory, borderColor: 'rgba(24,48,39,0.08)', borderRadius: 22, borderWidth: 1, flex: 1, flexDirection: 'row', justifyContent: 'space-between', minWidth: 190, paddingHorizontal: 14, paddingVertical: 12 },
  dropdownCopy: { gap: 2 },
  dropdownLabel: { color: theme.colors.muted, fontFamily: theme.fonts.bodySemi, fontSize: 11, letterSpacing: 1.1, textTransform: 'uppercase' },
  dropdownValue: { color: theme.colors.ink, fontFamily: theme.fonts.bodyBold, fontSize: 14 },
  summaryPill: { backgroundColor: 'rgba(76,122,101,0.1)', borderRadius: 20, minWidth: 122, paddingHorizontal: 14, paddingVertical: 11 },
  summaryPillLabel: { color: theme.colors.forestSoft, fontFamily: theme.fonts.bodySemi, fontSize: 10, letterSpacing: 1.1, marginBottom: 2, textTransform: 'uppercase' },
  summaryPillValue: { color: theme.colors.ink, fontFamily: theme.fonts.bodyBold, fontSize: 14 },
  dropdownMenu: { backgroundColor: theme.colors.ivory, borderColor: 'rgba(24,48,39,0.08)', borderRadius: 24, borderWidth: 1, overflow: 'hidden' },
  dropdownItem: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
  dropdownItemActive: { backgroundColor: 'rgba(42,88,74,0.08)' },
  dropdownItemLeft: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  dropdownAccent: { borderRadius: 999, height: 10, width: 10 },
  dropdownItemText: { fontFamily: theme.fonts.bodySemi, fontSize: 14 },
  filterGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  filterCard: { backgroundColor: theme.colors.parchment, borderColor: 'rgba(24,48,39,0.06)', borderRadius: 22, borderWidth: 1, minWidth: 148, paddingHorizontal: 14, paddingVertical: 12, width: '48%' },
  filterCardActive: { backgroundColor: 'rgba(42,88,74,0.12)', borderColor: 'rgba(42,88,74,0.22)' },
  filterCardHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  filterCardLabel: { color: theme.colors.ink, fontFamily: theme.fonts.bodyBold, fontSize: 14 },
  filterCardLabelActive: { color: theme.colors.forestSoft },
  filterCardHint: { color: theme.colors.muted, fontFamily: theme.fonts.bodyRegular, fontSize: 12, lineHeight: 18 },
  summaryRow: { gap: 6 },
  summaryText: { color: theme.colors.ink, fontFamily: theme.fonts.body, fontSize: 13, lineHeight: 20 },
  summaryState: { color: theme.colors.muted, fontFamily: theme.fonts.bodyRegular, fontSize: 12 },
  voiceTray: { backgroundColor: 'rgba(255,249,240,0.96)', borderColor: 'rgba(24,48,39,0.08)', borderRadius: 24, borderWidth: 1, gap: 14, paddingHorizontal: 14, paddingVertical: 14 },
  voiceTrayHeader: { gap: 8 },
  voiceTrayTitleRow: { alignItems: 'center', flexDirection: 'row', gap: 12 },
  voiceTrayTitle: { color: theme.colors.ink, fontFamily: theme.fonts.bodyBold, fontSize: 15, marginTop: 2 },
  voiceTrayHint: { color: theme.colors.muted, fontFamily: theme.fonts.bodyRegular, fontSize: 12, lineHeight: 18 },
  transcriptCard: { backgroundColor: theme.colors.ivory, borderRadius: 20, gap: 6, paddingHorizontal: 14, paddingVertical: 12 },
  transcriptHeader: { alignItems: 'center', flexDirection: 'row', gap: 8 },
  transcriptLabel: { color: theme.colors.muted, fontFamily: theme.fonts.bodySemi, fontSize: 10, letterSpacing: 1.1, textTransform: 'uppercase' },
  transcriptText: { color: theme.colors.ink, fontFamily: theme.fonts.bodyBold, fontSize: 13, lineHeight: 19 },
  promptRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  promptChip: { alignItems: 'center', backgroundColor: 'rgba(212,164,91,0.12)', borderRadius: 999, flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 12 },
  promptChipText: { color: theme.colors.ink, fontFamily: theme.fonts.bodySemi, fontSize: 12 },
});
