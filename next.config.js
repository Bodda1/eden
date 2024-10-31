require('dotenv').config({
  path: `${process.env.ENV_FILE ? `./env/.env.${process.env.ENV_FILE}` : '.env.root'}`,
});

const config = require('./config');

const { whiteListedClientSideEnvironmentVariables } =
  config.publicRuntimeConfig.environmentVariables;
const dotEnvVariablesToSendToClient = {};
whiteListedClientSideEnvironmentVariables.forEach(item => {
  dotEnvVariablesToSendToClient[item] = process.env[item];
});

const nextConfig = {
  reactStrictMode: true,
  useFileSystemPublicRoutes: false,

  ...config,
  publicRuntimeConfig: {
    ...config.publicRuntimeConfig,
    envVarAvailableInClient: dotEnvVariablesToSendToClient,
  },

  async headers() {
    return [
      {
        source: '/assets/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
