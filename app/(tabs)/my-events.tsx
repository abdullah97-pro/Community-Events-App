import React, { useContext } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { EventContext } from "../../context/EventContext";
import { useRouter } from "expo-router";
import EventCard from "../../components/EventCard";

export default function MyEvents() {
  const router = useRouter();
  const { events, deleteEvent } = useContext(EventContext);

  // No user filtering — show all events
  const myEvents = events;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        title="Create New Event"
        onPress={() => router.push("/events/create-event")}
      />

      <Text style={{ fontSize: 24, marginVertical: 10 }}>My Events</Text>

      <FlatList
        data={myEvents}
        keyExtractor={(item) => item.id.toString()} // safer
        renderItem={({ item }) => (
          <EventCard
            event={item}
            showActions
            onEdit={() => router.push(`/events/edit-event?id=${item.id}`)}
            onDelete={() => deleteEvent(item.id)}
          />
        )}
      />
    </View>
  );
}
