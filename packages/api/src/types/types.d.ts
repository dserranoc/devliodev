export interface StandardResponse {
  success: boolean
  content?: any
  error?: any
  message?: string
}

declare global {
  namespace Express {
    interface Locals {
      user: {
        email: string
        _id: string
      }
    }
  }
}
