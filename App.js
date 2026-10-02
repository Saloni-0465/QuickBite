import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider, useDispatch } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './src/store/store';
import { hydrateCart } from './src/store/slices/cartSlice';
import { storage } from './src/utils/storage';
import MainNavigator from './src/navigation/MainNavigator';
import { colors } from './src/utils/theme';

const AppContent = () => {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    storage.getItem('quickbite_cart')
      .then((items) => { if (active) dispatch(hydrateCart(items)); })
      .finally(() => { if (active) setReady(true); });
    return () => { active = false; };
  }, [dispatch]);

  if (!ready) return <View style={styles.loading}><ActivityIndicator size="large" color={colors.accent} /></View>;
  return <MainNavigator />;
};

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.root}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="dark" />
            <AppContent />
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
});
