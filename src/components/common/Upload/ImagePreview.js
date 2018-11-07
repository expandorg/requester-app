import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Upload.module.styl';

export default class ImagePreview extends Component {
  static propTypes = {
    file: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      file: props.file,
      preview: props.file ? URL.createObjectURL(props.file) : null,
    };
  }

  static getDerivedStateFromProps({ file }, state) {
    if (file !== state.file) {
      if (state.preview) {
        URL.revokeObjectURL(state.preview);
      }
      return {
        file,
        preview: file ? URL.createObjectURL(file) : null,
      };
    }
    return null;
  }

  render() {
    const { preview, file } = this.state;
    return (
      <div className={styles.previewContainer}>
        <img className={styles.preview} src={preview} alt={file.name} />
        <div className={styles.previewHint}>Upload image</div>
      </div>
    );
  }
}
