import { z } from 'zod'

export const SchemaPost = z.object({
  titulo: z.string().min(1, 'Título obrigatório'),
  conteudo: z.string().min(1, 'Conteúdo obrigatório'),
})