import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Tooltip } from '@gemsorg/components';

import { ReactComponent as IconLeft } from './assets/align-left.svg';
import { ReactComponent as IconCenter } from './assets/align-center.svg';
import { ReactComponent as IconRight } from './assets/align-right.svg';

import styles from './AlignmentTool.module.styl';

const getActive = () => 'left';

const applyAlignment = editorState => editorState;

const Btn = Tooltip(({ active, onClick, value, children, ...rest }) => (
  <button
    onClick={evt => onClick(evt, value)}
    className={cn(styles.btn, { [styles.active]: active === value })}
    {...rest}
  >
    {children}
  </button>
));

export default class AlignmentTool extends Component {
  static propTypes = {
    editorState: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleChange = (evt, value) => {
    const { editorState, onChange } = this.props;

    onChange(applyAlignment(editorState, value));
    evt.preventDefault();
  };

  render() {
    const { editorState } = this.props;
    const active = getActive(editorState);

    return (
      <div className={styles.container}>
        <Btn
          value="left"
          onClick={this.handleChange}
          active={active}
          tooltip="left"
        >
          <IconLeft />
        </Btn>
        <Btn
          value="center"
          onClick={this.handleChange}
          active={active}
          tooltip="Center"
        >
          <IconCenter />
        </Btn>
        <Btn
          value="right"
          onClick={this.handleChange}
          active={active}
          tooltip="Right"
        >
          <IconRight />
        </Btn>
      </div>
    );
  }
}
