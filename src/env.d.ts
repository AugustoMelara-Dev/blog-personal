/// <reference path="../.astro/types.d.ts" />

declare module 'reading-time' {
  function readingTime(text: string): { text: string; minutes: number }
  export default readingTime
}