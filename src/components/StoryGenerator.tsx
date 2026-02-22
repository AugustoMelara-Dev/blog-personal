import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

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
        className="flex items-center gap-2 text-sm px-3 py-1.5 rounded bg-[#111111] border border-[#1f1f1f] text-[#a3a3a3] hover:border-lime-400/30 hover:text-lime-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
            <span>Generando...</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>📲 Imagen</span>
          </>
        )}
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
              width: '40px',
              height: '2px',
              backgroundColor: '#a3e635', // lime-400
              marginBottom: '3rem'
            }}></div>
            
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

            <div style={{
              width: '40px',
              height: '2px',
              backgroundColor: '#a3e635', // lime-400
              marginTop: '3rem'
            }}></div>
          </div>

          <div style={{
            marginTop: 'auto',
            fontSize: '24px',
            color: '#525252',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 500
          }}>
            Blog Personal
          </div>
        </div>
      </div>
    </>
  );
}
