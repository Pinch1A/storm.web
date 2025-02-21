'use client'

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppContext } from "@/context/AppContext";
import { useResultsContext } from "@/context/ResultsContext";
import { FormFields, calcFormSchema } from "@/schemas/calcForm.schema"; // Import the schema used in AppContext
import { calculate } from "@/services/calculateProposal";
import { useRouter } from "next/navigation";
import { PossibleResultType } from "@/types";

export default function CalcForm() {
  const { formData, setFormData, postalCode } = useAppContext();

  const { possibleResults, setPossibleResults } = useResultsContext();

  const router = useRouter();
  const form = useForm<FormFields>({
    resolver: zodResolver(calcFormSchema),
    defaultValues: formData || {}, // Use centralized formData
  });

  const handleFormSubmit = async (data: FormFields) => {
    setFormData(data); // Update context
    if (postalCode) {
      const response: PossibleResultType[] = await calculate(data, postalCode);
      if (possibleResults.length > 0 && possibleResults[0].requestValues !== data) {
        // combine the two arrays
        setPossibleResults([...possibleResults, ...response]);

      } else {
        setPossibleResults(response);
      }
    } else {
      console.log("no postal code")
      router.back();
    }
  };

  const renderCheckboxGroup = (
    fieldValue: string | null | undefined,
    fieldName: "reddito.type" | "financialDebts.type"
  ) => (
    fieldValue && (
      <div className="flex items-center justify-start space-x-5 mt-2">
        <FormLabel className="text-neutral-400">Type</FormLabel>
        <Controller
          name={fieldName}
          control={form.control}
          render={({ field }) => (
            <>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={field.value === "Monthly"}
                  onCheckedChange={(checked) =>
                    field.onChange(checked ? "Monthly" : null)
                  }
                />
                <span className="text-neutral-600">Monthly</span>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={field.value === "Annual"}
                  onCheckedChange={(checked) =>
                    field.onChange(checked ? "Annual" : null)
                  }
                />
                <span className="text-neutral-600">Annual</span>
              </div>
            </>
          )}
        />
      </div>
    )
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)} // Directly pass handleSubmit
        className="space-y-2"
      >
        {/* Amount Field */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-400">Amount</FormLabel>
              <FormControl>
                <Input
                  className="!bg-white"
                  placeholder="Enter amount"
                  {...field}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.amount?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* LTV Field */}
        <FormField
          control={form.control}
          name="ltv"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-400">Loan-to-Value (LTV)</FormLabel>
              <FormControl>
                <Input
                  className="bg-white "
                  placeholder="Enter LTV"
                  {...field}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.ltv?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Years Field */}
        <FormField
          control={form.control}
          name="years"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-400">Years</FormLabel>
              <FormControl>
                <Input
                  className="bg-white "
                  placeholder="Enter years"
                  {...field}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.years?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Reddito Field */}
        <FormField
          control={form.control}
          name="reddito.amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-400">Reddito</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={field.value || ""}
                  className="bg-white"
                  placeholder="Enter Reddito"
                />
              </FormControl>
              {renderCheckboxGroup(field.value, "reddito.type")}
            </FormItem>
          )}
        />

        {/* Financial Debts Field */}
        <FormField
          control={form.control}
          name="financialDebts.amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-400">Financial Debts</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={field.value || ""}
                  className="bg-white"
                  placeholder="Enter Financial Debts"
                />
              </FormControl>
              {renderCheckboxGroup(field.value, "financialDebts.type")}
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full !mt-8">
          Calculate
        </Button>
      </form>
    </Form>
  );
}
