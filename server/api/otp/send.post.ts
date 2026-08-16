export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { phone } = await readBody<{ phone: string }>(event)

  if (!phone) {
    throw createError({ statusCode: 400, message: 'Nomor WhatsApp diperlukan' })
  }

  const target = normalizePhone(phone)
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  setOtp(phone, code)

  try {
    const params = new URLSearchParams({
      target,
      message: `Kode OTP Kemitraan Otomatisin:\n\n*${code}*\n\nBerlaku 5 menit. Jangan bagikan ke siapapun.`,
    })

    const response = await $fetch<{ status: boolean; detail?: string }>('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        Authorization: process.env.FONNTE_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!response.status) {
      throw createError({ statusCode: 502, message: response.detail || 'Gagal mengirim OTP ke WhatsApp.' })
    }
  } catch (error: any) {
    const message = error?.data?.message || error?.message || 'Gagal mengirim OTP ke WhatsApp. Coba lagi.'
    throw createError({ statusCode: 502, message })
  }

  return { success: true }
})
