interface OtpEntry {
  code: string
  expiresAt: number
}

// In-memory store, persists across requests in single Nitro process
const store = new Map<string, OtpEntry>()

export function setOtp(phone: string, code: string) {
  store.set(phone, { code, expiresAt: Date.now() + 5 * 60 * 1000 })
}

export function verifyOtp(phone: string, code: string): boolean {
  const entry = store.get(phone)
  if (!entry) return false
  if (Date.now() > entry.expiresAt) {
    store.delete(phone)
    return false
  }
  if (entry.code !== code) return false
  store.delete(phone)
  return true
}

export function normalizePhone(phone: string): string {
  let p = phone.replace(/[\s\-\(\)\.]/g, '')
  if (p.startsWith('+')) p = p.slice(1)
  if (p.startsWith('0')) p = '62' + p.slice(1)
  return p
}
