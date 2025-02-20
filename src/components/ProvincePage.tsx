"use client"

import React, { useEffect, useState } from "react";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/Combobox";
import { useAppContext } from "@/context/AppContext";
import { fetchAndSaveData } from "@/services/fetchAndSaveData";
import { ProvinceItemType } from "@/types";
import { useRouter } from "next/router";
import storageUtil from "@/utils/storageUtil";

const ProvincePage: React.FC = () => {
  const [provinceData, setProvinceData] = useState<ProvinceItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const { postalCode, setPostalCode } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    const loadProvinces = async () => {
      setLoading(true);
      const provinces = await fetchAndSaveData("province");
      await fetchAndSaveData("product");
      await fetchAndSaveData("sussistenza");
      if (provinces) {
        setProvinceData(provinces as ProvinceItemType[]);
      }
      setLoading(false);
    };

    const provinceStorage = storageUtil.getData("province");
    if (!provinceStorage || provinceStorage.length === 0) {
      console.log("Fetching provinces...");
      loadProvinces();
    } else {
      console.log("Loading provinces from storage...");
      setProvinceData(provinceStorage);
    }
  }, []);

  const handleSelect = () => {
    router.push("/calculator");
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {loading ? (
        <Spinner label={"Fetching province data..."} />
      ) : (
        <div className="w-2/5 items-start border-2 border-blue-500 rounded-md p-5 flex flex-col justify-center gap-5">
          <h1 className="text-2xl font-bold">Seleziona una Provincia</h1>
          <Combobox
            value={postalCode?.id}
            options={provinceData.map(p => ({
              value: p.id,
              label: p.name,
            }))}
            onSelect={(value) => {
              const selectedProvince = provinceData.find(p => p.id === value);
              if (selectedProvince) {
                setPostalCode(selectedProvince);
              }
            }}
            placeholder="Select a Province"
          />
          <Button className="mt-5 self-start bg-blue-500 text-white hover:bg-blue-600" onClick={handleSelect}>Conferma</Button>
        </div>
      )}
    </div>
  );
}

export default ProvincePage;
