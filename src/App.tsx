import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  CATEGORIES,
  CHECKLIST,
  type Category,
} from './data/checklist'
import { readCheckedFromHash, writeCheckedToHash } from './hashState'

type Filter = 'all' | 'open' | 'done'

export default function App() {
  const [checked, setChecked] = useState<Set<string>>(() =>
    readCheckedFromHash(),
  )
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [filter, setFilter] = useState<Filter>('all')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    writeCheckedToHash(checked)
  }, [checked])

  useEffect(() => {
    const onHash = () => setChecked(readCheckedFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const total = CHECKLIST.length
  const doneCount = checked.size
  const percent = Math.round((doneCount / total) * 100)

  const visible = useMemo(() => {
    return CHECKLIST.filter((item) => {
      if (category !== 'all' && item.category !== category) return false
      const isDone = checked.has(item.id)
      if (filter === 'open' && isDone) return false
      if (filter === 'done' && !isDone) return false
      return true
    })
  }, [category, filter, checked])

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function reset() {
    if (!window.confirm('Clear all checked items?')) return
    setChecked(new Set())
  }

  async function copyShareLink() {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      window.prompt('Copy this share URL:', url)
    }
  }

  return (
    <div className="page">
      <a className="skip" href="#main">
        Skip to checklist
      </a>

      <header className="hero">
        <p className="eyebrow">WCAG-oriented · shareable</p>
        <h1>a11y-checklist</h1>
        <p className="lede">
          A compact accessibility checklist for shipping UI. Tick items as you
          go — progress is stored in the URL hash so you can share a review
          state.
        </p>

        <div className="progress" aria-live="polite">
          <div className="progress__meta">
            <strong>
              {doneCount}/{total} done
            </strong>
            <span>{percent}%</span>
          </div>
          <div
            className="progress__track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-label="Checklist completion"
          >
            <div className="progress__fill" style={{ width: `${percent}%` }} />
          </div>
        </div>

        <div className="hero__actions">
          <button type="button" className="btn btn--primary" onClick={() => void copyShareLink()}>
            {copied ? 'Link copied' : 'Copy share link'}
          </button>
          <button type="button" className="btn" onClick={reset}>
            Reset
          </button>
        </div>
      </header>

      <div className="filters" role="region" aria-label="Filters">
        <div className="filter-row">
          <span className="filter-label">Category</span>
          <div className="chips" role="group" aria-label="Category filter">
            <Chip
              active={category === 'all'}
              onClick={() => setCategory('all')}
            >
              All
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip
                key={c}
                active={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </Chip>
            ))}
          </div>
        </div>
        <div className="filter-row">
          <span className="filter-label">Status</span>
          <div className="chips" role="group" aria-label="Status filter">
            {(
              [
                ['all', 'All'],
                ['open', 'Open'],
                ['done', 'Done'],
              ] as const
            ).map(([value, label]) => (
              <Chip
                key={value}
                active={filter === value}
                onClick={() => setFilter(value)}
              >
                {label}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <main id="main" className="list">
        {visible.length === 0 ? (
          <p className="empty">No items match these filters.</p>
        ) : (
          visible.map((item) => {
            const isDone = checked.has(item.id)
            return (
              <article
                key={item.id}
                className={isDone ? 'card is-done' : 'card'}
              >
                <label className="card__check">
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggle(item.id)}
                  />
                  <span className="card__body">
                    <span className="card__top">
                      <span className="card__title">{item.title}</span>
                      <span className="badge">{item.level}</span>
                    </span>
                    <span className="card__meta">{item.category}</span>
                    <span className="card__detail">{item.detail}</span>
                  </span>
                </label>
              </article>
            )
          })
        )}
      </main>

      <footer className="footer">
        <p>
          Curated starter list — not a substitute for the full{' '}
          <a
            href="https://www.w3.org/WAI/WCAG22/quickref/"
            target="_blank"
            rel="noreferrer"
          >
            WCAG 2.2 quickref
          </a>
          . PRs welcome to add items.
        </p>
      </footer>
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      className={active ? 'chip is-active' : 'chip'}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
