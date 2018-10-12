import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';

import DraggableModule from './DraggableModule';

import { targetModule, FORM_DND_ID } from '../../dnd';

class DnDModule extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    invisible: PropTypes.bool.isRequired,
    onMove: PropTypes.func.isRequired,
  };

  render() {
    const { connectDropTarget, invisible, ...rest } = this.props;

    return connectDropTarget(
      <div style={{ opacity: invisible ? 0 : null }}>
        <DraggableModule {...rest} />
      </div>
    );
  }
}

const collect = connect => ({
  connectDropTarget: connect.dropTarget(),
});

export default DropTarget(FORM_DND_ID, targetModule, collect)(DnDModule);
