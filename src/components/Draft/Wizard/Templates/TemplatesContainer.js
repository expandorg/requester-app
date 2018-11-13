import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Templates from '../../../shared/Templates/Templates';

import { taskTemplateProps } from '../../../shared/propTypes';
import { fetchTaskTemplates } from '../../../../sagas/tasksSagas';

import { taskTemplatesSelector } from '../../../../selectors/tasksSelectors';

import styles from './Templates.module.styl';

const mapStateToProps = state => ({
  templates: taskTemplatesSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchTaskTemplates }, dispatch);

class TemplatesContainer extends Component {
  static propTypes = {
    templates: PropTypes.arrayOf(taskTemplateProps),
    selected: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
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
    const { selected, templates, onSelect } = this.props;
    return (
      <Templates
        className={styles.templates}
        title="Templates"
        description="Select task template"
        templates={templates}
        selected={selected}
        onSelect={onSelect}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplatesContainer);
