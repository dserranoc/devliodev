import { object, string, TypeOf } from 'zod'

const createUserPayload = {
  body: object({
    email: string({ required_error: 'Email is required' }).email('Not a valid email'),
    password: string({ required_error: 'Password is required' }).min(8, 'Password must be at least 8 characters long'),
    passwordConfirmation: string({ required_error: 'Password confirmation is required' }),
    name: string({ required_error: 'First name is required' }),
    surname: string({ required_error: 'Surname is required' })
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation']
  })
}

const params = {
  params: object({
    email: string({
      required_error: 'Email is required'
    })
  })
}
export const createUserSchema = object({
  ...createUserPayload
})

export const updateUserSchema = object({
  ...createUserPayload,
  ...params
})

export const deleteUserSchema = object({
  ...params
})

export const getUserSchema = object({
  ...params
})

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string()
  })
})

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }).email('Not a valid email')
  })
})

export const resetPasswordSchema = object({
  params: object({
    id: string(),
    passwordResetCode: string()
  }),
  body: object({
    password: string({
      required_error: 'Password is required'
    }).min(6, 'Password is too short - should be min 6 chars'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required'
    })
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation']
  })
})

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }).email('Not a valid email'),
    password: string({
      required_error: 'Password is required'
    })
  })
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'>
export type UpdateUserInput = Omit<TypeOf<typeof updateUserSchema>, 'body.passwordConfirmation'>
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>
export type GetUserInput = TypeOf<typeof getUserSchema>
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>
export type LoginUserInput = TypeOf<typeof loginUserSchema>
