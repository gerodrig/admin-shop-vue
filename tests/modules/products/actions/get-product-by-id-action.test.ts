import { getProductById, getProductsAction } from "@/modules/products/actions";


describe('getProductById', () => {
    
    test('Should return empty product on create argument', async () => {
        const product = await getProductById('new-item');

        expect(product).toEqual({
            id: '',
            title: '',
            description: '',
            price: 0,
            images: [],
            sizes: [],
            slug: '',
            stock: 0,
            gender: '' as any,
            tags: [],
            user: {} as any,
        });
    });

    test('Should return a produc if ID is found', async () => {
        const products = await getProductsAction();
        const product = await getProductById(products[0].id);

        product.images.sort((a, b) => a.localeCompare(b));
        products[0].images.sort((a, b) => a.localeCompare(b));

        expect(product).toEqual(products[0]);
    });

    test('Should return empty product if ID is not found', async () => {
        try {
            await getProductById('not-found');
            expect(true).toBe(false);
        } catch (error: any) {
            expect(error.message).toBe('Error while fetching product by id not-found');
        }
    });
});