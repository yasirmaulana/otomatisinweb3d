import { randomInt } from 'node:crypto'

const WINDOW_MS = 10 * 60 * 1000

export default defineEventHandler(async (event) => {
  const { phone } = await readBody<{ phone: string }>(event)

  if (!phone) {
    throw createError({ statusCode: 400, message: 'Nomor WhatsApp diperlukan' })
  }

  const ip = getClientIp(event)
  const normalized = normalizePhone(phone)

  if (!checkRateLimit(`otp:ip:${ip}`, 10, WINDOW_MS)) {
    throw createError({ statusCode: 429, message: 'Terlalu banyak permintaan. Coba lagi dalam 10 menit.' })
  }
  if (!checkRateLimit(`otp:phone:${normalized}`, 3, WINDOW_MS)) {
    throw createError({ statusCode: 429, message: 'Terlalu banyak OTP dikirim ke nomor ini. Coba lagi dalam 10 menit.' })
  }

  const code = randomInt(100000, 999999).toString()
  await setOtp(normalized, code)

  try {
    const params = new URLSearchParams({
      target: normalized,
      message: `Kode OTP Kemitraan Otomatisin:\n\n*${code}*\n\nBerlaku 5 menit. Jangan bagikan ke siapapun.`,
    })

    const response = await $fetch<{ status: boolean }>('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        Authorization: process.env.FONNTE_TOKEN ?? '',
        'Content-Type': 'application/x-www-form-urlencoded',
      } as Record<string, string>,
      body: params.toString(),
    })

    if (!response.status) {
      throw new Error('Fonnte returned status false')
    }
  } catch (error) {
    console.error('Fonnte API error:', error)
    throw createError({ statusCode: 502, message: 'Gagal mengirim OTP. Coba lagi.' })
  }

  return { success: true }
})
