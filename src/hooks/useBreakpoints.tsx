import useMediaQuery from './useMediaQuery'

/**
 * Get a set of boolean representing which breakpoint is active
 * and which breakpoints are inactive.
 *
 * Inspired by: https://github.com/contra/react-responsive/issues/162#issuecomment-592082035
 */
export default function useBreakpoints() {
  const breakpoints = {
    isSm: useMediaQuery('(max-width: 640px)'),
    isMd: useMediaQuery('(min-width: 641px) and (max-width: 768px)'),
    isLg: useMediaQuery('(min-width: 769px) and (max-width: 1269px)'),
    isXl: useMediaQuery('(min-width: 1270px)'),
    active: 'sm',
  }
  if (breakpoints.isSm) breakpoints.active = 'sm'
  if (breakpoints.isMd) breakpoints.active = 'md'
  if (breakpoints.isLg) breakpoints.active = 'lg'
  if (breakpoints.isXl) breakpoints.active = 'xl'
  return breakpoints
}
