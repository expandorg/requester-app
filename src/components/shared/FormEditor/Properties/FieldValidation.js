import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Checkbox, Input } from '@expandorg/components';
import { getDefaultRuleMessage } from '@expandorg/modules/model';

import styles from './FieldValidation.module.styl';

const labels = {
  isRequired: 'Is required',
  isEmail: 'Should be valid email address',
  isTrue: 'Should be checked',
  isNumber: 'Should be a number',
  isRequiredArray: 'Should have at least one value',
};

class Rule extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    validation: PropTypes.object, // eslint-disable-line
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    validation: null,
  };

  constructor(props) {
    super(props);
    const val = !!props.validation && props.validation[props.name];
    this.state = {
      val: typeof val === 'string' ? val : getDefaultRuleMessage(props.name),
    };
  }

  handleToggle = value => {
    const { onChange, name, validation } = this.props;
    onChange({ ...(validation || {}), [name]: value });
    this.setState({ val: getDefaultRuleMessage(name) });
  };

  handleInput = ({ target }) => {
    const { onChange, name, validation } = this.props;
    this.setState({ val: target.value });
    onChange({ ...(validation || {}), [name]: target.value || true });
  };

  render() {
    const { name, validation } = this.props;
    const { val } = this.state;

    const enabled =
      !!validation &&
      (validation[name] === true || typeof validation[name] === 'string');

    const label = labels[name] || name;

    return (
      <div className={styles.rule}>
        <Checkbox
          className={styles.checkbox}
          value={enabled}
          label={enabled ? '' : label}
          onChange={this.handleToggle}
        />
        {enabled && (
          <Input
            className={styles.input}
            value={val}
            placeholder={label}
            onChange={this.handleInput}
          />
        )}
      </div>
    );
  }
}

export default function FieldValidation({ rules, validation, onChange }) {
  if (!rules) {
    return null;
  }
  return (
    <div className={styles.container}>
      {Reflect.ownKeys(rules).map(name => (
        <Rule
          key={name}
          name={name}
          validation={validation}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

FieldValidation.propTypes = {
  validation: PropTypes.object, // eslint-disable-line
  rules: PropTypes.object, // eslint-disable-line
  onChange: PropTypes.func.isRequired,
};

FieldValidation.defaultProps = {
  validation: null,
  rules: null,
};
