import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../common/Button';
import { Upload } from '../../../common/Upload';

import { Form, Description, Fieldset, Actions } from '../Form';

import { ReactComponent as Placeholder } from '../../../assets/data.svg';

import styles from './Data.module.styl';

export default class UploadData extends Component {
  static propTypes = {
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  state = {
    data: null,
  };

  handleSubmit = () => {
    const { onNext } = this.props;
    onNext();
  };

  handleUpload = data => {
    this.setState({
      data,
    });
  };

  handleBack = evt => {
    const { onBack } = this.props;
    onBack();

    evt.preventDefault();
  };

  handleToggleApi = evt => {
    evt.preventDefault();
  };

  render() {
    const { data } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
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
        <Actions>
          <Button onClick={this.handleBack}>Back</Button>
          <Button>Next</Button>
        </Actions>
      </Form>
    );
  }
}
