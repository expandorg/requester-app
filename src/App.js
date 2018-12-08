import { hot } from 'react-hot-loader';

import React from 'react';
import { Provider } from 'react-redux';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ServiceProvider } from '@gemsorg/components';

import { initSaga } from '@gemsorg/app-utils/app';

import Dashboard from './components/Dashboard/Dashboard';

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

import Create from './components/Create/Create';
import Draft from './components/Draft/Draft';

import Task from './components/Task/Task';
import PreviewForm from './components/Preview/PreviewForm';
import PreviewDraft from './components/Preview/PreviewDraft';

import Api from './components/Api/Api';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';

import NotFound from './components/shared/NotFound';

import store from './reducers/store';

import services from './services';

store.dispatch(initSaga());

const App = () => (
  <ServiceProvider services={services}>
    <DragDropContextProvider backend={HTML5Backend}>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Dashboard} />

            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

            <Route path="/tasks/:category" component={Dashboard} />

            <Route path="/draft/create" component={Create} />

            <Route path="/draft/:id" component={Draft} />
            <Route path="/task/:id" component={Task} />

            <Route path="/preview/form" component={PreviewForm} />
            <Route path="/preview/draft/:id" component={PreviewDraft} />

            <Route path="/profile" component={Profile} />
            <Route path="/api" component={Api} />
            <Route path="/settings" component={Settings} />

            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </DragDropContextProvider>
  </ServiceProvider>
);

export default hot(module)(App);
