const assetPath = require('./assetPath');
const context = require('./context');
const environmentVariables = require('./environmentVariables');
const flags = require('./flags');
const hideElements = require('./hideElements');
const urls = require('./urls');

const config = {
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    assetPath,
    context,
    environmentVariables,
    flags,
    hideElements,
    urls,
  },
};

module.exports = config;
