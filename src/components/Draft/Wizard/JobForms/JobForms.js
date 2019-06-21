import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Steps from './Steps/Steps';

import { draftProps } from '../../../shared/propTypes';

import Editor from './Editor';
import Toolbar from './Toolbar/Toolbar';

import { FormSelection } from './forms';

export default function JobForms({ draft, onNext }) {
  const [selection, setSelection] = useState(FormSelection.task);

  return (
    <Editor
      form={selection.getForm(draft)}
      variables={[]}
      varsSample={{}}
      toolbar={<Toolbar draft={draft} onNext={onNext} />}
    >
      <Steps selection={selection} draft={draft} onSelect={setSelection} />
    </Editor>
  );
}

JobForms.propTypes = {
  draft: draftProps.isRequired,
  onNext: PropTypes.func.isRequired,
};
