// import { getDataTimestamp, saveDataWithTimestamp } from '@/utils/timeStampStorage';
import { getProvinceList, saveProvinceList } from '@/utils/provinceStorage';
import { getProductList, saveProductList } from '@/utils/productsStorage';
import { fetchProvinceData } from '@/services/province.service';
import { fetchProductsData } from '@/services/products.service';
import { ProductType, ProvinceItemType, SussistenzaItemType } from '@/types';
import { getTimestamp } from '@/utils/storageUtil';
import { fetchSussistenzaData } from './sussistenza.service';
import { getSussistenzaList } from '@/utils/sussistenzaStorage';
import { saveSussistenzaList } from '@/utils/sussistenzaStorage';

const DATA_EXPIRY_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Checks if the timestamp is still valid based on DATA_EXPIRY_TIME.
 */
function isDataExpired(timestamp: number): boolean {
  const currentTime = Date.now();
  return currentTime - timestamp > DATA_EXPIRY_TIME;
}

/**
 * Fetch and save data from an API or retrieve from local storage with error handling.
 * @param getLocalData - Function to get data from local storage.
 * @param saveLocalData - Function to save data to local storage.
 * @param fetchData - Function to fetch data from the API.
 */
async function fetchAndSaveData<T>(
  getLocalData: () => Promise<T | null>,
  saveLocalData: (data: T) => Promise<void>,
  fetchData: () => Promise<T>
): Promise<T> {
  try {
    // Get the current timestamp
    const timestamp = await getTimestamp();

    console.log("Timestamp:", timestamp);
    // Check if local data is available and valid
    if (timestamp && !isDataExpired(timestamp)) {
      const localData = await getLocalData();
      console.log("Local data:", localData);
      if (localData) {
        console.log('Using local data');
        return localData;
      }
    }

    // If no valid local data, fetch from API
    console.log('Fetching fresh data from API');
    const freshData = await fetchData();

    // Save fresh data to local storage and update the timestamp
    await saveLocalData(freshData);
    // await saveDataWithTimestamp();

    return freshData;
  } catch (error) {
    console.error('Error fetching and saving data:', error);
    throw new Error('Failed to fetch and save data.');
  }
}

/**
 * Fetch provinces from local storage or API.
 */
export async function fetchProvinces(): Promise<ProvinceItemType[]> {
  return fetchAndSaveData(getProvinceList, saveProvinceList, fetchProvinceData);
}

/**
 * Fetch products from local storage or API.
 */
export async function fetchProducts(): Promise<ProductType[]> {
  return fetchAndSaveData(getProductList, saveProductList, fetchProductsData);
}

/**
 * Fetch sussistenza from local storage or API.
 */
export async function fetchSussistenza(): Promise<SussistenzaItemType[]> {
  return fetchAndSaveData(getSussistenzaList, saveSussistenzaList, fetchSussistenzaData);
}
