import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@gemsorg/modules';

import Button from '../../../../common/Button';
import Input from '../../../../common/Input';

import PropertyEditor from './PropertyEditor/PropertyEditor';
import FieldValidation from './FieldValidation';

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

  handleChangeName = ({ target }) => {
    this.setState(({ module }) => ({
      module: { ...module, name: target.value },
    }));
  };

  handleChangeValidation = validation => {
    this.setState(({ module }) => ({ module: { ...module, validation } }));
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
      module: { name, editor, validation },
    } = controls[module.type];
    return (
      <aside className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>{name} properties</div>
          <Input
            className={styles.name}
            value={module.name}
            placeholder="Component name"
            required
            onChange={this.handleChangeName}
          />
          {editor.properties && (
            <div className={styles.props}>
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
          {validation && (
            <FieldValidation
              validation={validation}
              module={module}
              onChange={this.handleChangeValidation}
            />
          )}
        </div>
        <div className={styles.actions}>
          <Button theme="grey" onClick={onCancel} className={styles.btn}>
            Cancel
          </Button>
          <Button onClick={this.handleSave} className={styles.btn}>
            Save
          </Button>
        </div>
      </aside>
    );
  }
}
