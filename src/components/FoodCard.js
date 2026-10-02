import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { borderRadius, colors, spacing, typography } from '../utils/theme';

const FoodCard = ({ item, quantity = 0, onPress, onAdd, onIncrement, onDecrement, width }) => (
  <TouchableOpacity
    accessibilityRole="button"
    accessibilityLabel={`${item.name}, ₹${item.price}, ${item.eta}`}
    activeOpacity={0.92}
    onPress={onPress}
    style={[styles.card, width ? { width } : null]}
  >
    <View style={styles.imageWrap}>
      <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" transition={150} />
      <View style={styles.badge}><Text style={styles.badgeText}>{item.badge}</Text></View>
      <View style={styles.eta}><Ionicons name="time-outline" size={12} color={colors.primary} /><Text style={styles.etaText}>{item.eta}</Text></View>
    </View>
    <View style={styles.info}>
      <View style={styles.nameRow}>
        <View style={[styles.vegMark, !item.isVeg && styles.nonVegMark]}><View style={[styles.vegDot, !item.isVeg && styles.nonVegDot]} /></View>
        <Text numberOfLines={2} style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.bottomRow}>
        <View><Text style={styles.price}>₹{item.price}</Text><Text style={styles.rating}>★ {item.rating}</Text></View>
        {quantity === 0 ? (
          <TouchableOpacity accessibilityRole="button" accessibilityLabel={`Add ${item.name} to cart`} style={styles.addButton} onPress={(event) => { event.stopPropagation(); onAdd(); }}>
            <Text style={styles.addText}>ADD</Text><Ionicons name="add" size={15} color={colors.accent} />
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityControl}>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Remove one" onPress={(event) => { event.stopPropagation(); onDecrement(); }}><Ionicons name="remove" size={17} color={colors.accent} /></TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Add one" onPress={(event) => { event.stopPropagation(); onIncrement(); }}><Ionicons name="add" size={17} color={colors.accent} /></TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: borderRadius.md, overflow: 'hidden', marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  imageWrap: { height: 138, backgroundColor: colors.surfaceMuted },
  image: { width: '100%', height: '100%' },
  badge: { position: 'absolute', top: 9, left: 9, backgroundColor: colors.white, paddingHorizontal: 9, paddingVertical: 5, borderRadius: borderRadius.round },
  badgeText: { color: colors.primary, fontSize: 10, fontWeight: '700' },
  eta: { position: 'absolute', right: 8, bottom: 8, flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: colors.white, borderRadius: borderRadius.round, paddingHorizontal: 8, paddingVertical: 5 },
  etaText: { color: colors.primary, fontSize: 10, fontWeight: '700' },
  info: { padding: 11 },
  nameRow: { flexDirection: 'row', alignItems: 'flex-start', minHeight: 40 },
  name: { ...typography.body, flex: 1, fontSize: 13, fontWeight: '700', lineHeight: 17, marginLeft: 6 },
  vegMark: { width: 13, height: 13, borderWidth: 1, borderColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  vegDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent },
  nonVegMark: { borderColor: colors.danger },
  nonVegDot: { backgroundColor: colors.danger },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  price: { color: colors.text, fontSize: 15, fontWeight: '800' },
  rating: { color: colors.textSecondary, fontSize: 10, marginTop: 2 },
  addButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minWidth: 70, paddingHorizontal: 9, height: 34, borderColor: colors.accent, borderWidth: 1, borderRadius: 9 },
  addText: { color: colors.accent, fontSize: 11, fontWeight: '800' },
  quantityControl: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 80, height: 34, backgroundColor: colors.accentLight, borderRadius: 9, paddingHorizontal: 7 },
  quantity: { color: colors.primary, fontWeight: '800', fontSize: 13 },
});

export default FoodCard;
