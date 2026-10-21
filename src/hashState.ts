/** Encode checked item ids into the URL hash for shareable progress. */

export function readCheckedFromHash(): Set<string> {
  const hash = window.location.hash.replace(/^#/, '')
  if (!hash) return new Set()
  try {
    const decoded = decodeURIComponent(hash)
    if (decoded.startsWith('c=')) {
      const ids = decoded.slice(2).split(',').filter(Boolean)
      return new Set(ids)
    }
    // legacy / compact: comma list only
    return new Set(decoded.split(',').filter(Boolean))
  } catch {
    return new Set()
  }
}

export function writeCheckedToHash(checked: Set<string>): void {
  const ids = [...checked].sort()
  const next = ids.length ? `#c=${encodeURIComponent(ids.join(','))}` : '#'
  if (window.location.hash === next || (ids.length === 0 && !window.location.hash)) {
    if (ids.length === 0 && window.location.hash) {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    }
    return
  }
  history.replaceState(
    null,
    '',
    `${window.location.pathname}${window.location.search}${next === '#' ? '' : next}`,
  )
}
