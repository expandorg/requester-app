import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormEditorDialog from './FormEditorDialog';
import Step from '../Step';

import { formProps } from '../../../../../shared/propTypes';

export default class FormEditorToggle extends Component {
  static propTypes = {
    form: formProps,
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    variables: PropTypes.arrayOf(PropTypes.string),
    varsSample: PropTypes.object, // eslint-disable-line
    validateForm: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: [],
    varsSample: null,
    checked: false,
    form: null,
  };

  state = {
    selected: false,
  };

  handleUpdate = form => {
    const { onUpdate } = this.props;
    onUpdate(form);
    this.handleToggle();
  };

  handleToggle = () => {
    this.setState(({ selected }) => ({ selected: !selected }));
  };

  render() {
    const {
      form,
      variables,
      varsSample,
      title,
      validateForm,
      checked,
    } = this.props;
    if (!form) {
      return null;
    }
    const { selected } = this.state;
    return (
      <>
        {form && (
          <Step checked={checked} name={title} onSelect={this.handleToggle} />
        )}
        {selected && (
          <FormEditorDialog
            form={form}
            title={title}
            validateForm={validateForm}
            variables={variables}
            varsSample={varsSample}
            onSave={this.handleUpdate}
            onHide={this.handleToggle}
          />
        )}
      </>
    );
  }
}
