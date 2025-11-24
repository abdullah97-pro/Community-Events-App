import React from "react";
import { View, Text, Button } from "react-native";

export default function EventCard({ event, showActions, onEdit, onDelete }) {
  return (
    <View
      style={{
        padding: 15,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fafafa",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{event.title}</Text>
      <Text>{event.description}</Text>
      <Text>{new Date(event.date).toLocaleString()}</Text>
      {showActions && (
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Button title="Edit" onPress={onEdit} />
          <View style={{ width: 10 }} />
          <Button title="Delete" color="red" onPress={onDelete} />
        </View>
      )}
    </View>
  );
}
