import { z } from 'zod'

export const SchemaPost = z.object({
  title: z.string().min(1, 'Título obrigatório'),
  body: z.string().min(1, 'Conteúdo obrigatório'),
})