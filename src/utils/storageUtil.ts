'use client'

import storage from './storage';

const TIMESTAMP_KEY = 'last_updated_timestamp';

export interface StorageUtil<T> {
  saveData: (data: T) => Promise<void>;
  getData: () => Promise<T | null>;
  clearData: () => Promise<void>;
}

// Save the timestamp when data is updated
const saveTimestamp = async (): Promise<void> => {
  const timestamp = Date.now();
  await storage.setItem(TIMESTAMP_KEY, timestamp);
};

// Get the saved timestamp
export const getTimestamp = async (): Promise<number | null> => {
  try {
    const timestamp: number | null = await storage.getItem(TIMESTAMP_KEY);
    console.log("Timestamp retrieved from storage:", timestamp);
    return timestamp || null;
  } catch (error) {
    console.error('Error retrieving timestamp:', error);
    return null;
  }
};

// Centralized utility generator for handling specific keys
export const createStorageUtil = <T>(key: string): StorageUtil<T> => {
  return {
    saveData: async (data: T): Promise<void> => {
      try {
        await storage.setItem(key, data);
        await saveTimestamp(); // Update the timestamp
        console.log(`${key} saved successfully`);
      } catch (error) {
        console.error(`Error saving ${key}:`, error);
      }
    },
    getData: async (): Promise<T | null> => {
      console.log("Getting data for:", key);
      try {
        const data: T | null = await storage.getItem(key);
        console.log("Data retrieved from storage:", data);
        return data || null;
      } catch (error: any) {
        if (error.name === 'NotFoundError') {
          console.log(`${key} not found`);
        } else if (error.name === 'ExpiredError') {
          console.log(`${key} expired`);
        } else {
          console.error(`Error retrieving ${key}:`, error);
        }
        return null;
      }
    },
    clearData: async (): Promise<void> => {
      try {
        await storage.removeItem(key);
        console.log(`${key} cleared successfully`);
      } catch (error) {
        console.error(`Error clearing ${key}:`, error);
      }
    },
  };
};
