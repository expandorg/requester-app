import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@gemsorg/modules';

import Button from '../../../common/Button';

import styles from './PropertiesForm.module.styl';

export default class PropertiesForm extends Component {
  static propTypes = {
    module: moduleProps.isRequired,

    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  render() {
    const { module, onSave, onCancel, onRemove } = this.props;
    return (
      <aside className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>{module.name}</div>
          <Button theme="link" onClick={() => onRemove(module.name)}>
            Remove
          </Button>
        </div>
        <div className={styles.actions}>
          <Button theme="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(module)}>Save</Button>
        </div>
      </aside>
    );
  }
}
