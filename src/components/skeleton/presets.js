/** Named layout presets for {@link SkeletonScreen}. */

export const SKELETON_VARIANTS = {
  STATS: 'stats',
  TOOLBAR_TABLE: 'toolbar-table',
  TABLE: 'table',
  CARD: 'card',
  CARD_LIST: 'card-list',
  GRID_CARDS: 'grid-cards',
  CHART_CARD: 'chart-card',
  DETAIL: 'detail',
  DASHBOARD: 'dashboard',
  PAGE: 'page',
};

/** Default table column layouts matching common admin tables. */
export const TABLE_COLUMN_PRESETS = {
  nras: [
    { type: 'iconText' },
    { type: 'text' },
    { type: 'actions', align: 'right' },
  ],
  trainingProviders: [
    { type: 'iconText' },
    { type: 'text', align: 'center' },
    { type: 'text', align: 'center' },
    { type: 'actions', align: 'right' },
  ],
  pendingRequests: [
    { type: 'iconText' },
    { type: 'text' },
    { type: 'pill', align: 'center' },
    { type: 'text' },
    { type: 'actions', align: 'right' },
  ],
  requestedTrainings: [
    { type: 'textStack' },
    { type: 'pill' },
    { type: 'text' },
    { type: 'actions', align: 'right' },
  ],
  users: [
    { type: 'iconText' },
    { type: 'text' },
    { type: 'text' },
    { type: 'actions', align: 'right' },
  ],
};
