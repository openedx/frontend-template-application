import {
  faClock,
  faBookOpen,
  faCheckCircle,
  faExclamationTriangle,
  faGlobe,
  faQuestionCircle,
  faStar,
  faUpload,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

/** Icons the stats API may reference by string key (e.g. `"faUsers"`). */
export const STATS_ICON_MAP = {
  faUsers,
  users: faUsers,
  faExclamationTriangle,
  exclamationTriangle: faExclamationTriangle,
  faGlobe,
  globe: faGlobe,
  faClock,
  clock: faClock,
  faBookOpen,
  bookOpen: faBookOpen,
  faCheckCircle,
  circleCheck: faCheckCircle,
  checkCircle: faCheckCircle,
  faStar,
  star: faStar,
  faUpload,
  upload: faUpload,
  import: faUpload,
};

export const STATS_FALLBACK_ICON = faQuestionCircle;

export const STATS_FALLBACK_ICON_BACKGROUND = '#6B7280';

/**
 * @param {string|undefined|null} iconKey - API `icon` field
 * @returns {{ icon: import('@fortawesome/fontawesome-svg-core').IconDefinition, isMissing: boolean }}
 */
export const resolveStatIcon = (iconKey) => {
  if (typeof iconKey === 'string' && iconKey.trim() && STATS_ICON_MAP[iconKey.trim()]) {
    return { icon: STATS_ICON_MAP[iconKey.trim()], isMissing: false };
  }

  return { icon: STATS_FALLBACK_ICON, isMissing: true };
};

/**
 * @param {string|undefined|null} background - API `iconBackground` field
 * @returns {string}
 */
export const resolveStatIconBackground = (background) => {
  if (typeof background === 'string' && background.trim()) {
    return background.trim();
  }

  return STATS_FALLBACK_ICON_BACKGROUND;
};
