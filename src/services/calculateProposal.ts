import { getProductList } from "@/utils/productsStorage";
import { InterestItemType, PossibleResultType, ProductType, ProvinceItemType } from "@/types";
import { calcolaRataMensile } from "./calc/calcolaRata";
import { calcolaRR } from "./calc/calcolaRR";
import { FormFields } from "@/schemas/calcForm.schema";

export const calculate = async (formFields: FormFields, province: ProvinceItemType): Promise<PossibleResultType[]> => {
  // Get products from storage
  console.log('Calculate Proposal');

  const products = await getProductList();

  if (!products) {
    console.error("No products found in storage");
    return [];
  }

  // Process each product to filter interests based on LTV and years
  const results: PossibleResultType[] = products.map((product: ProductType) => {
    const filteredInterests = product.interests
      ?.filter((interest: InterestItemType) => {
        // Parse the LTV range (e.g., "10%-20%")
        const [minLTV, maxLTV] = interest.ltvRange.split('-').map((value) => parseFloat(value.replace('%', '')));

        // Parse the years range (e.g., "0-5")
        const [minYears, maxYears] = interest.years.split('-').map((value) => parseInt(value));

        // Check if the provided LTV and years are within the respective ranges
        const isLTVInRange = parseFloat(formFields.ltv) >= minLTV && parseFloat(formFields.ltv) <= maxLTV;
        const isYearInRange = parseInt(formFields.years) >= minYears && parseInt(formFields.years) <= maxYears;

        return isLTVInRange && isYearInRange;
      })
      .map((interest: InterestItemType) => {
        // Calculate the monthly fee
        const rata = calcolaRataMensile(parseFloat(formFields.amount), parseFloat(interest.rate), parseInt(formFields.years));
        const incomeFeePerc = formFields.reddito
          ? calcolaRR(rata, formFields.reddito.amount)
          : null; // Calculate income-to-fee ratio only if `reddito` is provided

        const financialDebtsEffect = formFields.financialDebts
          ? calcolaRR(rata, formFields.financialDebts.amount)
          : null; // Calculate the financial dependencies effect if available

        return {
          ...interest,
          tan: interest.rate, // Assuming TAN is already provided as `rate`
          fee: rata,
          incomeFeePerc, // Income-to-fee ratio
          financialDebtsEffect, // Financial dependencies effect
          isSelected: false,
        };
      });

    // Return the proposal for the product
    return {
      product,
      proposal: filteredInterests,
      requestValues: {
        years: formFields.years,
        ltv: formFields.ltv,
        amount: formFields.amount,
        reddito: formFields.reddito,
        financialDebts: formFields.financialDebts,
      },
      province,
    } as PossibleResultType;
  });

  // Filter to include only products with valid proposals
  const filteredResults = results.filter((result) => result.proposal && result.proposal.length > 0);

  return filteredResults;
};
