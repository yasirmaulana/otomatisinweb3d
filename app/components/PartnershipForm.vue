<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100] bg-white/95 backdrop-blur-sm overflow-y-auto pt-20 pb-16 px-4 md:px-6">
      <div class="max-w-3xl mx-auto">
        <!-- Header Modal -->
        <div class="flex justify-between items-start mb-8">
          <div>
            <span class="section-label">Strategic IT Partner</span>
            <h2 class="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-[#181d27]">Formulir Kemitraan</h2>
            <p class="text-[#717680] mt-1 text-sm">Seleksi kemitraan profit share untuk ide bisnis Anda.</p>
          </div>
          <button type="button" @click="closeModal" class="w-10 h-10 shrink-0 rounded-xl border border-[#e9eaeb] bg-white flex items-center justify-center hover:bg-[#fafafa] transition-colors">
            <svg class="w-5 h-5 text-[#181d27]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Progress Bar -->
        <div class="flex gap-2 mb-8">
          <div class="h-1.5 flex-1 rounded-full transition-colors duration-300" :class="step >= 1 ? 'bg-[#fabc3f]' : 'bg-[#e9eaeb]'"></div>
          <div class="h-1.5 flex-1 rounded-full transition-colors duration-300" :class="step >= 2 ? 'bg-[#fabc3f]' : 'bg-[#e9eaeb]'"></div>
          <div class="h-1.5 flex-1 rounded-full transition-colors duration-300" :class="step >= 3 ? 'bg-[#fabc3f]' : 'bg-[#e9eaeb]'"></div>
          <div class="h-1.5 flex-1 rounded-full transition-colors duration-300" :class="step >= 4 ? 'bg-[#fabc3f]' : 'bg-[#e9eaeb]'"></div>
        </div>

        <form @submit.prevent="handleNext" class="space-y-6">
          <Transition name="slide-up" mode="out-in">

            <!-- Bagian 1 -->
            <div v-if="step === 1" class="card text-left p-5 md:p-8">
              <h3 class="text-base font-semibold text-[#181d27] mb-5 pb-3 border-b border-[#e9eaeb]">Bagian 1: Profil & Komitmen</h3>
              <div class="space-y-5">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-[#414651] mb-1.5">Nama Lengkap</label>
                    <input type="text" v-model="form.name" required class="w-full rounded-xl border border-[#e9eaeb] bg-white px-3.5 py-2.5 text-sm text-[#181d27] placeholder-[#a4a7ae] focus:border-[#fabc3f] focus:ring-2 focus:ring-[#fabc3f]/10 focus:outline-none transition-colors">
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-[#414651] mb-1.5">WhatsApp</label>
                    <input type="text" v-model="form.whatsapp" required placeholder="08xxxxxxxxxx" class="w-full rounded-xl border border-[#e9eaeb] bg-white px-3.5 py-2.5 text-sm text-[#181d27] placeholder-[#a4a7ae] focus:border-[#fabc3f] focus:ring-2 focus:ring-[#fabc3f]/10 focus:outline-none transition-colors">
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-[#414651] mb-1.5">Email</label>
                    <input type="email" v-model="form.email" required class="w-full rounded-xl border border-[#e9eaeb] bg-white px-3.5 py-2.5 text-sm text-[#181d27] placeholder-[#a4a7ae] focus:border-[#fabc3f] focus:ring-2 focus:ring-[#fabc3f]/10 focus:outline-none transition-colors">
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-medium text-[#414651] mb-1.5">Latar Belakang Profesional</label>
                  <p class="text-xs text-[#717680] mb-2">Apakah Anda orang sales, marketing, operasional, atau ahli di industri spesifik?</p>
                  <textarea v-model="form.background" required rows="3" class="w-full rounded-xl border border-[#e9eaeb] bg-white px-3.5 py-2.5 text-sm text-[#181d27] placeholder-[#a4a7ae] focus:border-[#fabc3f] focus:ring-2 focus:ring-[#fabc3f]/10 focus:outline-none transition-colors resize-none"></textarea>
                </div>

                <div>
                  <label class="block text-xs font-medium text-[#181d27] mb-3">
                    Komitmen Waktu <span class="text-[#f04438]">*</span>
                  </label>
                  <p v-if="commitmentError" class="text-[#f04438] text-xs mb-3">{{ commitmentError }}</p>
                  <div class="space-y-2.5" :class="commitmentError ? 'p-3 border border-[#fda29b] rounded-xl bg-[#fef3f2]' : ''">
                    <label class="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" v-model="form.commitment" value="Full-time" class="absolute opacity-0 w-0 h-0 peer">
                      <div class="w-5 h-5 rounded-full border border-[#d5d7da] peer-checked:border-[#fabc3f] peer-checked:bg-[#fabc3f] flex items-center justify-center transition-all bg-white">
                        <div class="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span class="text-sm text-[#535862] group-hover:text-[#181d27] transition-colors">Full-time (Fokus penuh pada bisnis ini)</span>
                    </label>
                    <label class="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" v-model="form.commitment" value="Part-time" class="absolute opacity-0 w-0 h-0 peer">
                      <div class="w-5 h-5 rounded-full border border-[#d5d7da] peer-checked:border-[#fabc3f] peer-checked:bg-[#fabc3f] flex items-center justify-center transition-all bg-white">
                        <div class="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span class="text-sm text-[#535862] group-hover:text-[#181d27] transition-colors">Part-time (Memiliki pekerjaan lain, tapi menyediakan waktu khusus)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bagian 2 -->
            <div v-else-if="step === 2" class="card text-left p-5 md:p-8">
              <h3 class="text-base font-semibold text-[#181d27] mb-5 pb-3 border-b border-[#e9eaeb]">Bagian 2: Validasi Ide Bisnis</h3>
              <div class="space-y-5">
                <div>
                  <label class="block text-xs font-medium text-[#414651] mb-1.5">Nama & Industri Ide Bisnis</label>
                  <p class="text-xs text-[#717680] mb-2">Contoh: Aplikasi manajemen aset sosial, e-commerce lokal, crowdfunding, dll.</p>
                  <input type="text" v-model="form.ideaName" required class="w-full rounded-xl border border-[#e9eaeb] bg-white px-3.5 py-2.5 text-sm text-[#181d27] placeholder-[#a4a7ae] focus:border-[#fabc3f] focus:ring-2 focus:ring-[#fabc3f]/10 focus:outline-none transition-colors">
                </div>

                <div>
                  <label class="block text-xs font-medium text-[#414651] mb-1.5">Target Pengguna/Pembeli Utama</label>
                  <p class="text-xs text-[#717680] mb-2">Harus spesifik, misal: Pemilik toko retail skala mikro, pengelola yayasan, dll.</p>
                  <textarea v-model="form.targetUser" required rows="2" class="w-full rounded-xl border border-[#e9eaeb] bg-white px-3.5 py-2.5 text-sm text-[#181d27] placeholder-[#a4a7ae] focus:border-[#fabc3f] focus:ring-2 focus:ring-[#fabc3f]/10 focus:outline-none transition-colors resize-none"></textarea>
                </div>

                <div>
                  <label class="block text-xs font-medium text-[#414651] mb-1.5">Masalah Utama yang Diselesaikan</label>
                  <textarea v-model="form.problem" required rows="2" class="w-full rounded-xl border border-[#e9eaeb] bg-white px-3.5 py-2.5 text-sm text-[#181d27] placeholder-[#a4a7ae] focus:border-[#fabc3f] focus:ring-2 focus:ring-[#fabc3f]/10 focus:outline-none transition-colors resize-none"></textarea>
                </div>

                <div>
                  <label class="block text-xs font-medium text-[#414651] mb-1.5">Fitur Wajib (MVP)</label>
                  <p class="text-xs text-[#717680] mb-2">Fitur wajib apa yang harus ada agar bisnis ini bisa mulai menghasilkan uang pertama kali?</p>
                  <textarea v-model="form.mvpFeatures" required rows="3" class="w-full rounded-xl border border-[#e9eaeb] bg-white px-3.5 py-2.5 text-sm text-[#181d27] placeholder-[#a4a7ae] focus:border-[#fabc3f] focus:ring-2 focus:ring-[#fabc3f]/10 focus:outline-none transition-colors resize-none"></textarea>
                </div>
              </div>
            </div>

            <!-- Bagian 3 -->
            <div v-else-if="step === 3" class="card text-left p-5 md:p-8">
              <h3 class="text-base font-semibold text-[#181d27] mb-5 pb-3 border-b border-[#e9eaeb]">Bagian 3: Strategi Eksekusi & Pasar</h3>
              <div class="space-y-5">
                <div>
                  <label class="block text-xs font-medium text-[#414651] mb-1.5">Strategi Akuisisi 100 Pengguna Pertama</label>
                  <p class="text-xs text-[#717680] mb-2">Bagaimana rencana Anda mendapatkan 100 pengguna/transaksi pertama dalam 3 bulan tanpa budget iklan besar?</p>
                  <textarea v-model="form.acquisition" required rows="3" class="w-full rounded-xl border border-[#e9eaeb] bg-white px-3.5 py-2.5 text-sm text-[#181d27] placeholder-[#a4a7ae] focus:border-[#fabc3f] focus:ring-2 focus:ring-[#fabc3f]/10 focus:outline-none transition-colors resize-none"></textarea>
                </div>

                <div>
                  <label class="block text-xs font-medium text-[#181d27] mb-3">
                    Status Validasi Awal <span class="text-[#f04438]">*</span>
                  </label>
                  <p v-if="validationError" class="text-[#f04438] text-xs mb-3">{{ validationError }}</p>
                  <div class="space-y-2.5" :class="validationError ? 'p-3 border border-[#fda29b] rounded-xl bg-[#fef3f2]' : ''">
                    <label class="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" v-model="form.validation" value="Belum, baru ide" class="absolute opacity-0 w-0 h-0 peer">
                      <div class="w-5 h-5 rounded-full border border-[#d5d7da] peer-checked:border-[#fabc3f] peer-checked:bg-[#fabc3f] flex items-center justify-center transition-all bg-white">
                        <div class="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span class="text-sm text-[#535862] group-hover:text-[#181d27] transition-colors">Belum, baru sebatas ide.</span>
                    </label>
                    <label class="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" v-model="form.validation" value="Sudah ada waiting list" class="absolute opacity-0 w-0 h-0 peer">
                      <div class="w-5 h-5 rounded-full border border-[#d5d7da] peer-checked:border-[#fabc3f] peer-checked:bg-[#fabc3f] flex items-center justify-center transition-all bg-white">
                        <div class="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span class="text-sm text-[#535862] group-hover:text-[#181d27] transition-colors">Sudah ada daftar tunggu (waiting list) calon pengguna potensial.</span>
                    </label>
                    <label class="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" v-model="form.validation" value="Sudah manual" class="absolute opacity-0 w-0 h-0 peer">
                      <div class="w-5 h-5 rounded-full border border-[#d5d7da] peer-checked:border-[#fabc3f] peer-checked:bg-[#fabc3f] flex items-center justify-center transition-all bg-white">
                        <div class="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span class="text-sm text-[#535862] group-hover:text-[#181d27] transition-colors">Sudah menjalankan bisnis secara manual & ingin beralih ke sistem otomatis.</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-medium text-[#414651] mb-1.5">Proyeksi Penawaran Profit Share</label>
                  <p class="text-xs text-[#717680] mb-2">Berapa proyeksi persentase Profit Share yang Anda tawarkan untuk mitra teknologi?</p>
                  <input type="text" v-model="form.profitShare" placeholder="Contoh: 30% untuk mitra teknologi" required class="w-full rounded-xl border border-[#e9eaeb] bg-white px-3.5 py-2.5 text-sm text-[#181d27] placeholder-[#a4a7ae] focus:border-[#fabc3f] focus:ring-2 focus:ring-[#fabc3f]/10 focus:outline-none transition-colors">
                </div>
              </div>
            </div>

            <!-- Bagian 4: Verifikasi OTP -->
            <div v-else-if="step === 4" class="card text-center p-8 md:p-10">
              <div class="w-14 h-14 rounded-2xl bg-[#fff8eb] ring-1 ring-[#fabc3f]/20 flex items-center justify-center mx-auto mb-5">
                <svg class="w-7 h-7 text-[#8a6723]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <span class="section-label">Verifikasi</span>
              <h3 class="mt-3 text-lg font-semibold text-[#181d27]">Verifikasi WhatsApp</h3>
              <p class="text-sm text-[#717680] mt-1 mb-1">Kode 6 digit telah dikirim ke WhatsApp</p>
              <p class="text-sm font-semibold text-[#181d27] mb-6">{{ form.whatsapp }}</p>

              <div class="max-w-xs mx-auto space-y-4">
                <input
                  v-model="otpCode"
                  type="text"
                  maxlength="6"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  placeholder="000000"
                  autocomplete="one-time-code"
                  class="w-full text-center text-3xl font-semibold tracking-[0.3em] border rounded-xl px-4 py-3 focus:outline-none transition-colors bg-white text-[#181d27]"
                  :class="otpError ? 'border-[#fda29b] focus:border-[#f04438] focus:ring-2 focus:ring-[#f04438]/10' : 'border-[#e9eaeb] focus:border-[#fabc3f] focus:ring-2 focus:ring-[#fabc3f]/10'"
                >

                <p v-if="otpError" class="text-[#f04438] text-sm">{{ otpError }}</p>

                <div class="text-sm text-[#717680]">
                  <span v-if="resendCountdown > 0">
                    Kirim ulang dalam <span class="font-semibold text-[#181d27]">{{ resendCountdown }}s</span>
                  </span>
                  <button
                    v-else
                    type="button"
                    @click="resendOtp"
                    :disabled="loading"
                    class="text-[#b2852d] font-semibold hover:text-[#8a6723] transition-colors disabled:opacity-50"
                  >
                    Kirim ulang OTP
                  </button>
                </div>
              </div>
            </div>

          </Transition>

          <!-- Error global -->
          <p v-if="globalError" class="text-[#f04438] text-sm text-center px-4">{{ globalError }}</p>

          <div class="flex justify-between items-center pt-2 pb-6">
            <button
              v-if="step > 1 && step < 4"
              type="button"
              @click="step--"
              class="btn-secondary"
            >
              Kembali
            </button>
            <div v-else></div>

            <button
              type="submit"
              :disabled="loading || (step === 4 && otpCode.length < 6) || (step === 1 && !form.commitment) || (step === 3 && !form.validation)"
              @click="onSubmitClick"
              class="btn-primary"
              :class="(step === 4 && otpCode.length < 6) || loading ? 'opacity-50 cursor-not-allowed' : ''"
            >
              <svg v-if="loading" class="w-4 h-4 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
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
