export default function Reactions() {
  const isConfigured = false // cambiar a true 
                              // cuando tengas los IDs

  if (!isConfigured) {
    return (
      <div style={{
        padding: '1.5rem',
        borderTop: '1px solid #1a1a1a',
        marginTop: '2rem',
      }}>
        <p style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#525252',
          marginBottom: '0.75rem',
        }}>
          Comentarios
        </p>
        <p style={{
          fontSize: '0.875rem',
          color: '#3a3a3a',
        }}>
          Próximamente.
        </p>
      </div>
    )
  }

  // Giscus va aquí cuando esté configurado
  return null
}
