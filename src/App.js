import { hot } from 'react-hot-loader';

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ServiceProvider } from '@gemsorg/components';

import Dashboard from './components/Dashboard/Dashboard';

import AppPage from './components/shared/AppPage';
import NotFound from './components/shared/NotFound';

import store from './reducers/store';

import services from './services';

const App = () => (
  <ServiceProvider services={services}>
    <Provider store={store}>
      <BrowserRouter>
        <AppPage>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </AppPage>
      </BrowserRouter>
    </Provider>
  </ServiceProvider>
);

export default hot(module)(App);
