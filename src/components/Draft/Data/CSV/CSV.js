import React from 'react';

import { deferComponentRender } from '@expandorg/components';

import { draftProps } from '../../../shared/propTypes';

import DataEditor from '../DataEditor/DataEditor';
import UploadForm from './UploadForm';

import DraftValidator from '../../../../model/DraftValidator';

function CSVForm({ draft }) {
  const hasData = DraftValidator.hasData(draft);
  return (
    <>
      {!hasData && <UploadForm draft={draft} />}
      {hasData && <DataEditor draft={draft} />}
    </>
  );
}

CSVForm.propTypes = {
  draft: draftProps.isRequired,
};

export default deferComponentRender(CSVForm);
