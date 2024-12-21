// services/sussistenza.service.ts
import { SussistenzaItemType } from '../types';

export const fetchSussistenzaData = async (): Promise<SussistenzaItemType[]> => {
  try {
    const sussistenzaResponse = await fetch('/api/data/sussistenza', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await sussistenzaResponse.json();
  } catch (error) {
    console.error('Error fetching sussistenza data:', error);
    return [];
  }
};

