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
  value: PropTypes.any.isRequired, // eslint-disable-line
  type: PropTypes.string,
};

Field.defaultProps = {
  type: 'string',
};

export default class TemplateSettings extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
  };

  render() {
    const { draft } = this.props;
    console.log(draft);
    return (
      <div className={styles.container}>
        <Field title="Staking" value={draft.staking} type="bool" />
        {draft.staking && (
          <Field title="How much to stake?" value={draft.stake} />
        )}
        <Field title="Deduct stake if fail?" value={draft.deduct} type="bool" />
        {draft.callbackUrl && (
          <Field title="Callback Url" value={draft.callbackUrl} />
        )}
      </div>
    );
  }
}
