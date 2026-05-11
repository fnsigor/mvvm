import { type RegistrationResult, type Status } from './post.types'
export const REGISTRATION_STATUS_MESSAGES: Record<Status, RegistrationResult> = {
  success: {
    status: 'success',
    title: 'Bem vindo à plataforma!',
    description: 'Você vai receber um email de confirmação em breve.',
  },
  error: {
    title: 'Oops...',
    description: 'Ocorreu um erro durante seu cadastro.',
    status: 'error',
  },
}