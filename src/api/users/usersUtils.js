import { hasDisplayValue } from '../../utils/hasDisplayValue';
import { API_PAGE_SIZE } from '../endpoints';

const OPTION_META_KEYS = new Set(['id', 'value', 'label']);

/**
 * @param {Array<object>} roleOptions
 * @param {string} value
 */
export const findRoleOptionByValue = (roleOptions, value) => {
  if (!Array.isArray(roleOptions) || !hasDisplayValue(value)) {
    return null;
  }

  return roleOptions.find((item) => String(item.value) === String(value)) ?? null;
};

/**
 * @param {object|null} roleOption
 */
export const roleOptionHasSubOptions = (roleOption) => Boolean(
  roleOption?.subKey
  && Array.isArray(roleOption.subOptions)
  && roleOption.subOptions.length > 0,
);

/**
 * @param {string} key
 */
export const formatRoleSubFieldLabel = (key) => {
  if (!hasDisplayValue(key)) {
    return '';
  }
  return key.charAt(0).toUpperCase() + key.slice(1);
};

/**
 * @param {Array<object>} results
 */
export const normalizeRoleOptionRows = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .filter((row) => hasDisplayValue(row?.value) && hasDisplayValue(row?.label))
    .map((row) => {
      const subKey = Object.keys(row).find(
        (key) => !OPTION_META_KEYS.has(key) && Array.isArray(row[key]),
      );
      const rawSubOptions = subKey ? row[subKey] : [];
      const subOptions = Array.isArray(rawSubOptions)
        ? rawSubOptions
          .filter((sub) => hasDisplayValue(sub?.id) && hasDisplayValue(sub?.label))
          .map((sub) => ({
            id: sub.id,
            value: String(sub.id),
            label: sub.label,
          }))
        : [];

      return {
        id: row.id,
        value: row.value,
        label: row.label,
        subKey: subKey || null,
        subOptions,
      };
    });
};

/**
 * @param {object} row
 */
export const mapUserListRow = (row) => ({
  id: row?.id,
  name: row?.name,
  email: row?.email,
  role: row?.role ?? '',
  userProfileImage: row?.user_profile_image ?? '',
  competencyRole: row?.competency_role ?? '',
});

/**
 * @param {Array<object>} results
 */
export const normalizeUserListResults = (results) => {
  if (!Array.isArray(results)) {
    return [];
  }

  return results
    .map(mapUserListRow)
    .filter((row) => hasDisplayValue(row.id));
};

const mapCompletedTrainingRow = (row) => ({
  id: row?.id,
  title: row?.title ?? '',
  completedOn: row?.completed_on ?? row?.completedOn ?? '',
  score: row?.score ?? '',
});

const mapTrainingStatusRow = (row) => ({
  id: row?.id,
  title: row?.title ?? '',
  status: row?.status ?? '',
  progress: Number.isFinite(Number(row?.progress)) ? Number(row.progress) : 0,
});

const mapAssignedTrainingRow = (row) => ({
  id: row?.id,
  title: row?.title ?? '',
  providerLine: row?.provider_line ?? row?.providerLine ?? '',
});

const mapMappedCompetencyRow = (row) => ({
  id: row?.id,
  title: row?.title ?? '',
  proficiency: row?.proficiency ?? '',
  completed: Boolean(row?.completed),
});

/**
 * @param {object} payload
 * @param {(row: object) => object} mapRow
 * @param {string} requiredField
 */
const mapUserListPayload = (payload, mapRow, requiredField) => {
  const results = payload?.results ?? payload;
  const rows = Array.isArray(results) ? results : [];

  return rows
    .map(mapRow)
    .filter((row) => hasDisplayValue(row?.[requiredField]));
};

/**
 * @param {object} payload
 */
export const mapUserCompletedTrainingsList = (payload) => (
  mapUserListPayload(payload, mapCompletedTrainingRow, 'id')
);

/**
 * @param {object} payload
 */
export const mapUserTrainingStatusList = (payload) => (
  mapUserListPayload(payload, mapTrainingStatusRow, 'id')
);

/**
 * @param {object} payload
 */
export const mapUserAssignedTrainingsList = (payload) => (
  mapUserListPayload(payload, mapAssignedTrainingRow, 'id')
);

/**
 * @param {object} payload
 */
export const mapUserMappedCompetenciesList = (payload) => (
  mapUserListPayload(payload, mapMappedCompetencyRow, 'title')
);

/**
 * @param {object} payload
 */
export const mapUserAboutDetail = (payload) => {
  const data = payload?.results ?? payload;

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return null;
  }

  return {
    id: data.id,
    name: data.name ?? '',
    email: data.email ?? '',
    country: data.country != null ? String(data.country) : '',
    role: data.role ?? '',
    roleSub: data.role_sub ?? data.roleSub ?? '',
    competencyRole: data.competency_role ?? data.competencyRole ?? '',
    provider: data.provider != null ? String(data.provider) : '',
    userProfileImage: data.user_profile_image ?? data.userProfileImage ?? '',
    status: data.status ?? '',
    createdAt: data.created_at ?? data.createdAt ?? '',
    updatedAt: data.updated_at ?? data.updatedAt ?? '',
    lastLogin: data.last_login ?? data.lastLogin ?? '',
    trainingsCompleted: data.trainings_completed ?? data.trainingsCompleted ?? '',
  };
};

/**
 * @param {object} payload
 */
export const mapUserDetail = (payload) => {
  const about = mapUserAboutDetail(payload);
  if (!about) {
    return null;
  }

  return {
    id: about.id,
    name: about.name,
    email: about.email,
    country: about.country,
    role: about.role,
    provider: about.provider,
    userProfileImage: about.userProfileImage,
    competencyRole: about.competencyRole,
  };
};

