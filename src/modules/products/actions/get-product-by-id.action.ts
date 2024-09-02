import { backendApi } from "@/api/backendApi";
import type { Product } from "../interfaces/product.interface";
import { getProductImageAction } from "./get-product-image.action";


export const getProductById = async(productId: string): Promise<Product> => {
    //? new product creation
    if( productId === 'new-item') {

        return  {
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
        };
    }


    try {
        const { data } = await backendApi.get<Product>(`/products/${productId}`);

        return {
            ...data,
            images: data.images.map(getProductImageAction),
        };
    } catch (error) {
        // console.log(error);
        throw new Error(`Error while fetching product by id ${productId}`);
    }
};