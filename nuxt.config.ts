// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      contactWa: '6281586245143',
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@vercel/analytics'],
  css: ['~/assets/css/main.css'],
  vite: {
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger']
    }
  },
  nitro: {
    externals: {
      external: ['@prisma/client', '@prisma/adapter-pg']
    },
    routeRules: {
      '/**': {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        },
      },
    },
  }
})




