
interface RedditoType {
  amount: string | null;
  type: 'Monthly' | 'Annual' | null;
}

export function calcolaRR(rata: number, reddito?: RedditoType): number {

  if (!reddito || !rata || reddito.amount === '') {
    return 0;
  }
  const redditoValue = parseFloat(reddito?.amount || '0') / (reddito?.type === 'Annual' ? 12 : 1);
  // Calculate RR as percentage and round to 2 decimal places
  const rr = ((rata / redditoValue) * 100).toFixed(2);
  return parseFloat(rr);
}
