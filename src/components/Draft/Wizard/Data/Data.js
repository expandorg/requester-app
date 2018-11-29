import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { draftProps } from '../../../shared/propTypes';

import Button from '../../../common/Button';
import DataEditor from './DataEditor/DataEditor';

import UploadForm from './UploadForm';

import { Form, Actions } from '../Form';

export default class UploadData extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  handleSubmit = () => {
    const { onNext } = this.props;
    onNext();
  };

  handleBack = evt => {
    evt.preventDefault();
    const { onBack } = this.props;
    onBack();
  };

  render() {
    const { draft } = this.props;
    const hasData = draft.dataId !== null && draft.dataId !== undefined;
    return (
      <Form onSubmit={this.handleSubmit}>
        {!hasData && <UploadForm draft={draft} />}
        {hasData && <DataEditor draft={draft} />}
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
