import { useSyncExternalStore } from 'react'

const query = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

function subscribe(callback) {
  const media = window.matchMedia(query)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

export default function usePointerMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false)
}
