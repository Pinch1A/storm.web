import React, { useEffect, useState } from "react";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/Combobox";
import { useAppContext } from "@/context/AppContext";
import { fetchAndSaveData } from "@/services/fetchAndSaveData";
import { ProvinceItemType } from "@/types";
import { useRouter } from "next/router";
export default function ProvincePage() {
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

      setProvinceData(provinces);
      setLoading(false);
    };

    loadProvinces();
  }, []);

  const handleSelect = (selectedProvince: string) => {
    const selectedProvinceData = provinceData.find(p => p.id === selectedProvince);
    if (selectedProvinceData) {
      setPostalCode(selectedProvinceData);
      router.push("/calculator");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {loading ? (
        <Spinner className={""} label={""} />
      ) : (
        <Combobox
          value={postalCode?.id}
          options={provinceData.map(p => ({
            value: p.id,
            label: p.name,
          }))}
          onSelect={(value) => handleSelect(value)}
          placeholder="Select a Province"
        />
      )}
      <Button onClick={() => console.log("Proceed")}>Proceed</Button>
    </div>
  );
}
