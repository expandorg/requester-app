import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import Templates from '../../../shared/Templates/Templates';
import { Actions } from '../Form';

import { taskTemplateProps } from '../../../shared/propTypes';

import styles from './TemplatesList.module.styl';

export default class TemplatesList extends Component {
  static propTypes = {
    templates: PropTypes.arrayOf(taskTemplateProps),

    selected: PropTypes.string,
    onSelect: PropTypes.func.isRequired,

    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  static defaultProps = {
    templates: [],
    selected: null,
  };

  render() {
    const { templates, selected, onBack, onNext, onSelect } = this.props;
    return (
      <div className={styles.outer}>
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
