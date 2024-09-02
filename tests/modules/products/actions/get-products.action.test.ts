import { getProductsAction } from '@/modules/products/actions';

describe('getProductsAction', async () => {
  const products = await getProductsAction(1, 10);

  test('should return expected products', () => {
    expect(products.length).toBe(10);

    expect(products[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      price: expect.any(Number),
      description: expect.any(String),
      slug: expect.any(String),
      stock: expect.any(Number),
      sizes: expect.any(Array),
      gender: expect.any(String),
      tags: expect.any(Array),
      images: expect.any(Array),
      user: expect.any(Object),
    });
  });

  test('Products should have a full iamge URL', () => {
    products.forEach((product) => {
      product.images.forEach((image) => {
        expect(image).toContain(`${import.meta.env.VITE_BACKEND_API_URL}/files/product`);
      });
    });
  });
});
