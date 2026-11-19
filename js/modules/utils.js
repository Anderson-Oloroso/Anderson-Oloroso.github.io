/**
 * Utilidades compartidas por los módulos de efectos
 */
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

export const prefersReducedMotion = () => reducedMotionQuery.matches;
export const hasFinePointer = () => finePointerQuery.matches;

export const lerp = (from, to, amount) => from + (to - from) * amount;
export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
