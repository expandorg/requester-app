import { hot } from 'react-hot-loader';

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ServiceProvider } from '@gemsorg/components';

import Dashboard from './components/Dashboard/Dashboard';

import Create from './components/Create/Create';
import Draft from './components/Draft/Draft';

import Task from './components/Task/Task';
import Preview from './components/Preview/Preview';

import Api from './components/Api/Api';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';

import NotFound from './components/shared/NotFound';

import store from './reducers/store';

import services from './services';

const App = () => (
  <ServiceProvider services={services}>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/tasks/:category" component={Dashboard} />

          <Route path="/draft/create" component={Create} />

          <Route path="/draft/:id" component={Draft} />
          <Route path="/task/:id" component={Task} />

          <Route path="/preview" component={Preview} />

          <Route path="/profile" component={Profile} />
          <Route path="/api" component={Api} />
          <Route path="/settings" component={Settings} />

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </ServiceProvider>
);

export default hot(module)(App);
