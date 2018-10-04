import React, { Component } from 'react';

import './AppPage.styl';

export default class AppPage extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="gem-page">
        <div className="gem-page-content">{children}</div>
      </div>
    );
  }
}
