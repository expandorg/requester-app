import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { draftProps } from '../../../shared/propTypes';

import styles from './TemplateSettings.module.styl';

const getValue = (type, value) => {
  if (type === 'bool') {
    return value ? 'True' : 'False';
  }
  return value;
};

const Field = ({ title, value, type }) => (
  <div className={styles.item}>
    <div className={styles.title}>{title}</div>
    <div>{getValue(type, value)}</div>
  </div>
);

Field.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.bool]).isRequired,
  type: PropTypes.string.isRequired,
};

const settings = {
  staking: true,
  stake: 400,
  deduct: true,
  callbackUrl: '',
};

export default class TemplateSettings extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
  };

  render() {
    const { draft } = this.props;
    return (
      <div className={styles.container}>
        <Field
          title="Staking"
          value={settings.staking}
          type="bool"
          draft={draft}
        />
        {settings.staking && (
          <Field
            title="How much to stake?"
            value={settings.stake}
            type="number"
          />
        )}
        <Field
          title="Deduct stake if fail?"
          value={settings.deduct}
          type="bool"
        />
        <Field
          title="Deduct stake if fail?"
          value={settings.deduct}
          type="bool"
        />
        {settings.callbackUrl && (
          <Field
            title="Deduct stake if fail?"
            value={settings.callbackUrl}
            type="bool"
          />
        )}
      </div>
    );
  }
}
