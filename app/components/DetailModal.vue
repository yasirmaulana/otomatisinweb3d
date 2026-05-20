<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl overflow-y-auto pt-24 pb-20 px-4 md:px-20">
      <div class="max-w-4xl mx-auto">
        <!-- Header Modal -->
        <div class="flex justify-between items-start md:items-center mb-10 flex-col md:flex-row gap-4">
          <div>
            <h2 class="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">{{ title }}</h2>
            <p class="text-gray-500 mt-2 text-sm">{{ subtitle }}</p>
          </div>
          <button @click="$emit('close')" class="w-12 h-12 shrink-0 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div class="rounded-[32px] p-6 md:p-10 border border-gray-200 bg-white shadow-sm">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  title: String,
  subtitle: String
})

defineEmits(['close'])
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
