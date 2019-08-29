import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { formProps } from '@expandorg/modules';

import FormPreview from '../../shared/FormPreview';

import { makeVariablesSampleSelector } from '../../../selectors/variablesSelectors';

const makeMapStateToProps = () => {
  const varsSampleSelector = makeVariablesSampleSelector();
  return (state, props) => ({
    variables: varsSampleSelector(state, props.draft.id, props.draft.dataId),
  });
};

class Task extends Component {
  static propTypes = {
    form: formProps.isRequired,
    variables: PropTypes.shape({}),
  };

  static defaultProps = {
    variables: null,
  };

  render() {
    const { form, variables } = this.props;

    return <FormPreview variables={variables} form={form} />;
  }
}

export default connect(makeMapStateToProps)(Task);
