import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { getMenuItem } from '../../data/menu';
import { addToCart } from '../../store/slices/cartSlice';
import { borderRadius, colors, spacing, typography } from '../../utils/theme';

const FoodDetailScreen = ({ route, navigation }) => {
  const item = getMenuItem(route.params?.itemId);
  const dispatch = useDispatch();
  if (!item) return <SafeAreaView style={styles.safe}><Text style={styles.missing}>This menu item is unavailable.</Text></SafeAreaView>;
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" transition={150} />
        <View style={styles.content}>
          <View style={styles.tag}><Text style={styles.tagText}>{item.badge.toUpperCase()}</Text></View>
          <View style={styles.titleRow}><View style={{ flex: 1 }}><Text style={styles.title}>{item.name}</Text><Text style={styles.category}>{item.category} · {item.eta}</Text></View><View style={[styles.vegMark, !item.isVeg && styles.nonVegMark]}><View style={[styles.vegDot, !item.isVeg && styles.nonVegDot]} /></View></View>
          <View style={styles.rating}><Ionicons name="star" size={15} color="#D9952E" /><Text style={styles.ratingText}>{item.rating} · made fresh nearby</Text></View>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.note}><Ionicons name="leaf-outline" size={18} color={colors.accent} /><Text style={styles.noteText}>Made to order with carefully selected ingredients.</Text></View>
        </View>
      </ScrollView>
      <View style={styles.footer}><View><Text style={styles.priceLabel}>ITEM PRICE</Text><Text style={styles.price}>₹{item.price}</Text></View><Button title={'Add to bag · ₹' + item.price} onPress={() => { dispatch(addToCart(item)); navigation.navigate('Shop', { screen: 'Cart' }); }} style={styles.button} /></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background }, image: { width: '100%', height: 300, backgroundColor: colors.surfaceMuted }, content: { padding: spacing.lg }, tag: { alignSelf: 'flex-start', backgroundColor: colors.accentLight, borderRadius: borderRadius.round, paddingHorizontal: 10, paddingVertical: 6 }, tagText: { color: colors.accent, fontSize: 9, fontWeight: '800', letterSpacing: 1 }, titleRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.md }, title: { ...typography.h1, fontSize: 27 }, category: { ...typography.bodySmall, marginTop: 4 }, vegMark: { width: 17, height: 17, borderWidth: 1.5, borderColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }, vegDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent }, nonVegMark: { borderColor: colors.danger }, nonVegDot: { backgroundColor: colors.danger }, rating: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: spacing.md }, ratingText: { color: colors.textSecondary, fontSize: 12, fontWeight: '600' }, description: { color: colors.text, fontSize: 15, lineHeight: 23, marginTop: spacing.lg }, note: { flexDirection: 'row', alignItems: 'center', gap: 9, backgroundColor: colors.accentLight, padding: spacing.md, borderRadius: borderRadius.md, marginTop: spacing.xl }, noteText: { flex: 1, color: colors.primary, fontSize: 12, lineHeight: 18, fontWeight: '600' }, footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.lg, borderTopColor: colors.border, borderTopWidth: 1, backgroundColor: colors.white }, priceLabel: { color: colors.textSecondary, fontSize: 9, fontWeight: '800', letterSpacing: 1 }, price: { color: colors.text, fontSize: 23, fontWeight: '800', marginTop: 2 }, button: { width: '62%' }, missing: { ...typography.body, padding: spacing.lg },
});
export default FoodDetailScreen;
