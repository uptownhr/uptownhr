import { AppInfo } from 'supertokens-node/types';

export interface AuthModuleConfig extends AppInfo {
  connectionURI: string;
  apiKey?: string;
}
