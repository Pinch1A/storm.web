'use client'
import storage from './storage';

const TIME_STAMP_KEY = 'products-data-timestamp';

// Function to save data with a timestamp
export const saveDataWithTimestamp = async () => {
  const currentTime = new Date().toISOString(); // Get the current timestamp

  try {
    await storage.setItem(TIME_STAMP_KEY, {
      timestamp: currentTime,  // Timestamp of when the data was saved
    });
    console.log(`Data with key 'products-data-timestamp' saved successfully at ${currentTime}`);
  } catch (error) {
    console.error('Error saving data with timestamp:', error);
  }
};

export const getDataTimestamp = async (): Promise<number | null> => {
  try {
    const timeStamp = await storage.getItem<{ timestamp: string }>(TIME_STAMP_KEY);

    // Returns the Timestamp as a number
    const timestamp = timeStamp?.timestamp ? new Date(timeStamp.timestamp).getTime() : null;
    return timestamp;
  } catch (error: any) {
    if (error.name === 'NotFoundError') {
      console.log('Timestamp not found');
    } else if (error.name === 'ExpiredError') {
      console.log('Timestamp expired');
    } else {
      console.error('Error retrieving Timestamp:', error);
    }
    return null; // No session found
  }
};
