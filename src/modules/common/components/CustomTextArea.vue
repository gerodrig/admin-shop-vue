<template>
    <div>
      <textarea
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value ?? '')"
        @blur="$emit('blur')"
        :class="[
          'form-control',
          {
            'border-red-500': error,
          },
        ]"
      ></textarea>
      <span v-if="error" class="text-red-500">{{ capitalize(error) }}</span>
    </div>
  </template>
  
  <script lang="ts" setup>
  type Props = {
    modelValue?: string | number;
    error?: string;
    type?: 'text' | 'number';
  };
  
  withDefaults(defineProps<Props>(), {
    type: 'text',
  });
  
  defineEmits(['update:modelValue', 'blur']);
  
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1) + '.';
  </script>
  
  <style scoped>
  .form-control {
    @apply shadow h-32 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
  }
  </style>
  