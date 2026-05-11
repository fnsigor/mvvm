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
          <label htmlFor="title">Título</label>
          <br />
          <input id="title" {...register('title')} style={{ width: '100%', padding: 8, marginTop: 4 }} />
          {errors.title && <span style={{ color: 'red', fontSize: 12 }}>{errors.title.message}</span>}
        </div>

        <div>
          <label htmlFor="body">Conteúdo</label>
          <br />
          <textarea id="body" rows={4} {...register('body')} style={{ width: '100%', padding: 8, marginTop: 4 }} />
          {errors.body && <span style={{ color: 'red', fontSize: 12 }}>{errors.body.message}</span>}
        </div>

        <button type="submit" disabled={isSubmitting} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  )
}