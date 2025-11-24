import React, { useState, useContext } from "react";
import { View, TextInput, Button, Alert, Platform } from "react-native";
import { EventContext } from "../../context/EventContext";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const { createEvent } = useContext(EventContext);
  const router = useRouter();

  const isWeb = Platform.OS === "web";

  const onChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // For web, handle input change from string to Date
  const onWebDateChange = (e) => {
    const val = e.target.value; // e.g. "2025-11-20T15:30"
    setDate(new Date(val));
  };

  const onCreate = () => {
    if (!title || !date) {
      Alert.alert("Error", "Title and Date are required");
      return;
    }
    // Format date to string YYYY-MM-DD HH:mm
    const dateStr = date.toISOString().slice(0, 16).replace("T", " ");
    createEvent({ title, description, date: dateStr });
    Alert.alert("Event created!");
    router.back();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 }}
      />

      {isWeb ? (
        <input
          type="datetime-local"
          value={date.toISOString().slice(0, 16)}
          onChange={onWebDateChange}
          style={{
            padding: 10,
            borderRadius: 5,
            border: "1px solid gray",
            marginBottom: 10,
            width: "100%",
          }}
        />
      ) : (
        <>
          <Button title="Pick Date" onPress={() => setShowPicker(true)} />
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={onChange}
              minimumDate={new Date()}
            />
          )}
          <TextInput
            placeholder="Date"
            value={date.toISOString().slice(0, 16).replace("T", " ")}
            editable={false}
            style={{ borderWidth: 1, padding: 10, borderRadius: 5, color: "#333" }}
          />
        </>
      )}

      <Button title="Create Event" onPress={onCreate} />
    </View>
  );
}
