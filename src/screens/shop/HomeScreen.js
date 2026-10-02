import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import FoodCard from '../../components/FoodCard';
import { categories, menuItems } from '../../data/menu';
import { addToCart, decrementCartItem } from '../../store/slices/cartSlice';
import { borderRadius, colors, spacing, typography } from '../../utils/theme';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const { width } = useWindowDimensions();
  const cardWidth = (width - spacing.lg * 2 - spacing.md) / 2;
  const cartCount = cartItems.reduce((sum, entry) => sum + entry.quantity, 0);
  const visibleItems = useMemo(() => menuItems.filter((item) => {
    const categoryMatch = category === 'All' || item.category === category;
    const queryMatch = (item.name + ' ' + item.category).toLowerCase().includes(query.trim().toLowerCase());
    return categoryMatch && queryMatch;
  }), [category, query]);
  const quantityFor = (id) => cartItems.find((entry) => entry.product.id === id)?.quantity || 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.brand}>quickbite</Text>
        <View style={styles.topRow}><View><Text style={styles.eyebrow}>DELIVERING TO</Text><View style={styles.location}><Ionicons name="location" size={15} color={colors.accent} /><Text style={styles.locationText}>Indiranagar, Bengaluru</Text></View></View><View style={styles.etaPill}><Ionicons name="flash" size={14} color={colors.warning} /><Text style={styles.etaPillText}>12–18 min</Text></View></View>
        <Text style={styles.greeting}>A little joy,{"\n"}on its way.</Text>
        <Text style={styles.subtitle}>Fresh favourites for whatever you’re craving.</Text>
        <View style={styles.searchBox}><Ionicons name="search" size={19} color={colors.textSecondary} /><TextInput accessibilityLabel="Search menu" style={styles.searchInput} placeholder="Search meals, snacks, drinks" placeholderTextColor={colors.textSecondary} value={query} onChangeText={setQuery} returnKeyType="search" />{query.length > 0 && <TouchableOpacity accessibilityLabel="Clear search" onPress={() => setQuery('')}><Ionicons name="close-circle" size={19} color={colors.textSecondary} /></TouchableOpacity>}</View>
        <TouchableOpacity style={styles.hero} activeOpacity={0.9} onPress={() => setCategory('Meals')}><View style={styles.heroCopy}><Text style={styles.heroTag}>YOUR QUICK LUNCH BREAK</Text><Text style={styles.heroTitle}>Good food.{"\n"}No long wait.</Text><Text style={styles.heroSub}>Small-batch favourites, made nearby.</Text><View style={styles.heroCta}><Text style={styles.heroCtaText}>Explore meals</Text><Ionicons name="arrow-forward" size={15} color={colors.white} /></View></View><Text style={styles.heroEmoji}>🥗</Text><View style={styles.heroOrb} /></TouchableOpacity>
        <View style={styles.sectionHeader}><View><Text style={styles.sectionTitle}>What sounds good?</Text><Text style={styles.sectionSubtitle}>A few good things, made fresh</Text></View><TouchableOpacity accessibilityRole="button" accessibilityLabel={'Open cart, ' + cartCount + ' items'} style={styles.cartIcon} onPress={() => navigation.navigate('Cart')}><Ionicons name="bag-outline" size={21} color={colors.primary} />{cartCount > 0 && <View style={styles.cartDot}><Text style={styles.cartDotText}>{cartCount}</Text></View>}</TouchableOpacity></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>{categories.map((name) => <TouchableOpacity key={name} onPress={() => setCategory(name)} style={[styles.categoryChip, category === name && styles.categoryChipActive]}><Text style={[styles.categoryText, category === name && styles.categoryTextActive]}>{name}</Text></TouchableOpacity>)}</ScrollView>
        <View style={styles.grid}>{visibleItems.map((item) => <FoodCard key={item.id} item={item} width={cardWidth} quantity={quantityFor(item.id)} onPress={() => navigation.navigate('FoodDetail', { itemId: item.id })} onAdd={() => dispatch(addToCart(item))} onIncrement={() => dispatch(addToCart(item))} onDecrement={() => dispatch(decrementCartItem(item.id))} />)}</View>
        {visibleItems.length === 0 && <View style={styles.empty}><Text style={styles.emptyEmoji}>🔎</Text><Text style={styles.emptyTitle}>Nothing on the menu yet</Text><Text style={styles.emptyText}>Try another dish or category.</Text></View>}
        <Text style={styles.disclaimer}>A portfolio demo · Menu and delivery times are sample data</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background }, content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }, topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: spacing.sm }, eyebrow: { color: colors.textSecondary, fontSize: 9, fontWeight: '800', letterSpacing: 1.5 }, location: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }, locationText: { color: colors.text, fontSize: 13, fontWeight: '700' }, etaPill: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.white, borderRadius: borderRadius.round, paddingHorizontal: 11, paddingVertical: 8, borderWidth: 1, borderColor: colors.border }, etaPillText: { color: colors.primary, fontSize: 11, fontWeight: '800' },
  greeting: { ...typography.h1, fontSize: 34, lineHeight: 38, marginTop: spacing.xl, letterSpacing: -1 }, subtitle: { ...typography.bodySmall, marginTop: 7, marginBottom: spacing.lg }, searchBox: { height: 50, backgroundColor: colors.white, borderColor: colors.border, borderWidth: 1, borderRadius: borderRadius.md, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14 }, searchInput: { flex: 1, color: colors.text, fontSize: 14 },
  hero: { minHeight: 172, marginTop: spacing.lg, borderRadius: borderRadius.lg, backgroundColor: colors.primary, padding: spacing.lg, overflow: 'hidden', flexDirection: 'row', alignItems: 'center' }, heroCopy: { flex: 1, zIndex: 2 }, heroTag: { color: '#C4E3C9', fontSize: 9, fontWeight: '800', letterSpacing: 1.2 }, heroTitle: { color: colors.white, fontSize: 25, fontWeight: '800', lineHeight: 28, marginTop: 8 }, heroSub: { color: '#D7E5D8', fontSize: 11, marginTop: 7 }, heroCta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 13 }, heroCtaText: { color: colors.white, fontSize: 12, fontWeight: '800' }, heroEmoji: { fontSize: 63, zIndex: 1, marginRight: 3 }, heroOrb: { position: 'absolute', width: 150, height: 150, borderRadius: 75, backgroundColor: '#2A6242', right: -24, top: 10 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.xl, marginBottom: spacing.md }, sectionTitle: { ...typography.h2, fontSize: 20 }, sectionSubtitle: { ...typography.caption, marginTop: 3 }, cartIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border }, cartDot: { position: 'absolute', top: -3, right: -3, backgroundColor: colors.accent, minWidth: 17, height: 17, borderRadius: 9, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 }, cartDotText: { color: colors.white, fontSize: 9, fontWeight: '800' }, categories: { gap: 8, paddingBottom: spacing.md }, categoryChip: { paddingHorizontal: 15, paddingVertical: 9, borderRadius: borderRadius.round, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border }, categoryChipActive: { backgroundColor: colors.primary, borderColor: colors.primary }, categoryText: { color: colors.textSecondary, fontSize: 12, fontWeight: '700' }, categoryTextActive: { color: colors.white }, grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }, empty: { alignItems: 'center', paddingVertical: spacing.xxl }, emptyEmoji: { fontSize: 36 }, emptyTitle: { ...typography.h3, marginTop: 10 }, emptyText: { ...typography.bodySmall, marginTop: 4 }, disclaimer: { ...typography.caption, textAlign: 'center', marginTop: spacing.sm },
});

export default HomeScreen;
