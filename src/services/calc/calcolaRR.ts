import { RedditoType } from "../../types";

export function calcolaRR(rata: number, reddito?: RedditoType): number {

  console.log("reddito", reddito);
  console.log("rata", rata);
  if (!reddito || !rata || reddito.amount === '') {
    return 0;
  }


  const redditoValue = parseFloat(reddito?.amount || '0') / (reddito?.type === 'annual' ? 12 : 1);

  console.log("rata", rata);
  console.log("redditoValue", redditoValue);
  // Calculate RR as percentage and round to 2 decimal places
  const rr = ((rata / redditoValue) * 100).toFixed(2);

  return parseFloat(rr);
}
