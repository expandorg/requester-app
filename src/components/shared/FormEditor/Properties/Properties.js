import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps } from '@expandorg/modules';

import { Button } from '@expandorg/components';

import PropertyEditor from './PropertyEditor/PropertyEditor';
import ErrorContainer from './PropertyEditor/ErrorContainer';

import Validation from './Validation/Validation';

import styles from './Properties.module.styl';

export default class Properties extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    variables: PropTypes.arrayOf(PropTypes.string),
    onEdit: PropTypes.func.isRequired,
    onValidate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onToggleVarsDialog: PropTypes.func,
  };

  static defaultProps = {
    variables: [],
    onToggleVarsDialog: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      errors: null,
      original: props.module, // eslint-disable-line react/no-unused-state
      module: props.module,
    };
  }

  static getDerivedStateFromProps({ module }, state) {
    if (module !== state.original) {
      return {
        module,
        errors: null,
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
    const { onValidate, onEdit } = this.props;
    const { module, original } = this.state;

    const errors = onValidate(module, original.name);

    if (errors) {
      this.setState({ errors });
    } else {
      onEdit(module);
    }
  };

  render() {
    const { controls, onCancel, variables, onToggleVarsDialog } = this.props;
    const { module, errors } = this.state;

    const {
      module: { name, editor, validation },
    } = controls[module.type];

    return (
      <aside className={styles.container}>
        <div className={styles.content}>
          <div className={styles.props}>
            <div className={styles.title}>{name} properties</div>
            <ErrorContainer errors={errors} field="name">
              <div className={styles.name}>{module.name}</div>
            </ErrorContainer>
            {!!editor.properties &&
              Reflect.ownKeys(editor.properties).map(propertyName => (
                <ErrorContainer
                  errors={errors}
                  field={propertyName}
                  key={propertyName}
                >
                  <PropertyEditor
                    key={propertyName}
                    name={propertyName}
                    variables={variables}
                    onToggleVarsDialog={onToggleVarsDialog}
                    property={editor.properties[propertyName]}
                    moduleProperties={module}
                    onChange={this.handleChangeProperty}
                  />
                </ErrorContainer>
              ))}
          </div>
          <div className={styles.validation}>
            <Validation
              rules={validation}
              validation={module.validation}
              onChange={this.handleChangeValidation}
            />
          </div>
        </div>
        <div className={styles.actions}>
          <Button theme="grey" onClick={onCancel} className={styles.btn}>
            Cancel
          </Button>
          <Button
            onClick={this.handleSave}
            className={cn(styles.done, styles.btn)}
          >
            Done
          </Button>
        </div>
      </aside>
    );
  }
}
