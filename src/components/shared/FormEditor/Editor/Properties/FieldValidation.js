import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@expandorg/modules';

import Checkbox from '../../../../common/Checkbox';

import styles from './FieldValidation.module.styl';

const labels = {
  isRequired: 'Is Required',
  isNotEmpty: 'Is Not Empty',
  isTrue: 'Is True',
};

export default class FieldValidation extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    validation: PropTypes.object.isRequired, // eslint-disable-line
    onChange: PropTypes.func.isRequired,
  };

  handleInputChange = (value, name) => {
    const {
      onChange,
      module: { validation },
    } = this.props;
    onChange({
      ...(validation || {}),
      [name]: value,
    });
  };

  render() {
    const { validation, module } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.title}>Validation</div>
        <div className={styles.list}>
          {Reflect.ownKeys(validation).map(name => (
            <Checkbox
              key={name}
              className={styles.item}
              name={name}
              label={labels[name] || name}
              value={(module.validation && !!module.validation[name]) || false}
              onChange={this.handleInputChange}
            />
          ))}
        </div>
      </div>
    );
  }
}
