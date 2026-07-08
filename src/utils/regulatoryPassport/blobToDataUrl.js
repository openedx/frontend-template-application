/**
 * @param {Blob} blob
 * @returns {Promise<string|null>}
 */
const blobToDataUrl = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    resolve(typeof reader.result === 'string' ? reader.result : null);
  };
  reader.onerror = () => reject(reader.error);
  reader.readAsDataURL(blob);
});

export default blobToDataUrl;
