import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@gemsorg/components';
import Button from '../../common/Button';

import Templates from './Templates';

import templateProps from './templateProps';

import styles from './TemplatesDialog.module.styl';

export default class TemplatesDialog extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    templates: PropTypes.arrayOf(templateProps),
    onHide: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    templates: [],
    description: null,
    title: 'Templates',
  };

  state = {
    selected: null,
  };

  handleSelect = id => {
    this.setState({ selected: id });
  };

  handlePick = () => {
    const { selected } = this.state;
    if (selected !== null) {
      const { templates, onSelect } = this.props;

      const template = templates.find(t => t.id === selected);
      onSelect(template);
    }
  };

  render() {
    const { onHide, templates, description, title } = this.props;
    const { selected } = this.state;

    return (
      <Dialog
        visible
        onHide={onHide}
        modalClass={styles.modal}
        overlayClass={styles.overlay}
        contentLabel="templates-dialog"
        hideButton
        shouldCloseOnEsc={false}
      >
        <Templates
          className={styles.content}
          templates={templates}
          selected={selected}
          title={title}
          description={description}
          onSelect={this.handleSelect}
          actions={
            <div className={styles.actions}>
              <Button theme="secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button onClick={this.handlePick}>Use this</Button>
            </div>
          }
        />
      </Dialog>
    );
  }
}
