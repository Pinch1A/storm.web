"use client"

import { CustomAccordion, CustomAccordionItem } from "@/components/SpecialAccordion"
import { PossibleResultType } from "@/types";
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useResultsContext } from "@/context/ResultsContext";
import cx from "classnames";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import SelectedItem from "@/components/SelectedCard"
import { useEffect, useState } from "react";


const ItemWrapper = ({ selectedResults, sussiPersons }: { selectedResults: PossibleResultType[], sussiPersons: number }) => {
  return (
    selectedResults.map((result, index) => (
      <CarouselItem key={`${result.product.name}-${index}`} className="basis-full">
        <SelectedItem
          key={`${result.product.name}-${index}`}
          result={result}
          sussiPersons={sussiPersons}
        />
      </CarouselItem>
    ))
  )
}

export const SelectedList = ({
  sussiPersons,
}: {
  sussiPersons: number;
}) => {
  const { selectedResults } = useResultsContext();

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)


  useEffect(() => {
    if (!api) {
      return
    }

    // Imposta il conteggio delle scroll snaps
    const snapList = api.scrollSnapList()
    setCount(snapList.length)

    // Imposta lo stato corrente basato sulla scroll snap selezionata
    setCurrent(api.selectedScrollSnap())

    // Handler per l'evento 'select'
    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    // Aggiungi il listener dell'evento 'select'
    api.on("select", handleSelect)

    // Pulisci il listener quando il componente si smonta o l'api cambia
    return () => {
      api.off("select", handleSelect)
    }
  }, [api])



  return (

    <div className="flex flex-col w-full">
      <Carousel setApi={setApi} className="flex flex-col w-full">
        <CarouselContent className="-ml-1">
          {/* <ItemWrapper selectedResults={selectedResults} sussiPersons={sussiPersons} /> */}
          {selectedResults.map((result, index) => (
            <CarouselItem key={`${result.product.name}-${index}`} className="basis-full">
              <SelectedItem key={result.product.id} result={result} sussiPersons={sussiPersons} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex flex-row space-x-2 items-center justify-center mt-8">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className={cx("w-32 h-2 rounded-full cursor-pointer", {
              "bg-blue-500": current === index,
              "bg-gray-500": current !== index
            })}
              onClick={() => {
                console.log("index", index)
                setCurrent(index);
                api?.scrollTo(index);
              }}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}
