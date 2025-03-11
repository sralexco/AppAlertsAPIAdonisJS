import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (query, field) => {
        const user = await query.from('users').select('id').where('email', field).first()
        return !user
      }),
    password: vine.string().minLength(3),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(3),
  })
)
