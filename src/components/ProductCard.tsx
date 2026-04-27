import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { categoryPalette, formatPrice, theme } from '../theme';
import type { Product } from '../types';

interface ProductCardProps {
  index: number;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  product: Product;
}

export function ProductCard({
  index,
  isFavorite,
  onPress,
  onToggleFavorite,
  product,
}: ProductCardProps) {
  const entryAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(entryAnim, {
      duration: 480,
      delay: 60 + Math.min(index, 5) * 45,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [entryAnim, index]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 48,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 28,
      bounciness: 6,
    }).start();
  };

  const categoryMeta = categoryPalette[product.category];

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity: entryAnim,
          transform: [
            {
              translateY: entryAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [22, 0],
              }),
            },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
      >
        <View style={styles.mediaShell}>
          <Image
            cachePolicy="memory-disk"
            contentFit="cover"
            source={product.image}
            style={styles.image}
            transition={280}
          />
          <LinearGradient
            colors={['transparent', 'rgba(16, 29, 24, 0.32)']}
            style={styles.imageOverlay}
          />

          <View style={styles.topActions}>
            <View style={[styles.ratingChip, { backgroundColor: `${product.accentColor}DD` }]}>
              <Ionicons color="#FFFFFF" name="star" size={13} />
              <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
            </View>

            <Pressable
              onPress={(event) => {
                event.stopPropagation();
                onToggleFavorite();
              }}
              style={[
                styles.favoriteButton,
                isFavorite && styles.favoriteButtonActive,
              ]}
            >
              <Ionicons
                color={isFavorite ? '#FFFFFF' : theme.colors.ink}
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={18}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.categoryRow}>
            <Text
              style={[
                styles.categoryBadge,
                {
                  backgroundColor: categoryMeta.backgroundColor,
                  color: categoryMeta.textColor,
                },
              ]}
            >
              {product.category}
            </Text>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
          </View>

          <Text numberOfLines={2} style={styles.title}>
            {product.name}
          </Text>
          <Text numberOfLines={2} style={styles.description}>
            {product.shortDescription}
          </Text>

          <View style={styles.divider} />

          <View style={styles.footerRow}>
            <View style={styles.artisanRow}>
              <View style={styles.artisanDot} />
              <Text numberOfLines={1} style={styles.metaLabel}>{product.artisan}</Text>
            </View>
            <View style={styles.detailHint}>
              <Text style={styles.detailHintText}>Details</Text>
              <Ionicons color={theme.colors.forestSoft} name="arrow-forward" size={14} />
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  card: {
    backgroundColor: theme.opacity.glassCard,
    borderRadius: 24,
    overflow: 'hidden',
    ...theme.shadows.card,
  },
  mediaShell: {
    height: 200,
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageOverlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  topActions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: theme.spacing.md,
    position: 'absolute',
    right: theme.spacing.md,
    top: theme.spacing.md,
  },
  ratingChip: {
    alignItems: 'center',
    borderRadius: 999,
    flexDirection: 'row',
    gap: theme.spacing.xs,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ratingText: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.bodyBold,
    fontSize: theme.typography.caption,
  },
  favoriteButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 250, 240, 0.92)',
    borderRadius: 999,
    height: 38,
    justifyContent: 'center',
    width: 38,
    ...theme.shadows.card,
  },
  favoriteButtonActive: {
    backgroundColor: theme.colors.clay,
  },
  body: {
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  categoryRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryBadge: {
    borderRadius: 999,
    fontFamily: theme.fonts.bodySemi,
    fontSize: theme.typography.caption,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  price: {
    color: theme.colors.ink,
    fontFamily: theme.fonts.bodyBold,
    fontSize: theme.typography.headline,
  },
  title: {
    color: theme.colors.ink,
    fontFamily: theme.fonts.displayBold,
    fontSize: theme.typography.title3,
    lineHeight: 24,
  },
  description: {
    color: theme.colors.muted,
    fontFamily: theme.fonts.bodyRegular,
    fontSize: theme.typography.body,
    lineHeight: 21,
  },
  divider: {
    backgroundColor: 'rgba(24, 48, 39, 0.06)',
    height: 1,
    marginVertical: theme.spacing.xs,
    width: '100%',
  },
  footerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    justifyContent: 'space-between',
  },
  artisanRow: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  artisanDot: {
    backgroundColor: theme.colors.gold,
    borderRadius: 999,
    height: 6,
    width: 6,
  },
  metaLabel: {
    color: theme.colors.muted,
    flex: 1,
    fontFamily: theme.fonts.bodySemi,
    fontSize: theme.typography.footnote,
  },
  detailHint: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  detailHintText: {
    color: theme.colors.forestSoft,
    fontFamily: theme.fonts.bodySemi,
    fontSize: theme.typography.footnote,
  },
});
