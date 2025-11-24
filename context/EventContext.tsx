import React, { createContext, useEffect, useState } from "react";
import eventStorage from "../storage/eventStorage";

export const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);

  // Load events from storage at startup
  useEffect(() => {
    (async () => {
      const saved = await eventStorage.getEvents();
      setEvents(saved);
    })();
  }, []);

  // Create a new event
  const createEvent = async (event) => {
    const newEvent = { ...event, id: Date.now().toString() };
    const updated = [...events, newEvent];

    setEvents(updated);
    await eventStorage.saveEvents(updated);
  };

  // Update an existing event
  const updateEvent = async (updatedEvent) => {
    const updatedList = events.map((ev) =>
      ev.id === updatedEvent.id ? updatedEvent : ev
    );

    setEvents(updatedList);
    await eventStorage.saveEvents(updatedList);
  };

  // Delete event
  const deleteEvent = async (id) => {
    const filtered = events.filter((ev) => ev.id !== id);
    setEvents(filtered);
    await eventStorage.saveEvents(filtered);
  };

  return (
    <EventContext.Provider
      value={{ events, createEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventContext.Provider>
  );
}
