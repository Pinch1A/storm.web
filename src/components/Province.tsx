import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { fetchProvinceData } from "@/services/province.service";
import { fetchProducts, fetchSussistenza, fetchProvinces } from "@/services/fetchAndSaveData";
import { getProvinceList, getSelectedProvince, saveProvinceList } from "@/utils/provinceStorage";
import { getProductList, saveProductList } from "@/utils/productsStorage";
import { ProvinceItemType } from "@/types";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import { Combobox } from "@/components/Combobox";
import { getSussistenzaList } from "@/utils/sussistenzaStorage";
import { saveSussistenzaList } from "@/utils/sussistenzaStorage";
import { fetchSussistenzaData } from "@/services/sussistenza.service";


const ProvincePage: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceItemType | null>(null);
  const [provinceData, setProvinceData] = useState<ProvinceItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const appContext = useAppContext();
  const router = useRouter();

  const fetchProvince = async (): Promise<ProvinceItemType[]> => {
    try {
      const province = await fetchProvinceData();
      return province;
    } catch (error) {
      console.error("Error fetching province data:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadProvinceData = async () => {
      setLoading(true);
      const storedProvince = await getProvinceList();
      if (storedProvince && storedProvince.length > 0) {
        console.log('Province List loaded from storage:', storedProvince);
        setProvinceData(storedProvince);
      } else {
        console.log('Fetching province data from API');
        await fetchProvinces();
      }
      setLoading(false);
    };

    const loadProductsData = async () => {
      const storedProducts = await getProductList();
      if (!storedProducts || storedProducts.length === 0) {
        await fetchProducts();
      }
    };

    const loadSussistenzaData = async () => {
      const storedSussistenza = await getSussistenzaList();
      if (!storedSussistenza || storedSussistenza.length === 0) {
        const data = await fetchSussistenza();
        await saveSussistenzaList(data);
      }
    };

    // const loadSelected = async () => {
    //   const storedSelected = await getSelectedProvince();
    //   if (storedSelected) {
    //     setSelectedProvince(storedSelected);
    //     appContext?.setPostalCode(storedSelected);
    //   }
    // };

    loadProvinceData();
    loadProductsData();
    loadSussistenzaData();
    // loadSelected();
    appContext?.setPossibleResults([]);
    appContext?.setSelectedResults([]);
    appContext?.setPickedOffer(null);
    appContext?.setShowSelectedResults(false);
  }, []);

  const handleSubmit = async () => {
    if (selectedProvince) {
      appContext?.setPostalCode(selectedProvince);
      router.push("/calculator");
    } else {
      alert("Please select a province.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 px-6 py-10">
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner className="w-10 h-10" label="Caricamento..." />
        </div>
      ) : (
        <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">Seleziona Provincia</h1>
          <p className="text-gray-600 mb-6">Scegli la tua provincia di residenza per continuare.</p>

          {provinceData && provinceData.length > 0 ? (
            <Combobox
              value={
                selectedProvince ? selectedProvince.id : undefined
              }
              placeholder="Provincia"
              options={provinceData.map((province) => ({
                value: province.id,
                label: province.name
              }))}
              onSelect={(value: string) => {
                const selected = provinceData.find((province) => province.id === value) || null;
                setSelectedProvince(selected);
              }} />
          ) : (
            <p className="text-red-500">No province data available</p>
          )}

          <Button onClick={handleSubmit} className="w-full mt-4">
            Conferma
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProvincePage;
