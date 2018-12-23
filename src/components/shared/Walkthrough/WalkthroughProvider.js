import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WalkthroughContext from './WalkthroughContext';
import Portal from './Portal';

import Hint from './Hint/Hint';
import Overlay from './Overlay';

export default class WalkthroughProvider extends Component {
  static propTypes = {
    settings: PropTypes.shape({
      order: PropTypes.number,
      orientation: PropTypes.string,
      hint: PropTypes.string,
    }).isRequired,
  };

  state = {
    active: null,
    position: null,
    presence: [],
  };

  handleActiveChange = active => {
    this.setState({
      active,
    });
  };

  handlePositionChange = position => {
    this.setState({
      position,
    });
  };

  handleHide = () => {
    this.setState({
      active: null,
      position: null,
    });
  };

  handleTogglePresence = (id, add) => {
    this.setState(({ presence }) => ({
      presence: add ? [...presence, id] : presence.filter(p => p !== id),
    }));
  };

  render() {
    const { children, settings } = this.props;
    const { active, position, presence } = this.state;

    const value = {
      settings,
      active,
      position,
      onActiveChange: this.handleActiveChange,
      onPosition: this.handlePositionChange,
      onTogglePresence: this.handleTogglePresence,
    };

    return (
      <WalkthroughContext.Provider value={value}>
        {children}
        {active && (
          <Portal>
            <Overlay position={position} />
            <Hint
              settings={settings}
              active={active}
              position={position}
              presence={presence}
              onActiveChange={this.handleActiveChange}
              onHide={this.handleHide}
            />
          </Portal>
        )}
      </WalkthroughContext.Provider>
    );
  }
}
