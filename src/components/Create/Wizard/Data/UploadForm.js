import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Upload } from '../../../common/Upload';

import { Description, Fieldset } from '../Form';

import { ReactComponent as Placeholder } from '../../../assets/data.svg';

import styles from './UploadForm.module.styl';

export default class UploadForm extends Component {
  static propTypes = {
    onUpload: PropTypes.func.isRequired,
  };

  state = {
    data: null,
  };

  handleUpload = data => {
    const { onUpload } = this.props;

    this.setState({
      data,
    });

    onUpload(data);
  };

  handleToggleApi = evt => {
    evt.preventDefault();
  };

  render() {
    const { data } = this.state;
    return (
      <Fieldset>
        <Description>
          The second step is uploading your data and assigning variables.
        </Description>
        <Upload
          file={data}
          className={styles.upload}
          onSelect={this.handleUpload}
        >
          {({ file }) =>
            file ? (
              file.name
            ) : (
              <div className={styles.placeholder}>
                <Placeholder className={styles.image} />
                <div className={styles.or}>Drag a file or</div>
                <div className={styles.button}>Select from computer</div>
              </div>
            )
          }
        </Upload>
        <button onClick={this.handleToggleApi} className={styles.api}>
          Use API instead?
        </button>
      </Fieldset>
    );
  }
}
