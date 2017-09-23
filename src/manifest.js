'use strict';

const {
  author,
  description,
  name,
  version,
} = require('../package');

module.exports = function() {
  const manifest = {
    manifest_version: 2,
    name,
    version,

    description,
    icons: {
      '128': 'assets/icons/128.png',
    },

    browser_action: {
      default_title: name,
      default_icon: {
        '16': 'assets/icons/128.png',
        '24': 'assets/icons/128.png',
        '32': 'assets/icons/128.png',
      },
    },

    author,
    background: {
      scripts: [
        'background.js',
      ],
      persistent: false,
    },

    permissions: [
      'tabs',
      'https://github.com/*',
    ],
  };

  return {
    code: JSON.stringify(manifest, null, 2),
  };
};
