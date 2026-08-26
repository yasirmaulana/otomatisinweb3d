import { prisma } from '../../utils/prisma'

function nowJakarta(): Date {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date())
  const [date, time] = parts.split(', ')
  return new Date(`${date}T${time}+07:00`)
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { otpCode, ...formData } = body

  if (!otpCode || !formData.whatsapp) {
    throw createError({ statusCode: 400, message: 'Data tidak lengkap' })
  }

  if (!verifyOtp(formData.whatsapp, otpCode)) {
    throw createError({ statusCode: 422, message: 'Kode OTP tidak valid atau sudah kedaluwarsa' })
  }

  await prisma.partnershipLead.create({
    data: {
      name: formData.name,
      whatsapp: formData.whatsapp,
      email: formData.email,
      background: formData.background,
      commitment: formData.commitment,
      ideaName: formData.ideaName,
      targetUser: formData.targetUser,
      problem: formData.problem,
      mvpFeatures: formData.mvpFeatures,
      acquisition: formData.acquisition,
      validation: formData.validation,
      profitShare: formData.profitShare,
      createdAt: nowJakarta(),
    },
  })

  return { success: true }
})
