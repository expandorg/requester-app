import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.styl';

export default class Form extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { onSubmit } = this.props;
    onSubmit();
  };

  render() {
    const { children } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        {children}
      </form>
    );
  }
}
