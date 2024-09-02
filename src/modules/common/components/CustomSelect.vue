<template>
  <div>
    <select
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLSelectElement)?.value ?? '')"
      @blur="$emit('blur')"
      :class="[
        'form-control',
        {
          'border-red-500': error,
        },
      ]"
    >
      <option value="">Select</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ capitalize(option) }}
      </option>
    </select>
    <span v-if="error" class="text-red-500">{{ capitalize(error) }}</span>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  modelValue?: string;
  error?: string;
  options: string[];
};

withDefaults(defineProps<Props>(), {
  options: () => ['Option 1', 'Option 2', 'Option 3'],
});

defineEmits(['update:modelValue', 'blur']);

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1) ?? '';
</script>

<style scoped>
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
