import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Steps from './Steps/Steps';

import { draftProps } from '../../../shared/propTypes';

import Editor from './Editor';
import { FormSelection } from './forms';

export default class JobForms extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    onNext: PropTypes.func.isRequired,
  };

  state = {
    selection: FormSelection.task,
  };

  handleSubmit = () => {
    const { onNext } = this.props;
    onNext();
  };

  handleSelect = selection => {
    this.setState({ selection });
  };

  render() {
    const { draft } = this.props;
    const { selection } = this.state;

    return (
      <Editor
        form={selection.getForm(draft)}
        onSubmit={Function.prototype}
        variables={[]}
        varsSample={{}}
        validateForm={Function.prototype}
      >
        <Steps
          selection={selection}
          draft={draft}
          onSelect={this.handleSelect}
        />
      </Editor>
    );
  }
}
