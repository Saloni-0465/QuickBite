import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import HomeScreen from '../screens/shop/HomeScreen';
import CartScreen from '../screens/shop/CartScreen';
import FoodDetailScreen from '../screens/shop/FoodDetailScreen';
import CheckoutScreen from '../screens/shop/CheckoutScreen';
import OrderTrackingScreen from '../screens/shop/OrderTrackingScreen';
import { colors } from '../utils/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ShopTabs = () => {
  const cartCount = useSelector((state) => state.cart.items.reduce((sum, entry) => sum + entry.quantity, 0));
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarStyle: { backgroundColor: colors.white, borderTopColor: colors.border, height: 62, paddingTop: 7, paddingBottom: 7 },
      tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
      tabBarIcon: ({ color, size, focused }) => {
        const name = route.name === 'Explore' ? (focused ? 'compass' : 'compass-outline') : (focused ? 'bag' : 'bag-outline');
        return <Ionicons name={name} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="Explore" component={HomeScreen} options={{ title: 'Explore' }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'Your bag', tabBarBadge: cartCount || undefined, tabBarBadgeStyle: { backgroundColor: colors.accent, color: colors.white } }} />
    </Tab.Navigator>
  );
};

const MainNavigator = () => (
  <Stack.Navigator screenOptions={{
    headerStyle: { backgroundColor: colors.background },
    headerTintColor: colors.text,
    headerTitleStyle: { fontSize: 16, fontWeight: '700' },
    headerShadowVisible: false,
    contentStyle: { backgroundColor: colors.background },
  }}>
    <Stack.Screen name="Shop" component={ShopTabs} options={{ headerShown: false }} />
    <Stack.Screen name="FoodDetail" component={FoodDetailScreen} options={{ title: 'Dish details', headerBackTitle: 'Menu' }} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout', headerBackTitle: 'Bag' }} />
    <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} options={{ title: 'Order status', headerBackVisible: false }} />
  </Stack.Navigator>
);

export default MainNavigator;
