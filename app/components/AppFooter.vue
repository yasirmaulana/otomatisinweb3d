<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<template>
  <footer class="relative z-10 py-8 px-4 md:px-6 border-t border-[#e9eaeb] bg-white">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div>
        <p class="text-[#717680] text-sm font-medium">
          &copy; 2025 Otomatisin Project.
        </p>
        <p class="text-[#a4a7ae] text-xs mt-1">Strategic IT Partner for Profit-Share Ventures.</p>
      </div>

      <div class="flex justify-start md:justify-end gap-6 text-sm font-medium text-[#535862]">
        <a href="#" class="hover:text-[#181d27] transition-colors">Privacy</a>
        <a href="#" class="hover:text-[#181d27] transition-colors">Terms</a>
        <a :href="`https://wa.me/${runtimeConfig.public.contactWa}`" target="_blank" rel="noopener noreferrer" class="hover:text-[#181d27] transition-colors">Contact</a>
      </div>
    </div>
  </footer>
</template>
