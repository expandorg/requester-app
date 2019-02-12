import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';
import { Form, Actions, Description } from '../Form';

import { draftProps } from '../../../shared/propTypes';

import Steps from './Steps/Steps';
import PreviewCtx from './PreviewCtx';

import styles from './CreateTask.module.styl';

export default class CreateTask extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  handleSubmit = () => {
    const { onNext } = this.props;
    onNext();
  };

  handlePreview = evt => {
    evt.preventDefault();
  };

  handleBack = evt => {
    const { onBack } = this.props;
    onBack();

    evt.preventDefault();
  };

  render() {
    const { draft } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <div className={styles.container}>
          <div className={styles.inner}>
            <div className={styles.header}>
              <PreviewCtx draft={draft}>
                {({ onPreview }) => (
                  <Button
                    className={styles.preview}
                    theme="aqua"
                    onClick={onPreview}
                  >
                    Preview
                  </Button>
                )}
              </PreviewCtx>
              <Description className={styles.desc}>
                Build your task including the on-boarding, verification and a
                quiz
              </Description>
            </div>
            <Steps draft={draft} />
          </div>
        </div>
        <Actions>
          <Button theme="secondary" onClick={this.handleBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </Actions>
      </Form>
    );
  }
}
