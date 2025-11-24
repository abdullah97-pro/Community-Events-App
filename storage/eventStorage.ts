import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_EVENTS = "events";
const KEY_ALERT = "alertMessage";

const isWeb = typeof window !== "undefined" && !!window.localStorage;

export default {
  saveEvents: async (events) => {
    if (isWeb) {
      window.localStorage.setItem(KEY_EVENTS, JSON.stringify(events));
    } else {
      await AsyncStorage.setItem(KEY_EVENTS, JSON.stringify(events));
    }
  },

  getEvents: async () => {
    if (isWeb) {
      const s = window.localStorage.getItem(KEY_EVENTS);
      return s ? JSON.parse(s) : [];
    } else {
      const s = await AsyncStorage.getItem(KEY_EVENTS);
      return s ? JSON.parse(s) : [];
    }
  },

  saveAlert: async (msg) => {
    if (isWeb) {
      window.localStorage.setItem(KEY_ALERT, JSON.stringify(msg));
    } else {
      await AsyncStorage.setItem(KEY_ALERT, JSON.stringify(msg));
    }
  },

  getAlert: async () => {
    if (isWeb) {
      const s = window.localStorage.getItem(KEY_ALERT);
      return s ? JSON.parse(s) : "";
    } else {
      const s = await AsyncStorage.getItem(KEY_ALERT);
      return s ? JSON.parse(s) : "";
    }
  },
};
