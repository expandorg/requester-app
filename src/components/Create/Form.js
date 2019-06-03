import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';
import { taskTemplateProps } from '../shared/propTypes';
import FormPreview from '../shared/FormPreview';

import styles from './Form.module.styl';
import Sidebar from './Sidebar';

export default function Form({
  templates,
  selected,
  onSelect,
  onCreate,
  onPreview,
  onHide,
}) {
  const template = templates.find(t => t.id === selected);
  return (
    <div className={styles.container}>
      <Sidebar templates={templates} selected={selected} onSelect={onSelect} />
      <div className={styles.content}>
        <div className={styles.preview}>
          <div className={styles.top}>
            <div className={styles.warn}>This is just a preview.</div>
            <button className={styles.close} onClick={onHide}>
              ✕
            </button>
          </div>
          <FormPreview
            readOnly
            form={template && template.taskForm}
            className={styles.form}
          />
        </div>
        <div className={styles.panel}>
          <Button onClick={onPreview} theme="aqua">
            Preview
          </Button>
          <Button onClick={onCreate} className={styles.create}>
            use this template
          </Button>
        </div>
      </div>
    </div>
  );
}

Form.propTypes = {
  templates: PropTypes.arrayOf(taskTemplateProps),

  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

Form.defaultProps = {
  templates: [],
  selected: null,
};
