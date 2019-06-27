import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FormPreview from '../../shared/FormPreview';

import { draftProps, taskTemplateProps } from '../../shared/propTypes';
import { DraftManager } from '../../../model/draft';

import { fetchTaskTemplate } from '../../../sagas/tasksSagas';
import { makeTaskTemplateSelector } from '../../../selectors/taskTemplatesSelectors';

import styles from './TaskTemplate.module.styl';

const makeMapStateToProps = () => {
  const taskTemplateSelector = makeTaskTemplateSelector();
  return (state, props) => ({
    template: taskTemplateSelector(state, props.draft.templateId),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchTaskTemplate }, dispatch);

class TaskTemplate extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    template: taskTemplateProps,
    fetchTaskTemplate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    template: null,
  };

  componentDidMount() {
    const { draft } = this.props;
    if (DraftManager.hasTemplate(draft)) {
      this.props.fetchTaskTemplate(draft.templateId);
    }
  }

  render() {
    const { template } = this.props;
    return (
      <div className={styles.container}>
        {template && (
          <div className={styles.preview}>
            <div className={styles.title}>{template.name}</div>
            <FormPreview
              readOnly
              form={template.taskForm}
              className={styles.form}
            />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(TaskTemplate);
