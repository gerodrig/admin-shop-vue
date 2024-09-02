import { createRouter, createWebHashHistory } from "vue-router";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { shallowMount } from "@vue/test-utils";
import type { Mock } from "vitest";

import ProductsView from "@/modules/admin/views/ProductsView.vue";
import { fakeProducts } from "../../../../fake/products.fake";


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '',
            component: ProductsView
        }
    ]
});

vi.mock('@tanstack/vue-query', () => {
    return {
        useQueryClient: vi.fn().mockReturnValue({
            prefetchQuery: vi.fn(),
        }),
        useQuery: vi.fn(),
        useMutation: vi.fn()
    }
});

describe('<ProductsView />', () => {
    (useQuery as Mock).mockReturnValue({
        data: fakeProducts,
    });

    (window as any).scrollTo = vi.fn();

    const wrapper = shallowMount(ProductsView, {
        global: {
            plugins: [router]
        }
    });
    
    test('Should render with default values', async() => {

        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Should prefetch query on mounted', async() => {
        await router.replace('/?page=2');

        expect(useQueryClient().prefetchQuery).toHaveBeenCalledWith({
            queryKey: ['products', { page: 3 }],
            queryFn: expect.any(Function),
        });

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth'
        });

    });
});