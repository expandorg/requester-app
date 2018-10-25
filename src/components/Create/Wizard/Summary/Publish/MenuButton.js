import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../common/Button';

import { ReactComponent as Arrow } from '../../../../assets/arrow-down.svg';

import Menu from './Menu';

import styles from './Menu.module.styl';

export default class MenuButton extends Component {
  static propTypes = {
    onPublish: PropTypes.func.isRequired,
    onSchedule: PropTypes.func.isRequired,
  };

  state = {
    menu: false,
  };

  handleScheduleClick = evt => {
    const { onSchedule } = this.props;
    onSchedule();
    this.handleHide();

    evt.preventDefault();
  };

  handlePublishClick = evt => {
    const { onPublish } = this.props;
    onPublish();
    this.handleHide();

    evt.preventDefault();
  };

  handleToggle = () => {
    this.setState(({ menu }) => ({ menu: !menu }));
  };

  handleHide = () => {
    this.setState({ menu: false });
  };

  render() {
    const { menu } = this.state;

    return (
      <div className={styles.group}>
        <Button className={styles.toggle} onClick={this.handleToggle}>
          Publish
          <Arrow className={styles.arrow} />
        </Button>
        {menu && (
          <Menu
            onPublish={this.handlePublishClick}
            onSchedule={this.handleScheduleClick}
            onToggle={this.handleHide}
          />
        )}
      </div>
    );
  }
}
