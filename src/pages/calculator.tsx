"use client";

import CalcForm from "@/components/CalcForm";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Person, UserCircleMinus, UserCirclePlus, XCircle } from "@phosphor-icons/react";
import { Slider } from "@/components/ui/slider";
import { PossibleResultType, SussistenzaItemType } from "@/types";
import { getSussistenzaList } from "@/utils/sussistenzaStorage";
import ResultsList from "@/components/ResultList";
import { cn } from "@/lib/utils";


export default function CalculatorPage() {
  const {
    postalCode,
    setPostalCode,
    possibleResults,
    selectedResults,
  } = useAppContext();

  const [sussiPersons, setSussiPersons] = useState<number>(1);

  const router = useRouter();

  useEffect(() => {
    if (!postalCode) {
      router.push("/province");
    }
  }, [postalCode])

  // Retrieve and set the sussistenza list when selected results change
  useEffect(() => {
    console.log('selectedResults', selectedResults);
  }, [selectedResults]);

  const clearPostalCode = () => {
    setPostalCode(null);
  }

  return (
    <div className="flex size-full flex-1 items-center justify-center">
      <div className="flex flex-col md:flex-row size-full bg-white h-[87vh]">
        <div className="flex flex-col w-full lg:w-1/3 bg-gray-100 p-6">
          <h1 className="text-xl font-bold mb-4 text-neutral-900">Calculator</h1>
          {postalCode && (
            <div className="flex flex-row w-full items-baseline justify-between space-x-2">
              <div className="flex flex-row items-baseline justify-start space-x-2">
                <div className="text-gray-500 mb-4">Postal Code:</div>
                <Badge variant="default" className="text-sm font-normal bg-blue-500 text-white">{postalCode.name}</Badge>
              </div>
              <div className="flex flex-row items-baseline justify-start">
                <Button variant="outline" className=" h-6 p-1 text-xs font-normal bg-neutral-900 text-white" onClick={clearPostalCode}>
                  <XCircle size={18} />
                </Button>
              </div>
            </div>
          )}
          <CalcForm />

          {selectedResults.length > 0 && <div className="flex flex-col w-full items-center justify-center mt-8 bg-neutral-200 px-4 py-1 rounded-md">
            <div className="flex w-full flex-col text-gray-700 mb-4 space-y-2 items-center justify-between h-full">
              <div className="flex text-md font-semibold">Nucleo familiare</div>
              <div className="flex w-full py-2 flex-row space-x-2 items-center justify-between">
                <UserCircleMinus size={32}
                  className={cn("text-blue-500", {
                    "text-neutral-400": sussiPersons <= 1
                  })}
                  onClick={() => sussiPersons > 1 && setSussiPersons(sussiPersons - 1)} />
                <div className="flex flex-row space-x-2 items-center justify-center">
                  {Array.from({ length: sussiPersons }, (_, index) => (
                    <Person size={32} weight="duotone" className="text-neutral-400" key={index} />
                  ))}
                </div>
                <UserCirclePlus size={32}
                  className={cn("text-blue-500", {
                    "text-neutral-400": sussiPersons >= 6
                  })}
                  onClick={() => sussiPersons < 6 && setSussiPersons(sussiPersons + 1)} />
              </div>
            </div>
          </div>}

        </div>
        <div className="flex flex-col w-full lg:w-2/3 bg-white p-6 space-y-4 h-full overflow-auto scrollbar-hide pb-10">
          <h2 className="text-xl font-bold mb-4 text-neutral-900">Results</h2>
          <div className="flex space-x-4">
            <div className="text-gray-500">Trovati {possibleResults.length} prodotti</div>
            <div className="text-gray-500">Selezionati {selectedResults.length}</div>
          </div>
          {possibleResults.length > 0 ? (
            <ResultsList results={possibleResults} sussiPersons={sussiPersons} />
          ) : (
            <p className="text-gray-500">No results to display. Fill the form to calculate.</p>
          )}
        </div>
      </div>
    </div>
  );
}
