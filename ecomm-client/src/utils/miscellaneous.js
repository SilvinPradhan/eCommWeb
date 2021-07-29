import DOMPurify from 'dompurify'

/**
 * Sanitize markup or text when used inside dangerouslysetInnerHtml
 *
 * @param {string} content Plain or html string
 *
 * @return {string} Sanitized string
 *
 * **/

export const sanitize = (content) => {
    return process.browser ? DOMPurify.sanitize(content) : content;
}

/**
 * Get singular or plural text
 *
 * @param {Int} count Count
 * @param {String} text text
 * **/

export const getSingularOrPluralText = (count, text) => {
    return 1 < count ? `${text}s` : text;
}
