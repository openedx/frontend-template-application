import { hasDisplayValue } from '../hasDisplayValue';

/**
 * @param {string} src
 * @returns {Promise<string|null>}
 */
const loadImageDataUrl = async (src) => {
  if (!hasDisplayValue(src)) {
    return null;
  }

  const normalized = String(src).trim();
  if (normalized.startsWith('data:')) {
    return normalized;
  }

  try {
    const response = await fetch(normalized, { mode: 'cors' });
    if (!response.ok) {
      return null;
    }

    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : null);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
};

export default loadImageDataUrl;
