import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a0a',
          surface: '#111111',
          border: '#1f1f1f',
          'border-hover': '#2a2a2a',
          subtle: '#1a1a1a',
        },
        text: {
          primary: '#f5f5f5',
          secondary: '#737373',
          muted: '#525252',
          subtle: '#a3a3a3',
        },
        accent: {
          DEFAULT: '#a3e635',
        },
      },
      fontFamily: {
        sans: ['Geist Variable', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono Variable', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '65ch',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': '#d4d4d4',
            '--tw-prose-headings': '#f5f5f5',
            '--tw-prose-lead': '#a3a3a3',
            '--tw-prose-links': '#a3e635',
            '--tw-prose-bold': '#f5f5f5',
            '--tw-prose-counters': '#737373',
            '--tw-prose-bullets': '#525252',
            '--tw-prose-hr': '#1f1f1f',
            '--tw-prose-quotes': '#d4d4d4',
            '--tw-prose-quote-borders': '#a3e635',
            '--tw-prose-captions': '#737373',
            '--tw-prose-code': '#f5f5f5',
            '--tw-prose-pre-code': '#d4d4d4',
            '--tw-prose-pre-bg': '#111111',
            '--tw-prose-th-borders': '#1f1f1f',
            '--tw-prose-td-borders': '#1f1f1f',
            'code': {
              backgroundColor: '#1f1f1f',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            'blockquote': {
              borderLeftColor: '#a3e635',
              backgroundColor: '#111111',
              padding: '1rem 1.5rem',
              borderRadius: '0 0.5rem 0.5rem 0',
              fontStyle: 'normal',
            },
            'blockquote p:first-of-type::before': { content: '""' },
            'blockquote p:last-of-type::after': { content: '""' },
            'a': {
              color: '#a3e635',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              '&:hover': {
                opacity: '0.8',
              },
            },
            'h1, h2, h3, h4': {
              color: '#f5f5f5',
              fontWeight: '600',
            },
            'strong': {
              color: '#f5f5f5',
            },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
  ],
};