const mapDomainCoverageRow = (row) => ({
  id: row?.id,
  domain: row?.domain ?? '',
  percent: Number.isFinite(Number(row?.percent)) ? Number(row.percent) : 0,
  tags: Array.isArray(row?.tags) ? row.tags.filter((tag) => hasDisplayValue(tag)) : [],
});

const mapPassportCompletedTrainingRow = (row) => ({
  id: row?.id,
  training: row?.training ?? '',
  provider: row?.provider ?? '',
  completed: row?.completed ?? '',
  activity: row?.activity ?? '',
  remoteType: row?.remote_type ?? row?.remoteType ?? '',
  certificateViewUrl: row?.certificate_view_url
    ?? row?.certificateViewUrl
    ?? row?.certificate_url
    ?? row?.certificateUrl
    ?? '',
});

const mapPassportStatRow = (row) => ({
  id: row?.id,
  name: row?.name ?? '',
  number: row?.number != null && row?.number !== '' ? row.number : '',
});

/**
 * @param {object} payload
 */
export const mapRegulatoryPassportStatsList = (payload) => (
  mapUserListPayload(payload, mapPassportStatRow, 'id')
);

/**
 * @param {object} payload
 */
export const mapRegulatoryPassportDomainCoverageList = (payload) => (
  mapUserListPayload(payload, mapDomainCoverageRow, 'id')
);

/**
 * @param {object} payload
 */
export const mapRegulatoryPassportCompletedTrainingsPage = (payload) => {
  const rows = Array.isArray(payload?.results) ? payload.results : [];

  return {
    items: rows
      .map(mapPassportCompletedTrainingRow)
      .filter((row) => hasDisplayValue(row.id)),
    count: Number.isFinite(Number(payload?.count)) ? Number(payload.count) : rows.length,
    page: Number.isFinite(Number(payload?.page)) ? Number(payload.page) : 1,
    pageSize: Number.isFinite(Number(payload?.page_size ?? payload?.pageSize))
      ? Number(payload.page_size ?? payload.pageSize)
      : API_PAGE_SIZE,
    totalPages: Number.isFinite(Number(payload?.total_pages ?? payload?.totalPages))
      ? Number(payload.total_pages ?? payload.totalPages)
      : 1,
  };
};

/**
 * @param {object} payload
 */
export const mapUserRegulatoryPassport = (payload) => {
  const data = payload?.results ?? payload;

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return null;
  }

  return {
    id: data.id,
    name: data.name ?? '',
    email: data.email ?? '',
    country: data.country != null ? String(data.country) : '',
    role: data.role ?? '',
    userProfileImage: data.user_profile_image ?? data.userProfileImage ?? '',
    passportId: data.passport_id ?? data.passportId ?? '',
    jobTitle: data.job_title ?? data.jobTitle ?? '',
    organisationLine: data.organisation_line ?? data.organisationLine ?? '',
    about: data.about ?? '',
    competencyRole: data.competency_role ?? data.competencyRole ?? '',
    stats: mapRegulatoryPassportStatsList({ results: data.stats ?? [] }),
  };
};

/**
 * Merge list-row identity onto regulatory passport payload.
 * @param {ReturnType<typeof mapUserRegulatoryPassport>} passport
 * @param {object} userRow
 */
export const mergeRegulatoryPassportIdentity = (passport, userRow) => ({
  ...passport,
  id: userRow.id ?? passport.id,
  name: hasDisplayValue(userRow.name) ? userRow.name : passport.name,
  email: hasDisplayValue(userRow.email) ? userRow.email : passport.email,
  country: hasDisplayValue(userRow.country) ? userRow.country : passport.country,
  role: hasDisplayValue(userRow.role) ? userRow.role : passport.role,
  userProfileImage: hasDisplayValue(userRow.userProfileImage)
    ? userRow.userProfileImage
    : passport.userProfileImage,
});

/**
 * Merge list-row identity onto shared about-detail mock content.
 * @param {ReturnType<typeof mapUserAboutDetail>} detail
 * @param {object} userRow
 */
export const mergeUserIdentityIntoAboutDetail = (detail, userRow) => ({
  ...detail,
  id: userRow.id,
  name: hasDisplayValue(userRow.name) ? userRow.name : detail.name,
  email: hasDisplayValue(userRow.email) ? userRow.email : detail.email,
  country: hasDisplayValue(userRow.country) ? userRow.country : detail.country,
  role: hasDisplayValue(userRow.role) ? userRow.role : detail.role,
  roleSub: hasDisplayValue(userRow.roleSub) ? userRow.roleSub : detail.roleSub,
  competencyRole: hasDisplayValue(userRow.competencyRole) ? userRow.competencyRole : detail.competencyRole,
  userProfileImage: hasDisplayValue(userRow.userProfileImage) ? userRow.userProfileImage : detail.userProfileImage,
  createdAt: hasDisplayValue(userRow.joined) ? userRow.joined : detail.createdAt,
});

/**
 * @param {{
 *   name: string,
 *   email: string,
 *   country: string,
 *   role: string,
 *   provider?: string,
 * }} params
 */
export const buildUserWritePayload = ({
  name,
  email,
  country,
  role,
  provider,
}) => {
  const payload = {
    name: name.trim(),
    email: email.trim(),
    country: String(country),
    role,
  };

  const parsedProvider = Number.parseInt(String(provider), 10);
  if (Number.isInteger(parsedProvider) && parsedProvider > 0) {
    payload.provider = parsedProvider;
  }

  return payload;
};
