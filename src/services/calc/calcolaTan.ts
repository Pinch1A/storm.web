/**
 * Calculate TAN (Nominal Annual Rate)
 * @param {number} periodicRate - The periodic interest rate (e.g., monthly rate in percentage)
 * @param {number} periodsPerYear - The number of periods in a year (e.g., 12 for monthly, 4 for quarterly)
 * @returns {number} - The TAN (Nominal Annual Rate) in percentage
 */
export const calculateTAN = (periodicRate: number) => {
  const periodsPerYear = 12; // Monthly payments

  if (periodicRate <= 0 || periodsPerYear <= 0) {
    throw new Error('Periodic rate and periods per year must be greater than zero.');
  }

  // Convert periodic rate to decimal
  const periodicRateDecimal = periodicRate / 100;

  // Calculate TAN
  const tan = periodicRateDecimal * periodsPerYear * 100; // Convert back to percentage

  return tan.toFixed(2); // Return TAN as a percentage with two decimal places
}

// Example usage:
// const monthlyRate = 0.5; // Monthly interest rate as percentage

// const tan = calculateTAN(monthlyRate);
// console.log(`The TAN is ${tan}%`);
