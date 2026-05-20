<template>
  <header
    :class="[
      'fixed top-0 left-0 w-full z-[80] transition-all duration-500 px-6 py-6 md:px-20',
      isScrolled ? 'bg-black/20 backdrop-blur-md py-4' : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo Area -->
      <div></div>

      <!-- Navigation Desktop -->
      <nav class="hidden md:flex items-center gap-10 text-sm tracking-[0.2em] font-bold uppercase text-white/80 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
        <a href="#" @click.prevent="scrollTo('.trigger-zone-2')" class="hover:text-white transition-colors">Projects</a>
        <a href="#" @click.prevent="scrollTo('.trigger-zone-3')" class="hover:text-white transition-colors">Testimonials</a>
        <a href="#" @click.prevent="scrollTo('.trigger-zone-4')" class="hover:text-white transition-colors">Partnership</a>
      </nav>

      <!-- CTA + Hamburger (Mobile) -->
      <div class="flex items-center gap-3">
        <!-- <button @click="$emit('open-form')" class="bg-white text-black text-sm font-black uppercase tracking-widest px-6 py-3 rounded-full hover:bg-gray-200 transition-all active:scale-95 shadow-xl">
          Apply Now
        </button> -->

        <!-- Hamburger -->
        <button
          @click="menuOpen = !menuOpen"
          class="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition-colors"
          aria-label="Toggle menu"
        >
          <span class="block w-5 h-0.5 bg-white transition-all duration-300" :class="menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''"></span>
          <span class="block w-5 h-0.5 bg-white transition-all duration-300" :class="menuOpen ? 'opacity-0' : ''"></span>
          <span class="block w-5 h-0.5 bg-white transition-all duration-300" :class="menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <Transition name="menu">
      <nav
        v-if="menuOpen"
        class="md:hidden mt-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden"
      >
        <a
          href="#"
          @click.prevent="navClick('.trigger-zone-2')"
          class="block px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white hover:bg-white/5 transition-colors border-b border-white/10"
        >Projects</a>
        <a
          href="#"
          @click.prevent="navClick('.trigger-zone-3')"
          class="block px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white hover:bg-white/5 transition-colors border-b border-white/10"
        >Testimonials</a>
        <a
          href="#"
          @click.prevent="navClick('.trigger-zone-4')"
          class="block px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white hover:bg-white/5 transition-colors"
        >Partnership</a>
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
  const top = el.offsetTop + el.offsetHeight * 0.33 - window.innerHeight * 0.5
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
