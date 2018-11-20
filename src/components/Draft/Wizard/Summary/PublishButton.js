import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../common/Button';

import styles from './PublishButton.module.styl';

export default class PublishButton extends Component {
  static propTypes = {
    onPublish: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
  };

  handlePublishClick = evt => {
    const { onPublish, readOnly } = this.props;
    if (!readOnly) {
      onPublish();
    }
    evt.preventDefault();
  };

  render() {
    const { readOnly } = this.props;

    return (
      <div className={styles.group}>
        <Button
          className={styles.toggle}
          disabled={readOnly}
          onClick={this.handlePublishClick}
        >
          Publish
        </Button>
      </div>
    );
  }
}
