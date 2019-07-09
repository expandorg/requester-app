import React from 'react';
import PropTypes from 'prop-types';

import { Button, deferComponentRender } from '@expandorg/components';

import { draftProps } from '../../shared/propTypes';

import DataEditor from './DataEditor/DataEditor';
import UploadForm from './UploadForm';

import DraftValidator from '../../../model/DraftValidator';

import { Form, Actions, Description } from '../controls';

function UploadData({ draft, onBack, onNext }) {
  const hasData = DraftValidator.hasData(draft);
  return (
    <Form>
      <div>
        <Description>
          Upload your dataset (Optional). You can read more about alternative
          ways to supply data <a href="https://expandorg.zendesk.com">Here</a>
        </Description>
        {!hasData && <UploadForm draft={draft} />}
        {hasData && <DataEditor draft={draft} />}
      </div>
      <Actions>
        <Button theme="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Next</Button>
      </Actions>
    </Form>
  );
}

UploadData.propTypes = {
  draft: draftProps.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default deferComponentRender(UploadData);
