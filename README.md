# QuickBite

A small iOS-first food-ordering prototype built with Expo and React Native. It explores a quick path from menu discovery to cart, checkout, and order updates. This is an independent portfolio concept and is not affiliated with Bistro or Blinkit.

## Demo flow

1. Browse a sample menu, search dishes, or filter by meals, snacks, drinks, and desserts.
2. Open a dish, add it to the cart, and adjust quantities.
3. Review the delivery fee and total, select a demo payment method, and place a sample order.
4. Advance the order through confirmed, preparing, on-the-way, and delivered states.

Menu items, location, delivery estimates, payment, and order status are sample data. The app does not place real orders or collect payment. The cart is saved locally on the device.

## Run locally

```sh
npm install
npx expo start
```

Press `i` to open the iOS simulator. An internet connection is needed for the sample food photos.

## Tech

- Expo and React Native
- React Navigation (native stack and tabs)
- Redux Toolkit for cart and demo order state
- AsyncStorage for cart persistence

## Product decisions

- The app opens directly to the menu; no account is needed to try the ordering journey.
- The cart keeps item quantities and explains the free-delivery threshold before checkout.
- Checkout and delivery states are clearly labeled as a simulation so a portfolio demo cannot be mistaken for a live commerce service.
