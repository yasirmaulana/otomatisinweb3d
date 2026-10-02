<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

useHead({
  title: 'Otomatisin | Strategic IT Partner – Profit Share Model',
  meta: [
    { name: 'description', content: 'Kami membangun sistem digital untuk bisnis Anda tanpa biaya awal. Model kemitraan profit share – kami investasi teknologi, Anda fokus pada pasar.' }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800&display=swap' },
    { rel: 'preload', href: '/otomatisin-partner-video-rocket-web.mp4', as: 'video', type: 'video/mp4' }
  ]
})

const videoPlayer = ref(null)
const progressLine = ref(null)
const showLoader = ref(true)
const isFormOpen = ref(false)

const initExperience = () => {
  if (!process.client) return
  gsap.registerPlugin(ScrollTrigger)

  const sections = gsap.utils.toArray('.section-reveal')
  sections.forEach((section) => {
    gsap.to(section, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    })
  })

  setTimeout(() => { showLoader.value = false }, 400)
}

onMounted(() => {
  let loadInt = setInterval(() => {
    if (progressLine.value) {
      let cur = parseFloat(progressLine.value.style.width) || 0
      if (cur < 90) progressLine.value.style.width = (cur + Math.random() * 18) + '%'
    }
  }, 120)

  const handleLoaded = () => {
    clearInterval(loadInt)
    if (progressLine.value) progressLine.value.style.width = '100%'
    initExperience()
  }

  if (videoPlayer.value.readyState >= 1) {
    handleLoaded()
  } else {
    videoPlayer.value.addEventListener('loadedmetadata', handleLoaded)
  }
})
</script>

