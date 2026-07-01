import {
  faBuilding,
  faQuestionCircle,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  STATS_FALLBACK_ICON_BACKGROUND,
  STATS_ICON_MAP,
  resolveStatIconBackground,
} from '../stats/statsIconUtils';

/** Icons the quick-actions API may reference by string key. */
export const QUICK_ACTIONS_ICON_MAP = {
  ...STATS_ICON_MAP,
  faUser,
  user: faUser,
  faBuilding,
  building: faBuilding,
  building2: faBuilding,
};

export const QUICK_ACTIONS_FALLBACK_ICON = faQuestionCircle;

/**
 * @param {string|undefined|null} iconKey - API `icon` field
 * @returns {{ icon: import('@fortawesome/fontawesome-svg-core').IconDefinition, isMissing: boolean }}
 */
export const resolveQuickActionIcon = (iconKey) => {
  if (typeof iconKey === 'string' && iconKey.trim() && QUICK_ACTIONS_ICON_MAP[iconKey.trim()]) {
    return { icon: QUICK_ACTIONS_ICON_MAP[iconKey.trim()], isMissing: false };
  }

  return { icon: QUICK_ACTIONS_FALLBACK_ICON, isMissing: true };
};

export {
  resolveStatIconBackground as resolveQuickActionIconBackground,
  STATS_FALLBACK_ICON_BACKGROUND as QUICK_ACTIONS_FALLBACK_ICON_BACKGROUND,
};
