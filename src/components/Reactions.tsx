import Giscus from '@giscus/react';

export default function Reactions() {
  return (
    <div className="mt-16 pt-8 border-t border-[#1a1a1a]">
      <p className="text-xs uppercase tracking-[0.2em] text-[#525252] mb-6">
        Archivo de Discusión
      </p>
      <Giscus
        id="comentarios"
        repo="AugustoMelara-Dev/blog-personal"
        repoId="R_kgDORV88LQ"
        category="Announcements"
        categoryId="DIC_kwDORV88Lc4C3Ajl"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark"
        lang="es"
        loading="lazy"
      />
    </div>
  );
}
