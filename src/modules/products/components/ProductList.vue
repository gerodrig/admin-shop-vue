<template>
  <section class="py-10 bg-gray-100">
    <div
      class="grid max-w-6xl grid-cols-1 gap-6 p-6 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import ProductCard from '@/modules/products/components/ProductCard.vue'
import type {Product} from '../interfaces/product.interface'

type Props = {
  products: Product[]
}

defineProps<Props>()
</script>
