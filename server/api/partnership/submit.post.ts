import { prisma } from '../../utils/prisma'
import { z } from 'zod'

const MAX_TEXT = 2000

const SubmitSchema = z.object({
  otpCode: z.string().length(6).regex(/^\d+$/),
  name: z.string().min(1).max(100).transform(s => s.trim()),
  whatsapp: z.string().min(8).max(20).regex(/^[\d\s\+\-\(\)\.]+$/),
  email: z.string().email().max(200).transform(s => s.trim().toLowerCase()),
  background: z.string().min(1).max(MAX_TEXT).transform(s => s.trim()),
  commitment: z.string().min(1).max(MAX_TEXT).transform(s => s.trim()),
  ideaName: z.string().min(1).max(200).transform(s => s.trim()),
  targetUser: z.string().min(1).max(MAX_TEXT).transform(s => s.trim()),
  problem: z.string().min(1).max(MAX_TEXT).transform(s => s.trim()),
  mvpFeatures: z.string().min(1).max(MAX_TEXT).transform(s => s.trim()),
  acquisition: z.string().min(1).max(MAX_TEXT).transform(s => s.trim()),
  validation: z.string().min(1).max(MAX_TEXT).transform(s => s.trim()),
  profitShare: z.string().min(1).max(MAX_TEXT).transform(s => s.trim()),
})

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

  const parsed = SubmitSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, message: 'Data tidak valid: ' + parsed.error.issues[0]?.message })
  }

  const { otpCode, ...formData } = parsed.data

  const normalized = normalizePhone(formData.whatsapp)
  if (!await verifyOtp(normalized, otpCode)) {
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

  const adminNumber = process.env.ADMIN_WA_NUMBER
  if (adminNumber) {
    const params = new URLSearchParams({
      target: adminNumber,
      message: `Ada calon partner menginput formulir kemitraan`,
    })
    await $fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        Authorization: process.env.FONNTE_TOKEN ?? '',
        'Content-Type': 'application/x-www-form-urlencoded',
      } as Record<string, string>,
      body: params.toString(),
    }).catch(() => {})
  }

  return { success: true }
})
