import { ProductType } from '@/types';
import { createStorageUtil } from './storageUtil';

const productStorage = createStorageUtil<ProductType[]>('products');

export const {
  saveData: saveProductList,
  getData: getProductList,
  clearData: clearProductList,
} = productStorage;
