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
import { FormFields, calcFormSchema } from "@/schemas/calcForm.schema"; // Import the schema used in AppContext
import { useEffect } from "react";
import { calculate } from "@/lib/calculator";

export default function CalcForm() {
  const { formData, setFormData, postalCode, setPossibleResults } = useAppContext();

  const form = useForm<FormFields>({
    resolver: zodResolver(calcFormSchema),
    defaultValues: formData || {}, // Use centralized formData
  });

  const handleFormSubmit = async (data: FormFields) => {
    console.log("Handle Form Submit:", data);
    console.log("postalCode:", postalCode);
    setFormData(data); // Update context
    const possibleResults = postalCode?.id ? await calculate(data, postalCode) : [];
    setPossibleResults(possibleResults);
    console.log("Form Submitted:", data);
  };

  useEffect(() => {
    console.log('errors', form.formState.errors)
  }, [form.formState.errors])

  useEffect(() => {
    console.log("FormData:", form.getValues());
  }, [form.getValues()]);

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
        className="space-y-6"
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
                  className="bg-white text-neutral-400"
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
                  className="bg-white text-neutral-400"
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
                  className="bg-white text-neutral-400"
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
                  value={field.value?.toString() || ""}
                  className="bg-white text-neutral-400"
                  placeholder="Enter Reddito"
                />
              </FormControl>
              {renderCheckboxGroup(field.value?.toString(), "reddito.type")}
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
                  value={field.value?.toString() || ""}
                  className="bg-white text-neutral-400"
                  placeholder="Enter Financial Debts"
                />
              </FormControl>
              {renderCheckboxGroup(field.value?.toString(), "financialDebts.type")}
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Calculate
        </Button>
      </form>
    </Form>
  );
}
