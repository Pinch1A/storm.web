import { ProductType } from '@/types';

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
    const formattedProducts = products.map((product: any) => ({
      ...product,
      interests: product.interest
        ? product.interest.map((interest: any) => ({
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
