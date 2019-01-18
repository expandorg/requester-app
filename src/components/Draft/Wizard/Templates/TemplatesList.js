import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button } from '@expandorg/components';

import Templates from '../../../shared/Templates/Templates';
import { Description, Actions } from '../Form';

import { taskTemplateProps } from '../../../shared/propTypes';
import { fetchTaskTemplates } from '../../../../sagas/tasksSagas';

import { taskTemplatesSelector } from '../../../../selectors/taskTemplatesSelectors';

import styles from './TemplatesList.module.styl';

const mapStateToProps = state => ({
  templates: taskTemplatesSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchTaskTemplates }, dispatch);

class TemplatesList extends Component {
  static propTypes = {
    templates: PropTypes.arrayOf(taskTemplateProps),

    selected: PropTypes.string,
    onSelect: PropTypes.func.isRequired,

    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,

    fetchTaskTemplates: PropTypes.func.isRequired,
  };

  static defaultProps = {
    templates: [],
    selected: null,
  };

  componentDidMount() {
    this.props.fetchTaskTemplates();
  }

  render() {
    const { templates, selected, onBack, onNext, onSelect } = this.props;
    return (
      <div className={styles.outer}>
        <div className={styles.container}>
          <Description>Description about this step goes here.</Description>
          <Templates
            className={styles.templates}
            title="Templates"
            description="Select task template"
            templates={templates}
            selected={selected}
            onSelect={onSelect}
          />
        </div>
        <Actions>
          <Button theme="secondary" onClick={onBack}>
            Back
          </Button>
          <Button disabled={selected === null} onClick={onNext}>
            Next
          </Button>
        </Actions>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplatesList);
