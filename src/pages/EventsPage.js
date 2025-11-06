import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const events = [
  { id: '1', title: 'Concert Night', date: '2025-12-04' },
  { id: '2', title: 'Football Game', date: '2025-12-10' },
  { id: '3', title: 'Art Exhibition', date: '2025-12-15' },
];

export default function EventsPage({ navigation }) {
  const handleEventPress = (event) => {
    // Navigate to checkout or event details
    navigation.navigate('Checkout', { event });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Events</Text>
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEventPress(item)} style={styles.eventCard}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDate}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  eventCard: { padding: 15, backgroundColor: '#f2f2f2', marginBottom: 10, borderRadius: 6 },
  eventTitle: { fontSize: 18, fontWeight: '600' },
  eventDate: { color: '#666', fontSize: 14 },
});
