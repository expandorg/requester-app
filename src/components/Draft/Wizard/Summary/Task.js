import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Form, Module, FormDataProvider, formProps } from '@gemsorg/modules';

import { makeDataVarsSampleSelector } from '../../../../selectors/dataSelectors';

import styles from './Task.module.styl';

const makeMapStateToProps = () => {
  const dataVarsSampleSelector = makeDataVarsSampleSelector();
  return (state, props) => ({
    variables: dataVarsSampleSelector(state, props.draft.dataId),
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

  state = {
    formData: { allowedRetries: 3, currentTry: 1 },
  };

  render() {
    const { form, variables } = this.props;
    const { formData } = this.state;

    if (!form || !form.modules || !form.modules.length) {
      return <div className={styles.empty}>Lorem ipsum dolor sit amet</div>;
    }

    return (
      <FormDataProvider formData={formData}>
        <Form
          variables={variables}
          className={styles.form}
          form={form}
          onSubmit={() => {}}
        >
          {props => <Module {...props} />}
        </Form>
      </FormDataProvider>
    );
  }
}

export default connect(makeMapStateToProps)(Task);
