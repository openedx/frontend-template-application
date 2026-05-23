/**
 * Resolve user-facing text from API payloads.
 *
 * - Success (2xx via executeApiRequest): prefer `message`, then `detail`.
 * - Errors (4xx/5xx, network): prefer `detail`, then `message`.
 * - Caller `fallbackMessage` is applied only when neither field is present.
 */

const normalizeField = (value) => {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed || null;
  }

  if (Array.isArray(value)) {
    const joined = value
      .map((item) => (typeof item === 'string' ? item : String(item)))
      .filter(Boolean)
      .join(' ');
    return joined || null;
  }

  return null;
};

const pickFromPayload = (payload, primaryKey, secondaryKey) => {
  if (payload == null) {
    return null;
  }

  if (typeof payload === 'string') {
    return payload.trim() || null;
  }

  if (typeof payload !== 'object') {
    return null;
  }

  return normalizeField(payload[primaryKey]) ?? normalizeField(payload[secondaryKey]);
};

/** 2xx responses — backend copy is usually under `message`. */
export const getApiSuccessMessage = (payload) => pickFromPayload(payload, 'message', 'detail');

/** 4xx/5xx and validation errors — backend copy is usually under `detail`. */
export const getApiErrorMessage = (payload) => pickFromPayload(payload, 'detail', 'message');

/**
 * @deprecated Prefer {@link getApiSuccessMessage} or {@link getApiErrorMessage}.
 */
export const getApiMessage = getApiErrorMessage;

/**
 * @param {object} options
 * @param {import('axios').AxiosResponse['data']} [options.payload] - Response body
 * @param {Function} options.formatMessage - react-intl formatMessage
 * @param {{ id: string, defaultMessage: string }} [options.fallbackMessage] - defineMessages entry
 * @param {'success'|'error'} [options.variant] - Which API field to prefer
 */
export const resolveApiMessage = ({
  payload,
  formatMessage,
  fallbackMessage,
  variant = 'error',
}) => {
  const fromApi = variant === 'success'
    ? getApiSuccessMessage(payload)
    : getApiErrorMessage(payload);

  if (fromApi) {
    return fromApi;
  }

  if (variant === 'error' && fallbackMessage) {
    return formatMessage(fallbackMessage);
  }

  return null;
};
