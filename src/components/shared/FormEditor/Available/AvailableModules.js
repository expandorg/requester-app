import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import debounce from 'debounce';

import { moduleControls } from '@gemsorg/modules';

import ModuleItem from './ModuleItem';

import styles from './AvailableModules.module.styl';

const RESIZE_DEBOUNCE = 200;

const modulesMeta = moduleControls
  .map(c => c.module)
  .filter(m => typeof m.type === 'string');

export default class AvailableModules extends Component {
  static propTypes = {
    totalModules: PropTypes.number.isRequired,
    onEndDrag: PropTypes.func.isRequired,
    onAddModule: PropTypes.func.isRequired,
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
    const { totalModules, onEndDrag } = this.props;
    const { preview, top } = this.state;
    return (
      <div className={styles.container} ref={this.container}>
        <div className={styles.list} onScroll={this.handleScroll}>
          {modulesMeta.map(meta => (
            <ModuleItem
              meta={meta}
              key={meta.type}
              onEndDrag={onEndDrag}
              onAdd={this.handleAdd}
              offset={top}
              isHovered={meta.type === preview}
              onPreview={this.handlePreview}
              totalModules={totalModules}
            />
          ))}
        </div>
      </div>
    );
  }
}
