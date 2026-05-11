import { z } from 'zod'
import { SchemaPost } from './post.schema'

//essa interface poderia estar junto com o zod, nao tem problema
export type SchemaPostType = z.infer<typeof SchemaPost>

export type RegistrationResult = {
  status: 'error' | 'success'
  title: string
  description: string
}
