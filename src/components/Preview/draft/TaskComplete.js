import React from 'react';
import PropTypes from 'prop-types';

import { Dialog, Button, DialogForm as DF } from '@expandorg/components';

export default function TaskComplete({ onSubmit }) {
  return (
    <Dialog visible hideButton contentLabel="submit task">
      <DF.Container>
        <DF.Title>Task Submitted</DF.Title>
        <DF.Description>Submission successful!</DF.Description>
        <DF.Actions>
          <Button
            theme="secondary"
            className="gem-dialogform-button"
            onClick={() => window.close()}
          >
            Browse jobs
          </Button>
          <Button className="gem-dialogform-button" onClick={onSubmit}>
            Start this task
          </Button>
        </DF.Actions>
      </DF.Container>
    </Dialog>
  );
}

TaskComplete.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
