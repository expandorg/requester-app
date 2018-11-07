import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../common/Button';

import { ReactComponent as Arrow } from '../../../../assets/arrow-down.svg';

import DateTimePicker from '../../../../shared/DateTimePicker/DateTimePicker';

import Menu from './Menu';

import styles from './styles.module.styl';

export default class PublishButton extends Component {
  static propTypes = {
    onPublish: PropTypes.func.isRequired,
  };

  state = {
    menu: false,
    schedule: false,
  };

  handlePublishClick = evt => {
    const { onPublish } = this.props;
    onPublish();
    this.handleHide();

    evt.preventDefault();
  };

  handleSchedulePublish = dateTime => {
    const { onPublish } = this.props;
    onPublish(dateTime);
    this.handleToggleSchedule();
  };

  handleToggle = () => {
    this.setState(({ menu }) => ({ menu: !menu }));
  };

  handleHide = () => {
    this.setState({ menu: false });
  };

  handleToggleSchedule = () => {
    this.setState(({ schedule }) => ({ schedule: !schedule }));
  };

  render() {
    const { menu, schedule } = this.state;

    return (
      <div className={styles.group}>
        <Button className={styles.toggle} onClick={this.handleToggle}>
          Publish
          <Arrow className={styles.arrow} />
        </Button>
        {menu && (
          <Menu
            onPublish={this.handlePublishClick}
            onSchedule={this.handleToggleSchedule}
            onToggle={this.handleHide}
          />
        )}
        {schedule && (
          <DateTimePicker
            className={styles.picker}
            onHide={this.handleToggleSchedule}
            onDone={this.handleSchedulePublish}
          />
        )}
      </div>
    );
  }
}
