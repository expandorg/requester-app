// @flow

import { ServiceLocator } from '@gemsorg/components';

import { GoogleTagManager } from '@gemsorg/app-utils/gtm';
import { ScriptsLoader, settings } from '@gemsorg/utils';

const services = new ServiceLocator()
  .register('gtm', new GoogleTagManager(settings.gtmTrackingId))
  .register('jsScripts', new ScriptsLoader());

export default services;
