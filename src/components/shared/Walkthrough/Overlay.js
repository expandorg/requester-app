import React, { Component } from 'react';
import PropTypes from 'prop-types';

import windowResize from '../../common/windowResize';

import styles from './Overlay.module.styl';

class Overlay extends Component {
  static propTypes = {
    position: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
    }),
  };

  static defaultProps = {
    position: null,
  };

  state = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  render() {
    const { position } = this.props;
    const { width, height } = this.state;

    return (
      <svg className={styles.svg} viewBox={`0 0 ${width} ${height}`}>
        <mask id="myClip">
          <rect
            className={styles.backdrop}
            x="0"
            y="0"
            width={width}
            height={height}
          />
          {position && (
            <rect
              x={position.left}
              y={position.top}
              width={position.width}
              height={position.height}
              fill="black"
            />
          )}
        </mask>
        <rect x="0" y="0" width={width} height={height} mask="url(#myClip)" />
      </svg>
    );
  }
}

export default windowResize(Overlay);
