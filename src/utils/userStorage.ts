'use client'
import storage from './storage';

export interface UserInfo {
  username: string;
  // token: string;
  selectedProvince?: string;
}

const USER_KEY = 'userSession';

export const saveUserSession = async (userInfo: UserInfo) => {
  try {
    // Save user session details
    await storage.setItem(
      USER_KEY, // Key to store user session info
      userInfo, // The user information object
    );
    console.log('User session saved successfully');
  } catch (error) {
    console.error('Error saving user session:', error);
  }
};

export const getUserSession = async (): Promise<UserInfo | null> => {
  try {
    const userSession = await storage.getItem<UserInfo>(USER_KEY);

    return userSession; // Returns the user session object (username, token, etc.)
  } catch (error: any) {
    if (error.name === 'NotFoundError') {
      console.log('User session not found');
    } else if (error.name === 'ExpiredError') {
      console.log('User session expired');
    } else {
      console.error('Error retrieving user session:', error);
    }
    return null; // No session found
  }
};


export const clearUserSession = async () => {
  try {
    // Remove the user session
    await storage.removeItem(USER_KEY);
    console.log('User session cleared successfully');
  } catch (error) {
    console.error('Error clearing user session:', error);
  }
};
