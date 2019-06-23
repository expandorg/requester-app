import { hot } from 'react-hot-loader/root';

import React from 'react';
import { Provider } from 'react-redux';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ServiceProvider } from '@expandorg/components';

import { initSaga } from '@expandorg/app-utils/app';

import Dashboard from './components/Dashboard/Dashboard';
import Choice from './components/Choice/Choice';

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

import Draft from './components/Draft/Draft';

import JobStats from './components/JobStats/JobStats';
import PreviewDraft from './components/Preview/PreviewDraft';

import Api from './components/Api/Api';
import Stats from './components/Stats/Stats';
import Settings from './components/Settings/Settings';

import NotFound from './components/shared/NotFound';

import store from './reducers/store';

import services from './services';

store.dispatch(initSaga());

const App = () => (
  <ServiceProvider services={services}>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/choice" exact component={Choice} />

            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

            <Route path="/tasks/:category" component={Dashboard} />

            <Route path="/draft/:id" component={Draft} />
            <Route path="/job/:id" component={JobStats} />

            <Route path="/preview/draft/:id" component={PreviewDraft} />

            <Route path="/api" component={Api} />
            <Route path="/stats" component={Stats} />
            <Route path="/settings" component={Settings} />

            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </DndProvider>
  </ServiceProvider>
);

export default hot(App);
