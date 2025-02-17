// components/CustomAccordion.tsx

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ReactNode } from 'react';
import { ArrowLineDown } from "@phosphor-icons/react";

interface CustomAccordionProps {
  children: ReactNode;
}

interface CustomAccordionItemProps {
  value: string;
  title: string;
  children: ReactNode;
}

const CustomAccordionItem = ({ value, title, children }: CustomAccordionItemProps) => (
  <AccordionItem value={value} className="border-b border-gray-200">
    <AccordionTrigger className="flex justify-between items-center w-full py-4 text-left font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
      {title}
      {/* <ArrowLineDown size={24} className="transition-transform duration-200 chevron" /> */}
    </AccordionTrigger>
    <AccordionContent className="overflow-hidden text-gray-600 transition-all duration-200">
      <div className="p-4 bg-gray-50 rounded-md">
      {children}
      </div>
    </AccordionContent>
  </AccordionItem>
);

const CustomAccordion = ({ children }: CustomAccordionProps) => (
  <Accordion type="multiple" className="w-full">
    {children}
  </Accordion>
);

export { CustomAccordion, CustomAccordionItem };
