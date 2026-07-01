/**
 * Decode HTML entities (e.g. &lt;strong&gt;) so API/stored rich text renders as markup.
 * @param {string} html
 */
export const decodeHtmlEntities = (html) => {
  if (typeof html !== 'string' || !html) {
    return '';
  }

  if (typeof document === 'undefined') {
    return html;
  }

  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  return textarea.value;
};

/**
 * @param {string} html
 */
export const getRichTextHtml = (html) => decodeHtmlEntities(html);
