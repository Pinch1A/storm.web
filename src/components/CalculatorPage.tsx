"use client";

import CalcForm from "@/components/CalcForm";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Person, UserCircleMinus, UserCirclePlus, XCircle } from "@phosphor-icons/react";
import ResultsList from "@/components/ResultList";
import { useRouter } from "next/router";

import { cn } from "@/lib/utils";
import { useResultsContext } from "@/context/ResultsContext";
import { SelectedList } from "@/components/SelectedList";

const CalculatorPage: React.FC = () => {
  const {
    postalCode,
    setPostalCode,
    isLoading
  } = useAppContext();

  const { possibleResults, selectedResults, setPossibleResults, setSelectedResults } = useResultsContext();

  const [showSelected, setShowSelected] = useState(false);
  const [sussiPersons, setSussiPersons] = useState<number>(1);

  const router = useRouter();

  // Clear postal code and redirect
  const clearPostalCode = () => {
    setPostalCode(null);
    router.push("/province");
  };

  useEffect(() => {
    // Redirect to previous page if postalCode is missing
    if (!postalCode && !isLoading) {
      router.back();
    }
  }, [postalCode, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="flex size-full flex-1 items-center justify-center">
      <div className="flex flex-col md:flex-row size-full bg-white h-[89vh]">
        <div className="flex flex-col w-full lg:w-1/3 bg-gray-100 px-6 py-2">
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

          {selectedResults.length > 0 && showSelected &&
            <div className="flex flex-col w-full items-center justify-center mt-8 bg-neutral-200 px-4 py-1 rounded-md">
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
            </div>
          }
        </div>
        <div className="flex flex-col w-full lg:w-2/3 bg-white p-3 space-y-4 h-full overflow-auto scrollbar-hide pb-10">
          <div className="flex w-full justify-between items-center">
            <h2 className="text-xl font-bold text-neutral-900">Results</h2>
            <div className="flex flex-row space-x-1 items-center justify-center">
              {
                showSelected && (
                  <Button variant="ghost" className="text-xs text-purple-400 hover:text-purple-700 font-semibold hover:underline hover:bg-transparent" onClick={() => { setSelectedResults([]); setShowSelected(false); }}>
                    Deseleziona tutto
                  </Button>
                )
              }
              <XCircle size={24} className="text-neutral-900" onClick={() => { setPossibleResults([]); setSelectedResults([]); }} />
            </div>
          </div>
          <div className="flex space-x-4 justify-between">
            <div className="text-gray-500">Trovati {possibleResults.length}</div>
            <div className="text-gray-500">Selezionati {selectedResults.length}</div>
          </div>
          {(possibleResults.length > 0 && !showSelected) && (
            <div className="flex flex-col space-y-4">
              <ResultsList sussiPersons={sussiPersons} />
              {selectedResults.length >= 1 &&
                <div className="flex z-10 absolute bottom-12 w-[66.7%] p-2 right-0 bg-neutral-50/15 flex-row space-x-2 items-center justify-center">
                  <div className="flex flex-row space-x-2 items-center justify-center">
                    <Button
                      variant="outline"
                      className="p-4 text-lg font-normal bg-emerald-400 text-neutral-900"
                      onClick={() => setShowSelected(true)}>
                      Conferma Selezione
                    </Button>
                  </div>
                </div>}
            </div>
          )}
          {showSelected && (
            <div className="flex w-full p-10 flex-col space-y-4 items-center">
              <SelectedList sussiPersons={sussiPersons} />
            </div>
          )}
          {possibleResults.length === 0 && selectedResults.length === 0 && (
            <p className="text-gray-500">No results to display. Fill the form to calculate.</p>
          )}
        </div>
      </div>
    </div >
  );
}

export default CalculatorPage;
