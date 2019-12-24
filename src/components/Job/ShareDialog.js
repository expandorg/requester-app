import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogForm as DF,
  Button,
  IconInput,
} from '@expandorg/components';
import settings from '../../common/settings';

export default function ShareDialog({ jobId, visible, onHide }) {
  const jobUrl = `${settings.frontendUrl}/job/${jobId}`;
  console.log(jobUrl);

  return (
    <Dialog visible={visible} onHide={onHide} contentLabel="share-dialog">
      <DF.Container>
        <DF.Title>Share Job</DF.Title>
        <DF.Field>
          <IconInput value={jobUrl} readOnly copy />
        </DF.Field>
        <DF.Actions>
          <Button theme="secondary" onClick={onHide}>
            Close
          </Button>
        </DF.Actions>
      </DF.Container>
    </Dialog>
  );
}

ShareDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  jobId: PropTypes.number.isRequired,
  onHide: PropTypes.func.isRequired,
};
