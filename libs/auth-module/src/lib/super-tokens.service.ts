import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import Passwordless from 'supertokens-node/recipe/passwordless';

import { AuthModuleConfig } from './config.interface';
import { MODULE_OPTIONS_TOKEN } from './auth.module-definition';

@Injectable()
export class SupertokensService {
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private config: AuthModuleConfig) {
    supertokens.init({
      appInfo: {
        appName: this.config.appName,
        apiDomain: this.config.apiDomain,
        websiteDomain: this.config.websiteDomain,
        apiBasePath: this.config.apiBasePath,
        websiteBasePath: this.config.websiteBasePath,
      },
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        Passwordless.init({
          flowType: 'MAGIC_LINK',
          contactMethod: 'EMAIL',
          /*emailDelivery: {
            service: {
              sendEmail: async (input) => {
                console.log('send email', {
                  input,
                });
              },
            },
          },*/
        }),
        Session.init(),
      ],
    });
  }
}
