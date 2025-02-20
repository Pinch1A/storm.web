import { InterestItemType, ProductType } from '@/types';

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

    // Format the data
    const formattedProducts = products.map((product: ProductType) => ({
      ...product,
      interests: product.interests
        ? product.interests.map((interest: InterestItemType) => ({
          ...interest,
          years: interest.years, // Use years as it is returned by the backend
        }))
        : [],
    }));

    console.log('formattedProducts', formattedProducts);
    return formattedProducts as ProductType[];
  } catch (error) {
    console.error('Error fetching Products data:', error);
    return [];
  }
};
