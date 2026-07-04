import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { FILTER_ALL } from './trainingsCatalogOptionsUtils';

/**
 * @param {object|null|undefined} row
 */
export const mapSearnTrainingCatalogListRow = (row) => {
  if (!row || typeof row !== 'object') {
    return null;
  }

  const rating = Number.parseFloat(row.rating);

  return {
    id: row.id != null ? String(row.id) : '',
    title: row.title ?? '',
    description: row.description ?? '',
    mode: row.mode ?? '',
    provider: row.provider ?? '',
    providerSlug: row.provider_slug ?? '',
    rating: Number.isNaN(rating) ? 0 : rating,
    reviewCount: Number(row.review_count) || 0,
    cost: row.cost ?? '',
    isRequested: Boolean(row.is_requested),
  };
};

/**
 * @param {Array<object>|undefined} results
 */
export const mapSearnTrainingCatalogListResults = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapSearnTrainingCatalogListRow)
    .filter((row) => hasDisplayValue(row?.id));
};

/**
 * Coerce a field that may be a plain string/number or an option object
 * (`{ id, value, label }`) into a renderable display string.
 * @param {*} value
 */
const toDisplayText = (value) => {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'object') {
    return value.label ?? value.value ?? value.name ?? '';
  }

  return value;
};

/**
 * Map an array whose items may be strings or option objects to display strings.
 * @param {*} values
 */
const toDisplayTextList = (values) => (
  Array.isArray(values)
    ? values.map(toDisplayText).filter(hasDisplayValue)
    : []
);

/**
 * @param {object|null|undefined} data
 */
export const unwrapSearnTrainingCatalogDetail = (data) => {
  if (!data || typeof data !== 'object') {
    return null;
  }

  if (data.results && typeof data.results === 'object' && !Array.isArray(data.results)) {
    return data.results;
  }

  return data;
};

/**
 * @param {object|null|undefined} payload
 */
export const mapSearnTrainingCatalogDetail = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  return {
    id: payload.id != null ? String(payload.id) : '',
    title: toDisplayText(payload.title),
    description: toDisplayText(payload.description),
    mode: toDisplayText(payload.mode),
    domain: toDisplayText(payload.domain),
    subDomain: toDisplayText(payload.sub_domain),
    provider: toDisplayText(payload.provider),
    providerSlug: payload.provider_slug ?? '',
    language: toDisplayText(payload.language),
    duration: toDisplayText(payload.duration),
    cost: toDisplayText(payload.cost),
    approach: toDisplayText(payload.approach),
    evaluation: toDisplayText(payload.evaluation),
    outcome: toDisplayText(payload.outcome),
    nraGoals: toDisplayTextList(payload.nra_goals),
    mappedCompetencies: toDisplayTextList(payload.mapped_competencies),
    mappedActivities: toDisplayTextList(payload.mapped_activities),
  };
};

/**
 * @param {object|null|undefined} data
 */
export const unwrapSearnTrainingCatalogFeedback = (data) => {
  if (!data || typeof data !== 'object') {
    return null;
  }

  if (data.results && typeof data.results === 'object') {
    return data.results;
  }

  return data;
};

/**
 * @param {object|null|undefined} payload
 */
export const mapSearnTrainingCatalogFeedback = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const training = payload.training ?? {};
  const feedback = payload.feedback ?? {};

  return {
    training: {
      id: training.id != null ? String(training.id) : '',
      title: training.title ?? '',
      description: training.description ?? '',
    },
    feedback: {
      overallRating: Number(feedback.overall_rating) || 0,
      reviewCount: Number(feedback.review_count) || 0,
      distribution: feedback.distribution && typeof feedback.distribution === 'object'
        ? feedback.distribution
        : {},
      reviews: Array.isArray(feedback.reviews)
        ? feedback.reviews.map((review) => ({
          id: review.id != null ? String(review.id) : '',
          author: review.author ?? '',
          date: review.date ?? '',
          rating: Number(review.rating) || 0,
          comment: review.comment ?? '',
        }))
        : [],
    },
  };
};

/**
 * @param {object|null|undefined} data
 */
export const unwrapSearnTrainingCatalogProvider = (data) => {
  if (!data || typeof data !== 'object') {
    return null;
  }

  if (data.results && typeof data.results === 'object' && !Array.isArray(data.results)) {
    return data.results;
  }

  return data;
};

/**
 * @param {object|null|undefined} payload
 */
export const mapSearnTrainingCatalogProvider = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  return {
    slug: payload.slug ?? '',
    name: payload.name ?? '',
    logoUrl: payload.logo_url ?? null,
    website: payload.website ?? '',
    websiteLabel: payload.website_label ?? '',
    overview: payload.overview ?? '',
  };
};

/**
 * @param {{
 *   page: number,
 *   pageSize: number,
 *   search?: string,
 *   frameworkFilter?: string,
 *   roleFilter?: string,
 *   domainFilter?: string,
 *   subDomainFilter?: string,
 *   activityFilter?: string,
 *   nraGoalFilter?: string,
 *   providerFilter?: string,
 * }} filters
 */
export const buildSearnTrainingCatalogListParams = ({
  page,
  pageSize,
  search,
  frameworkFilter,
  roleFilter,
  domainFilter,
  subDomainFilter,
  activityFilter,
  nraGoalFilter,
  providerFilter,
}) => {
  const params = {
    page,
    page_size: pageSize,
  };

  const trimmedSearch = search?.trim();
  if (hasDisplayValue(trimmedSearch)) {
    params.search = trimmedSearch;
  }

  if (hasDisplayValue(frameworkFilter) && frameworkFilter !== FILTER_ALL) {
    params['competency-framework'] = frameworkFilter;
  }

  if (hasDisplayValue(roleFilter) && roleFilter !== FILTER_ALL) {
    params.role = roleFilter;
  }

  if (hasDisplayValue(domainFilter) && domainFilter !== FILTER_ALL) {
    params.domain = domainFilter;
  }

  if (hasDisplayValue(subDomainFilter) && subDomainFilter !== FILTER_ALL) {
    params['sub-domain'] = subDomainFilter;
  }

  if (hasDisplayValue(activityFilter) && activityFilter !== FILTER_ALL) {
    params['mapped-activity'] = activityFilter;
  }

  if (hasDisplayValue(nraGoalFilter) && nraGoalFilter !== FILTER_ALL) {
    params['nra-objective'] = nraGoalFilter;
  }

  if (hasDisplayValue(providerFilter) && providerFilter !== FILTER_ALL) {
    params['training-provider'] = providerFilter;
  }

  return params;
};
