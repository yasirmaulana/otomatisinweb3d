<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// SEO & Fonts
useHead({
  title: 'Otomatisin | 3D Rocket Nuxt',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap' }
  ]
})

const videoCanvas = ref(null)
const videoSource = ref(null)
const progressLine = ref(null)
const showLoader = ref(true)
const isFormOpen = ref(false)

// State for Detail Modal
const showDetailModal = ref(false)
const currentDetail = ref('') // 'sprint', 'case-study', 'testimoni'

const openDetail = (section) => {
  currentDetail.value = section
  showDetailModal.value = true
}

const initExperience = () => {
  if (!process.client) return
  gsap.registerPlugin(ScrollTrigger)

  const canvas = videoCanvas.value
  const context = canvas.getContext('2d')
  const video = videoSource.value

  const render = () => {
    if (!video.videoWidth) return
    const vW = video.videoWidth
    const vH = video.videoHeight
    const cW = canvas.width
    const cH = canvas.height
    const vAspect = vW / vH
    const cAspect = cW / cH
    let dW, dH, dX, dY

    if (cAspect > vAspect) {
      dW = cW; dH = cW / vAspect
      dX = 0; dY = (cH - dH) / 2
    } else {
      const mobileZoom = window.innerWidth < 768 ? 1.3 : 1
      dH = cH * mobileZoom; dW = dH * vAspect
      dX = (cW - dW) / 2; dY = (cH - dH) / 2
    }
    context.clearRect(0, 0, cW, cH)
    context.drawImage(video, dX, dY, dW, dH)
  }

  const resize = () => {
    canvas.width = window.innerWidth * window.devicePixelRatio
    canvas.height = window.innerHeight * window.devicePixelRatio
    render()
  }

  window.addEventListener('resize', resize)
  resize()

  // Video Scrubbing Logic
  const videoProxy = { currentTime: 0 }
  gsap.to(videoProxy, {
    currentTime: video.duration,
    ease: "none",
    scrollTrigger: {
      trigger: ".scroll-provider",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: () => {
        video.currentTime = videoProxy.currentTime
        render()
      }
    }
  })

  // Cards Logic (Option 2: Fixed Transition)
  const cards = gsap.utils.toArray('.card-wrapper')
  cards.forEach((card, i) => {
    const trigger = document.querySelector(`.trigger-zone-${i}`)

    gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top 50%",
        end: "bottom 50%",
        toggleActions: "play reverse play reverse",
        scrub: 1,
        onEnter: () => gsap.set(card, { pointerEvents: 'auto' }),
        onLeave: () => gsap.set(card, { pointerEvents: 'none' }),
        onEnterBack: () => gsap.set(card, { pointerEvents: 'auto' }),
        onLeaveBack: () => gsap.set(card, { pointerEvents: 'none' })
      }
    })
    .to(card, { opacity: 1, y: 0, duration: 1 })
    .to(card, { opacity: 0, y: -20, duration: 1 }, "+=1")
  })

  setTimeout(() => { showLoader.value = false }, 1000)
}

onMounted(() => {
  let loadInt = setInterval(() => {
    if (progressLine.value) {
      let cur = parseFloat(progressLine.value.style.width) || 0
      if (cur < 90) progressLine.value.style.width = (cur + Math.random() * 15) + '%'
    }
  }, 150)

  const handleLoaded = () => {
    clearInterval(loadInt)
    if (progressLine.value) progressLine.value.style.width = '100%'
    initExperience()
  }

  if (videoSource.value.readyState >= 1) {
    handleLoaded()
  } else {
    videoSource.value.addEventListener('loadedmetadata', handleLoaded)
  }
})
</script>

