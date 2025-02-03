// src/utils/validation.js

const URL_PROTOCOLS = ['http:', 'https:', 'ftp:', 'sftp:'];
const MAX_URL_LENGTH = 2083; // Maximum URL length (IE browser limit)
const MIN_DOMAIN_LENGTH = 4; // Minimum length for domain (e.g., "a.co")

export const isValidUrl = (urlString) => {
  try {
    if (!urlString || typeof urlString !== 'string') {
      return false;
    }

    // Check URL length
    if (urlString.length > MAX_URL_LENGTH || urlString.length < MIN_DOMAIN_LENGTH) {
      return false;
    }

    // Temporary prepend https:// for validation if no protocol exists
    let urlToCheck = urlString;
    if (!/^\w+:\/\//i.test(urlString)) {
      urlToCheck = `https://${urlString}`;
    }

    const url = new URL(urlToCheck);

    // Verify protocol
    if (!URL_PROTOCOLS.includes(url.protocol.toLowerCase())) {
      return false;
    }

    // Verify hostname requirements
    const hostname = url.hostname;
    if (
      !hostname ||
      hostname.startsWith('.') ||
      hostname.endsWith('.') ||
      hostname.includes('..') ||
      !/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(hostname)
    ) {
      return false;
    }

    // Check for valid characters in the URL
    if (!/^[\w\-\.~:/?#\[\]@!$&'\(\)*+,;=%.]+$/.test(urlToCheck)) {
      return false;
    }

    // Additional checks for common issues
    if (hostname === 'localhost' || hostname.includes('..') || /\s/.test(urlString)) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const cleanUrl = (url) => {
  try {
    if (!url || typeof url !== 'string') {
      return '';
    }

    // Remove whitespace and normalize to lowercase
    let cleaned = url.trim().toLowerCase();

    // Remove multiple protocols if they exist
    cleaned = cleaned.replace(/^(https?:\/\/)+/i, 'https://');

    // Add https:// if no protocol exists
    if (!/^\w+:\/\//i.test(cleaned)) {
      cleaned = `https://${cleaned}`;
    }

    // Ensure the protocol is https://
    cleaned = cleaned.replace(/^http:\/\//i, 'https://');

    // Remove duplicate slashes (except after protocol)
    cleaned = cleaned.replace(/(?<!:)\/+/g, '/');

    // Remove trailing slashes
    cleaned = cleaned.replace(/\/+$/, '');

    // Remove common tracking parameters
    try {
      const urlObj = new URL(cleaned);
      const searchParams = new URLSearchParams(urlObj.search);
      const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'];
      
      trackingParams.forEach(param => searchParams.delete(param));
      
      urlObj.search = searchParams.toString();
      cleaned = urlObj.toString();
    } catch (e) {
      // If URL parsing fails, return the cleaned string as is
    }

    return cleaned;
  } catch (error) {
    return '';
  }
};
