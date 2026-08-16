import { prisma } from '../../utils/prisma'

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
    },
  })

  return { success: true }
})
