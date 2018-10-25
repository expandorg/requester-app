import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TemplatesDialog from '../../../../shared/Templates/TemplatesDialog';
import mocks from '../../../../shared/Templates/template-mocks';

import styles from './AddNew.module.styl';

export default class AddNew extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  state = {
    dialog: false,
  };

  handleToggle = evt => {
    evt.preventDefault();

    this.setState(({ dialog }) => ({ dialog: !dialog }));
  };

  handleAdd = (...args) => {
    const { onAdd } = this.props;

    this.setState({ dialog: false });

    onAdd(...args);
  };

  render() {
    const { dialog } = this.state;

    return (
      <div className={styles.outer}>
        <button className={styles.container} onClick={this.handleToggle}>
          <div className={styles.plus}>+</div>
          <div className={styles.add}>Add a new section to your task</div>
        </button>
        {dialog && (
          <TemplatesDialog
            title="Onboarding"
            templates={mocks}
            description="Pick onboarding step template"
            onHide={this.handleToggle}
            onSelect={this.handleAdd}
          />
        )}
      </div>
    );
  }
}
