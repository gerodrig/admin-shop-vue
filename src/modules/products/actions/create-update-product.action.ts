import { backendApi } from '@/api/backendApi';
import type { Product } from '../interfaces/product.interface';

export const createUpdateProductAction = async (product: Partial<Product>) => {
  const productId = product.id;

  const newImages = await uploadImages(product.images ?? []);
  product.images = newImages;
  
  product = cleanProductForUpdate(product);

  if (productId && productId !== '') {
    //? Update product
    return await updateProduct(productId, product);
  }

  //? Create product
  return await createProduct(product);
};

const cleanProductForUpdate = (product: Partial<Product>) => {
  const images: string[] =
    product.images?.map((image) =>
      image.startsWith('http') ? image.split('/').pop() ?? '' : image,
    ) ?? [];

  delete product.id;
  delete product.user;
  product.images = images;

  return product;
};

const updateProduct = async (productId: string, product: Partial<Product>) => {
  try {
    const { data } = await backendApi.patch<Product>(`/products/${productId}`, product);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error updating product');
  }
};

const createProduct = async (product: Partial<Product>) => {
  try {
    const { data } = await backendApi.post<Product>(`/products`, product);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating product');
  }
};

const uploadImages = async (images: (string | File)[]) => {
  const filesToUpload = images.filter((image) => image instanceof File) as File[];
  const currentImages = images.filter((image) => typeof image === 'string') as string[];

  const uploadPromises = filesToUpload.map(async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await backendApi.post<{ secureUrl: string }>('/files/product', formData);

      return data.secureUrl;
    } catch (error) {
      console.log(error);
      throw new Error('Error uploading image');
    }
  });
  const uploadedImages = await Promise.all(uploadPromises); //? Wait for all images to be uploaded

  return [...currentImages, ...uploadedImages];
};
