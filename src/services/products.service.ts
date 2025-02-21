import { InterestItemType, ProductType } from '@/types';
import { isNil } from 'lodash/fp';
export const fetchProductsData = async (): Promise<ProductType[]> => {
  try {
    const productResponse = await fetch('/api/data/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!productResponse.ok) {
      throw new Error(`Failed to fetch products: ${productResponse.statusText}`);
    }

    const products = await productResponse.json();

    const filteredProducts = products.filter((product: ProductType) => product.interest && product.interest?.some(interest => !isNil(interest)));
    // Format the data
    const formattedProducts = filteredProducts.map((product: ProductType) => ({
      ...product,
      interest: product.interest
        ? product.interest.map((interest: InterestItemType) => ({
          ...interest,
          years: interest.years, // Use years as it is returned by the backend
        }))
        : [],
    }));

    return formattedProducts as ProductType[];
  } catch (error) {
    console.error('Error fetching Products data:', error);
    return [];
  }
};
