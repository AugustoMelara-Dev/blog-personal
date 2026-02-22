import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

interface Props {
  texto: string;
}

export default function StoryGenerator({ texto }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const generateImage = async () => {
    if (!containerRef.current) return;
    setIsGenerating(true);

    try {
      // Small timeout to ensure fonts are loaded and rendered
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(containerRef.current, {
        // @ts-ignore - html2canvas actually supports scale despite types
        scale: 2, // Higher quality
        backgroundColor: '#0a0a0a',
        width: 1080,
        height: 1920,
        windowWidth: 1080,
        windowHeight: 1920,
        useCORS: true,
      });

      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `frase-${Date.now()}.png`;
      link.href = url;
      link.click();
    } catch (err) {
      console.error('Error al generar la imagen:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button 
        onClick={generateImage} 
        disabled={isGenerating}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.625rem 1.25rem',
          background: 'transparent',
          border: '1px solid #2a2a2a',
          borderRadius: '8px',
          color: '#737373',
          cursor: isGenerating ? 'not-allowed' : 'pointer',
          fontSize: '0.875rem',
          transition: 'all 150ms',
          opacity: isGenerating ? 0.5 : 1
        }}
        onMouseEnter={e => {
          if(!isGenerating) {
            e.currentTarget.style.color = '#a3e635';
            e.currentTarget.style.borderColor = '#1f1f1f';
          }
        }}
        onMouseLeave={e => {
          if(!isGenerating) {
            e.currentTarget.style.color = '#737373';
            e.currentTarget.style.borderColor = '#2a2a2a';
          }
        }}
      >
        <Download size={14} />
        {isGenerating ? 'Generando...' : 'Imagen para estado'}
      </button>

      {/* Contenedor oculto para la captura */}
      <div 
        ref={containerRef}
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          width: '1080px',
          height: '1920px',
          backgroundColor: '#0a0a0a',
          fontFamily: 'Geist Variable, Geist, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '60px',
          bottom: '60px',
          left: '60px',
          right: '60px',
          border: '2px solid #1f1f1f',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          boxSizing: 'border-box'
        }}>
          {/* Contenido principal centrado */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
          }}>
            <div style={{
              width: '60px',
              height: '2px',
              backgroundColor: '#a3e635', // lime-400
              marginBottom: '1.5rem'
            }}></div>
            <span style={{ color: '#1f1f1f', fontSize: '40px', lineHeight: 0.5, marginBottom: '1.5rem' }}>•</span>
            
            <p style={{
              fontSize: '52px',
              color: '#f5f5f5',
              fontWeight: 600,
              lineHeight: 1.4,
              textAlign: 'center',
              margin: 0,
              wordBreak: 'break-word'
            }}>
              {texto}
            </p>

            <span style={{ color: '#1f1f1f', fontSize: '40px', lineHeight: 0.5, marginTop: '1.5rem' }}>•</span>
            <div style={{
              width: '60px',
              height: '2px',
              backgroundColor: '#a3e635', // lime-400
              marginTop: '1.5rem'
            }}></div>
          </div>

          <div style={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              fontSize: '24px',
              color: '#525252',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 500
            }}>
              VitoCipher
            </div>
            <div style={{
              fontSize: '18px',
              color: '#525252',
              letterSpacing: '0.15em'
            }}>
              VitoCipher.vercel.app
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
