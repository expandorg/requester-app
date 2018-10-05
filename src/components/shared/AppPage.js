import React, { Component } from 'react';

import './AppPage.styl';

import Sidebar from './Sidebar';

export default class AppPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="gem-page">
        <Sidebar />
        <div className="gem-page-content">{children}</div>
      </div>
    );
  }
}
