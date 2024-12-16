import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { fetchProvinces } from "@/services/fetchAndSaveData";
import { ProvinceItemType } from "@/types";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import { Combobox } from "@/components/Combobox";

const ProvincePage: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceItemType | null>(null);
  const [provinceData, setProvinceData] = useState<ProvinceItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const appContext = useAppContext();
  const router = useRouter();

  // Load province data
  useEffect(() => {
    const loadData = async () => {
      try {
        const provinces = await fetchProvinces();
        setProvinceData(provinces);
      } catch (error) {
        console.error("Error loading provinces:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Reset app context when the page loads
    appContext?.setPossibleResults([]);
    appContext?.setSelectedResults([]);
    appContext?.setPickedOffer(null);
    appContext?.setShowSelectedResults(false);
  }, []);

  // Handle province selection submission
  const handleSubmit = () => {
    if (selectedProvince) {
      console.log("Selected Province:", selectedProvince);
      appContext?.setPostalCode(selectedProvince);
      router.push("/calculator");
    } else {
      alert("Please select a province.");
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner className="w-10 h-10" label="Caricamento..." />
        </div>
      ) : (
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Seleziona Provincia</h1>
          <p className="text-gray-600 mb-6">Scegli la tua provincia di residenza per continuare.</p>

          {provinceData.length > 0 ? (
            <Combobox
              value={selectedProvince ? selectedProvince.id : undefined}
              placeholder="Provincia"
              options={provinceData.map((province) => ({
                value: province.id,
                label: province.name,
              }))}
              onSelect={(value: string) => {
                const selected = provinceData.find((province) => province.id === value) || null;
                setSelectedProvince(selected);
              }}
            />
          ) : (
            <p className="text-red-500 text-xs">No province data available</p>
          )}

          <Button
            onClick={handleSubmit}
            className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg"
          >
            Conferma
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProvincePage;
