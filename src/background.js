'use strict';

const {
  loadValues,
} = require('./storage');

const {
  createBlobURI,
  createNewURI,
} = require('./text');

/**
 * check for post is exist
 *
 * @param {Date} date
 * @param {number} number
 * @throws {TypeError}
 * @return {Promise}
 */
async function existsPost(date, number) {
  const options = {
    method: 'HEAD',
  };

  const URI = createBlobURI(await loadValues(), date, number);

  return fetch(URI, options).then(
    (res) => res.ok
  );
}

/**
 * event handler for onClicked
 */
async function onClicked() {
  const values = await loadValues(),
        keys = Object.keys(values);

  const hasConfig =
    keys
      .filter(
        (key) => (key !== 'template')
      )
      .every(
        (key) => (values[key] !== '')
      );

  if (!hasConfig || keys.length === 0) {
    return await new Promise(function(resolve) {
      chrome.runtime.openOptionsPage(resolve);
    });
  }

  const now = new Date();

  const caches = await new Promise(function(resolve) {
    // get last number
    // return 1 if last number is not found
    chrome.storage.local.get({
      number: 1,
    }, resolve);
  });

  let number;

  for (let i = caches.number; i < 100; ++i) {
    if (!await existsPost(now, i)) {
      number = i;

      break;
    }
  }

  // cache last number
  await new Promise(function(resolve) {
    chrome.storage.local.set({
      number,
    }, resolve);
  });

  const targetURI = createNewURI(await loadValues(), now, number);

  const [
    tab = null,
  ] = await new Promise(function(resolve) {
    chrome.tabs.query({
      url: targetURI,
    }, resolve);
  });

  if (tab !== null) {
    chrome.tabs.update(tab.id, {
      active: true,
    });
  } else {
    chrome.tabs.create({
      active: true,
      url: targetURI,
    });
  }
}

chrome.browserAction.onClicked.addListener(onClicked);

/**
 * event handler for onStartup
 */
async function onStartup() {
  // NOTE: similar to sessionStorage
  // https://stackoverflow.com/a/39501597
  await new Promise(function(resolve) {
    chrome.storage.local.remove('number', resolve);
  });
}

chrome.runtime.onStartup.addListener(onStartup);
