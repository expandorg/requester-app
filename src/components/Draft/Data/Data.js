import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, deferComponentRender } from '@expandorg/components';

import { draftProps } from '../../shared/propTypes';

import DataEditor from './DataEditor/DataEditor';
import UploadForm from './UploadForm';

import { DraftManager } from '../../../model/draft';

import { Form, Actions } from '../controls';

class UploadData extends Component {
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

    const hasData = DraftManager.hasData(draft);

    return (
      <Form>
        {!hasData && <UploadForm draft={draft} />}
        {hasData && <DataEditor draft={draft} />}
        <Actions>
          <Button theme="secondary" onClick={this.handleBack}>
            Back
          </Button>
          <Button onClick={this.handleSubmit}>Next</Button>
        </Actions>
      </Form>
    );
  }
}

export default deferComponentRender(UploadData);
