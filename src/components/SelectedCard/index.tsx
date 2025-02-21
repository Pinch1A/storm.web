"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CustomAccordion, CustomAccordionItem } from "@/components/SpecialAccordion"

import { PossibleResultType } from "@/types"
import cx from "classnames"
import SussistenzaSection from "./SussistenzaSection"
// import PolizzeSection from "./PolizzeSection"
// import ExtraSection from "./ExtraSection"

const SelectedItem = ({
  result,
  sussiPersons,
}: {
  result: PossibleResultType;
  sussiPersons: number;
}) => {

  // Precompute sussistenza values for all possibleResults to avoid recalculating during each render
  const computedResult = useMemo(() => {
    const redditoMensile = result.requestValues.reddito?.amount ? parseFloat(result.requestValues.reddito.amount.toString()) / (result.requestValues.reddito.type === 'Annual' ? 12 : 1) : 0;
    const financialDebtsMensile = result.requestValues.financialDebts?.amount ? parseFloat(result.requestValues.financialDebts.amount.toString()) / (result.requestValues.financialDebts.type === 'Annual' ? 12 : 1) : 0;

    // TODO: Calculate hasRRIssues and hasGeneralIssues based on the product.rata_reddito

    const hasRRIssues = result.proposal?.some((proposal) => proposal.incomeFeePerc >= result.product.rr_threshold);
    const matchingSussistenza = result.product.sussistenza.find(
      (sussistenza) => sussistenza.persons === sussiPersons
    );
    const hasGeneralIssues = !!((redditoMensile - financialDebtsMensile - (result.proposal?.[0]?.fee ?? 0)) <= 0);

    const polizze = result.product.bank?.polizze || [];
    const extras = [{ name: "Servizio extra 1" }, { name: "Servizio extra 2" }]
    return { ...result, matchingSussistenza, hasRRIssues, hasGeneralIssues, polizze, extras };

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
      {/* Accordions here !!! */}
      <CardContent className="flex flex-col w-full py-4">
        <CustomAccordion  >
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
              <div className="text-gray-700 text-right">{`${computedResult.proposal?.[0].incomeFeePerc ? computedResult.proposal?.[0].incomeFeePerc.toFixed(2) : "N/A"}%`}</div>
            </div>
          </div>
          <Separator />
          <CustomAccordionItem title="Sussistenza" value={'sussistenza'}>
            <SussistenzaSection sussistenza={computedResult.matchingSussistenza} sussiPersons={sussiPersons} />
          </CustomAccordionItem>
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
                  <div className="text-gray-500">Rata / Reddito validazione</div>
                  <div className={cx("text-gray-700", computedResult.hasRRIssues ? "text-red-500" : "text-green-500")}>{result.hasRRIssues ? "Non soddisfatta" : "Soddisfatta"}</div>
                </Badge>
              </div>

            </div>
          </div>
          {/* <CustomAccordionItem title="Polizze" value={'polizze'}>
            <PolizzeSection polizze={computedResult.polizze} sussiPersons={sussiPersons} />
          </CustomAccordionItem>
          <CustomAccordionItem title="Extra" value={'extra'}>
            <ExtraSection extras={computedResult.extras} />
          </CustomAccordionItem> */}
          {/* <div className="mt-4 self-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="outline" className="flex flex-row space-x-1" onClick={() => setShowPolizze(true)}>
              Vai al prossimo step <AlignRight className="w-4 h-4" />
            </Button>
          </div> */}
        </CustomAccordion>
      </CardContent>
    </Card>
  )
}

export default SelectedItem;
