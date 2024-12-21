// src/schemas/formSchema.ts
import { z } from "zod";

export const calcFormSchema = z.object({
  amount: z.string().min(1, { message: "Amount is required" }).regex(/^\d+$/, { message: "Must be a valid number" }),
  ltv: z.string().min(1, { message: "LTV is required" }).regex(/^\d+$/, { message: "Must be a valid number" }),
  years: z.string().min(1, { message: "Years is required" }).regex(/^\d+$/, { message: "Must be a valid number" }),
  reddito: z.object({
    amount: z.string().nullable(),
    type: z.union([z.literal("Monthly"), z.literal("Annual"), z.null()]).nullable(),
  }),
  financialDebts: z.object({
    amount: z.string().nullable(),
    type: z.union([z.literal("Monthly"), z.literal("Annual"), z.null()]).nullable(),
  }),
});

export type FormFields = z.infer<typeof calcFormSchema>;
