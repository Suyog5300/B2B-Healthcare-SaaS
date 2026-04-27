export const APP_NAME = 'Healthcare SaaS';
export const STORAGE_KEYS = {
  AUTH_USER: 'hc_auth_user',
  THEME: 'hc_theme',
  VIEW_MODE: 'hc_view_mode',
} as const;

export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
} as const;

export type ViewMode = (typeof VIEW_MODES)[keyof typeof VIEW_MODES];