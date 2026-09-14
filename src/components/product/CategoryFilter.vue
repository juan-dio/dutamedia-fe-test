<script setup lang="ts">
import type { CategoryItem } from '../../types/product';

defineProps<{
  modelValue: string;
  categories: (CategoryItem | string)[];
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div class="relative w-full md:w-64">
    <select
      :value="modelValue"
      @change="handleChange"
      :disabled="disabled"
      class="w-full py-2.5 px-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 text-sm capitalize appearance-none cursor-pointer pr-8 disabled:bg-gray-100 disabled:cursor-not-allowed"
    >
      <option value="">All Categories</option>
      <option
        v-for="cat in categories"
        :key="typeof cat === 'string' ? cat : cat.slug"
        :value="typeof cat === 'string' ? cat : cat.slug"
      >
        {{ typeof cat === 'string' ? cat : cat.name }}
      </option>
    </select>
    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</template>
