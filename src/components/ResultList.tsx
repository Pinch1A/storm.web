import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useResultsContext } from "@/context/ResultsContext";
import { PossibleResultType } from "@/types";
import cx from "classnames";
import { useMemo } from "react";

export default function ResultsList({ results, sussiPersons }: { results: PossibleResultType[], sussiPersons: number }) {
  const { selectedResults, setSelectedResults } = useResultsContext();

  const toggleSelectedResult = (result: PossibleResultType) => {
    const isAlreadySelected = selectedResults.some(
      (selected: PossibleResultType) => selected.product.id === result.product.id
    );

    if (isAlreadySelected) {
      setSelectedResults(selectedResults.filter((item: PossibleResultType) => item.product.id !== result.product.id));
    } else {
      setSelectedResults([...selectedResults, result]);
    }
  };

  const isSelected = (result: PossibleResultType) =>
    selectedResults.some((item: PossibleResultType) => item.product.id === result.product.id);

  // Precompute sussistenza values for all results to avoid recalculating during each render
  const computedResults = useMemo(() => {
    return results.map((result) => {
      const redditoMensile = result.requestValues.reddito?.amount ? parseFloat(result.requestValues.reddito.amount.toString()) / (result.requestValues.reddito.type === 'Annual' ? 12 : 1) : 0;
      const financialDebtsMensile = result.requestValues.financialDebts?.amount ? parseFloat(result.requestValues.financialDebts.amount.toString()) / (result.requestValues.financialDebts.type === 'Annual' ? 12 : 1) : 0;

      const hasRRIssues = result.proposal?.some((proposal) => proposal.incomeFeePerc >= result.product.rr_threshold);
      const matchingSussistenza = result.product.bank?.sussistenza?.find(
        (sussistenza) => sussistenza.persons === sussiPersons
      );
      const hasGeneralIssues = !!((redditoMensile - financialDebtsMensile - (result.proposal?.[0]?.fee ?? 0)) <= 0);
      return { ...result, matchingSussistenza, hasRRIssues, hasGeneralIssues };
    });
  }, [results, sussiPersons]);

  console.log("computedResults", computedResults);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {computedResults.map((result, index) => (
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
          <CardHeader className="p-2">
            <CardTitle className="text-lg font-bold h-5">{result.product.name}</CardTitle>
            <div className="flex flex-row space-x-1 items-center self-end">
              {result.hasGeneralIssues && <div className="text-white bg-red-500 text-xs border border-red-500 rounded-md p-1">Problema !</div>}
              {result.hasRRIssues && <div className="text-white bg-red-500 text-xs border border-red-500 rounded-md p-1">R/R</div>}
            </div>
          </CardHeader>
          <CardContent className="p-3">
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
          <CardContent className="p-2">
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
                  <div className="text-gray-500 text-right">R/R</div>
                  <div className="text-gray-700 text-right">{`${proposal.incomeFeePerc?.toFixed(2)}%` ?? "N/A"}</div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex m-2 p-3 flex-row items-center justify-between bg-gray-50 rounded-md">
            <div className="text-gray-500">Sussistenza</div>
            <div className="text-gray-700">{result.matchingSussistenza?.value ?? "Non disponibile"}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
