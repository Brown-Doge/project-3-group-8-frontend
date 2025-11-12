import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

export default function CheckoutPage({ route, navigation }) {
  const { event } = route.params;

  const handlePurchase = () => {
    Alert.alert('Purchase Complete', `You have booked a ticket for ${event.title}`);
    navigation.navigate('BookedEvents');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text style={styles.eventDate}>{event.date}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Confirm Purchase" onPress={handlePurchase} color="#4285F4" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  eventTitle: { fontSize: 20, fontWeight: '600', marginBottom: 6, textAlign: 'center' },
  eventDate: { fontSize: 16, color: '#666', marginBottom: 30, textAlign: 'center' },
  buttonContainer: { marginTop: 20 },
});
