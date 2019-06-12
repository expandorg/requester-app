import React from 'react';
import { render } from 'react-dom';
import { setAppElement } from '@expandorg/components';

import settings from './common/settings';
import inspectlet from './common/inspectlet';

import App from './App';

const appElement = document.getElementById('root');

setAppElement(appElement);
inspectlet(settings.inspectletId);

render(<App />, appElement);
