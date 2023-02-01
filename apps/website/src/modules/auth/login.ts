import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import Passwordless, {
  getLoginAttemptInfo,
} from 'supertokens-web-js/recipe/passwordless';

SuperTokens.init({
  appInfo: {
    apiDomain: 'http://localhost:3001',
    apiBasePath: '/auth',
    appName: '...',
  },
  recipeList: [Session.init(), Passwordless.init()],
});

export async function isThisSameBrowserAndDevice() {
  return (await getLoginAttemptInfo()) !== undefined;
}
