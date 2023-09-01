import getConfig from 'next/config';

interface ServerConfig {
  airtableToken: string;
  airtableBase: string;
  padeleoPassword: string;
}

const { serverRuntimeConfig } = getConfig();

const serverConfig: ServerConfig = serverRuntimeConfig;

export { serverConfig };
