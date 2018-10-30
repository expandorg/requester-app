import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@gemsorg/modules';

import Input from '../../../../common/Input';

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

  handleInputChange = ({ target }) => {
    const {
      onChange,
      module: { validation },
    } = this.props;
    onChange({
      ...(validation || {}),
      [target.name]: target.value,
    });
  };

  render() {
    const { validation, module } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.title}>Validation Messages</div>
        <div className={styles.list}>
          {Reflect.ownKeys(validation).map(name => (
            <Input
              key={name}
              className={styles.item}
              name={name}
              placeholder={labels[name] || name}
              value={(module.validation && module.validation[name]) || ''}
              onChange={this.handleInputChange}
            />
          ))}
        </div>
      </div>
    );
  }
}
