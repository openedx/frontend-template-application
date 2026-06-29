/**
 * Shared helpers for multipart PATCH/POST via the authenticated axios client.
 * Backend file fields (e.g. logo, profile_image) use ImageField and must be sent
 * as multipart with boundary. Do not set Content-Type manually.
 */

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export const isUploadableFile = (value) => Boolean(
  value
  && typeof value === 'object'
  && typeof value.name === 'string'
  && typeof value.size === 'number',
);

/**
 * PATCH with FormData — axios/browser sets multipart boundary automatically.
 * @param {import('axios').AxiosInstance} httpClient
 * @param {string} url
 * @param {FormData} formData
 */
export const patchMultipart = (httpClient, url, formData) => httpClient.patch(url, formData);

/**
 * POST with FormData — axios/browser sets multipart boundary automatically.
 * @param {import('axios').AxiosInstance} httpClient
 * @param {string} url
 * @param {FormData} formData
 */
export const postMultipart = (httpClient, url, formData) => httpClient.post(url, formData);
