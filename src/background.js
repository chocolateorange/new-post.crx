'use strict';

const {
  render,
} = require('mustache');

const {
  sprintf,
} = require('sprintf-js');

const blobURI = 'https://github.com/chocolateorange/chocolateorange.github.io/blob/master/_posts/{{ YYYY }}/{{ MM }}/{{ YYYY }}-{{ MM }}-{{ DD }}-{{ No }}.md',
      newURI = 'https://github.com/chocolateorange/chocolateorange.github.io/new/master/?filename=_posts/{{ YYYY }}/{{ MM }}/{{ YYYY }}-{{ MM }}-{{ DD }}-{{ No }}.md';

/**
 * format URI template
 *
 * @param {string} template
 * @param {Date} date
 * @param {number} number
 * @return {string}
 */
function format(template, date, number) {
  return render(template, {
    YYYY: date.getFullYear(),
    MM: sprintf('%02d', date.getMonth() + 1),
    DD: sprintf('%02d', date.getDate()),
    No: sprintf('%02d', number),
  });
}

/**
 * check for post is exist
 *
 * @param {Date} date
 * @param {number} number
 * @throws {TypeError}
 * @return {Promise}
 */
function existsPost(date, number) {
  const options = {
    method: 'HEAD',
  };

  const URI = format(blobURI, date, number);

  return fetch(URI, options).then(
    (res) => res.ok
  );
}

/**
 * event handler for onClicked
 */
async function onClicked() {
  const now = new Date();

  let number;

  for (let i = 1; i < 100; ++i) {
    if (!await existsPost(now, i)) {
      number = i;

      break;
    }
  }

  const targetURI = format(newURI, now, number);

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
