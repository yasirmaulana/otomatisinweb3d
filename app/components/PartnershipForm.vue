<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl overflow-y-auto pt-24 pb-20 px-4 md:px-20">
      <div class="max-w-4xl mx-auto">
        <!-- Header Modal -->
        <div class="flex justify-between items-start md:items-center mb-6 flex-col md:flex-row gap-4">
          <div>
            <h2 class="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">Formulir Kemitraan</h2>
            <p class="text-gray-500 mt-2 text-sm">Seleksi Strategic IT Partner (Profit Share Model)</p>
          </div>
          <button type="button" @click="closeModal" class="w-12 h-12 shrink-0 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Progress Bar -->
        <div class="flex gap-2 mb-10">
          <div class="h-1 flex-1 rounded-full transition-colors duration-300" :class="step >= 1 ? 'bg-black' : 'bg-gray-200'"></div>
          <div class="h-1 flex-1 rounded-full transition-colors duration-300" :class="step >= 2 ? 'bg-black' : 'bg-gray-200'"></div>
          <div class="h-1 flex-1 rounded-full transition-colors duration-300" :class="step >= 3 ? 'bg-black' : 'bg-gray-200'"></div>
          <div class="h-1 flex-1 rounded-full transition-colors duration-300" :class="step >= 4 ? 'bg-black' : 'bg-gray-200'"></div>
        </div>

        <form @submit.prevent="handleNext" class="space-y-6">
          <Transition name="slide-up" mode="out-in">

            <!-- Bagian 1 -->
            <div v-if="step === 1" class="rounded-[32px] p-6 md:p-10 border border-gray-200 bg-white shadow-sm">
              <h3 class="text-lg md:text-xl font-bold text-black mb-6 uppercase tracking-widest border-b border-gray-100 pb-4">Bagian 1: Profil & Komitmen</h3>
              <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label class="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Nama Lengkap</label>
                    <input type="text" v-model="form.name" required class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors">
                  </div>
                  <div>
                    <label class="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">WhatsApp</label>
                    <input type="text" v-model="form.whatsapp" required placeholder="08xxxxxxxxxx" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors">
                  </div>
                  <div>
                    <label class="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Email</label>
                    <input type="email" v-model="form.email" required class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors">
                  </div>
                </div>

                <div>
                  <label class="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Latar Belakang Profesional</label>
                  <p class="text-xs text-gray-400 mb-3">(Apakah Anda orang sales, marketing, operasional, atau ahli di industri spesifik?)</p>
                  <textarea v-model="form.background" required rows="3" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"></textarea>
                </div>

                <div>
                  <label class="block text-[10px] uppercase tracking-widest text-gray-500 mb-4">
                    Komitmen Waktu <span class="text-red-500">*</span>
                  </label>
                  <p v-if="commitmentError" class="text-red-500 text-xs mb-3">{{ commitmentError }}</p>
                  <div class="space-y-3" :class="commitmentError ? 'p-3 border border-red-200 rounded-xl bg-red-50/50' : ''">
                    <label class="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" v-model="form.commitment" value="Full-time" class="absolute opacity-0 w-0 h-0 peer">
                      <div class="w-5 h-5 rounded border border-gray-300 peer-checked:bg-black peer-checked:border-black flex items-center justify-center transition-all bg-white">
                        <div class="w-2 h-2 bg-white rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span class="text-sm text-gray-700 group-hover:text-black transition-colors">Full-time (Fokus penuh pada bisnis ini)</span>
                    </label>
                    <label class="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" v-model="form.commitment" value="Part-time" class="absolute opacity-0 w-0 h-0 peer">
                      <div class="w-5 h-5 rounded border border-gray-300 peer-checked:bg-black peer-checked:border-black flex items-center justify-center transition-all bg-white">
                        <div class="w-2 h-2 bg-white rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span class="text-sm text-gray-700 group-hover:text-black transition-colors">Part-time (Memiliki pekerjaan lain, tapi menyediakan waktu khusus)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bagian 2 -->
            <div v-else-if="step === 2" class="rounded-[32px] p-6 md:p-10 border border-gray-200 bg-white shadow-sm">
              <h3 class="text-lg md:text-xl font-bold text-black mb-6 uppercase tracking-widest border-b border-gray-100 pb-4">Bagian 2: Validasi Ide Bisnis</h3>
              <div class="space-y-6">
                <div>
                  <label class="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Nama & Industri Ide Bisnis</label>
                  <p class="text-xs text-gray-400 mb-3">(Contoh: Aplikasi manajemen aset sosial, e-commerce lokal, crowdfunding, dll.)</p>
                  <input type="text" v-model="form.ideaName" required class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors">
                </div>

                <div>
                  <label class="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Target Pengguna/Pembeli Utama</label>
                  <p class="text-xs text-gray-400 mb-3">(Harus spesifik, misal: Pemilik toko retail skala mikro, pengelola yayasan, dll.)</p>
                  <textarea v-model="form.targetUser" required rows="2" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"></textarea>
                </div>

                <div>
                  <label class="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Masalah Utama yang Diselesaikan</label>
                  <textarea v-model="form.problem" required rows="2" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"></textarea>
                </div>

                <div>
                  <label class="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Fitur Wajib (MVP)</label>
                  <p class="text-xs text-gray-400 mb-3">Fitur wajib apa yang harus ada agar bisnis ini bisa mulai menghasilkan uang pertama kali?</p>
                  <textarea v-model="form.mvpFeatures" required rows="3" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"></textarea>
                </div>
              </div>
            </div>

            <!-- Bagian 3 -->
            <div v-else-if="step === 3" class="rounded-[32px] p-6 md:p-10 border border-gray-200 bg-white shadow-sm">
              <h3 class="text-lg md:text-xl font-bold text-black mb-6 uppercase tracking-widest border-b border-gray-100 pb-4">Bagian 3: Strategi Eksekusi & Pasar</h3>
              <div class="space-y-6">
                <div>
                  <label class="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Strategi Akuisisi 100 Pengguna Pertama</label>
                  <p class="text-xs text-gray-400 mb-3">Bagaimana rencana Anda mendapatkan 100 pengguna/transaksi pertama dalam 3 bulan tanpa budget iklan besar?</p>
                  <textarea v-model="form.acquisition" required rows="3" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"></textarea>
                </div>

                <div>
                  <label class="block text-[10px] uppercase tracking-widest text-gray-500 mb-4">
                    Status Validasi Awal <span class="text-red-500">*</span>
                  </label>
                  <p v-if="validationError" class="text-red-500 text-xs mb-3">{{ validationError }}</p>
                  <div class="space-y-3" :class="validationError ? 'p-3 border border-red-200 rounded-xl bg-red-50/50' : ''">
                    <label class="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" v-model="form.validation" value="Belum, baru ide" class="absolute opacity-0 w-0 h-0 peer">
                      <div class="w-5 h-5 rounded border border-gray-300 peer-checked:bg-black peer-checked:border-black flex items-center justify-center transition-all bg-white">
                        <div class="w-2 h-2 bg-white rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span class="text-sm text-gray-700 group-hover:text-black transition-colors">Belum, baru sebatas ide.</span>
                    </label>
                    <label class="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" v-model="form.validation" value="Sudah ada waiting list" class="absolute opacity-0 w-0 h-0 peer">
                      <div class="w-5 h-5 rounded border border-gray-300 peer-checked:bg-black peer-checked:border-black flex items-center justify-center transition-all bg-white">
                        <div class="w-2 h-2 bg-white rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span class="text-sm text-gray-700 group-hover:text-black transition-colors">Sudah ada daftar tunggu (waiting list) calon pengguna potensial.</span>
                    </label>
                    <label class="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" v-model="form.validation" value="Sudah manual" class="absolute opacity-0 w-0 h-0 peer">
                      <div class="w-5 h-5 rounded border border-gray-300 peer-checked:bg-black peer-checked:border-black flex items-center justify-center transition-all bg-white">
                        <div class="w-2 h-2 bg-white rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span class="text-sm text-gray-700 group-hover:text-black transition-colors">Sudah menjalankan bisnis secara manual & ingin beralih ke sistem otomatis.</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Proyeksi Penawaran Profit Share</label>
                  <p class="text-xs text-gray-400 mb-3">Berapa proyeksi persentase Profit Share yang Anda tawarkan untuk mitra teknologi?</p>
                  <input type="text" v-model="form.profitShare" placeholder="Contoh: 30% untuk mitra teknologi" required class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-colors">
                </div>
              </div>
            </div>

            <!-- Bagian 4: Verifikasi OTP -->
            <div v-else-if="step === 4" class="rounded-[32px] p-6 md:p-10 border border-gray-200 bg-white shadow-sm text-center">
              <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-black mb-2 uppercase tracking-widest">Verifikasi WhatsApp</h3>
              <p class="text-sm text-gray-500 mb-1">Kode 6 digit telah dikirim ke WhatsApp</p>
              <p class="text-sm font-bold text-black mb-8">{{ form.whatsapp }}</p>

              <div class="max-w-xs mx-auto space-y-4">
                <input
                  v-model="otpCode"
                  type="text"
                  maxlength="6"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  placeholder="000000"
                  autocomplete="one-time-code"
                  class="w-full text-center text-4xl font-bold tracking-[0.4em] border-2 rounded-2xl px-4 py-4 focus:outline-none transition-colors bg-gray-50 text-black"
                  :class="otpError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-black'"
                >

                <p v-if="otpError" class="text-red-500 text-sm">{{ otpError }}</p>

                <div class="text-sm text-gray-400">
                  <span v-if="resendCountdown > 0">
                    Kirim ulang dalam <span class="font-bold text-black">{{ resendCountdown }}s</span>
                  </span>
                  <button
                    v-else
                    type="button"
                    @click="resendOtp"
                    :disabled="loading"
                    class="text-black font-bold underline hover:no-underline transition-all disabled:opacity-50"
                  >
                    Kirim ulang OTP
                  </button>
                </div>
              </div>
            </div>

          </Transition>

          <!-- Error global -->
          <p v-if="globalError" class="text-red-500 text-sm text-center px-4">{{ globalError }}</p>

          <div class="flex justify-between items-center pt-4 pb-10">
            <button
              v-if="step > 1 && step < 4"
              type="button"
              @click="step--"
              class="bg-gray-100 text-gray-700 text-sm font-bold uppercase tracking-[0.2em] px-6 md:px-8 py-4 rounded-full hover:bg-gray-200 transition-all active:scale-95"
            >
              Kembali
            </button>
            <div v-else></div>

            <button
              type="submit"
              :disabled="loading || (step === 4 && otpCode.length < 6) || (step === 1 && !form.commitment) || (step === 3 && !form.validation)"
              @click="onSubmitClick"
              class="bg-black text-white text-sm font-black uppercase tracking-[0.2em] px-8 md:px-10 py-4 rounded-full hover:bg-gray-800 transition-all active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
            >
              <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <span>{{ submitLabel }}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const step = ref(1)
