import apiMessages from '../messages/apiMessages';
import { resolveApiMessage } from './apiMessage';

/**
 * Run a single HTTP call with normalized success/error handling.
 * Use from domain API files only — not from JSX.
 *
 * Every call must pass `fallbackMessage` (defineMessages entry unique to that API).
 * If omitted, `apiMessages.genericRequestError` is used on failure.
 *
 * @returns {Promise<import('./apiTypes').ApiRequestResult>}
 */
export const executeApiRequest = async ({
  request,
  formatMessage,
  fallbackMessage,
}) => {
  const resolvedFallback = fallbackMessage ?? apiMessages.genericRequestError;

  try {
    const response = await request();
    const { data, status } = response;
    const message = resolveApiMessage({
      payload: data,
      formatMessage,
      fallbackMessage: resolvedFallback,
      applyFallback: false,
    });

    return {
      ok: true,
      data,
      message,
      status,
    };
  } catch (error) {
    const contentType = String(error?.response?.headers?.['content-type'] ?? '');
    const rawPayload = error?.response?.data;
    const payload = (
      contentType.includes('application/json')
      || (rawPayload != null && typeof rawPayload === 'object' && !Array.isArray(rawPayload))
    )
      ? rawPayload
      : null;

    const message = resolveApiMessage({
      payload,
      formatMessage,
      fallbackMessage: resolvedFallback,
      applyFallback: true,
    });

    return {
      ok: false,
      data: null,
      message,
      status: error?.response?.status,
      error,
    };
  }
};
