<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const localValue = ref(props.modelValue);
let timer: ReturnType<typeof setTimeout> | null = null;

watch(
  () => props.modelValue,
  (newVal) => {
    localValue.value = newVal;
  }
);

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  localValue.value = target.value;

  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    emit('update:modelValue', localValue.value);
  }, 400);
}

function clearInput() {
  localValue.value = '';
  if (timer) {
    clearTimeout(timer);
  }
  emit('update:modelValue', '');
}

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
});
</script>

<template>
  <div class="relative w-full">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      :value="localValue"
      @input="handleInput"
      placeholder="Cari produk..."
      class="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm"
    />
    <button
      v-if="localValue"
      @click="clearInput"
      class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