const loading = ref(false)
const globalError = ref('')
const otpCode = ref('')
const otpError = ref('')
const commitmentError = ref('')
const validationError = ref('')
const resendCountdown = ref(0)
let countdownTimer = null

const form = ref({
  name: '',
  whatsapp: '',
  email: '',
  background: '',
  commitment: '',
  ideaName: '',
  targetUser: '',
  problem: '',
  mvpFeatures: '',
  acquisition: '',
  validation: '',
  profitShare: ''
})

const submitLabel = computed(() => {
  if (loading.value) return step.value === 3 ? 'Mengirim OTP...' : 'Memverifikasi...'
  if (step.value === 3) return 'Kirim Pengajuan'
  if (step.value === 4) return 'Verifikasi & Kirim'
  return 'Selanjutnya'
})

const startCountdown = (seconds = 60) => {
  resendCountdown.value = seconds
  clearInterval(countdownTimer)
  countdownTimer = setInterval(() => {
    resendCountdown.value--
    if (resendCountdown.value <= 0) clearInterval(countdownTimer)
  }, 1000)
}

const sendOtp = async () => {
  loading.value = true
  globalError.value = ''
  try {
    await $fetch('/api/otp/send', {
      method: 'POST',
      body: { phone: form.value.whatsapp }
    })
    step.value = 4
    startCountdown(60)
    scrollFormToTop()
  } catch (e) {
    globalError.value = e?.data?.message || 'Gagal mengirim OTP. Periksa nomor WhatsApp dan coba lagi.'
  } finally {
    loading.value = false
  }
}

