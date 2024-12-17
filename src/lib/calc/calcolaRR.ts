import { AmountAndType } from "../../types";

export function calcolaRR(rataMensile: number, rrMethod: string, reddito?: AmountAndType, financialDebts?: AmountAndType): number | null {

  if (!reddito || !rataMensile || !reddito.amount || reddito.amount === '') {
    return null;
  }

  const redditoMensile = parseFloat(reddito.amount.toString()) / (reddito.type === 'Annual' ? 12 : 1);
  const financialDebtsMensile = financialDebts?.amount ? parseFloat(financialDebts.amount.toString()) / (financialDebts.type === 'Annual' ? 12 : 1) : 0;
  let rr;

  if (rrMethod === 'bello') {
    // bello
    rr = ((rataMensile / (redditoMensile - financialDebtsMensile)) * 100).toFixed(2);
  } else {
    // brutto
    rr = (((rataMensile - financialDebtsMensile) / redditoMensile) * 100).toFixed(2);
  }

  return parseFloat(rr);
}
