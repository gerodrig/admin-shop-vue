import path from 'path';
import fs from 'fs';

import { backendApi } from "@/api/backendApi";
import { loginAction } from "@/modules/auth/actions";
import { createUpdateProductAction } from "@/modules/products/actions";
import type { Product } from "@/modules/products/interfaces/product.interface";

describe('createUpdateProductAction', () => {

    beforeAll(async () => {
        const response = await loginAction('test1@google.com', 'Abc123');

        if(!response.ok) {
            throw new Error('Failed to login');
        }

        localStorage.setItem('token', response.token);
    });
    
    test('Should create a new product', async () => {
        const product = {
            id: '',
            title: 'Product title',
            price: 100,
            description: 'Product description',
            slug: 'product-title',
            stock: 10,
            sizes: [],
            gender: 'kid',
            tags: [],
            images: [],
            user: {} as any,
        }

        const response = await createUpdateProductAction(product);

        await backendApi.delete(`/products/${response.id}`);

        expect(response).toEqual({
            ...product,
            id: expect.any(String),
            user: {
                email: 'test1@google.com',
                fullName: 'Test One',
                id: expect.any(String),
                isActive: true,
                roles: expect.any(Array),

            }
        });
    });

    test('Should update a product', async () => { 
        const products = await backendApi.get<Product[]>('/products');
        const product = products.data[0];
        const productId = product.id;

        const updatedProduct = {
            ...product,
            title: 'Updated Product',
            description: 'Updated description',
            stock: 10,
        };

        const response = await createUpdateProductAction(updatedProduct);

        expect(response).toEqual(expect.objectContaining({
            ...product,
            id: productId,
            title: 'Updated Product',
            description: 'Updated description',
            stock: 10,
        }));
     });

     test('Should upload product images', async () => {
        const imagePath = path.join(__dirname, '../../../fake', 't-shirt.jpg');
        const imageBuffer = fs.readFileSync(imagePath);

        const imageFile = new File([imageBuffer], 't-shirt.jpg', {type: 'image/jpg'});

        const product: Product = {
            id: '',
            title: 'Product title',
            price: 100,
            description: 'Product description',
            slug: 'product-title',
            stock: 10,
            sizes: [],
            gender: 'kid',
            tags: [],
            images: [imageFile] as any,
            user: {} as any,
        };

        const {images, id } = await createUpdateProductAction(product);

        const [img1] = images;
        expect(typeof img1).toBe('string');

        await backendApi.delete(`/products/${id}`);
     });
});