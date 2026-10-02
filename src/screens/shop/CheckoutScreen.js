import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { placeDemoOrder } from '../../store/slices/cartSlice';
import { calculateCart } from '../../utils/cart';
import { borderRadius, colors, spacing, typography } from '../../utils/theme';

const CheckoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const summary = calculateCart(items);
  const [payment, setPayment] = useState('UPI');
  const format = (amount) => '₹' + amount.toFixed(0);
  const placeOrder = () => {
    if (!items.length) { Alert.alert('Your bag is empty', 'Add an item before checking out.'); return; }
    dispatch(placeDemoOrder({ id: 'QB' + Date.now().toString().slice(-6), items, total: summary.total, address: 'Home · Indiranagar, Bengaluru', payment, placedAt: new Date().toISOString() }));
    navigation.replace('OrderTracking');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>ALMOST THERE</Text><Text style={styles.title}>Checkout</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery address</Text>
          <View style={styles.addressCard}><View style={styles.addressIcon}><Ionicons name="home" size={19} color={colors.accent} /></View><View style={{ flex: 1 }}><Text style={styles.addressName}>Home</Text><Text style={styles.addressText}>Indiranagar, Bengaluru</Text><Text style={styles.addressHint}>Sample address for this demo</Text></View><Ionicons name="checkmark-circle" size={22} color={colors.accent} /></View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment method</Text>
          {['UPI', 'Cash on delivery'].map((method) => <TouchableOpacity key={method} accessibilityRole="radio" accessibilityState={{ selected: payment === method }} onPress={() => setPayment(method)} style={[styles.paymentRow, payment === method && styles.paymentSelected]}><Ionicons name={method === 'UPI' ? 'phone-portrait-outline' : 'cash-outline'} size={20} color={colors.primary} /><Text style={styles.paymentText}>{method}</Text><Ionicons name={payment === method ? 'radio-button-on' : 'radio-button-off'} size={20} color={colors.accent} /></TouchableOpacity>)}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order summary</Text>
          <View style={styles.summaryCard}>{items.map(({ product, quantity }) => <View key={product.id} style={styles.summaryRow}><Text style={styles.summaryText}>{quantity} × {product.name}</Text><Text style={styles.summaryText}>{format(product.price * quantity)}</Text></View>)}<View style={[styles.summaryRow, styles.grandTotal]}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalLabel}>{format(summary.total)}</Text></View></View>
        </View>
        <View style={styles.demoBanner}><Ionicons name="information-circle-outline" size={18} color={colors.accent} /><Text style={styles.demoText}>This is a portfolio prototype. No real order or payment will be made.</Text></View>
      </ScrollView>
      <View style={styles.footer}><View><Text style={styles.footerLabel}>TOTAL</Text><Text style={styles.footerTotal}>{format(summary.total)}</Text></View><Button title="Place demo order" onPress={placeOrder} style={styles.placeButton} /></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background }, content: { padding: spacing.lg, paddingBottom: spacing.xl }, eyebrow: { color: colors.accent, fontSize: 10, letterSpacing: 1.5, fontWeight: '800', marginTop: spacing.sm }, title: { ...typography.h1, marginTop: 7, marginBottom: spacing.lg }, section: { marginBottom: spacing.lg }, sectionTitle: { ...typography.h3, marginBottom: spacing.sm },
  addressCard: { flexDirection: 'row', alignItems: 'center', gap: 11, backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.accent }, addressIcon: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.accentLight, alignItems: 'center', justifyContent: 'center' }, addressName: { color: colors.text, fontSize: 13, fontWeight: '800' }, addressText: { color: colors.text, fontSize: 12, marginTop: 3 }, addressHint: { color: colors.textSecondary, fontSize: 10, marginTop: 3 },
  paymentRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm }, paymentSelected: { borderColor: colors.accent, backgroundColor: colors.accentLight }, paymentText: { flex: 1, color: colors.text, fontSize: 13, fontWeight: '600' },
  summaryCard: { backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border }, summaryRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingVertical: 7 }, summaryText: { color: colors.textSecondary, fontSize: 12, flexShrink: 1 }, grandTotal: { borderTopWidth: 1, borderTopColor: colors.border, marginTop: 8, paddingTop: 14 }, totalLabel: { color: colors.text, fontSize: 14, fontWeight: '800' },
  demoBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.accentLight, borderRadius: borderRadius.md, padding: spacing.md }, demoText: { flex: 1, color: colors.primary, fontSize: 11, lineHeight: 16 }, footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.white }, footerLabel: { color: colors.textSecondary, fontSize: 9, fontWeight: '800', letterSpacing: 1 }, footerTotal: { color: colors.primary, fontSize: 19, fontWeight: '800', marginTop: 2 }, placeButton: { width: '65%' },
});

export default CheckoutScreen;
