import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Upload.module.styl';

export default class ImagePreview extends Component {
  static propTypes = {
    file: PropTypes.shape({
      name: PropTypes.string,
    }),
    uploadedUrl: PropTypes.string,
  };

  static defaultProps = {
    file: null,
    uploadedUrl: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      file: props.file, // eslint-disable-line react/no-unused-state
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
    const { uploadedUrl } = this.props;
    const { preview } = this.state;
    return (
      <div className={styles.previewContainer}>
        <img
          className={styles.preview}
          src={preview || uploadedUrl}
          alt="Task logo"
        />
        <div className={styles.previewHint}>Upload image</div>
      </div>
    );
  }
}
