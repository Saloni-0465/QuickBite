import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { advanceDemoOrder, clearDemoOrder } from '../../store/slices/cartSlice';
import { borderRadius, colors, spacing, typography } from '../../utils/theme';

const steps = [
  { title: 'Order confirmed', detail: 'Your order is with the kitchen.', icon: 'checkmark-circle' },
  { title: 'Being prepared', detail: 'Freshly made, just for you.', icon: 'restaurant' },
  { title: 'On its way', detail: 'Your delivery partner is heading over.', icon: 'bicycle' },
  { title: 'Delivered', detail: 'Time to enjoy your order.', icon: 'home' },
];

const OrderTrackingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.cart.order);
  if (!order) return <SafeAreaView style={styles.safe}><View style={styles.content}><Text style={styles.title}>No active demo order</Text><Button title="Back to menu" onPress={() => navigation.navigate('Shop', { screen: 'Explore' })} /></View></SafeAreaView>;
  const currentStep = order.currentStep;
  const isComplete = currentStep === steps.length - 1;
  const advance = () => {
    if (isComplete) { dispatch(clearDemoOrder()); navigation.navigate('Shop', { screen: 'Explore' }); }
    else dispatch(advanceDemoOrder());
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}><Text style={styles.heroEmoji}>{isComplete ? '🎉' : '🥡'}</Text><Text style={styles.eyebrow}>ORDER {order.id}</Text><Text style={styles.title}>{isComplete ? 'Enjoy every bite.' : 'Good food is on its way.'}</Text><Text style={styles.heroText}>{order.items.reduce((sum, entry) => sum + entry.quantity, 0)} items · ₹{order.total} · Demo order</Text></View>
        <View style={styles.etaCard}><View><Text style={styles.etaLabel}>{isComplete ? 'DELIVERED' : 'ESTIMATED ARRIVAL'}</Text><Text style={styles.eta}>{isComplete ? 'Enjoy!' : '12–18 min'}</Text></View><View style={styles.etaIcon}><Ionicons name={isComplete ? 'checkmark' : 'flash'} size={23} color={colors.accent} /></View></View>
        <View style={styles.timeline}>
          {steps.map((step, index) => {
            const complete = index <= currentStep;
            const active = index === currentStep;
            return <View key={step.title} style={styles.stepRow}>
              <View style={styles.rail}>{index > 0 && <View style={[styles.lineTop, index <= currentStep && styles.lineDone]} />}<View style={[styles.stepIcon, complete && styles.stepIconDone, active && styles.stepIconActive]}><Ionicons name={step.icon} size={16} color={complete ? colors.white : colors.textSecondary} /></View>{index < steps.length - 1 && <View style={[styles.lineBottom, index < currentStep && styles.lineDone]} />}</View>
              <View style={styles.stepCopy}><Text style={[styles.stepTitle, active && styles.stepTitleActive]}>{step.title}</Text><Text style={styles.stepDetail}>{step.detail}</Text></View>
            </View>;
          })}
        </View>
        <View style={styles.address}><Ionicons name="location-outline" size={19} color={colors.accent} /><View><Text style={styles.addressLabel}>DELIVERING TO</Text><Text style={styles.addressText}>{order.address}</Text></View></View>
        <Text style={styles.demoDisclaimer}>Status updates are simulated for this portfolio demo.</Text>
      </ScrollView>
      <View style={styles.footer}><Button title={isComplete ? 'Order again' : 'Simulate next update'} onPress={advance} /></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background }, content: { padding: spacing.lg, paddingBottom: spacing.xl }, hero: { alignItems: 'center', paddingTop: spacing.xl, paddingBottom: spacing.lg }, heroEmoji: { fontSize: 52, marginBottom: 12 }, eyebrow: { color: colors.accent, fontSize: 10, fontWeight: '800', letterSpacing: 1.4 }, title: { ...typography.h2, textAlign: 'center', marginTop: 8 }, heroText: { ...typography.bodySmall, textAlign: 'center', marginTop: 7 },
  etaCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border }, etaLabel: { color: colors.textSecondary, fontSize: 9, fontWeight: '800', letterSpacing: 1 }, eta: { color: colors.primary, fontSize: 25, fontWeight: '800', marginTop: 5 }, etaIcon: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.accentLight, alignItems: 'center', justifyContent: 'center' },
  timeline: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginTop: spacing.lg, borderWidth: 1, borderColor: colors.border }, stepRow: { minHeight: 67, flexDirection: 'row' }, rail: { width: 34, alignItems: 'center' }, stepIcon: { width: 29, height: 29, borderRadius: 15, backgroundColor: colors.surfaceMuted, alignItems: 'center', justifyContent: 'center', zIndex: 1 }, stepIconDone: { backgroundColor: colors.accent }, stepIconActive: { borderWidth: 3, borderColor: colors.accentLight }, lineTop: { position: 'absolute', top: 0, width: 2, height: 14, backgroundColor: colors.border }, lineBottom: { position: 'absolute', top: 28, bottom: -1, width: 2, backgroundColor: colors.border }, lineDone: { backgroundColor: colors.accent }, stepCopy: { flex: 1, paddingLeft: 9, paddingTop: 2 }, stepTitle: { color: colors.textSecondary, fontSize: 13, fontWeight: '700' }, stepTitleActive: { color: colors.primary }, stepDetail: { color: colors.textSecondary, fontSize: 11, marginTop: 4 },
  address: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.accentLight, borderRadius: borderRadius.md, padding: spacing.md, marginTop: spacing.lg }, addressLabel: { color: colors.accent, fontSize: 9, fontWeight: '800', letterSpacing: 1 }, addressText: { color: colors.primary, fontSize: 12, fontWeight: '700', marginTop: 3 }, demoDisclaimer: { ...typography.caption, textAlign: 'center', marginTop: spacing.md }, footer: { padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.white },
});

export default OrderTrackingScreen;
