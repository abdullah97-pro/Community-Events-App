import React, { useEffect, useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { EventContext } from "../../context/EventContext";

export default function Home() {
  const { events, newEventToast, clearNewEventToast } = useContext(EventContext);

  useEffect(() => {
    if (newEventToast) {
      setTimeout(() => clearNewEventToast(), 3000);
    }
  }, [newEventToast]);

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Upcoming Events</Text>
      <FlatList
        data={upcomingEvents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            <Text>{new Date(item.date).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}
