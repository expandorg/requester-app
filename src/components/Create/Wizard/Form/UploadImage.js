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
    tooltip: PropTypes.string,
    isUploading: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    image: null,
    tooltip: null,
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
    const { image, isUploading, tooltip, label } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.label}>
          <span>{label}</span>
          {tooltip && <I tooltip={tooltip} />}
        </div>
        <Dropzone
          className={styles.dropzone}
          accept="image/jpeg, image/png, image/gif"
          multiple={false}
          disabled={isUploading}
          onDrop={this.handleDrop}
        >
          <div className={styles.hint}>
            {image ? (
              <img className={styles.preview} src={image.preview} alt={label} />
            ) : (
              <Hint />
            )}
          </div>
        </Dropzone>
      </div>
    );
  }
}
