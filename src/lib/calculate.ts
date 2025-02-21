import { FormFields, InterestItemType, PossibleResultType, ProductType, ProvinceItemType } from "@/types";
import { calcolaRataMensile } from "./calc/calcolaRata";
import { calcolaRR } from "./calc/calcolaRR";
import storageUtil from "@/utils/storageUtil";

export const calculate = async (formFields: FormFields, province: ProvinceItemType): Promise<PossibleResultType[]> => {
  // Get products from storage
  const products = await storageUtil.getData("productData");

  if (!products) {
    console.error("No products found in storage");
    return [];
  }

  // Process each product to filter interests based on LTV and years
  const results: PossibleResultType[] = products.map((product: ProductType) => {
    const filteredInterests = product.interest
      ?.filter((interest: InterestItemType) => {
        // Parse the LTV range (e.g., "10%-20%")
        const [minLTV, maxLTV] = interest.ltvrange.split('-').map((value) => parseFloat(value.replace('%', '')));

        // Parse the years range (e.g., "0-5")
        const [minYears, maxYears] = interest.years.split('-').map((value) => parseInt(value));

        // Check if the provided LTV and years are within the respective ranges
        const isLTVInRange = parseFloat(formFields.ltv) >= minLTV && parseFloat(formFields.ltv) <= maxLTV;
        const isYearInRange = parseInt(formFields.years) >= minYears && parseInt(formFields.years) <= maxYears;

        return isLTVInRange && isYearInRange;
      })
      .map((interest: InterestItemType) => {
        // Calculate the monthly fee and other derived values
        const rata = calcolaRataMensile(parseFloat(formFields.amount), parseFloat(interest.rate), parseInt(formFields.years));
        const rrMethod = product.bank?.rr_method;
        const reddito = formFields.reddito;
        const financialDebts = formFields.financialDebts || { amount: '0', type: 'Annual' };

        return {
          ...interest,
          tan: interest.rate, // Assuming TAN is already provided as `rate`
          fee: rata,
          incomeFeePerc: (reddito && rrMethod) ? calcolaRR(rata, rrMethod, reddito, financialDebts) : null, // Calculate income-to-fee ratio
          isSelected: false,
          sussistenza: product.sussistenza,
        };
      });

    // Return the proposal for the product
    const result = {
      product,
      proposal: filteredInterests,
      requestValues: {
        years: formFields.years,
        ltv: formFields.ltv,
        amount: formFields.amount,
      },
      province,
    } as PossibleResultType;

    return result;
  });

  // Filter to include only products with valid proposals
  const filteredResults = results.filter((result) => result.proposal && result.proposal.length > 0);

  return filteredResults;
};
