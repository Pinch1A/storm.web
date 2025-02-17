
export interface ProvinceItemType {
  id: string;
  name: string;
  region: string;
  position: SussistenzaPositionType | null;
  size: SussistenzaSizeType | null;
}

export interface PolizzeItemType {
  id: string;
  name: string;
  type: 'vita' | 'morte' | 'invalidita';
}

export interface BankType {
  id: string;
  name: string;
  rr_method: 'bello' | 'brutto';
  sussistenza?: SussistenzaItemType[];
  polizze?: PolizzeItemType[];
}

export interface ProductType {
  id: string;
  name: string;
  bank_id: string;
  interests?: InterestItemType[];
  type: 'fixed' | 'variable';
  bank?: BankType;
  rr_threshold: number;
}

export interface InterestItemType {
  id: string;
  product_id: string;
  ltvRange: string;
  years: string;
  rate: string;
}

export type SussistenzaPositionType = 'NORD' | 'CENTRO' | 'SUD' | 'ISOLATI';
export type SussistenzaSizeType = 'Metropoli' | 'GrandiCentri' | 'PiccoliCentri';

export interface SussistenzaItemType {
  id: string;
  persons: number;
  value: string;
  sussistenza_group_id: number;
  position: SussistenzaPositionType | null;
  size: SussistenzaSizeType | null;
}

export interface AmountAndType {
  amount: string | null;
  type: 'Monthly' | 'Annual' | null;
}

export interface FormFields {
  amount: string;
  ltv: string;
  years: string;
  financialDebts?: AmountAndType;
  reddito?: AmountAndType;
}

export interface SelectedResultType {
  tan: number;
  fee: number;
  incomeFeePerc: number;
  isSelected: boolean;
}

export interface PossibleResultType {
  product: ProductType;
  proposal: (InterestItemType & SelectedResultType)[] | undefined;
  requestValues: FormFields;
  province: ProvinceItemType;
  matchingSussistenza?: SussistenzaItemType | null;
  hasRRIssues?: boolean;
  hasGeneralIssues?: boolean;
}

