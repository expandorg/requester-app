import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@gemsorg/modules';

import Button from '../../../../common/Button';

import PropertyEditor from './PropertyEditor/PropertyEditor';

import styles from './PropertiesForm.module.styl';

export default class PropertiesForm extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    onEdit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      original: props.module, // eslint-disable-line react/no-unused-state
      module: props.module,
    };
  }

  static getDerivedStateFromProps({ module }, state) {
    if (module !== state.original) {
      return {
        module,
        original: module,
      };
    }
    return null;
  }

  handleChangeProperty = (name, value) => {
    this.setState(({ module }) => ({ module: { ...module, [name]: value } }));
  };

  handleSave = () => {
    const { onEdit } = this.props;
    const { module } = this.state;

    onEdit(module);
  };

  render() {
    const { controls, onCancel } = this.props;
    const { module } = this.state;

    const {
      module: { name, editor },
    } = controls[module.type];

    return (
      <aside className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>{name}</div>
          {editor.properties && (
            <div className={styles.list}>
              {Reflect.ownKeys(editor.properties).map(propertyName => (
                <PropertyEditor
                  key={propertyName}
                  name={propertyName}
                  property={editor.properties[propertyName]}
                  value={module[propertyName]}
                  onChange={this.handleChangeProperty}
                />
              ))}
            </div>
          )}
        </div>
        <div className={styles.actions}>
          <Button theme="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={this.handleSave}>Save</Button>
        </div>
      </aside>
    );
  }
}
