import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button } from '@expandorg/components';

import Templates from '../../../shared/Templates/Templates';
import { Actions, Description } from '../Form';

import { taskTemplatesSelector } from '../../../../selectors/taskTemplatesSelectors';
import { fetchTaskTemplates } from '../../../../sagas/tasksSagas';

import { taskTemplateProps } from '../../../shared/propTypes';

import styles from './TemplatesList.module.styl';

const mapStateToProps = state => ({
  templates: taskTemplatesSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchTaskTemplates }, dispatch);

class TemplatesList extends Component {
  static propTypes = {
    templates: PropTypes.arrayOf(taskTemplateProps),

    title: PropTypes.string.isRequired,
    nextTitle: PropTypes.string,
    selected: PropTypes.string,
    onSelect: PropTypes.func.isRequired,

    onNext: PropTypes.func.isRequired,

    fetchTaskTemplates: PropTypes.func.isRequired,
  };

  static defaultProps = {
    templates: [],
    nextTitle: 'Next',
    selected: null,
  };

  componentDidMount() {
    this.props.fetchTaskTemplates();
  }

  render() {
    const {
      templates,
      selected,
      onNext,
      onSelect,
      title,
      nextTitle,
    } = this.props;
    return (
      <div className={styles.outer}>
        <Description>{title}</Description>
        <div className={styles.container}>
          <Templates
            className={styles.templates}
            title="Templates"
            description="Templates provide the basic components for you to begin building your task. They are customisable."
            templates={templates}
            selected={selected}
            onSelect={onSelect}
          />
        </div>
        <Actions>
          <Button disabled={selected === null} onClick={onNext}>
            {nextTitle}
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
