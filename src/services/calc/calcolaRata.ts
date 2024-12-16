/**
 * Calculate the annual mortgage fee.
 * @param {number} C - The loan amount (C).
 * @param {number} ia - The annual interest rate (ia), as a percentage (e.g., 5 for 5%).
 * @param {number} na - The loan term in years (na).
 * @returns {number} - The annual mortgage fee (Ra).
 */

export function calcolaRataMensile(C: number, ia: number, na: number): number {

    // console.log('--------------------------------');
    // console.log('calcolaRataMensile');
    // console.log('C', C);
    // console.log('ia', ia);
    // console.log('na', na);
    // console.log('--------------------------------');

  if (C <= 0 || ia <= 0 || na <= 0) {
    throw new Error("Loan amount, annual rate, and years must be greater than zero.");
  }

  // Convert annual interest rate to a decimal
  const interestFee = ia / 100;
  const monthlyInterestRate = interestFee / 12; // Monthly interest rate
  const numRate = na * 12; // Total number of monthly payments

  // Monthly payment formula
  const monthlyPayment = (C * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numRate));

  // console.log(`La rata mensile è: €${monthlyPayment.toFixed(2)}`);
  return monthlyPayment;
}

// Example Usage:
// const capitale = 150000; // Loan amount (€)
// const interesseAnnuale = 5; // Annual interest rate (%)
// const anni = 1; // Loan term in years

// const rataMensile = calcolaRataMensile(capitale, interesseAnnuale, anni);
// console.log(`La rata mensile è: €${rataMensile.toFixed(2)}`);
