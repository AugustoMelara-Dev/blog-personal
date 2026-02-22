import React, { useState, useEffect } from 'react';

interface PostItem {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  pubDate: string;
  readingTime: string;
}

export default function SavedPosts({ posts }: { posts: PostItem[] }) {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  useEffect(() => {
    const bookmarks: string[] = JSON.parse(localStorage.getItem('VitoCipher-bookmarks') || '[]');
    setSavedSlugs(bookmarks);
  }, []);

  const savedPosts = posts.filter((p) => savedSlugs.includes(p.slug));

  if (savedSlugs.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[#525252] text-lg mb-4">Aún no guardaste nada.</p>
        <a
          href="/blog"
          className="inline-block px-6 py-3 bg-lime-400 text-[#0a0a0a] font-semibold rounded-md hover:bg-lime-300 transition-colors"
        >
          Explorar el blog
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {savedPosts.map((post, i) => (
        <a
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group block relative bg-[#0f0f0f] border border-[#1a1a1a] rounded-[10px] p-7 transition-all duration-200 hover:bg-[#141414] hover:border-[#2a2a2a] overflow-hidden"
        >
          <span className="absolute top-4 right-6 text-5xl font-black text-[#1a1a1a] leading-none select-none pointer-events-none">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="text-xl font-semibold text-[#f5f5f5] line-clamp-2 group-hover:text-lime-400 transition-colors duration-200 pr-12">
            {post.title}
          </h3>
          <p className="text-sm text-[#737373] line-clamp-2 mt-2 leading-relaxed">
            {post.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-[#525252]">
            <span>{post.readingTime}</span>
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}
