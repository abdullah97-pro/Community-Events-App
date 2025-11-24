import React, { useContext } from "react";
import { View, FlatList, Text } from "react-native";
import { EventContext } from "../../context/EventContext";
import EventCard from "../../components/EventCard";

export default function Events() {
  const { events } = useContext(EventContext);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>All Events</Text>
      <FlatList
        data={events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </View>
  );
}
