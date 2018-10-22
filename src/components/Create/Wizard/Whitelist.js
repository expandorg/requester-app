import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../common/Button';

import { Form, Description, Hero, Actions } from './Form';

import UserFilter, { newCondition } from '../../shared/UserFilter/UserFilter';

import styles from './Whitelist.module.styl';

export default class Whitelist extends Component {
  static propTypes = {
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  state = {
    value: 765,
    filters: [newCondition()],
  };

  handleSubmit = () => {
    const { onNext } = this.props;
    onNext();
  };

  handleBack = evt => {
    const { onBack } = this.props;
    onBack();

    evt.preventDefault();
  };

  handleChange = filters => {
    this.setState({ filters });
  };

  render() {
    const { value, filters } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className={styles.container}>
          <div className={styles.inner}>
            <Description>
              The second step is uploading your data and assigning variables.
            </Description>
            <Hero value={value} title="users available" />
            <UserFilter
              className={styles.filters}
              filters={filters}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <Actions>
          <Button onClick={this.handleBack}>Back</Button>
          <Button>Next</Button>
        </Actions>
      </Form>
    );
  }
}
