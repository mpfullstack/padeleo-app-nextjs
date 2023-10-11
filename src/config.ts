import getConfig from 'next/config';

interface ServerConfig {
  airtableToken: string;
  airtableBase: string;
  padeleoPassword: string;
}

interface PublicConfig {
  appTitle: string;
}

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

const serverConfig: ServerConfig = serverRuntimeConfig;
const publicConfig: PublicConfig = publicRuntimeConfig;

export { serverConfig, publicConfig };
