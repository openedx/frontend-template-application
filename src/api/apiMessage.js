/**
 * Resolve user-facing text from API payloads.
 *
 * Priority for JSON bodies:
 * 1. `message` (string or string array)
 * 2. `detail` (string or string array)
 *
 * HTML error pages (e.g. Django 404) and other non-JSON bodies are ignored
 * so executeApiRequest can apply the caller's fallbackMessage.
 */

/** @param {string} text */
const looksLikeHtmlDocument = (text) => {
  const sample = text.trim().slice(0, 512).toLowerCase();
  return sample.startsWith('<!doctype')
    || sample.startsWith('<html')
    || /<\s*(html|head|body|title)\b/.test(sample);
};

/** @param {string} text */
const isDisplayableApiText = (text) => {
  const trimmed = text.trim();
  if (!trimmed) {
    return false;
  }
  if (looksLikeHtmlDocument(trimmed)) {
    return false;
  }
  // Skip huge bodies (HTML debug pages, accidental dumps).
  if (trimmed.length > 500) {
    return false;
  }
  // Reject markup-heavy strings even without a full document wrapper.
  const tagCount = (trimmed.match(/</g) || []).length;
  if (tagCount > 2) {
    return false;
  }
  return true;
};

const normalizeField = (value) => {
  if (typeof value === 'string') {
    if (!isDisplayableApiText(value)) {
      return null;
    }
    return value.trim();
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

  // Plain-text error bodies are rare; HTML 404/500 pages must not be shown in UI.
  if (typeof payload === 'string') {
    return isDisplayableApiText(payload) ? payload.trim() : null;
  }

  if (typeof payload !== 'object' || Array.isArray(payload)) {
    return null;
  }

  return normalizeField(payload[primaryKey]) ?? normalizeField(payload[secondaryKey]);
};

/** Read `message` or `detail` from any API JSON body. */
export const getApiBodyMessage = (payload) => pickFromPayload(payload, 'message', 'detail');

/** @deprecated Use {@link getApiBodyMessage}. */
export const getApiSuccessMessage = getApiBodyMessage;

/** @deprecated Use {@link getApiBodyMessage}. */
export const getApiErrorMessage = getApiBodyMessage;

/**
 * @deprecated Prefer {@link getApiSuccessMessage} or {@link getApiErrorMessage}.
 */
export const getApiMessage = getApiBodyMessage;

/**
 * @param {object} options
 * @param {import('axios').AxiosResponse['data']} [options.payload] - Response body
 * @param {Function} options.formatMessage - react-intl formatMessage
 * @param {{ id: string, defaultMessage: string }} [options.fallbackMessage] - defineMessages entry
 * @param {boolean} [options.applyFallback] - When true, format fallback if API copy is missing
 */
export const resolveApiMessage = ({
  payload,
  formatMessage,
  fallbackMessage,
  applyFallback = false,
}) => {
  const fromApi = getApiBodyMessage(payload);

  if (fromApi) {
    return fromApi;
  }

  if (applyFallback && fallbackMessage) {
    return formatMessage(fallbackMessage);
  }

  return null;
};