<template>
  <div class="selection:bg-[#fabc3f] selection:text-black">
    <AppHeader @open-form="isFormOpen = true" />
    <PartnershipForm :is-open="isFormOpen" @close="isFormOpen = false" />

    <!-- Preloader -->
    <Transition name="fade">
      <div v-if="showLoader" class="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center gap-5">
        <div class="text-[10px] tracking-[0.4em] text-[#717680] font-bold uppercase text-center">Initializing Systems</div>
        <div class="w-44 h-1 bg-[#f0f0f0] relative overflow-hidden rounded-full">
          <div ref="progressLine" class="absolute inset-y-0 left-0 bg-[#fabc3f] w-0 transition-all duration-300"></div>
        </div>
      </div>
    </Transition>

    <!-- Video Hero -->
    <section class="relative w-full h-[62vh] md:h-[72vh] bg-[#0a0d12] overflow-hidden">
      <video
        ref="videoPlayer"
        class="w-full h-full object-cover opacity-90"
        src="/otomatisin-partner-video-rocket-web.mp4"
        muted
        playsinline
        autoplay
        loop
        preload="auto"
      ></video>
      <div class="absolute inset-0 bg-gradient-to-b from-[#0a0d12]/40 via-transparent to-[#0a0d12]/80 pointer-events-none"></div>
      <div class="absolute inset-x-0 bottom-0 px-4 pb-10 md:pb-16 text-center">
        <span class="section-label">Strategic IT Partner</span>
        <h1 class="mt-4 text-3xl md:text-5xl font-bold text-white tracking-tight max-w-3xl mx-auto leading-tight">
          Bangun Produk Digital Tanpa Biaya IT di Awal
        </h1>
        <p class="mt-3 text-base md:text-lg text-white/70 max-w-2xl mx-auto">
          Kami investasi teknologi, Anda fokus pada pasar. Model kemitraan profit share untuk ide bisnis yang siap melaju.
        </p>
      </div>
    </section>

    <!-- Explanation Sections -->
    <main class="relative z-10 bg-white">

      <!-- Section 0: Strategic IT Partner -->
      <section id="why" class="section-reveal opacity-0 translate-y-8 px-4 py-16 md:py-24">
        <div class="max-w-3xl mx-auto">
          <div class="section-header mb-10">
            <span class="section-label">Mengapa Kami Berbeda</span>
            <h2 class="section-title mt-3">Partner Teknologi, Bukan Vendor Jasa</h2>
            <p class="section-desc">Membangun infrastruktur digital sendiri adalah pertaruhan yang mahal. Kami membuang risiko finansial tersebut dari pundak Anda.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="feature-card">
              <div class="w-10 h-10 rounded-xl bg-[#fff8eb] flex items-center justify-center mb-4 text-lg">🛡️</div>
              <h3 class="font-semibold text-[#181d27] mb-1">Zero Upfront Cost</h3>
              <p class="text-sm text-[#535862] leading-relaxed">Kami menanggung 100% biaya pengembangan sistem, server, hingga peluncuran MVP.</p>
            </div>
            <div class="feature-card">
              <div class="w-10 h-10 rounded-xl bg-[#fff8eb] flex items-center justify-center mb-4 text-lg">🤝</div>
              <h3 class="font-semibold text-[#181d27] mb-1">Skin in the Game</h3>
              <p class="text-sm text-[#535862] leading-relaxed">Kami hanya meraih keuntungan ketika sistem yang kami bangun menghasilkan profit untuk bisnis Anda.</p>
            </div>
          </div>

          <div class="feature-card-dark mt-4">
            <h3 class="font-semibold mb-2">Sistem yang Teruji</h3>
            <p class="text-sm text-[#d5d7da] leading-relaxed">Dari digitalisasi operasional retail tradisional hingga sistem manajemen armada lapangan yang kompleks, kami memastikan teknologi Anda siap menghadapi pasar sejak hari pertama.</p>
          </div>
        </div>
      </section>

      <!-- Section 1: Metodologi -->
      <section id="methodology" class="section-reveal opacity-0 translate-y-8 px-4 py-16 md:py-24 bg-[#fafafa]">
        <div class="max-w-4xl mx-auto">
          <div class="section-header mb-10">
            <span class="section-label">Metodologi</span>
            <h2 class="section-title mt-3">Dari Ide ke Evaluasi dalam 4 Minggu</h2>
            <p class="section-desc">Membangun bisnis digital bukan tentang siapa yang membuat sistem paling rumit di awal, melainkan siapa yang paling cepat memvalidasi kebutuhan pasar dengan risiko terkecil.</p>
          </div>

          <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="feature-card text-center">
              <div class="text-2xl mb-3">🚀</div>
              <h3 class="font-semibold text-[#181d27] text-sm mb-1">Minggu 1: Build</h3>
              <p class="text-xs text-[#535862]">Bangun MVP dalam 1 minggu dengan fitur inti yang menyelesaikan masalah utama.</p>
            </div>
            <div class="feature-card text-center">
              <div class="text-2xl mb-3">📊</div>
              <h3 class="font-semibold text-[#181d27] text-sm mb-1">Hari ke-8: Launch</h3>
              <p class="text-xs text-[#535862]">Rilis ke target pasar dan mulai kumpulkan umpan balik serta data nyata.</p>
            </div>
            <div class="feature-card text-center">
              <div class="text-2xl mb-3">🏁</div>
              <h3 class="font-semibold text-[#181d27] text-sm mb-1">Minggu 4: Evaluate</h3>
              <p class="text-xs text-[#535862]">Evaluasi metrik, interview pengguna, dan putuskan scale up, pivot, atau stop.</p>
            </div>
          </div> -->

          <div class="space-y-4">
            <div class="card text-left">
              <h4 class="font-semibold text-[#181d27] text-base mb-2">🚀 Minggu 1: Build</h4>
              <p class="text-sm text-[#414651] mb-3 leading-relaxed">Fokus utama adalah membangun MVP yang bisa digunakan pengguna nyata dalam satu minggu. Tidak perlu fitur lengkap, cukup alur utama yang menyelesaikan satu masalah besar.</p>
              <ul class="list-disc pl-5 space-y-1.5 text-sm text-[#535862]">
                <li><strong class="text-[#181d27]">Efisiensi Stack:</strong> Nuxt.js / Vue.js untuk antarmuka cepat, Django untuk backend yang aman.</li>
                <li><strong class="text-[#181d27]">Target Akhir:</strong> MVP siap diluncurkan sebelum hari ke-8.</li>
              </ul>
            </div>

            <div class="card text-left">
              <h4 class="font-semibold text-[#181d27] text-base mb-2">📊 Hari ke-8: Launch</h4>
              <p class="text-sm text-[#414651] mb-3 leading-relaxed">Setelah MVP siap, segera rilis ke target pasar. Tujuannya bukan viral, tetapi mendapatkan reaksi nyata secepat mungkin.</p>
              <ul class="list-disc pl-5 space-y-1.5 text-sm text-[#535862]">
                <li><strong class="text-[#181d27]">Fokus Kami:</strong> Memastikan sistem stabil, memantau performa, dan memperbaiki bug operasional yang muncul.</li>
                <li><strong class="text-[#181d27]">Fokus Anda:</strong> Menghubungi calon pengguna pertama, mengenalkan alur produk, dan mengumpulkan umpan balik langsung.</li>
                <li><strong class="text-[#181d27]">Target Akhir:</strong> Data perilaku pengguna asli yang menunjukkan bagian mana yang berharga.</li>
              </ul>
            </div>

            <div class="card text-left">
              <h4 class="font-semibold text-[#181d27] text-base mb-2">🏁 Minggu 4: Evaluate</h4>
              <p class="text-sm text-[#414651] mb-3 leading-relaxed">Minggu keempat adalah momen kejujuran. Kita duduk bersama, membuka data, dan melihat angka serta opini pengguna secara objektif.</p>
              <ul class="list-disc pl-5 space-y-1.5 text-sm text-[#535862]">
                <li><strong class="text-[#181d27]">Analisis Traksi:</strong> Metrik konversi, retensi, revenue, dan feedback kualitatif dari pengguna.</li>
                <li><strong class="text-[#181d27]">Pengambilan Keputusan:</strong> Scale up jika sinyal positif, pivot jika pasar merespons berbeda, atau stop secara terhormat jika tidak ada kebutuhan nyata.</li>
              </ul>
            </div>

            <div class="feature-card-dark">
              <h4 class="font-semibold mb-2">Mengapa Timeline Ini?</h4>
              <p class="text-sm text-[#d5d7da] leading-relaxed">Karena kami menaruh modal teknologi pada ide Anda. Satu minggu build memaksa kita fokus pada esensi, launch di hari ke-8 memastikan kita segera belajar dari pasar, dan evaluasi di minggu ke-4 memberikan cukup data untuk mengambil keputusan bisnis yang tepat.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Live Case Study -->
      <section id="portfolio" class="section-reveal opacity-0 translate-y-8 px-4 py-16 md:py-24 overflow-hidden">
        <div class="max-w-6xl mx-auto">
          <div class="section-header mb-10">
            <span class="section-label">Portofolio</span>
            <h2 class="section-title mt-3">Live Case Study</h2>
            <p class="section-desc">Produk nyata yang kami bangun, kelola, dan kembangkan bersama mitra.</p>
          </div>

          <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 md:-mx-0 md:px-0 scroll-smooth">
            <!-- PetaMinatBakat Card -->
            <div class="snap-start shrink-0 w-[88vw] md:w-[calc(50%-0.75rem)] bg-white rounded-2xl border border-[#e9eaeb] shadow-sm p-5 md:p-6 flex flex-col">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-11 h-11 rounded-xl bg-[#fff8eb] flex items-center justify-center text-xl">🧠</div>
                <div>
                  <h3 class="font-bold text-[#181d27] text-lg leading-tight">PetaMinatBakat</h3>
                  <p class="text-xs text-[#717680]">EdTech & Parenting Tech</p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 mb-4">
                <span class="tag">Web App</span>
                <span class="tag">AI Analysis</span>
                <span class="tag">PDF Export</span>
              </div>

              <p class="text-sm text-[#414651] leading-relaxed mb-4">Alat survei berbasis web untuk mengenali potensi anak dengan framework Islami "Nasab & Hasab". Menghasilkan laporan AI dengan radar chart, persona, dan rencana stimulasi mingguan.</p>

              <div class="highlight-bar mb-4">
                <ul class="space-y-1.5 text-sm text-[#535862]">
                  <li><strong class="text-[#181d27]">Tautan:</strong> <a href="https://petaminatbakat.otomatisin.web.id/" target="_blank" rel="noopener noreferrer" class="text-[#b2852d] hover:underline">petaminatbakat.otomatisin.web.id</a></li>
                  <li><strong class="text-[#181d27]">Model:</strong> Dikembangkan sebagai instrumen riset pemetaan potensi anak, dilengkapi saluran untuk berwakaf.</li>
                  <li><strong class="text-[#181d27]">Status:</strong> Live Operation & Iteration.</li>
                </ul>
              </div>

              <div class="mt-auto bg-[#fafafa] p-4 rounded-xl border border-[#e9eaeb] italic text-sm text-[#535862]">
                <span class="font-semibold not-italic block mb-1 text-[#181d27]">Kesimpulan</span>
                Membuktikan solusi digital dapat membantu orang tua memahami dan mengembangkan potensi anak secara personal.
              </div>
            </div>

            <!-- BAZARINAJA Card -->
            <div class="snap-start shrink-0 w-[88vw] md:w-[calc(50%-0.75rem)] bg-white rounded-2xl border border-[#e9eaeb] shadow-sm p-5 md:p-6 flex flex-col">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-11 h-11 rounded-xl bg-[#fff8eb] flex items-center justify-center text-xl">🛒</div>
                <div>
                  <h3 class="font-bold text-[#181d27] text-lg leading-tight">BAZARINAJA</h3>
                  <p class="text-xs text-[#717680]">Flash Sale & Social Commerce</p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 mb-4">
                <span class="tag">Flash Sale</span>
                <span class="tag">Social Commerce</span>
                <span class="tag">Charity</span>
              </div>

              <p class="text-sm text-[#414651] leading-relaxed mb-4">Platform flash sale barang NEW & PreLove dengan harga affordable. Hasil penjualan disalurkan sebagai sedekah untuk penghafal Al-Qur'an dan penuntut ilmu.</p>

              <div class="highlight-bar mb-4">
                <ul class="space-y-1.5 text-sm text-[#535862]">
                  <li><strong class="text-[#181d27]">Tautan:</strong> <a href="https://bazarinaja.otomatisin.web.id" target="_blank" rel="noopener noreferrer" class="text-[#b2852d] hover:underline">bazarinaja.otomatisin.web.id</a></li>
                  <li><strong class="text-[#181d27]">Model:</strong> Platform flash sale barang New & Preloved terjangkau, di mana hasil penjualan disalurkan sebagai sedekah untuk penghafal Al-Qur'an dan penuntut ilmu.</li>
                  <li><strong class="text-[#181d27]">Status:</strong> Live Operation.</li>
                </ul>
              </div>

              <div class="mt-auto bg-[#fafafa] p-4 rounded-xl border border-[#e9eaeb] italic text-sm text-[#535862]">
                <span class="font-semibold not-italic block mb-1 text-[#181d27]">Kesimpulan</span>
                Menggabungkan model jual-beli cepat dengan dampak sosial melalui alokasi hasil untuk kebaikan.
              </div>
            </div>

            <!-- MINTS Card -->
            <div class="snap-start shrink-0 w-[88vw] md:w-[calc(50%-0.75rem)] bg-white rounded-2xl border border-[#e9eaeb] shadow-sm p-5 md:p-6 flex flex-col">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-11 h-11 rounded-xl bg-[#fff8eb] flex items-center justify-center text-xl">🧕</div>
                <div>
                  <h3 class="font-bold text-[#181d27] text-lg leading-tight">MINTS</h3>
                  <p class="text-xs text-[#717680]">Muslim Marketplace & Modest Fashion</p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 mb-4">
                <span class="tag">Marketplace Muslim</span>
                <span class="tag">Pre-Order</span>
                <span class="tag">Flash Sale</span>
              </div>

              <p class="text-sm text-[#414651] leading-relaxed mb-4">Toko fashion modest premium dengan tagline "Elegan. Syar'i. Dibuat Sepenuh Hati." Menyediakan gamis, abaya, khimar, pashmina, dan tunik dengan pembayaran aman via Duitku.</p>

              <div class="highlight-bar mb-4">
                <ul class="space-y-1.5 text-sm text-[#535862]">
                  <li><strong class="text-[#181d27]">Tautan:</strong> <a href="https://mints.otomatisin.web.id/" target="_blank" rel="noopener noreferrer" class="text-[#b2852d] hover:underline">mints.otomatisin.web.id</a></li>
                  <li><strong class="text-[#181d27]">Model:</strong> E-commerce busana Muslimah dengan koleksi seasonal, pre-order, dan flash sale, lengkap dengan panduan ukuran dan kebijakan pengembalian.</li>
                  <li><strong class="text-[#181d27]">Status:</strong> Live Operation.</li>
                </ul>
              </div>

              <div class="mt-auto bg-[#fafafa] p-4 rounded-xl border border-[#e9eaeb] italic text-sm text-[#535862]">
                <span class="font-semibold not-italic block mb-1 text-[#181d27]">Kesimpulan</span>
                Menunjukkan toko online busana Muslimah yang siap beroperasi, dari katalog dan pre-order hingga pembayaran.
              </div>
            </div>

            <!-- FESPATI Depok Card -->
            <div class="snap-start shrink-0 w-[88vw] md:w-[calc(50%-0.75rem)] bg-white rounded-2xl border border-[#e9eaeb] shadow-sm p-5 md:p-6 flex flex-col">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-11 h-11 rounded-xl bg-[#fff8eb] flex items-center justify-center text-xl">🏹</div>
                <div>
                  <h3 class="font-bold text-[#181d27] text-lg leading-tight">FESPATI Depok</h3>
                  <p class="text-xs text-[#717680]">Website Organisasi & Komunitas Olahraga</p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 mb-4">
                <span class="tag">Company Profile</span>
                <span class="tag">Agenda Lomba</span>
                <span class="tag">Galeri</span>
              </div>

              <p class="text-sm text-[#414651] leading-relaxed mb-4">Website resmi Federasi Panahan Tradisional Indonesia Kota Depok. Memuat galeri kegiatan, agenda kompetisi, direktori klub anggota, profil pengurus, serta berita dan tips panahan tradisional.</p>

              <div class="highlight-bar mb-4">
                <ul class="space-y-1.5 text-sm text-[#535862]">
                  <li><strong class="text-[#181d27]">Tautan:</strong> <a href="https://fespati-depok.vercel.app/" target="_blank" rel="noopener noreferrer" class="text-[#b2852d] hover:underline">fespati-depok.vercel.app</a></li>
                  <li><strong class="text-[#181d27]">Model:</strong> Wadah digital organisasi untuk pembinaan atlet, penyelenggaraan kompetisi, dan pelestarian budaya panahan Nusantara.</li>
                  <li><strong class="text-[#181d27]">Status:</strong> Live Operation.</li>
                </ul>
              </div>

              <div class="mt-auto bg-[#fafafa] p-4 rounded-xl border border-[#e9eaeb] italic text-sm text-[#535862]">
                <span class="font-semibold not-italic block mb-1 text-[#181d27]">Kesimpulan</span>
                Membantu komunitas panahan tradisional memiliki kanal resmi untuk informasi, kompetisi, dan keanggotaan.
              </div>
            </div>

          </div>

          <p class="text-center text-xs text-[#717680] md:hidden">← Geser untuk lihat case study lainnya →</p>
        </div>
      </section>

      <!-- Section 3: CTA -->
      <section id="partnership" class="section-reveal opacity-0 translate-y-8 px-4 py-16 md:py-24 bg-[#fafafa]">
        <div class="max-w-3xl mx-auto text-center">
          <span class="section-label">Mulai Sekarang</span>
          <h2 class="section-title mt-3">Siap Meluncur?</h2>
          <p class="section-desc mb-8">Fokus pada pasar, kami fokus pada teknologi. Mari diskusikan ide bisnis Anda dan lihat apakah kami cocok menjadi partner teknologi Anda.</p>
          <button @click="isFormOpen = true" class="btn-primary-lg">
            Daftar Kemitraan
          </button>
        </div>
      </section>

      <AppFooter />
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.6s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
