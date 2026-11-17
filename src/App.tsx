import * as Sentry from '@sentry/react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

import { initSentry } from './sentry';
import { type CartItem, formatPrice, totalCents } from './utils/cart';

initSentry();

const products: CartItem[] = [
  { id: 'apple', name: 'Apple', priceCents: 150, quantity: 0 },
  { id: 'bread', name: 'Bread', priceCents: 320, quantity: 0 },
  { id: 'cheese', name: 'Cheese', priceCents: 680, quantity: 0 },
];

function App() {
  const [cart, setCart] = useState(products);

  const add = (id: string) => {
    Sentry.addBreadcrumb({ category: 'cart', message: `add ${id}` });
    setCart((items) => items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>
              {item.name} × {item.quantity}
            </Text>
            <Button title={`Add ${formatPrice(item.priceCents)}`} onPress={() => add(item.id)} />
          </View>
        )}
      />
      <Text style={styles.total}>Total: {formatPrice(totalCents(cart))}</Text>
      <Button title="Send test error" onPress={() => Sentry.captureException(new Error('Test error from the sample app'))} />
      <StatusBar style="auto" />
    </View>
  );
}

export default Sentry.wrap(App);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 64, paddingHorizontal: 24 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  name: { fontSize: 16 },
  total: { fontSize: 18, fontWeight: '600', marginVertical: 16 },
});