const resendOtp = async () => {
  otpCode.value = ''
  otpError.value = ''
  await sendOtp()
}

const submitForm = async () => {
  loading.value = true
  otpError.value = ''
  globalError.value = ''
  try {
    await $fetch('/api/partnership/submit', {
      method: 'POST',
      body: { ...form.value, otpCode: otpCode.value }
    })
    clearInterval(countdownTimer)
    closeModal()
    // Beri notifikasi sukses setelah modal tertutup
    setTimeout(() => alert('Pengajuan kemitraan Anda berhasil dikirim! Kami akan menghubungi Anda segera.'), 350)
  } catch (e) {
    const msg = e?.data?.message || 'Terjadi kesalahan. Coba lagi.'
    if (e?.status === 422) {
      otpError.value = msg
    } else {
      globalError.value = msg
    }
  } finally {
    loading.value = false
  }
}

const scrollFormToTop = () => {
  const el = document.querySelector('.overflow-y-auto')
  if (el) el.scrollTo({ top: 0, behavior: 'smooth' })
}

const onSubmitClick = () => {
  if (step.value === 1 && !form.value.commitment) {
    commitmentError.value = 'Pilih salah satu komitmen waktu.'
  }
  if (step.value === 3 && !form.value.validation) {
    validationError.value = 'Pilih salah satu status validasi.'
  }
}

const handleNext = async () => {
  globalError.value = ''

  if (step.value === 1) {
    commitmentError.value = form.value.commitment ? '' : 'Pilih salah satu komitmen waktu.'
    if (commitmentError.value) return
    step.value++
    scrollFormToTop()
    return
  }

  if (step.value === 2) {
    step.value++
    scrollFormToTop()
    return
  }

  if (step.value === 3) {
    validationError.value = form.value.validation ? '' : 'Pilih salah satu status validasi.'
    if (validationError.value) return
    await sendOtp()
    return
  }

  if (step.value === 4) {
    await submitForm()
  }
}

const closeModal = () => {
  emit('close')
  setTimeout(() => {
    step.value = 1
    otpCode.value = ''
    otpError.value = ''
    globalError.value = ''
    commitmentError.value = ''
    validationError.value = ''
    loading.value = false
    clearInterval(countdownTimer)
    resendCountdown.value = 0
    form.value = {
      name: '', whatsapp: '', email: '', background: '', commitment: '',
      ideaName: '', targetUser: '', problem: '', mvpFeatures: '',
      acquisition: '', validation: '', profitShare: ''
    }
  }, 300)
}

onUnmounted(() => clearInterval(countdownTimer))
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease-out;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
