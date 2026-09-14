<script setup lang="ts">
defineProps<{
  message?: string | null;
}>();

defineEmits<{
  (e: 'retry'): void;
}>();
</script>

<template>
  <div class="rounded-xl border border-red-200 bg-red-50 p-6 text-center my-6">
    <div class="text-red-600 font-semibold mb-2">{{ message || 'Terjadi kesalahan saat memuat data.' }}</div>
    <button
      @click="$emit('retry')"
      class="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
    >
      Coba Lagi
    </button>
  </div>
</template>
