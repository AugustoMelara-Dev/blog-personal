import React from 'react';
import Giscus from '@giscus/react';

export default function Reactions() {
  const repo = import.meta.env.PUBLIC_GISCUS_REPO;
  const isConfigured = !!repo && repo !== 'TU_USUARIO/TU_REPO';

  if (!isConfigured) {
    return (
      <div className="not-prose mt-16 mb-8 xl:col-span-1">
        <div style={{
          padding: '1.5rem',
          background: '#111111',
          border: '1px solid #1f1f1f',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#525252', fontSize: '0.875rem', margin: 0 }}>
            Los comentarios estarán disponibles pronto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="not-prose mt-16 mb-8 xl:col-span-1">
      <h3 className="text-sm uppercase tracking-widest text-[#525252] mb-6 font-semibold">¿Qué piensas?</h3>
      <Giscus
        repo={import.meta.env.PUBLIC_GISCUS_REPO || "TU_USUARIO/TU_REPO"}
        repoId={import.meta.env.PUBLIC_GISCUS_REPO_ID || "TU_REPO_ID"}
        category="Announcements"
        categoryId={import.meta.env.PUBLIC_GISCUS_CATEGORY_ID || "TU_CATEGORY_ID"}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="transparent_dark"
        lang="es"
        loading="lazy"
      />
    </div>
  );
}
