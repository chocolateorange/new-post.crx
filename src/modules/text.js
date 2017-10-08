'use strict';

const {
  render,
} = require('mustache');

const {
  sprintf,
} = require('sprintf-js');

/**
 * create URI for blob
 *
 * @param {Object} param
 * @param {string} param.account
 * @param {string} param.repository
 * @param {string} param.branch
 * @param {string} param.path
 * @param {Date} date
 * @param {number} number
 * @return {string}
 */
function createBlobURI({
  account,
  repository,
  branch,
  path,
}, date, number) {
  return render([
    'https://github.com',
    '/{{ account }}',
    '/{{ repository }}',
    '/blob',
    '/{{ branch }}',
    `/${replacePlaceholder(path, date, number)}`,
  ].join(''), {
    account,
    repository,
    branch,
  });
}

/**
 * create URI for new file
 *
 * @param {Object} param
 * @param {string} param.account
 * @param {string} param.repository
 * @param {string} param.branch
 * @param {string} param.path
 * @param {string} param.template
 * @param {Date} date
 * @param {number} number
 * @return {string}
 */
function createNewURI({
  account,
  repository,
  branch,
  path,
  template,
}, date, number) {
  return render([
    'https://github.com',
    '/{{ account }}',
    '/{{ repository }}',
    '/new',
    '/{{ branch }}',
    '/?filename={{ path }}',
    '&value={{ template }}',
  ].join(''), {
    account,
    repository,
    branch,
    path: encodeURIComponent(
      replacePlaceholder(path, date, number)
    ),
    template: encodeURIComponent(template),
  });
}

/**
 * format URI template
 *
 * @param {string} template
 * @param {Date} date
 * @param {number} number
 * @return {string}
 */
function replacePlaceholder(template, date, number) {
  return render(template, {
    YYYY: date.getFullYear(),
    MM: sprintf('%02d', date.getMonth() + 1),
    DD: sprintf('%02d', date.getDate()),
    No: sprintf('%02d', number),
  });
}

module.exports = {
  createBlobURI,
  createNewURI,
  replacePlaceholder,
};
