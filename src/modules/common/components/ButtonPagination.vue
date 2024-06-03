<template>
  <div class="flex justify-center py-10 space-x-3 bg-gray-100">
    <button
      :disabled="page === 1"
      @click="$router.push({ query: { page: page - 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-emerald-500 disabled:bg-gray-300 hover:bg-emerald-600 transition-all"
    >
      <ArrowLeftIcon />
      <span>Previous</span>
    </button>

    <button
      :disabled="hasMoreData"
      @click="$router.push({ query: { page: page + 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-emerald-500 disabled:bg-gray-300 hover:bg-emerald-600 transition-all"
    >
      <span>Next</span>
      <ArrowRightIcon />
    </button>
  </div>
</template>

<script lang="ts" setup>
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';

type Props = {
  page: number;
  hasMoreData: boolean;
};

defineProps<Props>();
</script>
