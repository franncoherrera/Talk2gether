/**
 * Breakpoint constants for responsive design.
 *
 * This object defines various breakpoints used for responsive design in the application.
 * Each breakpoint has a name and a corresponding width size.
 *
 * @constant
 *
 * @property {{ NAME_SIZE: 'EXTRA_EXTRA_LARGE', WIDTH_SIZE: '1366px' }} EXTRA_EXTRA_LARGE - Breakpoint for extra extra large screens.
 * @property {{ NAME_SIZE: 'EXTRA_LARGE', WIDTH_SIZE: '1280px' }} EXTRA_LARGE - Breakpoint for extra large screens.
 * @property {{ NAME_SIZE: 'LARGE', WIDTH_SIZE: '992px' }} LARGE - Breakpoint for large screens.
 * @property {{ NAME_SIZE: 'MEDIUM', WIDTH_SIZE: '768px' }} MEDIUM - Breakpoint for medium screens.
 * @property {{ NAME_SIZE: 'SMALL', WIDTH_SIZE: '576px' }} SMALL - Breakpoint for small screens.
 * @property {{ NAME_SIZE: 'EXTRA_SMALL', WIDTH_SIZE: '350px' }} EXTRA_SMALL - Breakpoint for extra small screens.
 */
export const BREAKPOINTS = {
  EXTRA_EXTRA_LARGE: {
    NAME_SIZE: 'EXTRA_EXTRA_LARGE',
    WIDTH_SIZE: '1366px',
  } as const,
  EXTRA_LARGE: { NAME_SIZE: 'EXTRA_LARGE', WIDTH_SIZE: '1280px' } as const,
  LARGE: { NAME_SIZE: 'LARGE', WIDTH_SIZE: '992px' } as const,
  MEDIUM: { NAME_SIZE: 'MEDIUM', WIDTH_SIZE: '768px' } as const,
  SMALL: { NAME_SIZE: 'SMALL', WIDTH_SIZE: '576px' } as const,
  EXTRA_SMALL: { NAME_SIZE: 'EXTRA_SMALL', WIDTH_SIZE: '350px' } as const,
};
