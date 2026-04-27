import { useDeferredValue, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import {
  CormorantGaramond_400Regular,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from '@expo-google-fonts/cormorant-garamond';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { AppHeader } from './src/components/AppHeader';
import { EmptyState } from './src/components/EmptyState';
import { FeaturedAttractions } from './src/components/FeaturedAttractions';
import { FilterPanel } from './src/components/FilterPanel';
import { HeroCard } from './src/components/HeroCard';
import { LoadingState } from './src/components/LoadingState';
import { ProductCard } from './src/components/ProductCard';
import { ProductDetailModal } from './src/components/ProductDetailModal';
import { ProductGridSkeleton } from './src/components/ProductGridSkeleton';
import {
  CATEGORY_ORDER,
  FEATURED_ATTRACTIONS,
  HERO_STATS,
  PRODUCT_PAGE_SIZE,
  PROMPT_SHORTCUTS,
  QUICK_FILTERS,
  fetchProductsPage,
} from './src/data/products';
import { theme } from './src/theme';
import type { Product, ProductCategory, PromptShortcut, QuickFilterId } from './src/types';

const triggerSelection = () => {
  void Haptics.selectionAsync().catch(() => null);
};

const triggerSoftImpact = () => {
  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => null);
};

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
    CormorantGaramond_400Regular,
    CormorantGaramond_600SemiBold,
    CormorantGaramond_700Bold,
  });
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<Product> | null>(null);
  const isFetchingMoreRef = useRef(false);
  const productRequestIdRef = useRef(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProductCategory>('All');
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<QuickFilterId | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [nextCursor, setNextCursor] = useState<number | null>(0);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([
    'moonstone-pendant',
    'ceylon-tea-box',
  ]);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isBootLoading, setIsBootLoading] = useState(true);
  const [isInitialProductsLoading, setIsInitialProductsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const deferredQuery = useDeferredValue(searchQuery.trim().toLowerCase());
  const previousFilterStateRef = useRef({
    category: selectedCategory,
    quickFilterId: selectedQuickFilter,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsBootLoading(false);
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const requestId = productRequestIdRef.current + 1;
    const shouldResetScroll =
      previousFilterStateRef.current.category !== selectedCategory ||
      previousFilterStateRef.current.quickFilterId !== selectedQuickFilter;

    previousFilterStateRef.current = {
      category: selectedCategory,
      quickFilterId: selectedQuickFilter,
    };

    productRequestIdRef.current = requestId;
    setIsInitialProductsLoading(true);
    setIsFetchingMore(false);
    isFetchingMoreRef.current = false;
    setVisibleProducts([]);
    setTotalProducts(0);
    setNextCursor(0);
    setSelectedProduct(null);

    if (shouldResetScroll) {
      listRef.current?.scrollToOffset({ animated: false, offset: 0 });
    }

    let isActive = true;

    const loadInitialProducts = async () => {
      const page = await fetchProductsPage({
        category: selectedCategory,
        cursor: 0,
        pageSize: PRODUCT_PAGE_SIZE,
        quickFilterId: selectedQuickFilter,
        searchQuery: deferredQuery,
      });

      if (!isActive || requestId !== productRequestIdRef.current) {
        return;
      }

      setVisibleProducts(page.items);
      setTotalProducts(page.total);
      setNextCursor(page.nextCursor);
      setIsInitialProductsLoading(false);
    };

    void loadInitialProducts();

    return () => {
      isActive = false;
    };
  }, [deferredQuery, selectedCategory, selectedQuickFilter]);

  const handleSearchChange = (text: string) => {
    if (voiceTranscript) {
      setVoiceTranscript('');
    }

    setSearchQuery(text);
  };

  const handleCategoryPress = (category: 'All' | ProductCategory) => {
    triggerSelection();
    setSelectedCategory(category);
  };

  const handleQuickFilterPress = (quickFilterId: QuickFilterId) => {
    triggerSelection();
    setSelectedQuickFilter((currentFilter) =>
      currentFilter === quickFilterId ? null : quickFilterId,
    );
  };

  const handleCardPress = (product: Product) => {
    triggerSoftImpact();
    setSelectedProduct(product);
  };

  const toggleFavorite = (productId: string) => {
    triggerSelection();
    setFavoriteIds((currentFavorites) =>
      currentFavorites.includes(productId)
        ? currentFavorites.filter((id) => id !== productId)
        : [...currentFavorites, productId],
    );
  };

  const resetFilters = () => {
    triggerSelection();
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedQuickFilter(null);
    setVoiceTranscript('');
  };

  const handleVoicePromptPress = (prompt: PromptShortcut) => {
    triggerSoftImpact();
    setVoiceTranscript(prompt.spokenText);
    setSelectedCategory(prompt.category ?? 'All');
    setSelectedQuickFilter(prompt.quickFilter ?? null);
    setSearchQuery(prompt.query);
  };

  const handleBrowsePress = () => {
    triggerSoftImpact();
    listRef.current?.scrollToOffset({
      animated: true,
      offset: width >= 880 ? 900 : 720,
    });
  };

  const loadMoreProducts = async () => {
    if (isInitialProductsLoading || isFetchingMoreRef.current || nextCursor === null) {
      return;
    }

    const requestId = productRequestIdRef.current;

    isFetchingMoreRef.current = true;
    setIsFetchingMore(true);

    try {
      const page = await fetchProductsPage({
        category: selectedCategory,
        cursor: nextCursor,
        pageSize: PRODUCT_PAGE_SIZE,
        quickFilterId: selectedQuickFilter,
        searchQuery: deferredQuery,
      });

      if (requestId !== productRequestIdRef.current) {
        return;
      }

      setVisibleProducts((currentProducts) => [...currentProducts, ...page.items]);
      setNextCursor(page.nextCursor);
      setTotalProducts(page.total);
    } finally {
      if (requestId === productRequestIdRef.current) {
        isFetchingMoreRef.current = false;
        setIsFetchingMore(false);
      }
    }
  };

  const hasMoreProducts = nextCursor !== null;
  const resultsLabel = isInitialProductsLoading
    ? 'Loading products...'
    : `${totalProducts} ${totalProducts === 1 ? 'product' : 'products'}`;
  const loadedLabel =
    isInitialProductsLoading
      ? 'Loading...'
      : totalProducts === 0
        ? '0 loaded'
        : `${visibleProducts.length} of ${totalProducts} loaded`;
  const numColumns = width >= 1080 ? 3 : width >= 560 ? 2 : 1;

  if (!fontsLoaded || isBootLoading) {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <LoadingState />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={[theme.colors.canopy, theme.colors.forest, theme.colors.cream]}
        locations={[0, 0.36, 1]}
        style={styles.screen}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <StatusBar style="light" />
          <FlatList
            ref={listRef}
            data={visibleProducts}
            key={numColumns}
            initialNumToRender={Math.max(4, numColumns * 4)}
            maxToRenderPerBatch={Math.max(6, numColumns * 5)}
            numColumns={numColumns}
            onEndReached={() => {
              void loadMoreProducts();
            }}
            onEndReachedThreshold={0.35}
            keyExtractor={(item) => item.id}
            removeClippedSubviews
            showsVerticalScrollIndicator={false}
            updateCellsBatchingPeriod={60}
            windowSize={9}
            contentContainerStyle={styles.contentContainer}
            columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
            ListHeaderComponent={
              <View style={styles.headerStack}>
                <AppHeader favoriteCount={favoriteIds.length} />
                <HeroCard
                  favoriteCount={favoriteIds.length}
                  onBrowsePress={handleBrowsePress}
                  resultCount={totalProducts}
                  stats={HERO_STATS}
                />
                <FeaturedAttractions attractions={FEATURED_ATTRACTIONS} />
                <FilterPanel
                  categories={CATEGORY_ORDER}
                  isPending={isInitialProductsLoading || isFetchingMore}
                  promptShortcuts={PROMPT_SHORTCUTS}
                  quickFilters={QUICK_FILTERS}
                  resultsLabel={resultsLabel}
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                  selectedQuickFilter={selectedQuickFilter}
                  voiceTranscript={voiceTranscript}
                  onCategoryPress={handleCategoryPress}
                  onQuickFilterPress={handleQuickFilterPress}
                  onResetFilters={resetFilters}
                  onSearchChange={handleSearchChange}
                  onVoicePromptPress={handleVoicePromptPress}
                />

                <View style={styles.sectionHeadingRow}>
                  <View>
                    <Text style={styles.kicker}>Lifestyle Products</Text>
                    <Text style={styles.sectionTitle}>Curated shopping from Kandy</Text>
                  </View>
                  <View style={styles.summaryPill}>
                    <Text style={styles.summaryPillText}>{loadedLabel}</Text>
                  </View>
                </View>
              </View>
            }
            ListEmptyComponent={
              isInitialProductsLoading ? (
                <ProductGridSkeleton cardCount={Math.max(3, numColumns * 2)} />
              ) : (
                <EmptyState onReset={resetFilters} />
              )
            }
            ListFooterComponent={
              visibleProducts.length > 0 ? (
                <View style={styles.footerStatus}>
                  {isFetchingMore ? (
                    <>
                      <ActivityIndicator color={theme.colors.forestSoft} size="small" />
                      <Text style={styles.footerStatusText}>Loading more products...</Text>
                    </>
                  ) : hasMoreProducts ? (
                    <Text style={styles.footerStatusText}>
                      Scroll to load more curated products
                    </Text>
                  ) : (
                    <Text style={styles.footerStatusText}>All matching products are loaded</Text>
                  )}
                </View>
              ) : null
            }
            renderItem={({ item, index }) => (
              <View style={styles.cardColumn}>
                <ProductCard
                  index={index}
                  isFavorite={favoriteIds.includes(item.id)}
                  onPress={() => handleCardPress(item)}
                  onToggleFavorite={() => toggleFavorite(item.id)}
                  product={item}
                />
              </View>
            )}
          />
        </SafeAreaView>

        <ProductDetailModal
          isFavorite={selectedProduct ? favoriteIds.includes(selectedProduct.id) : false}
          onClose={() => setSelectedProduct(null)}
          onToggleFavorite={() => {
            if (selectedProduct) {
              toggleFavorite(selectedProduct.id);
            }
          }}
          product={selectedProduct}
          visible={selectedProduct !== null}
        />
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 44,
    paddingHorizontal: 18,
  },
  headerStack: {
    gap: 20,
    paddingBottom: 22,
    paddingTop: 6,
  },
  sectionHeadingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  kicker: {
    color: theme.colors.gold,
    fontFamily: theme.fonts.bodySemi,
    fontSize: theme.typography.footnote,
    letterSpacing: 1.8,
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    color: theme.colors.inkInverse,
    fontFamily: theme.fonts.displayBold,
    fontSize: theme.typography.title1,
    lineHeight: 34,
  },
  summaryPill: {
    backgroundColor: 'rgba(255, 252, 245, 0.88)',
    borderColor: 'rgba(226, 201, 156, 0.35)',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  summaryPillText: {
    color: theme.colors.ink,
    fontFamily: theme.fonts.bodySemi,
    fontSize: 12,
  },
  columnWrapper: {
    gap: theme.spacing.lg,
  },
  cardColumn: {
    flex: 1,
    marginBottom: theme.spacing.xl,
  },
  footerStatus: {
    alignItems: 'center',
    gap: 10,
    paddingBottom: 8,
    paddingTop: 6,
  },
  footerStatusText: {
    color: theme.colors.muted,
    fontFamily: theme.fonts.bodySemi,
    fontSize: 12,
    textAlign: 'center',
  },
});
