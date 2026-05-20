export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { otpCode, ...formData } = body

  if (!otpCode || !formData.whatsapp) {
    throw createError({ statusCode: 400, message: 'Data tidak lengkap' })
  }

  if (!verifyOtp(formData.whatsapp, otpCode)) {
    throw createError({ statusCode: 422, message: 'Kode OTP tidak valid atau sudah kedaluwarsa' })
  }

  await $fetch(`${config.supabaseUrl}/rest/v1/partnership_leads`, {
    method: 'POST',
    headers: {
      apikey: config.supabaseKey,
      Authorization: `Bearer ${config.supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: {
      name: formData.name,
      whatsapp: formData.whatsapp,
      email: formData.email,
      background: formData.background,
      commitment: formData.commitment,
      idea_name: formData.ideaName,
      target_user: formData.targetUser,
      problem: formData.problem,
      mvp_features: formData.mvpFeatures,
      acquisition: formData.acquisition,
      validation: formData.validation,
      profit_share: formData.profitShare,
    },
  })

  return { success: true }
})
