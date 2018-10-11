import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Description, Fieldset, Actions, ActionBtn } from './Form';

import { Upload } from './Form/Upload';

import { ReactComponent as Placeholder } from '../../assets/data.svg';

import styles from './UploadData.module.styl';

export default class UploadData extends Component {
  static propTypes = {
    onNext: PropTypes.func,
    onBack: PropTypes.func,
  };

  static defaultProps = {
    onNext: Function.prototype,
    onBack: Function.prototype,
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
        </Fieldset>
        <Actions>
          <ActionBtn className={styles.api} onClick={this.handleToggleApi}>
            Api
          </ActionBtn>
          <ActionBtn onClick={this.handleBack}>Back</ActionBtn>
          <ActionBtn>Next</ActionBtn>
        </Actions>
      </Form>
    );
  }
}
