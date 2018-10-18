import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import debounce from 'debounce';
import { DropTarget } from 'react-dnd';

import ModuleItem from './ModuleItem';

import { availableTarget, FORM_DND_ID } from '../dnd';

import styles from './AvailableModules.module.styl';

const RESIZE_DEBOUNCE = 200;

class AvailableModules extends Component {
  static propTypes = {
    totalModules: PropTypes.number.isRequired,
    onEndDrag: PropTypes.func.isRequired,
    moduleControls: PropTypes.arrayOf(PropTypes.func).isRequired,
    onAddModule: PropTypes.func.isRequired,
    onRemoveModule: PropTypes.func.isRequired, // eslint-disable-line

    connectDropTarget: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.getOffset = debounce(this.getOffset, RESIZE_DEBOUNCE);
    this.container = createRef();

    this.state = {
      preview: null,
      top: 0,
    };
  }

  componentDidMount() {
    this.getOffset();
    window.addEventListener('resize', this.getOffset);
  }

  componentWillUnmount() {
    this.getOffset.clear();
    window.removeEventListener('resize', this.getOffset);
  }

  getOffset = () => {
    const { top } = this.container.current.getBoundingClientRect();
    this.setState({ top });
  };

  handlePreview = type => {
    this.setState({ preview: type });
  };

  handleAdd = (...params) => {
    const { onAddModule } = this.props;
    this.setState({ preview: null });
    onAddModule(...params);
  };

  handleScroll = () => {
    const { preview } = this.state;
    if (preview) {
      this.setState({ preview: null });
    }
  };

  render() {
    const {
      totalModules,
      onEndDrag,
      moduleControls,
      connectDropTarget,
    } = this.props;

    const { preview, top } = this.state;

    return (
      <div className={styles.container} ref={this.container}>
        <div className={styles.header}>Components</div>
        {connectDropTarget(
          <div className={styles.list} onScroll={this.handleScroll}>
            {moduleControls.map(C => (
              <ModuleItem
                meta={C.module}
                key={C.module.type}
                onEndDrag={onEndDrag}
                onAdd={this.handleAdd}
                offset={top}
                isHovered={C.module.type === preview}
                onPreview={this.handlePreview}
                totalModules={totalModules}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default DropTarget(FORM_DND_ID, availableTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(AvailableModules);
