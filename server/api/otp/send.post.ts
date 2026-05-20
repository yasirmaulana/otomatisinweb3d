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

    await $fetch<{ status: boolean }>('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        Authorization: config.fonnteToken,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })
  } catch {
    throw createError({ statusCode: 502, message: 'Gagal mengirim OTP ke WhatsApp. Coba lagi.' })
  }

  return { success: true }
})
