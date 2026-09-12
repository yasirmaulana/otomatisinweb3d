import { prisma } from './prisma'

const MAX_ATTEMPTS = 5
const OTP_TTL_MS = 5 * 60 * 1000

export async function setOtp(phone: string, code: string): Promise<void> {
  await prisma.otpCode.upsert({
    where: { phone },
    update: { code, expiresAt: new Date(Date.now() + OTP_TTL_MS), attempts: 0 },
    create: { phone, code, expiresAt: new Date(Date.now() + OTP_TTL_MS) },
  })
}

export async function verifyOtp(phone: string, code: string): Promise<boolean> {
  const entry = await prisma.otpCode.findUnique({ where: { phone } })
  if (!entry) return false
  if (new Date() > entry.expiresAt) {
    await prisma.otpCode.delete({ where: { phone } })
    return false
  }
  if (entry.attempts >= MAX_ATTEMPTS) {
    await prisma.otpCode.delete({ where: { phone } })
    return false
  }
  if (entry.code !== code) {
    await prisma.otpCode.update({ where: { phone }, data: { attempts: { increment: 1 } } })
    return false
  }
  await prisma.otpCode.delete({ where: { phone } })
  return true
}

export function normalizePhone(phone: string): string {
  let p = phone.replace(/[\s\-\(\)\.]/g, '')
  if (p.startsWith('+')) p = p.slice(1)
  if (p.startsWith('0')) p = '62' + p.slice(1)
  return p
}
