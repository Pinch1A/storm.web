'use client';

import storage from '../storage';

const TIMESTAMP_SUFFIX = '-timestamp';

export interface StorageUtil<T> {
  save: (data: T) => Promise<void>;
  get: () => Promise<T | null>;
  clear: () => Promise<void>;
}

export const createStorageUtil = <T>(key: string): StorageUtil<T> => {
  const timestampKey = `${key}${TIMESTAMP_SUFFIX}`;

  const saveTimestamp = async () => {
    const timestamp = Date.now();
    await storage.setItem(timestampKey, timestamp);
  };

  const isDataExpired = async (): Promise<boolean> => {
    try {
      const timestamp = await storage.getItem<number>(timestampKey);
      return !timestamp || Date.now() - timestamp > 60 * 60 * 1000; // 1 hour expiration
    } catch (error) {
      console.error(`Error checking expiration for key "${key}":`, error);
      return true;
    }
  };

  return {
    save: async (data: T): Promise<void> => {
      try {
        await storage.setItem(key, data);
        await saveTimestamp();
        // console.log(`Data saved for key "${key}".`);
      } catch (error) {
        console.error(`Error saving data for key "${key}":`, error);
      }
    },

    get: async (): Promise<T | null> => {
      try {
        if (await isDataExpired()) {
          console.warn(`Data for key "${key}" is expired.`);
          return null;
        }
        const data = await storage.getItem<T>(key);
        return data || null;
      } catch (error) {
        console.error(`Error retrieving data for key "${key}":`, error);
        return null;
      }
    },

    clear: async (): Promise<void> => {
      try {
        await storage.removeItem(key);
        await storage.removeItem(timestampKey);
        // console.log(`Data cleared for key "${key}".`);
      } catch (error) {
        console.error(`Error clearing data for key "${key}":`, error);
      }
    },
  };
};
