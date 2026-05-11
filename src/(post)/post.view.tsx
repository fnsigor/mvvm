import { usePostModel } from "./post.model"

type  PostViewProps =  ReturnType< typeof usePostModel >

export const PostView = (props: PostViewProps) => {
  const { alert, errors, handleSubmit, mutate, isSubmitting, register } = props

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