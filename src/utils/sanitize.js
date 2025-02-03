// src/utils/sanitize.js
import DOMPurify from 'dompurify';

/**
 * Sanitizes input text to prevent XSS attacks.
 * @param {string} text - The input text to sanitize.
 * @returns {string} - The sanitized text.
 */
export const sanitizeHTML = (text) => {
  return DOMPurify.sanitize(text);
};

/**
 * Sanitizes input text and prepares it for dangerouslySetInnerHTML.
 * @param {string} text - The input text to sanitize.
 * @param {Array<string>} allowedTags - List of allowed HTML tags.
 * @returns {object} - Object containing __html property.
 */
export const sanitizeHTMLForInnerHTML = (text, allowedTags = ['strong', 'em', 'ul', 'ol', 'li', 'p', 'br']) => ({
  __html: DOMPurify.sanitize(text, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: []
  })
});
