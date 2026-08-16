<template>
  <header
    :class="[
      'fixed top-0 left-0 w-full z-[80] transition-all duration-300 px-4 py-4 md:px-6',
      isScrolled ? 'bg-white/95 backdrop-blur-sm border-b border-[#e9eaeb] shadow-sm' : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="text-lg font-bold tracking-tight" :class="isScrolled ? 'text-[#181d27]' : 'text-white'">
        Otomatisin
      </div>

      <nav class="hidden md:flex items-center gap-8 text-sm font-semibold">
        <a href="#projects" @click.prevent="scrollTo('#projects')" class="transition-colors" :class="isScrolled ? 'text-[#535862] hover:text-[#181d27]' : 'text-white/80 hover:text-white'">Live Case Study</a>
        <a href="#partnership" @click.prevent="scrollTo('#partnership')" class="transition-colors" :class="isScrolled ? 'text-[#535862] hover:text-[#181d27]' : 'text-white/80 hover:text-white'">Partnership</a>
      </nav>

      <div class="flex items-center gap-3">
        <button
          @click="$emit('open-form')"
          class="hidden md:inline-flex btn-primary"
        >
          Apply Now
        </button>

        <button
          @click="menuOpen = !menuOpen"
          class="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl transition-colors"
          :class="isScrolled ? 'bg-[#f5f5f5] hover:bg-[#e9eaeb]' : 'bg-white/10 backdrop-blur hover:bg-white/20'"
          aria-label="Toggle menu"
        >
          <span class="block w-5 h-0.5 transition-all duration-300" :class="[menuOpen ? 'rotate-45 translate-y-[6.5px]' : '', isScrolled ? 'bg-[#181d27]' : 'bg-white']"></span>
          <span class="block w-5 h-0.5 transition-all duration-300" :class="[menuOpen ? 'opacity-0' : '', isScrolled ? 'bg-[#181d27]' : 'bg-white']"></span>
          <span class="block w-5 h-0.5 transition-all duration-300" :class="[menuOpen ? '-rotate-45 -translate-y-[6.5px]' : '', isScrolled ? 'bg-[#181d27]' : 'bg-white']"></span>
        </button>
      </div>
    </div>

    <Transition name="menu">
      <nav
        v-if="menuOpen"
        class="md:hidden mt-3 rounded-xl bg-white border border-[#e9eaeb] shadow-lg overflow-hidden"
      >
        <a href="#projects" @click.prevent="navClick('#projects')" class="block px-5 py-3 text-sm font-medium text-[#535862] hover:text-[#181d27] hover:bg-[#fafafa] border-b border-[#e9eaeb]">Live Case Study</a>
        <a href="#partnership" @click.prevent="navClick('#partnership')" class="block px-5 py-3 text-sm font-medium text-[#535862] hover:text-[#181d27] hover:bg-[#fafafa]">Partnership</a>
        <div class="p-3 border-t border-[#e9eaeb]">
          <button @click="$emit('open-form')" class="btn-primary-full">Apply Now</button>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['open-form'])

const isScrolled = ref(false)
const menuOpen = ref(false)

if (process.client) {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
}

const scrollTo = (selector) => {
  const el = document.querySelector(selector)
  if (!el) return
  const rect = el.getBoundingClientRect()
  const top = window.scrollY + rect.top - 80
  window.scrollTo({ top, behavior: 'smooth' })
}

const navClick = (selector) => {
  menuOpen.value = false
  setTimeout(() => scrollTo(selector), 150)
}
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: all 0.25s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
