import { getProductImageAction } from '@/modules/products/actions/get-product-image.action';

describe('getProductImageAction', () => {

  test('Should return proper image URL', () => {
    const imageName = 'test.jpg';
    const url = getProductImageAction(imageName);

    const expectedUrl = `${import.meta.env.VITE_BACKEND_API_URL}/files/product/${imageName}`;

    expect(url).toBe(expectedUrl);
  });
});
