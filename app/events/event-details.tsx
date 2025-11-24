import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EventDetails({ route }: any) {
  const { event } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text>{event.desc}</Text>
      <Text style={styles.meta}>By {event.ownerName} • {new Date(event.datetime).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 20, fontWeight: 'bold' }, meta: { color: '#666', marginTop: 8 } });
