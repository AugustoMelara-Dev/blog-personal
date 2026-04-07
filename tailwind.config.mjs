import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: '#f6f1e7',
        brand: {
          50: '#eef4f8',
          100: '#dbe6ee',
          200: '#bdd0df',
          700: '#24507a',
          800: '#1f4367',
        },
        surface: {
          muted: '#f0e8db',
          warm: '#e7dbc9',
        },
        ink: {
          50: '#f8fafc',
          500: '#64748b',
          600: '#485467',
          700: '#334155',
          900: '#1e293b',
        },
      },
      fontFamily: {
        sans: ['Geist Variable', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 45px rgba(30, 41, 59, 0.08)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': '#485467',
            '--tw-prose-headings': '#1e293b',
            '--tw-prose-links': '#24507a',
            '--tw-prose-bold': '#1e293b',
            '--tw-prose-quote-borders': '#24507a',
            '--tw-prose-counters': '#64748b',
            '--tw-prose-bullets': '#64748b',
            '--tw-prose-hr': '#dbe6ee',
          },
        },
      }),
    },
  },
  plugins: [
    typography,
  ],
};
