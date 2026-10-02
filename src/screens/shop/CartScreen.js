import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { addToCart, decrementCartItem, removeFromCart } from '../../store/slices/cartSlice';
import { calculateCart } from '../../utils/cart';
import { borderRadius, colors, spacing, typography } from '../../utils/theme';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const summary = calculateCart(items);
  const format = (amount) => '₹' + amount.toFixed(0);

  if (!items.length) return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.empty}>
        <View style={styles.emptyIcon}><Ionicons name="bag-handle-outline" size={36} color={colors.accent} /></View>
        <Text style={styles.emptyTitle}>Your bag is taking a break</Text>
        <Text style={styles.emptySubtitle}>Add something delicious and it’ll show up here.</Text>
        <Button title="Explore the menu" onPress={() => navigation.navigate('Explore')} style={styles.browseButton} />
      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>YOUR ORDER</Text>
        <Text style={styles.title}>Good choice.</Text>
        <Text style={styles.subtitle}>{items.length} different {items.length === 1 ? 'item' : 'items'} in your bag</Text>
        <View style={styles.itemsCard}>
          {items.map(({ product, quantity }, index) => (
            <View key={product.id} style={[styles.itemRow, index > 0 && styles.itemBorder]}>
              <Image source={{ uri: product.image }} style={styles.image} contentFit="cover" transition={150} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>{product.name}</Text>
                <Text style={styles.itemPrice}>{format(product.price * quantity)}</Text>
                <TouchableOpacity accessibilityRole="button" onPress={() => dispatch(removeFromCart(product.id))}><Text style={styles.remove}>Remove</Text></TouchableOpacity>
              </View>
              <View style={styles.quantity}>
                <TouchableOpacity accessibilityRole="button" accessibilityLabel="Decrease quantity" onPress={() => dispatch(decrementCartItem(product.id))}><Ionicons name="remove" size={16} color={colors.accent} /></TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity accessibilityRole="button" accessibilityLabel="Increase quantity" onPress={() => dispatch(addToCart(product))}><Ionicons name="add" size={16} color={colors.accent} /></TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.addMore} onPress={() => navigation.navigate('Explore')}><Ionicons name="add-circle-outline" size={19} color={colors.accent} /><Text style={styles.addMoreText}>Add something else</Text></TouchableOpacity>
        <View style={styles.bill}>
          <Text style={styles.billTitle}>Bill details</Text>
          <View style={styles.billRow}><Text style={styles.billLabel}>Item total</Text><Text style={styles.billValue}>{format(summary.subtotal)}</Text></View>
          <View style={styles.billRow}><Text style={styles.billLabel}>Delivery fee</Text><Text style={styles.billValue}>{summary.delivery ? format(summary.delivery) : 'FREE'}</Text></View>
          {summary.subtotal < 299 && <Text style={styles.savings}>Add {format(299 - summary.subtotal)} more for free delivery</Text>}
          <View style={[styles.billRow, styles.totalRow]}><Text style={styles.totalLabel}>To pay</Text><Text style={styles.totalValue}>{format(summary.total)}</Text></View>
        </View>
        <Text style={styles.demoNote}>Demo checkout only. No payment will be collected.</Text>
      </ScrollView>
      <View style={styles.footer}>
        <View><Text style={styles.footerLabel}>TOTAL</Text><Text style={styles.footerTotal}>{format(summary.total)}</Text></View>
        <Button title="Continue to checkout" onPress={() => navigation.navigate('Checkout')} style={styles.checkoutButton} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background }, content: { padding: spacing.lg, paddingBottom: spacing.xl },
  eyebrow: { color: colors.accent, fontSize: 10, letterSpacing: 1.5, fontWeight: '800', marginTop: spacing.sm }, title: { ...typography.h1, marginTop: 7 }, subtitle: { ...typography.bodySmall, marginTop: 5 },
  itemsCard: { backgroundColor: colors.white, borderRadius: borderRadius.lg, paddingHorizontal: spacing.md, marginTop: spacing.lg, borderWidth: 1, borderColor: colors.border },
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md }, itemBorder: { borderTopWidth: 1, borderTopColor: colors.border }, image: { width: 68, height: 68, borderRadius: borderRadius.md, backgroundColor: colors.surfaceMuted }, itemInfo: { flex: 1, paddingHorizontal: 11 }, itemName: { color: colors.text, fontSize: 13, fontWeight: '700' }, itemPrice: { color: colors.text, fontSize: 13, fontWeight: '800', marginTop: 4 }, remove: { color: colors.textSecondary, fontSize: 10, marginTop: 4, textDecorationLine: 'underline' },
  quantity: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 76, height: 32, backgroundColor: colors.accentLight, borderRadius: 9, paddingHorizontal: 7 }, quantityText: { color: colors.primary, fontWeight: '800', fontSize: 12 }, addMore: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: spacing.md }, addMoreText: { color: colors.accent, fontSize: 13, fontWeight: '700' },
  bill: { backgroundColor: colors.white, padding: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border }, billTitle: { ...typography.h3, marginBottom: 12 }, billRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 }, billLabel: { color: colors.textSecondary, fontSize: 13 }, billValue: { color: colors.text, fontSize: 13, fontWeight: '600' }, savings: { color: colors.accent, fontSize: 11, fontWeight: '600', marginTop: 5 }, totalRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12, marginTop: 12 }, totalLabel: { color: colors.text, fontSize: 14, fontWeight: '800' }, totalValue: { color: colors.primary, fontSize: 16, fontWeight: '800' }, demoNote: { ...typography.caption, textAlign: 'center', marginTop: spacing.md },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.white }, footerLabel: { color: colors.textSecondary, fontSize: 9, fontWeight: '800', letterSpacing: 1 }, footerTotal: { color: colors.primary, fontSize: 19, fontWeight: '800', marginTop: 2 }, checkoutButton: { width: '68%' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl }, emptyIcon: { width: 78, height: 78, borderRadius: 39, backgroundColor: colors.accentLight, alignItems: 'center', justifyContent: 'center' }, emptyTitle: { ...typography.h2, textAlign: 'center', marginTop: spacing.lg }, emptySubtitle: { ...typography.bodySmall, textAlign: 'center', lineHeight: 20, marginTop: 7 }, browseButton: { width: '100%', marginTop: spacing.lg },
});

export default CartScreen;
