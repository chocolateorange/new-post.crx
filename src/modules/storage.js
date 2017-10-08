'use strict';

/**
 * load values from storage.local
 *
 * @return {Promise}
 */
async function loadValues() {
  return await new Promise(function(resolve) {
    const keys = [
      'account',
      'repository',
      'branch',
      'path',
      'template',
    ];

    chrome.storage.local.get(keys, resolve);
  });
}

/**
 * save values to storage.local
 *
 * @param {Object} param
 * @param {string} param.account
 * @param {string} param.repository
 * @param {string} param.branch
 * @param {string} param.path
 * @param {string} param.template
 * @return {Promise}
 */
async function saveValues({
  account,
  repository,
  branch,
  path,
  template,
}) {
  return await new Promise(function(resolve) {
    chrome.storage.local.set({
      account,
      repository,
      branch,
      path,
      template,
    }, resolve);
  });
}

module.exports = {
  loadValues,
  saveValues,
};
