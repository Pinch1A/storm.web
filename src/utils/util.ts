import storage from './storage';

export const saveDataToStorage = async (data: any, key: string) => {
  try {
    // Store data in react-native-storage with a key
    await storage.setItem(key, data);
    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const getDataFromStorage = async (key: string) => {
  try {
    const data = await storage.getItem(key);
    return data;
  } catch (error: any) {
    if (error.name === 'NotFoundError') {
      console.error('Data not found');
    } else if (error.name === 'ExpiredError') {
      console.error('Data expired');
    } else {
      console.error('Error loading data:', error);
    }
    return null;
  }
};
