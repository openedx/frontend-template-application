import { getApiErrorMessage, resolveApiMessage } from './apiMessage';

/**
 * Run a single HTTP call with normalized success/error handling.
 * Use from domain API files only — not from JSX.
 *
 * @returns {Promise<import('./apiTypes').ApiRequestResult>}
 */
export const executeApiRequest = async ({
  request,
  formatMessage,
  fallbackMessage,
}) => {
  try {
    const response = await request();
    const { data, status } = response;
    const message = resolveApiMessage({
      payload: data,
      formatMessage,
      fallbackMessage,
      variant: 'success',
    });

    return {
      ok: true,
      data,
      message,
      status,
    };
  } catch (error) {
    const payload = error?.response?.data;
    const message = resolveApiMessage({
      payload,
      formatMessage,
      fallbackMessage,
      variant: 'error',
    })
      || getApiErrorMessage(error?.message)
      || formatMessage(fallbackMessage);

    return {
      ok: false,
      data: null,
      message,
      status: error?.response?.status,
      error,
    };
  }
};
