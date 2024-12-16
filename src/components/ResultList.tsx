import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { PossibleResultType } from "@/types";
import cx from "classnames";
import { useMemo } from "react";

export default function ResultsList({ results, sussiPersons }: { results: PossibleResultType[], sussiPersons: number }) {

  const { selectedResults, setSelectedResults } = useAppContext();

  const toggleSelectedResult = (result: PossibleResultType) => {
    const isAlreadySelected = selectedResults.some(
      (selected) => selected.product.id === result.product.id
    );

    if (isAlreadySelected) {
      setSelectedResults(selectedResults.filter((item) => item.product.id !== result.product.id));
    } else {
      setSelectedResults([...selectedResults, result]);
    }
  };

  const isSelected = (result: PossibleResultType) =>
    selectedResults.some((item) => item.product.id === result.product.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((result, index) => {
        console.log('sussiPersons', sussiPersons);
        const matchingSussistenza = useMemo(() => {
          return result.product.bank?.sussistenza?.find((sussistenza) => sussistenza.persons === sussiPersons);
        }, [result.product.bank?.sussistenza, sussiPersons]);

        console.log('matchingSussistenza', matchingSussistenza);
        return (
          <Card
            key={`${result.product.id}-${index}`}
            className={cx(
              "cursor-pointer border transition-colors",
              {
                "bg-indigo-100 border-indigo-500": isSelected(result),
                "bg-white border-gray-200": !isSelected(result),
              }
            )}
            onClick={() => toggleSelectedResult(result)}
          >
            <CardHeader>
              <CardTitle className="text-lg font-bold">{result.product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="text-gray-500">Montante</div>
                  <div className="text-gray-700">{result.requestValues.amount}</div>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="text-gray-500">LTV</div>
                  <div className="text-gray-700">{result.requestValues.ltv}</div>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="text-gray-500">Anni</div>
                  <div className="text-gray-700">{result.requestValues.years}</div>
                </div>
              </div>
            </CardContent>
            <CardContent>
              {result.proposal?.map((proposal, idx) => (
                <div
                  key={idx}
                  className="flex w-full justify-between py-2 px-2 bg-gray-100 rounded-md mb-2"
                >
                  <div className="flex flex-col">
                    <div className="text-gray-500">Rata</div>
                    <div className="text-gray-700">{proposal.fee.toFixed(2)}€</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-gray-500">Tasso</div>
                    <div className="text-gray-700">{proposal.tan.toFixed(2)}%</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-gray-500">R/R</div>
                    <div className="text-gray-700">{proposal.incomeFeePerc ?? "N/A"}</div>
                  </div>
                </div>
              ))}
            </CardContent>
            {isSelected(result) && <CardFooter className="flex flex-row items-center justify-between bg-gray-50 rounded-md p-4">
              <div className="text-gray-500">Sussistenza</div>
              <div className="text-gray-700">{matchingSussistenza?.value ?? "Non disponibile"}</div>
            </CardFooter>}
          </Card>
        )
      })}
    </div>
  );
}
