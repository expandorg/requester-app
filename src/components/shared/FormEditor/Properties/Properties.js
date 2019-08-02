import React, { useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps } from '@expandorg/modules';
import { Button, ClipboardButton } from '@expandorg/components';

import PropertyEditor from './PropertyEditor/PropertyEditor';
import ErrorContainer from './PropertyEditor/ErrorContainer';
import Validation from './Validation/Validation';

import { EditorContext } from '../EditorContext';

import I from '../../../common/I';

import styles from './Properties.module.styl';

export default function Properties({
  module,
  onChange,
  onSave,
  onCancel,
  onValidate,
  variables,
  onToggleVarsDialog,
}) {
  const { controlsMap: controls } = useContext(EditorContext);
  const [errors, setErrors] = useState(null);

  const change = useCallback(
    (name, value) => onChange({ ...module, [name]: value }),
    [module, onChange]
  );

  const changeValidation = useCallback(
    validation => onChange({ ...module, validation }),
    [module, onChange]
  );

  const save = useCallback(() => {
    const e = onValidate(module, module.name);
    if (e) {
      setErrors(e);
    } else {
      onSave(module);
    }
  }, [module, onSave, onValidate]);

  const {
    module: { name, editor, validation },
  } = controls[module.type];

  return (
    <aside className={styles.container}>
      <div className={styles.content}>
        <div className={styles.props}>
          <div className={styles.title}>{name} properties</div>
          <ErrorContainer errors={errors} field="name">
            <div className={styles.name}>
              <div className={styles.cname}>
                {module.name}
                <I tooltip="component name" className={styles.i} />
              </div>
              <ClipboardButton value={module.name} className={styles.copy}>
                Copy
              </ClipboardButton>
            </div>
          </ErrorContainer>
          {!!editor.properties &&
            Reflect.ownKeys(editor.properties).map(propertyName => (
              <ErrorContainer
                key={propertyName}
                errors={errors}
                field={propertyName}
              >
                <PropertyEditor
                  key={propertyName}
                  name={propertyName}
                  variables={variables}
                  onToggleVarsDialog={onToggleVarsDialog}
                  property={editor.properties[propertyName]}
                  moduleProperties={module}
                  onChange={change}
                />
              </ErrorContainer>
            ))}
        </div>
        <div className={styles.validation}>
          <Validation
            rules={validation}
            validation={module.validation}
            onChange={changeValidation}
          />
        </div>
      </div>
      <div className={styles.actions}>
        <Button theme="grey" className={styles.btn} onClick={onCancel}>
          Cancel
        </Button>
        <Button className={cn(styles.done, styles.btn)} onClick={save}>
          Done
        </Button>
      </div>
    </aside>
  );
}

Properties.propTypes = {
  module: moduleProps.isRequired,
  variables: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onToggleVarsDialog: PropTypes.func,
};

Properties.defaultProps = {
  variables: [],
  onToggleVarsDialog: null,
};
