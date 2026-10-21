export type Category =
  | 'Perceivable'
  | 'Operable'
  | 'Understandable'
  | 'Robust'

export type ChecklistItem = {
  id: string
  category: Category
  title: string
  detail: string
  level: 'A' | 'AA' | 'AAA'
}

export const CATEGORIES: Category[] = [
  'Perceivable',
  'Operable',
  'Understandable',
  'Robust',
]

export const CHECKLIST: ChecklistItem[] = [
  {
    id: 'p-alt',
    category: 'Perceivable',
    title: 'Meaningful images have text alternatives',
    detail: 'Decorative images use empty alt; informative images describe the purpose.',
    level: 'A',
  },
  {
    id: 'p-contrast',
    category: 'Perceivable',
    title: 'Text contrast meets AA',
    detail: 'Normal text ≥ 4.5:1, large text ≥ 3:1 against its background.',
    level: 'AA',
  },
  {
    id: 'p-resize',
    category: 'Perceivable',
    title: 'Text can zoom to 200% without loss',
    detail: 'No clipped content or broken layout when browser zoom is 200%.',
    level: 'AA',
  },
  {
    id: 'p-motion',
    category: 'Perceivable',
    title: 'Motion respects prefers-reduced-motion',
    detail: 'Non-essential animation is reduced or disabled when the user requests it.',
    level: 'AAA',
  },
  {
    id: 'o-keyboard',
    category: 'Operable',
    title: 'All interactive controls are keyboard reachable',
    detail: 'Tab order follows reading order; no keyboard traps.',
    level: 'A',
  },
  {
    id: 'o-focus',
    category: 'Operable',
    title: 'Focus styles are clearly visible',
    detail: 'Do not remove outline without providing an equally clear replacement.',
    level: 'AA',
  },
  {
    id: 'o-target',
    category: 'Operable',
    title: 'Pointer targets are large enough',
    detail: 'Interactive targets are at least 24×24 CSS pixels where practical.',
    level: 'AA',
  },
  {
    id: 'o-skip',
    category: 'Operable',
    title: 'Skip link or landmark navigation exists',
    detail: 'Users can bypass repeated chrome and jump to main content.',
    level: 'A',
  },
  {
    id: 'u-labels',
    category: 'Understandable',
    title: 'Form fields have persistent labels',
    detail: 'Placeholder-only labels are not enough; errors are described in text.',
    level: 'A',
  },
  {
    id: 'u-language',
    category: 'Understandable',
    title: 'Page language is declared',
    detail: 'html lang is set; language changes in content are marked when needed.',
    level: 'A',
  },
  {
    id: 'u-consistent',
    category: 'Understandable',
    title: 'Navigation and naming stay consistent',
    detail: 'Repeated components keep the same order, labels, and behavior.',
    level: 'AA',
  },
  {
    id: 'r-name',
    category: 'Robust',
    title: 'Controls expose an accessible name',
    detail: 'Buttons, links, and inputs can be identified by assistive tech.',
    level: 'A',
  },
  {
    id: 'r-status',
    category: 'Robust',
    title: 'Status messages are announced',
    detail: 'Important updates use live regions or focus moves intentionally.',
    level: 'AA',
  },
  {
    id: 'r-valid',
    category: 'Robust',
    title: 'Markup is valid enough for AT',
    detail: 'No duplicate ids; roles and ARIA are used only when needed and correctly.',
    level: 'A',
  },
]
