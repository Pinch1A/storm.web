import { fetchProvinceData } from "./province.service";
import { fetchProductsData } from "./products.service";
import { fetchSussistenzaData } from "./sussistenza.service";
import storageUtil from "@/utils/storageUtil";

const serviceMap: Record<string, () => Promise<any>> = {
  product: fetchProductsData,
  province: fetchProvinceData,
  sussistenza: fetchSussistenzaData,
};

/**
 * Fetches data for a given type and saves it to localStorage.
 * Province also updates the main timestamp.
 * @param dataType - 'product' | 'province' | 'sussistenza'
 */
export const fetchAndSaveData = async (dataType: string): Promise<any> => {
  try {
    const fetchService = serviceMap[dataType];
    if (!fetchService) throw new Error(`No service found for ${dataType}`);

    console.log(`Fetching data for: ${dataType}...`);
    const data = await fetchService();

    // Save data to localStorage
    storageUtil.setData(`${dataType}Data`, data);

    // Update the main timestamp only when province is fetched
    if (dataType === "province") {
      storageUtil.setTimestamp("dataTimestamp");
      console.log("Main timestamp updated.");
    }

    console.log(`${dataType} data saved successfully.`);
    return data;
  } catch (error) {
    console.error(`Error fetching ${dataType} data:`, error);
  }
};
