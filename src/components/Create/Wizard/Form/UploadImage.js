import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dropzone from 'react-dropzone';

import { ReactComponent as Hint } from '../../../assets/preview.svg';

import I from './I';

import styles from './UploadImage.module.styl';

export default class UploadImage extends Component {
  static propTypes = {
    image: PropTypes.shape({
      name: PropTypes.string,
    }),
    label: PropTypes.string.isRequired,
    isUploading: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    image: null,
    isUploading: false,
  };

  handleDrop = acceptedFiles => {
    if (!acceptedFiles.length) {
      return;
    }
    const { onSelect } = this.props;

    onSelect(acceptedFiles[0]);
  };

  render() {
    const { image, isUploading, label } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.label}>
          <span>{label}</span>
          <I tooltip="Task logo" />
        </div>
        <Dropzone
          className={styles.dropzone}
          accept="image/jpeg, image/png, image/gif"
          multiple={false}
          disabled={isUploading}
          onDrop={this.handleDrop}
        >
          {image && <div className={styles.preview}>{image.name}</div>}
          {!image && (
            <div className={styles.hint}>
              <Hint />
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
}
