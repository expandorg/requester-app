import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogForm as DF, Button } from '@expandorg/components';

export default function ShareDialog({ jobId, visible, onHide }) {
  console.log(jobId);

  return (
    <Dialog visible={visible} onHide={onHide} contentLabel="share-dialog">
      <DF.Container>
        <DF.Title>Variables</DF.Title>
        <DF.Actions>
          <Button theme="secondary" onClick={onHide}>
            go back
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
