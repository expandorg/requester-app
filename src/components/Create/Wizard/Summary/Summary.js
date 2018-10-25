import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Actions } from '../Form';
import Button from '../../../common/Button';

import styles from './Summary.module.styl';

export default class Summary extends Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
  };

  handleBack = evt => {
    const { onBack } = this.props;
    onBack();

    evt.preventDefault();
  };

  render() {
    return (
      <div className={styles.container}>
        <Actions>
          <Button onClick={this.handleBack}>Back</Button>
        </Actions>
      </div>
    );
  }
}
