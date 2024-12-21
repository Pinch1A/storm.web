"use client"

import { PossibleResultType } from "@/types";
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useResultsContext } from "@/context/ResultsContext";
import cx from "classnames";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { AlignRight } from "@phosphor-icons/react";

const SelectedItem = ({
  result,
  sussiPersons,
}: {
  result: PossibleResultType;
  sussiPersons: number;
}) => {

  const [showPolizze, setShowPolizze] = useState(false);
  // Precompute sussistenza values for all possibleResults to avoid recalculating during each render
  const computedResult = useMemo(() => {
    // const results = possibleResults.map((result) => {
    const redditoMensile = result.requestValues.reddito?.amount ? parseFloat(result.requestValues.reddito.amount.toString()) / (result.requestValues.reddito.type === 'Annual' ? 12 : 1) : 0;
    const financialDebtsMensile = result.requestValues.financialDebts?.amount ? parseFloat(result.requestValues.financialDebts.amount.toString()) / (result.requestValues.financialDebts.type === 'Annual' ? 12 : 1) : 0;

    const hasRRIssues = result.proposal?.some((proposal) => proposal.incomeFeePerc >= result.product.rr_threshold);
    const matchingSussistenza = result.product.bank?.sussistenza?.find(
      (sussistenza) => sussistenza.persons === sussiPersons
    );
    const hasGeneralIssues = !!((redditoMensile - financialDebtsMensile - (result.proposal?.[0]?.fee ?? 0)) <= 0);
    return { ...result, matchingSussistenza, hasRRIssues, hasGeneralIssues };

    // console.log("computedResults", results);
    // return results;
  }, [result, sussiPersons]);

  return (
    <Card className="group">
      <CardHeader>
        <CardTitle>{computedResult.product.name}</CardTitle>
      </CardHeader>
      <CardDescription className="flex flex-col w-full -mt-4 pb-4 px-5">
        <div className="flex space-x-2">
          <Badge variant="outline" className="flex flex-row space-x-1">
            <div className="text-gray-500">Montante</div>
            <div className="text-gray-700">{computedResult.requestValues.amount}</div>
          </Badge>
          <Badge variant="outline" className="flex flex-row space-x-1">
            <div className="text-gray-500">LTV</div>
            <div className="text-gray-700">{computedResult.requestValues.ltv}</div>
          </Badge>
          <Badge variant="outline" className="flex flex-row space-x-1">
            <div className="text-gray-500">Anni</div>
            <div className="text-gray-700">{computedResult.requestValues.years}</div>
          </Badge>
        </div>
      </CardDescription>
      <CardContent className="flex flex-col w-full py-4">
        <Separator />
        <div
          className="flex w-full justify-between p-3 bg-gray-100 rounded-md my-2"
        >
          <div className="flex space-x-1">
            <div className="text-gray-500">Rata</div>
            <div className="text-gray-700">{computedResult.proposal?.[0].fee.toFixed(2)}€</div>
          </div>
          <div className="flex space-x-1">
            <div className="text-gray-500">Tasso</div>
            <div className="text-gray-700">{computedResult.proposal?.[0].tan.toFixed(2)}%</div>
          </div>
          <div className="flex space-x-1">
            <div className="text-gray-500 text-right">R/R</div>
            <div className="text-gray-700 text-right">{`${computedResult.proposal?.[0].incomeFeePerc?.toFixed(2)}%` ?? "N/A"}</div>
          </div>
        </div>
        <Separator />
        <div className="flex my-2 p-3 flex-row items-center justify-between rounded-md">
          <div className="flex flex-col">

            <div className="text-gray-500">Sussistenza </div>
            <div className="text-sm text-gray-300">Nucleo familiare di {sussiPersons} elementi</div>
          </div>
          <div className="text-gray-700">{computedResult.matchingSussistenza?.value ?? "Non disponibile"}</div>
        </div>
        <div className="flex my-2 p-3 flex-col items-start rounded-md">
          <div className="text-gray-500 pb-4">Condizioni</div>
          <div className="flex flex-col space-y-2 w-full">
            <div className="flex flex-row space-x-1 text-gray-700">
              <Badge variant="outline" className="flex flex-row space-x-1 w-full justify-between">
                <div className="text-gray-500">hasGeneralIssues</div>
                <div className={cx("text-gray-700", computedResult.hasGeneralIssues ? "text-red-500" : "text-green-500")}>{result.hasGeneralIssues ? "Non soddisfatta" : "Soddisfatta"}</div>
              </Badge>
            </div>
            <div className="flex flex-row space-x-1 text-gray-700">
              <Badge variant="outline" className="flex flex-row space-x-1 w-full justify-between">
                <div className="text-gray-500">hasRRIssues</div>
                <div className={cx("text-gray-700", computedResult.hasRRIssues ? "text-red-500" : "text-green-500")}>{result.hasRRIssues ? "Non soddisfatta" : "Soddisfatta"}</div>
              </Badge>
            </div>

          </div>
        </div>
        <div className="mt-4 self-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="outline" className="flex flex-row space-x-1" onClick={() => showPolizze()}>
            Vai al prossimo step <AlignRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export const SelectedList = ({
  sussiPersons,
}: {
  sussiPersons: number;
}) => {
  const { selectedResults } = useResultsContext();
  return (

    <Carousel className="flex flex-col w-full">
      <CarouselContent className="-ml-1">
        {selectedResults.map((result, index) => (
          <CarouselItem key={`${result.product.name}-${index}`} className="basis-full">
            <SelectedItem key={result.product.id} result={result} sussiPersons={sussiPersons} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex flex-row space-x-2 items-center justify-center">
        <CarouselNext />
        <CarouselPrevious />
      </div>
    </Carousel>
  )
}
