import React, { useState } from 'react';
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setMessage('Por favor, introduce un email válido.');
      return;
    }

    setStatus('loading');
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        signal: controller.signal
      });
      
      clearTimeout(timeout);
      const data = await res.json();
      
      if (data.success) {
        setStatus('success');
        setMessage('¡Listo! Te avisaré con cada nuevo post.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error ?? 'Error desconocido');
      }
    } catch (err: any) {
      clearTimeout(timeout);
      if (err.name === 'AbortError') {
        setStatus('error');
        setMessage('La solicitud tardó demasiado. Intenta de nuevo.');
      } else {
        setStatus('error');
        setMessage('Error de conexión.');
      }
    }
  };

  // CAMBIO AÑADIDO AQUÍ: Neutralización visual requerida
  return null;

  return (
    <div className="w-full max-w-md mx-auto sm:mx-0">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus('idle');
          }}
          placeholder="tu@email.com"
          className="flex-1 bg-[#111111] border border-[#1f1f1f] text-[#f5f5f5] placeholder-[#525252] rounded-md px-4 py-3 focus:border-lime-400/50 focus:outline-none transition-colors"
          disabled={status === 'loading' || status === 'success'}
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="bg-lime-400 text-[#0a0a0a] font-semibold rounded-md px-6 py-3 hover:bg-lime-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'loading' ? 'Suscribiendo...' : 'Suscribirse'}
        </button>
      </form>
      
      {status === 'success' && (
        <p style={{
          fontSize: '0.875rem',
          color: '#a3e635',
          marginTop: '0.75rem',
        }}>
          ¡Listo! Tu email fue registrado.
        </p>
      )}
      {status === 'error' && (
        <p style={{
          fontSize: '0.875rem', 
          color: '#ef4444',
          marginTop: '0.75rem',
        }}>
          {message || 'Algo salió mal. Intenta de nuevo.'}
        </p>
      )}
    </div>
  );
}
