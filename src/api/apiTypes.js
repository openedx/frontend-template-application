/**
 * @typedef {object} ApiSuccessResult
 * @property {true} ok
 * @property {*} data
 * @property {string|null} message
 * @property {number} status
 */

/**
 * @typedef {object} ApiErrorResult
 * @property {false} ok
 * @property {null} data
 * @property {string} message
 * @property {number|undefined} status
 * @property {*} error
 */

/** @typedef {ApiSuccessResult|ApiErrorResult} ApiRequestResult */

export {};
