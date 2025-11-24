import React, { useState, useContext } from "react";
import { Platform, View, Text, TextInput, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { EventContext } from "../../context/EventContext";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function EditEvent() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { events, updateEvent } = useContext(EventContext);

  const event = events.find((e) => e.id === id);

  const [title, setTitle] = useState(event?.title ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [date, setDate] = useState(event?.date ? new Date(event.date) : new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Format date display
  const formatDate = (d: Date) => {
    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0") +
      " " +
      String(d.getHours()).padStart(2, "0") +
      ":" +
      String(d.getMinutes()).padStart(2, "0")
    );
  };

  // Mobile date picker handler
  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  // Save updated event
  const onSave = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    await updateEvent({
      id: event.id,
      userId: event.userId,
      title,
      description,
      date: date.toISOString(),
    });

    alert("Event updated!");
    router.back();
  };

  if (!event) return <Text>Event not found...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>Edit Event</Text>

      <TextInput
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      {/* PLATFORM: WEB */}
      {Platform.OS === "web" ? (
        <input
          type="datetime-local"
          value={new Date(date).toISOString().slice(0, 16)}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            setDate(newDate);
          }}
          style={{
            padding: 10,
            border: "1px solid #000",
            borderRadius: 6,
            width: "100%",
            marginBottom: 10,
          }}
        />
      ) : (
        <>
          {/* SHOW CURRENT DATE */}
          <TextInput
            value={formatDate(date)}
            editable={false}
            style={{
              borderWidth: 1,
              padding: 10,
              marginBottom: 10,
              backgroundColor: "#eee",
            }}
          />

          <Button title="Select Date" onPress={() => setShowPicker(true)} />

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </>
      )}

      <Button title="Save Changes" onPress={onSave} />
    </View>
  );
}

