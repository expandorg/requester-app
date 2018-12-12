import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Dropzone from 'react-dropzone';

import I from '../I';

import styles from './Upload.module.styl';

export default class Upload extends Component {
  static propTypes = {
    file: PropTypes.shape({
      name: PropTypes.string,
    }),
    label: PropTypes.string,
    accept: PropTypes.string,
    className: PropTypes.string,
    tooltip: PropTypes.string,
    isUploading: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    onReject: PropTypes.func,
  };

  static defaultProps = {
    file: null,
    label: null,
    className: null,
    accept: 'image/jpeg, image/png, image/gif',
    tooltip: null,
    isUploading: false,
    onReject: Function.prototype,
  };

  handleDrop = (acceptedFiles, rejectedFiles) => {
    const { onSelect, onReject, accept } = this.props;
    if (rejectedFiles.length) {
      onReject(rejectedFiles, accept);
      return;
    }
    if (!acceptedFiles.length) {
      return;
    }

    onSelect(acceptedFiles[0]);
  };

  render() {
    const {
      children,
      file,
      isUploading,
      tooltip,
      className,
      label,
      accept,
    } = this.props;

    return (
      <div className={styles.container}>
        {label && (
          <div className={styles.label}>
            <span>{label}</span>
            {tooltip && (
              <I
                className={styles.tooltip}
                tooltip={tooltip}
                tooltipOrientation="right"
              />
            )}
          </div>
        )}
        <Dropzone
          accept={accept}
          multiple={false}
          disabled={isUploading}
          onDrop={this.handleDrop}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={cn(styles.dropzone, className, {
                [styles.uploading]: isUploading,
                [styles.active]: isDragActive,
              })}
            >
              <input {...getInputProps()} className={styles.input} />
              {children({ file })}
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
}
