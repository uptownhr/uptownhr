export interface Configuration {
  port: number;
  databaseURL: string | undefined;
  supertokens: {
    connectionURI: string | undefined;
    apiKey: string | undefined;
    appName: string | undefined;
    apiDomain: string | undefined;
    websiteDomain: string;
    apiBasePath: string | undefined;
    websiteBasePath: string | undefined;
  };
}

export default (): Configuration => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
  databaseURL: process.env.DATABASE_URL,
  supertokens: {
    connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
    apiKey: process.env.SUPERTOKENS_API_KEY,
    appName: process.env.SUPERTOKENS_APP_NAME,
    apiDomain: process.env.SUPERTOKENS_API_DOMAIN,
    websiteDomain:
      process.env.SUPERTOKENS_WEBSITE_DOMAIN || 'http://localhost:3000',
    apiBasePath: process.env.SUPERTOKENS_API_BASE_PATH,
    websiteBasePath: process.env.SUPERTOKENS_WEBSITE_BASE_PATH,
  },
});
