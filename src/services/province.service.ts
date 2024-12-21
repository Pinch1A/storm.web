// services/province.service.ts
import { ProvinceItemType } from '../types';

export const fetchProvinceData = async (): Promise<ProvinceItemType[]> => {
  try {
    const provinceResponse = await fetch('/api/data/province', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await provinceResponse.json();
  } catch (error) {
    console.error('Error fetching province data:', error);
    return [];
  }
};

