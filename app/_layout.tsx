import React from "react";
import { Slot } from "expo-router";
import { EventProvider } from "../context/EventContext";

export default function RootLayout() {
  return (
      <EventProvider>
        <Slot />
      </EventProvider>
  );
}
