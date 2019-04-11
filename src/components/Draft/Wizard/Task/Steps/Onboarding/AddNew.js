import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TemplatesDialog from '../../../../../shared/Templates/TemplatesDialog';

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

  handleAdd = template => {
    const { onAdd } = this.props;

    this.setState({ dialog: false });
    onAdd(template);
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
            description={
              "Make your task more worker friendly by extending your task's functionality by adding welcome screens, TOS and more!"
            }
            onHide={this.handleToggle}
            onSelect={this.handleAdd}
          />
        )}
      </div>
    );
  }
}
