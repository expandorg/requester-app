import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Upload.module.styl';

export default class ImagePreview extends Component {
  static propTypes = {
    file: PropTypes.shape({
      name: PropTypes.string,
      preview: PropTypes.string,
    }).isRequired,
  };

  render() {
    const { file } = this.props;
    return (
      <img className={styles.preview} src={file.preview} alt={file.name} />
    );
  }
}