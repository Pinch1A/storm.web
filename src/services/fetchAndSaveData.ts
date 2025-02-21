// eslint-disable-file @typescript-eslint/no-explicit-any

import { fetchProvinceData } from "./province.service";
import { fetchProductsData } from "./products.service";
import { fetchSussistenzaData } from "./sussistenza.service";
import storageUtil from "@/utils/storageUtil";
import { ProductType, ProvinceItemType, SussistenzaSizeType } from "@/types";

// Define a specific type for the fetched data
type FetchedData = ProductType[] | ProvinceItemType[] | SussistenzaSizeType[]; // Replace with actual types

const serviceMap: Record<string, () => Promise<FetchedData>> = {
  product: fetchProductsData,
  province: fetchProvinceData,
  sussistenza: fetchSussistenzaData as unknown as () => Promise<FetchedData>,
};

/**
 * Fetches data for a given type and saves it to localStorage.
 * Province also updates the main timestamp.
 * @param dataType - 'product' | 'province' | 'sussistenza'
 */
export const fetchAndSaveData = async (dataType: string): Promise<FetchedData | undefined> => {
  try {
    const fetchService = serviceMap[dataType];
    if (!fetchService) throw new Error(`No service found for ${dataType}`);

    // console.log(`Fetching data for: ${dataType}...`);
    const data = await fetchService();

    // Save data to localStorage
    storageUtil.setData(`${dataType}Data`, data);

    // Update the main timestamp only when province is fetched
    if (dataType === "province") {
      storageUtil.setTimestamp("dataTimestamp");
      console.log("Main timestamp updated.");
    }

    // console.log(`${dataType} data saved successfully.`);
    return data;
  } catch (error) {
    console.error(`Error fetching ${dataType} data:`, error);
  }
};
