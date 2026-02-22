import React from 'react';
import Giscus from '@giscus/react';

export default function Reactions() {
  return (
    <div className="not-prose mt-16 mb-8 xl:col-span-1">
      <h3 className="text-sm uppercase tracking-widest text-[#525252] mb-6 font-semibold">¿Qué piensas?</h3>
      <Giscus
        repo="TU_USUARIO/TU_REPO"
        repoId="TU_REPO_ID"
        category="Announcements"
        categoryId="TU_CATEGORY_ID"
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
