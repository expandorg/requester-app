import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import windowResize from '../../common/windowResize';

import { withWalkthroughContext } from './WalkthroughContext';

import { getItemPositionByRef } from './positioning';

import styles from './WalkthroughPin.module.styl';

class WalkthroughPin extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    item: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types

    active: PropTypes.string,
    settings: PropTypes.shape({
      order: PropTypes.number,
      orientation: PropTypes.string,
      hint: PropTypes.string,
    }).isRequired,

    onActiveChange: PropTypes.func.isRequired,
    onPosition: PropTypes.func.isRequired,
    onTogglePresence: PropTypes.func.isRequired,
  };

  static defaultProps = {
    active: null,
    className: null,
  };

  componentDidMount() {
    const { settings, onTogglePresence, id } = this.props;
    if (settings[id]) {
      onTogglePresence(id, true);
    }
  }

  componentDidUpdate({ active: prevActive }) {
    const { active } = this.props;

    if (!!active && prevActive !== active) {
      this.handleResize();
    }
  }

  componentWillUnmount() {
    const { settings, onTogglePresence, id } = this.props;
    if (settings[id]) {
      onTogglePresence(id, false);
    }
  }

  handleResize = () => {
    const { item, onPosition, active, id } = this.props;
    if (active === id) {
      const pos = getItemPositionByRef(item.current);
      onPosition(pos);
    }
  };

  handleClick = evt => {
    evt.preventDefault();

    const { id, onActiveChange } = this.props;
    onActiveChange(id);
  };

  render() {
    const { className, id, settings, active } = this.props;

    if (!settings[id] || active) {
      return null;
    }
    return (
      <button onClick={this.handleClick} className={cn(styles.pin, className)}>
        <div className={styles.inner} />
      </button>
    );
  }
}

export default withWalkthroughContext(windowResize(WalkthroughPin));
