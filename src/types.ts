
export interface ProvinceItemType {
  id: string;
  name: string;
  region: string;
  position: SussistenzaPositionType | null;
  size: SussistenzaSizeType | null;
}

export interface BankType {
  id: string;
  name: string;
  rr_method: 'bello' | 'brutto';
  sussistenza?: SussistenzaItemType[];
}

export interface ProductType {
  id: string;
  name: string;
  bank_id: string;
  interests?: InterestItemType[];
  type: 'fixed' | 'variable';
  bank?: BankType;
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
  amount: string | number | null;
  type: 'Monthly' | 'Annual' | null;
}

export interface FormFields {
  amount: string;
  ltv: string;
  years: string;
  financialDebts?: AmountAndType;
  familyVariation?: string;
  reddito?: AmountAndType;
  sussistenza?: number;
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
}