<template>
  <div class="selection:bg-white selection:text-black">
    <AppHeader @open-form="isFormOpen = true" />
    <PartnershipForm :is-open="isFormOpen" @close="isFormOpen = false" />

    <DetailModal 
      :is-open="showDetailModal" 
      :title="currentDetail === 'hero' ? 'Strategic IT Partner' : currentDetail === 'sprint' ? '90 Hari Menuju Validasi Pasar' : currentDetail === 'case-study' ? 'Live Case Study' : 'Apa Kata Mereka?'" 
      :subtitle="currentDetail === 'hero' ? 'Kami Berinvestasi pada Ide Anda' : currentDetail === 'sprint' ? 'Metode Kerja Kami' : currentDetail === 'case-study' ? 'Sistem Manajemen Ambulans Real-time' : 'Testimoni Klien'" 
      @close="showDetailModal = false"
    >
      <!-- Konten Hero Section -->
      <div v-if="currentDetail === 'hero'" class="space-y-6 text-sm text-gray-700">
        <p>Membangun infrastruktur digital sendiri adalah pertaruhan yang mahal. Kami membuang semua risiko finansial tersebut dari pundak Anda.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
            <h4 class="font-bold text-black mb-2">Zero Upfront Cost</h4>
            <p>Kami menanggung 100% biaya pengembangan sistem, server, hingga peluncuran MVP.</p>
          </div>
          <div class="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
            <h4 class="font-bold text-black mb-2">Skin in the Game</h4>
            <p>Kami hanya meraih keuntungan ketika sistem yang kami bangun berhasil menghasilkan profit untuk bisnis Anda.</p>
          </div>
        </div>
        <div class="bg-black text-white p-5 rounded-2xl">
          <h4 class="font-bold mb-2">Sistem yang Teruji</h4>
          <p>Dari digitalisasi operasional retail tradisional hingga sistem manajemen armada lapangan yang kompleks, kami memastikan teknologi Anda siap menghadapi pasar sejak hari pertama.</p>
        </div>
      </div>

      <!-- Konten Sprint 90 Hari -->
      <div v-if="currentDetail === 'sprint'" class="space-y-6 text-sm text-gray-700">
        <p>Membangun bisnis digital bukan tentang siapa yang membuat sistem paling besar dan rumit di awal, melainkan tentang siapa yang paling cepat memvalidasi kebutuhan pasar dengan risiko sekecil mungkin.</p>
        <p>Kami menggunakan metodologi Lean Startup yang memangkas waktu pengembangan tradisional menjadi siklus taktis 90 hari. Seluruh infrastruktur teknologi kami tanggung, sehingga fokus kita bersama adalah kecepatan dan hasil nyata.</p>
        
        <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <h4 class="font-bold text-black text-base mb-2">🚀 BULAN 1: MVP & Launch (Kecepatan Eksekusi)</h4>
          <p class="mb-4">Fokus utama di 30 hari pertama adalah meluncurkan MVP (Minimum Viable Product) yang siap digunakan dan menghasilkan uang. Kami tidak menghabiskan waktu berbulan-bulan untuk membangun sistem yang terlampau sempurna, melainkan fokus pada fondasi dan fitur inti paling kritikal yang menyelesaikan masalah utama pengguna Anda.</p>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Efisiensi Stack:</strong> Kami menggunakan kombinasi teknologi modern seperti Nuxt.js / Vue.js untuk antarmuka yang cepat serta Django untuk keamanan sistem backend.</li>
            <!-- <li><strong>Deployment Instan:</strong> Menggunakan infrastruktur berbasis Docker & Easypanel, sistem Anda akan langsung live dan siap diakses publik dalam hitungan menit setelah kode selesai ditulis.</li> -->
            <li><strong>Target Akhir:</strong> Produk digital Anda resmi diluncurkan ke pasar sebelum hari ke-30 berakhir.</li>
          </ul>
        </div>

        <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <h4 class="font-bold text-black text-base mb-2">📊 BULAN 2: Operasional & Umpan Balik (Uji Coba Lapangan Nyata)</h4>
          <p class="mb-4">Setelah aplikasi dapat diakses umum, bisnis kita mulai berjalan di dunia nyata. Di fase ini, terjadi pembagian fokus yang sangat adil dan terstruktur antara kami dan Anda:</p>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Fokus Kami (Teknologi):</strong> Kami memantau stabilitas server 24/7, mengoptimalkan performa, dan membersihkan bug operasional yang muncul di lapangan agar pengalaman pengguna tetap mulus.</li>
            <li><strong>Fokus Anda (Pasar):</strong> Anda dan tim berfokus penuh pada penetrasi pasar, menggaet pengguna pertama, dan mengumpulkan umpan balik (feedback) langsung dari konsumen.</li>
            <li><strong>Target Akhir:</strong> Mengumpulkan data perilaku pengguna asli untuk mengetahui bagian sistem mana yang benar-benar mereka butuhkan.</li>
          </ul>
        </div>

        <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <h4 class="font-bold text-black text-base mb-2">🏁 BULAN 3: Evaluasi & Keputusan (Analisis Berbasis Data)</h4>
          <p class="mb-4">Bulan ketiga adalah momen kejujuran. Kita akan duduk bersama untuk menyingkirkan ego, membuka dashboard analitik, dan melihat angka pertumbuhan secara objektif.</p>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Analisis Traksi:</strong> Kita memeriksa data transaksi, jumlah pengguna aktif, dan total pemasukan (revenue) yang masuk ke dalam sistem bagi hasil.</li>
            <li><strong>Pengambilan Keputusan (Kill or Pivot):</strong>
              <ul class="list-circle pl-5 mt-2 space-y-1 text-xs">
                <li><strong>Scale Up:</strong> Jika angka pertumbuhan positif, kita lanjut ke tahap pengembangan fitur lanjutan dan memperbesar kapasitas server.</li>
                <li><strong>Pivot:</strong> Jika pasar merespons dengan cara yang berbeda, kita putar haluan arah produk tanpa harus membuang seluruh kode dasar yang sudah ada.</li>
                <li><strong>Kill:</strong> Jika setelah 90 hari terbukti tidak ada kebutuhan pasar, kerja sama dihentikan secara terhormat. Kedua belah pihak tidak rugi besar secara finansial karena risiko modal teknologi telah dibatasi sejak awal.</li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="bg-black text-white p-6 rounded-2xl">
          <h4 class="font-bold text-base mb-2">Mengapa Kami Menerapkan Sistem Ini?</h4>
          <p>Karena kami menaruh modal teknologi kami pada ide Anda (Skin in the Game). Lini masa 3 bulan ini memastikan bahwa kita bergerak dengan disiplin tinggi, efisien, dan selalu berorientasi pada hasil bisnis, bukan sekadar teori di atas kertas.</p>
        </div>
      </div>

      <!-- Konten Case Study -->
      <div v-if="currentDetail === 'case-study'" class="space-y-6 text-sm text-gray-700">
        <p>Kami tidak hanya menawarkan jasa pembuatan aplikasi lepas. Kami terjun langsung ke lapangan dan menanam investasi teknologi pada ekosistem yang potensial.</p>
        <p>Salah satu portofolio aktif yang saat ini kami bangun dan kelola sepenuhnya adalah <strong>Ambulanku</strong>, sebuah platform digitalisasi manajemen layanan ambulans darurat dan non-darurat medis.</p>

        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
          <h4 class="font-bold text-black mb-1">🏥 Mengenal Proyek: Ambulanku</h4>
          <ul class="space-y-1 text-sm">
            <li><strong>Tautan Aplikasi:</strong> <a href="https://ambulanku.vercel.app" target="_blank" class="text-blue-600 hover:underline">ambulanku.vercel.app</a></li>
            <li><strong>Sektor:</strong> Health-Tech & Fleet Management (Manajemen Armada)</li>
            <li><strong>Model Kemitraan:</strong> Dikembangkan dan dikelola penuh menggunakan Model Manajemen Sistem Bagi Hasil—sama persis dengan komitmen yang kami tawarkan kepada Anda.</li>
          </ul>
        </div>

        <!-- <div>
          <h4 class="font-bold text-black text-base mb-3 mt-8">⚙️ Arsitektur & Highlight Teknis Sistem</h4>
          <p class="mb-4">Membangun sistem manajemen armada membutuhkan ketepatan data dan performa server yang tangguh. Untuk memastikan operasional di lapangan berjalan tanpa kendala, kami merancang tiga pilar sistem utama di dalam platform Ambulanku:</p>
          
          <div class="space-y-4">
            <div class="border border-gray-100 rounded-xl p-5 shadow-sm">
              <h5 class="font-bold text-black mb-2">1. Sistem Penjadwalan & Alokasi Armada Real-time</h5>
              <p>Ketika terjadi kondisi darurat, setiap detik sangat berharga. Kami membangun sistem yang mampu memproses permintaan pengguna, mencocokkan ketersediaan armada terdekat, dan melakukan alokasi tugas kepada pengemudi ambulans secara instan. Sistem ini memangkas birokrasi panggilan telepon manual yang lambat.</p>
            </div>
            
            <div class="border border-gray-100 rounded-xl p-5 shadow-sm">
              <h5 class="font-bold text-black mb-2">2. Dashboard Manajemen Pendapatan & Operasional (ERP)</h5>
              <p>Untuk sisi bisnis, kami menyediakan dashboard terpusat yang mengubah pencatatan manual menjadi serbadigital. Pemilik armada dapat memantau:</p>
              <ul class="list-disc pl-5 mt-2 space-y-1">
                <li>Log operasional harian dan status perjalanan setiap ambulans.</li>
                <li>Rekapitulasi pendapatan, biaya bahan bakar, dan insentif pengemudi secara otomatis.</li>
                <li>Laporan performa bulanan untuk membantu pengambilan keputusan strategis.</li>
              </ul>
            </div>

            <div class="border border-gray-100 rounded-xl p-5 shadow-sm">
              <h5 class="font-bold text-black mb-2">3. Integrasi Pelacakan Lokasi (GPS Tracking) Sederhana</h5>
              <p>Infrastruktur pelacakan yang tangkas untuk memantau pergerakan armada secara langsung dari peramban (browser). Fitur ini memberikan visibilitas penuh bagi tim operator di posko utama untuk memprediksi Estimated Time of Arrival (ETA) ambulans ke lokasi pasien.</p>
            </div>
          </div>
        </div> -->

        <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200 mt-8">
          <h4 class="font-bold text-black text-base mb-2">📊 Status Proyek: Ongoing & Validated</h4>
          <ul class="space-y-2 mb-4">
            <li><strong>Fase Saat Ini:</strong> Live Operation & Optimization.</li>
            <li><strong>Metode Kerja:</strong> Platform ini dijalankan dengan prinsip Lean. Kami terus memantau stabilitas kode di production branch, mengoptimalkan performa server agar tetap hemat daya, dan melakukan update fitur secara berkala berdasarkan dinamika kebutuhan medis di lapangan.</li>
          </ul>
          <div class="bg-white p-4 rounded-xl border border-gray-100 italic">
            <span class="font-bold not-italic block mb-1">Kesimpulan untuk Calon Mitra:</span>
            Ambulanku adalah bukti nyata bahwa teknologi yang tepat guna mampu merapikan operasional bisnis yang rumit. Jika kami bisa mendigitalisasi dan mengelola sistem manajemen ambulans yang berisiko tinggi di lapangan, kami siap untuk merancang, membangun, dan menyukseskan mesin teknologi untuk ide bisnis Anda.
          </div>
        </div>
      </div>

      <!-- Konten Testimoni -->
      <div v-if="currentDetail === 'testimoni'" class="space-y-6 text-sm text-gray-700 text-center py-10">
        <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
        <p class="text-xl italic font-light text-black">"Sistem yang dikembangkan membantu efisiensi bisnis kami dari pencatatan manual ke sistem digital dalam waktu singkat."</p>
        <div class="mt-6">
          <h4 class="font-bold text-black">UD. Cipta Abadi</h4>
          <p class="text-gray-500 text-xs">Klien Strategic IT Partner</p>
        </div>
      </div>
    </DetailModal>
    
    <!-- Preloader -->
    <Transition name="fade">
      <div v-if="showLoader" class="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center gap-6">
        <div class="text-[10px] tracking-[0.5em] text-white/40 font-bold uppercase text-center">Initializing Systems</div>
        <div class="w-48 h-[1px] bg-white/10 relative overflow-hidden">
          <div ref="progressLine" class="absolute inset-y-0 left-0 bg-white w-0 transition-all duration-300"></div>
        </div>
      </div>
    </Transition>

    <!-- Background Viewport -->
    <div class="fixed inset-0 -z-10 bg-black">
      <canvas ref="videoCanvas" class="w-full h-full object-cover"></canvas>
    </div>

    <!-- Hidden Video Source -->
    <video ref="videoSource" class="hidden" muted playsinline preload="auto">
      <source src="/otomatisin-partner-video-rocket.mp4" type="video/mp4">
    </video>

    <!-- UI OVERLAY (FIXED) -->
    <div class="fixed inset-0 z-10 flex items-center justify-center pointer-events-none px-4 md:px-20">
      <div class="w-full max-w-5xl relative flex items-center justify-center">
        
        <!-- Card 0 -->
        <div class="card-wrapper absolute opacity-0 translate-y-10 text-center w-full">
          <div @click="openDetail('hero')" class="rounded-[32px] p-8 md:p-14 border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl mx-auto max-w-3xl cursor-pointer hover:-translate-y-2 hover:shadow-black/20 transition-all duration-300 group">
            <h1 class="hero-title uppercase text-black">Strategic IT Partner</h1>
            <p class="hero-desc text-gray-500">Ubah Ide Menjadi Produk Digital Tanpa Investasi IT di Awal.</p>
            <div class="mt-8"><span class="inline-block px-6 py-3 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-black hover:text-white hover:border-black transition-all duration-300">Lihat Penjelasan Detail &rarr;</span></div>
          </div>
        </div>

        <!-- Card 1 -->
        <div class="card-wrapper absolute opacity-0 translate-y-10 text-center w-full">
          <div @click="openDetail('sprint')" class="rounded-[32px] p-8 md:p-14 border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl mx-auto max-w-4xl cursor-pointer hover:-translate-y-2 hover:shadow-black/20 transition-all duration-300 group">
            <h1 class="hero-title uppercase text-3xl md:text-6xl text-black">90 Hari Menuju Validasi Pasar</h1>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-left">
              <div class="p-4 border-l-2 border-gray-200 group-hover:border-black transition-colors">
                <h3 class="font-bold text-black mb-2 text-sm">Bulan 1: Build</h3>
                <p class="text-[10px] text-gray-500">Pengembangan MVP dengan fitur inti siap menghasilkan uang.</p>
              </div>
              <div class="p-4 border-l-2 border-gray-200 group-hover:border-black transition-colors">
                <h3 class="font-bold text-black mb-2 text-sm">Bulan 2: Launch</h3>
                <p class="text-[10px] text-gray-500">Operasional penuh dengan dukungan sistem 24/7.</p>
              </div>
              <div class="p-4 border-l-2 border-gray-200 group-hover:border-black transition-colors">
                <h3 class="font-bold text-black mb-2 text-sm">Bulan 3: Evaluate</h3>
                <p class="text-[10px] text-gray-500">Analisis data untuk skala besar atau pivot baru.</p>
              </div>
            </div>
            <div class="mt-8"><span class="inline-block px-6 py-3 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-black hover:text-white hover:border-black transition-all duration-300">Lihat Penjelasan Detail &rarr;</span></div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="card-wrapper absolute opacity-0 translate-y-10 text-center w-full">
          <div @click="openDetail('case-study')" class="rounded-[32px] p-8 md:p-14 border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl mx-auto max-w-3xl cursor-pointer hover:-translate-y-2 hover:shadow-black/20 transition-all duration-300 group">
            <h1 class="hero-title uppercase text-3xl md:text-6xl text-black">Live Case Study</h1>
            <p class="hero-desc mb-6 text-sm text-gray-500">Sistem Manajemen Ambulans Real-time.</p>
            <div class="flex justify-center gap-4">
              <span class="px-3 py-1 bg-black rounded-full text-[8px] tracking-widest uppercase text-white">Nuxt.js</span>
              <span class="px-3 py-1 bg-black rounded-full text-[8px] tracking-widest uppercase text-white">Supabase</span>
            </div>
            <div class="mt-8"><span class="inline-block px-6 py-3 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-black hover:text-white hover:border-black transition-all duration-300">Lihat Penjelasan Detail &rarr;</span></div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="card-wrapper absolute opacity-0 translate-y-10 text-center w-full">
          <div @click="openDetail('testimoni')" class="rounded-[32px] p-8 md:p-14 border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl mx-auto max-w-3xl cursor-pointer hover:-translate-y-2 hover:shadow-black/20 transition-all duration-300 group">
            <h1 class="hero-title uppercase text-3xl md:text-6xl text-black">Apa Kata Mereka?</h1>
            <p class="hero-desc italic text-sm md:text-xl text-gray-500">"Sistem yang dikembangkan membantu efisiensi bisnis kami secara drastis."</p>
            <p class="mt-4 text-black font-bold text-xs">— Klien UD. Cipta Abadi</p>
            <div class="mt-8"><span class="inline-block px-6 py-3 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-black hover:text-white hover:border-black transition-all duration-300">Lihat Penjelasan Detail &rarr;</span></div>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="card-wrapper absolute opacity-0 translate-y-10 text-center w-full">
          <div class="rounded-[32px] p-8 md:p-14 border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl mx-auto max-w-3xl">
            <h1 class="hero-title uppercase text-3xl md:text-6xl text-black">Siap Meluncur?</h1>
            <p class="hero-desc mb-8 text-sm text-gray-500">Fokus pada pasar, kami fokus pada teknologi.</p>
            <button @click="isFormOpen = true" class="px-8 py-4 bg-black text-white font-black uppercase tracking-[0.2em] rounded-full hover:bg-gray-800 transition-all active:scale-95 shadow-xl">
              Daftar Kemitraan
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- SCROLL PROVIDER (INVISIBLE) -->
    <div class="scroll-provider relative">
      <div class="trigger-zone-0 h-[150vh]"></div>
      <div class="trigger-zone-1 h-[200vh]"></div>
      <div class="trigger-zone-2 h-[150vh]"></div>
      <div class="trigger-zone-3 h-[150vh]"></div>
      <div class="trigger-zone-4 h-[150vh]"></div>
      <AppFooter />
    </div>

  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 1s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
