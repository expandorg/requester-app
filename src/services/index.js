// @flow

import { ServiceLocator } from '@gemsorg/components';

import { GoogleTagManager } from '@gemsorg/app-utils/gtm';
import { ScriptsLoader } from '@gemsorg/utils';
import { GemsService } from '@gemsorg/app-web3';
import { validateForm } from '@gemsorg/validation';

import settings from '../common/settings';

const services = new ServiceLocator()
  .register('gtm', new GoogleTagManager(settings.gtmTrackingId))
  .register('gems', new GemsService(settings.vaultAddress))
  .register('validate', validateForm)
  .register('jsScripts', new ScriptsLoader());

export default services;
