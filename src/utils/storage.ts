// src/utils/storage.ts
'use client'
import localforage from "localforage";

localforage.config({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
  name: "MyAppStorage",
  version: 1.0,
  storeName: "keyvaluepairs",
});

const storage = {
  setItem: async <T>(key: string, value: T): Promise<void> => {
    try {
      await localforage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting key "${key}" in storage:`, error);
    }
  },

  getItem: async <T>(key: string): Promise<T | null> => {
    try {
      return await localforage.getItem(key);
    } catch (error) {
      console.error(`Error getting key "${key}" from storage:`, error);
      return null;
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      await localforage.removeItem(key);
    } catch (error) {
      console.error(`Error removing key "${key}" from storage:`, error);
    }
  },

  clear: async (): Promise<void> => {
    try {
      await localforage.clear();
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
};

export default storage;
