'use client';

import { createStorageUtil } from './storageUtil';
import { ProductType, ProvinceItemType, SussistenzaItemType } from '@/types';

const productStorage = createStorageUtil<ProductType[]>('products');
const provinceStorage = createStorageUtil<ProvinceItemType[]>('province');
const sussistenzaStorage = createStorageUtil<SussistenzaItemType[]>('sussistenza');
const userStorage = createStorageUtil<{ username: string }>('userSession');

// Consolidate all storage utilities into one manager
export const StorageManager = {
  products: productStorage,
  provinces: provinceStorage,
  sussistenza: sussistenzaStorage,
  user: userStorage,
};
