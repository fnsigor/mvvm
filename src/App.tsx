import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { z } from 'zod'
import axios from 'axios'

const SchemaPost = z.object({
  titulo: z.string().min(1, 'Título obrigatório'),
  conteudo: z.string().min(1, 'Conteúdo obrigatório'),
})

type SchemaPostType = z.infer<typeof SchemaPost>

type RegistrationResult = {
  status: 'error' | 'success'
  title: string
  description: string
}

export default function App() {
  const [alert, setAlert] = useState<RegistrationResult | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SchemaPostType>({
    resolver: zodResolver(SchemaPost),
  })

  const { mutate } = useMutation<string, AxiosError, SchemaPostType>({
    mutationFn: async (data) => {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts/1', data)
      return response.data
    },
    onError: () => {
      setAlert({
        status: 'error',
        title: 'Oops...',
        description: 'Ocorreu um erro durante seu cadastro.',
      })
    },
    onSuccess: () => {
      setAlert({
        status: 'success',
        title: 'Bem vindo à plataforma!',
        description: 'Você vai receber um email de confirmação em breve.',
      })
    },
  })

  return (
    <div style={{ maxWidth: 480, margin: '48px auto', padding: '0 16px' }}>
      <h1>Novo Post</h1>

      {alert && (
        <div style={{ marginBottom: 16, padding: 12, border: '1px solid', borderRadius: 6, borderColor: alert.status === 'error' ? 'red' : 'green', color: alert.status === 'error' ? 'red' : 'green' }}>
          <strong>{alert.title}</strong>
          <p style={{ margin: 0 }}>{alert.description}</p>
        </div>
      )}

      <form onSubmit={handleSubmit((data) => mutate(data))} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label htmlFor="titulo">Título</label>
          <br />
          <input id="titulo" {...register('titulo')} style={{ width: '100%', padding: 8, marginTop: 4 }} />
          {errors.titulo && <span style={{ color: 'red', fontSize: 12 }}>{errors.titulo.message}</span>}
        </div>

        <div>
          <label htmlFor="conteudo">Conteúdo</label>
          <br />
          <textarea id="conteudo" rows={4} {...register('conteudo')} style={{ width: '100%', padding: 8, marginTop: 4 }} />
          {errors.conteudo && <span style={{ color: 'red', fontSize: 12 }}>{errors.conteudo.message}</span>}
        </div>

        <button type="submit" disabled={isSubmitting} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  )
}
