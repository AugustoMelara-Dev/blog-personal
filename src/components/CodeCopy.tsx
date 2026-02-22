import React, { useEffect } from 'react';

export default function CodeCopy() {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll('article pre > code');

    codeBlocks.forEach((codeEl) => {
      const pre = codeEl.parentElement;
      if (!pre || pre.querySelector('.code-copy-btn')) return;

      const btn = document.createElement('button');
      btn.className = 'code-copy-btn';
      btn.textContent = 'Copiar';
      btn.style.cssText = `
        position: absolute;
        top: 12px;
        right: 12px;
        background: #1a1a1a;
        border: 1px solid #2a2a2a;
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 11px;
        color: #737373;
        cursor: pointer;
        z-index: 10;
        transition: all 150ms;
      `;

      btn.addEventListener('mouseenter', () => {
        btn.style.color = '#a3e635';
        btn.style.borderColor = 'rgba(163, 230, 53, 0.3)';
      });
      btn.addEventListener('mouseleave', () => {
        if (btn.textContent !== '¡Copiado!') {
          btn.style.color = '#737373';
          btn.style.borderColor = '#2a2a2a';
        }
      });

      btn.addEventListener('click', async () => {
        const text = codeEl.textContent || '';
        await navigator.clipboard.writeText(text);
        btn.textContent = '¡Copiado!';
        btn.style.color = '#a3e635';
        btn.style.borderColor = 'rgba(163, 230, 53, 0.3)';
        setTimeout(() => {
          btn.textContent = 'Copiar';
          btn.style.color = '#737373';
          btn.style.borderColor = '#2a2a2a';
        }, 2000);
      });

      pre.appendChild(btn);
    });
  }, []);

  return null;
}
