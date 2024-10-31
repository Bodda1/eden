const whiteListedClientSideEnvironmentVariables = [
  'PORT',
  'CONFIGURABLE_SUB_DOMAINS',
  'CONFIGURABLE_ROOT_DOMAINS',
  'CONFIGURABLE_TOP_LEVEL_DOMAINS',
];

const environmentVariables = {
  whiteListedClientSideEnvironmentVariables,
};

module.exports = environmentVariables;
