import { backendApi } from '@/api/backendApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.action';

export const getProductsAction = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await backendApi.get<Product[]>(
      `/products?limit=${limit}&offset=${page * limit}`,
    );

    const products =  data.map((product) => ({
      ...product,
      images: product.images.map(getProductImageAction),
    }));

    // console.log('Products:', products)

    return products;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting products');
  }
};
