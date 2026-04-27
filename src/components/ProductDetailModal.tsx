import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { categoryPalette, formatPrice, theme } from '../theme';
import type { Product } from '../types';

interface ProductDetailModalProps {
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: () => void;
  product: Product | null;
  visible: boolean;
}

export function ProductDetailModal({
  isFavorite,
  onClose,
  onToggleFavorite,
  product,
  visible,
}: ProductDetailModalProps) {
  const insets = useSafeAreaInsets();

  if (!product) return null;
  const categoryMeta = categoryPalette[product.category];

  return (
    <Modal 
      animationType="slide" 
      transparent 
      visible={visible} 
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <Pressable onPress={onClose} style={styles.dismissArea} />

        <View style={[styles.sheet, { height: '92%', width: '100%' }]}>
          <LinearGradient
            colors={[theme.colors.parchment, theme.colors.ivory]}
            style={styles.sheetGradient}
          >
            {/* Drag handle */}
            <View style={styles.handleBarWrapper}>
              <View style={styles.handleBar} />
            </View>

            {/* Sticky close / favorite bar */}
            <View style={styles.stickyBar}>
              <Pressable onPress={onClose} style={styles.iconButton}>
                <Ionicons color={theme.colors.ink} name="close" size={20} />
              </Pressable>
              <Pressable
                onPress={onToggleFavorite}
                style={[styles.iconButton, isFavorite && styles.iconButtonFav]}
              >
                <Ionicons
                  color={isFavorite ? '#FFF' : theme.colors.ink}
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={20}
                />
              </Pressable>
            </View>

            {/* Entire content scrolls — hero image included */}
            <ScrollView
              bounces
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}
              contentContainerStyle={[
                styles.scrollContent,
                { paddingBottom: Math.max(insets.bottom, 24) + 16 },
              ]}
            >
              {/* Hero image scrolls with content */}
              <View style={styles.heroArea}>
                <Image
                  cachePolicy="memory-disk"
                  contentFit="cover"
                  source={product.image}
                  style={styles.heroImage}
                  transition={260}
                />
                <LinearGradient
                  colors={['transparent', 'rgba(17,39,31,0.35)']}
                  style={styles.heroOverlay}
                />
                <View style={styles.heroRatingChip}>
                  <Ionicons color="#FFFFFF" name="star" size={14} />
                  <Text style={styles.heroRatingText}>{product.rating.toFixed(1)}</Text>
                </View>
              </View>

              {/* Product info */}
              <View style={styles.headerBlock}>
                <View
                  style={[
                    styles.categoryBadge,
                    { backgroundColor: categoryMeta.backgroundColor },
                  ]}
                >
                  <Text
                    style={[styles.categoryBadgeText, { color: categoryMeta.textColor }]}
                  >
                    {product.category}
                  </Text>
                </View>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>{formatPrice(product.price)}</Text>
                <Text style={styles.shortDescription}>{product.shortDescription}</Text>
                <Text style={styles.description}>{product.fullDescription}</Text>
              </View>

              {/* Meta cards */}
              <View style={styles.metaGrid}>
                <View style={styles.metaCard}>
                  <Ionicons color={theme.colors.forestSoft} name="person-outline" size={16} />
                  <Text style={styles.metaLabel}>Maker</Text>
                  <Text style={styles.metaValue}>{product.artisan}</Text>
                </View>
                <View style={styles.metaCard}>
                  <Ionicons color={theme.colors.gold} name="cube-outline" size={16} />
                  <Text style={styles.metaLabel}>Availability</Text>
                  <Text style={styles.metaValue}>{product.stockLabel}</Text>
                </View>
              </View>

              {/* Route note */}
              <View style={styles.routeCard}>
                <View style={styles.routeCardHeader}>
                  <Ionicons color={theme.colors.forestSoft} name="map-outline" size={16} />
                  <Text style={styles.routeCardLabel}>Best after sightseeing</Text>
                </View>
                <Text style={styles.routeCardText}>{product.routeNote}</Text>
              </View>

              {/* Highlights */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Why it stands out</Text>
                {product.highlights.map((h) => (
                  <View key={h} style={styles.bulletRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.bulletText}>{h}</Text>
                  </View>
                ))}
              </View>

              {/* Tags */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Keywords</Text>
                <View style={styles.tagRow}>
                  {product.tags.map((tag) => (
                    <View key={tag} style={styles.tagPill}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* CTA */}
              <Pressable
                onPress={onToggleFavorite}
                style={[styles.ctaButton, isFavorite && styles.ctaButtonActive]}
              >
                <Ionicons
                  color={isFavorite ? '#FFF' : theme.colors.inkInverse}
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={18}
                />
                <Text style={styles.ctaText}>
                  {isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
                </Text>
              </Pressable>
            </ScrollView>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(8, 18, 15, 0.52)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  dismissArea: {
    flex: 1,
  },
  sheet: {
    // maxHeight set dynamically via inline style
  },
  sheetGradient: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    flex: 1,
    overflow: 'hidden',
  },
  handleBarWrapper: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 4,
  },
  handleBar: {
    backgroundColor: 'rgba(24, 48, 39, 0.15)',
    borderRadius: 999,
    height: 5,
    width: 40,
  },
  stickyBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 250, 240, 0.92)',
    borderRadius: 999,
    height: 44,
    justifyContent: 'center',
    width: 44,
    ...theme.shadows.card,
  },
  iconButtonFav: {
    backgroundColor: theme.colors.clay,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: 22,
    // paddingBottom set dynamically via inline style for safe area
  },
  heroArea: {
    borderRadius: 20,
    height: 280,
    marginHorizontal: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    height: '100%',
    width: '100%',
  },
  heroOverlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  heroRatingChip: {
    alignItems: 'center',
    backgroundColor: 'rgba(24, 48, 39, 0.65)',
    borderRadius: 999,
    bottom: 14,
    flexDirection: 'row',
    gap: 5,
    left: 14,
    paddingHorizontal: 12,
    paddingVertical: 7,
    position: 'absolute',
  },
  heroRatingText: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.bodyBold,
    fontSize: 13,
  },
  headerBlock: {
    gap: 10,
    paddingHorizontal: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  categoryBadgeText: {
    fontFamily: theme.fonts.bodySemi,
    fontSize: 11,
  },
  title: {
    color: theme.colors.ink,
    fontFamily: theme.fonts.displayBold,
    fontSize: 34,
    lineHeight: 38,
  },
  price: {
    color: theme.colors.forestSoft,
    fontFamily: theme.fonts.bodyBold,
    fontSize: 22,
  },
  shortDescription: {
    color: theme.colors.ink,
    fontFamily: theme.fonts.body,
    fontSize: 15,
    lineHeight: 23,
  },
  description: {
    color: theme.colors.muted,
    fontFamily: theme.fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 23,
  },
  metaGrid: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
  },
  metaCard: {
    backgroundColor: 'rgba(255, 251, 243, 0.95)',
    borderColor: 'rgba(24, 48, 39, 0.08)',
    borderRadius: 22,
    borderWidth: 1,
    flex: 1,
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  metaLabel: {
    color: theme.colors.muted,
    fontFamily: theme.fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  metaValue: {
    color: theme.colors.ink,
    fontFamily: theme.fonts.bodyBold,
    fontSize: 14,
    lineHeight: 20,
  },
  routeCard: {
    backgroundColor: 'rgba(42, 88, 74, 0.08)',
    borderRadius: 24,
    gap: 8,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  routeCardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  routeCardLabel: {
    color: theme.colors.forestSoft,
    fontFamily: theme.fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  routeCardText: {
    color: theme.colors.ink,
    fontFamily: theme.fonts.body,
    fontSize: 14,
    lineHeight: 22,
  },
  section: {
    gap: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: theme.colors.ink,
    fontFamily: theme.fonts.bodyBold,
    fontSize: 17,
  },
  bulletRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  bulletDot: {
    backgroundColor: theme.colors.gold,
    borderRadius: 999,
    height: 8,
    width: 8,
  },
  bulletText: {
    color: theme.colors.muted,
    flex: 1,
    fontFamily: theme.fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 21,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagPill: {
    backgroundColor: 'rgba(24, 48, 39, 0.05)',
    borderColor: 'rgba(24, 48, 39, 0.08)',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  tagText: {
    color: theme.colors.ink,
    fontFamily: theme.fonts.bodySemi,
    fontSize: 12,
  },
  ctaButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.forestSoft,
    borderRadius: 999,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 4,
    paddingVertical: 16,
    ...theme.shadows.card,
  },
  ctaButtonActive: {
    backgroundColor: theme.colors.clay,
  },
  ctaText: {
    color: theme.colors.inkInverse,
    fontFamily: theme.fonts.bodyBold,
    fontSize: 15,
  },
});
