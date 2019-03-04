import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import debounce from 'debounce';
import { DropTarget } from 'react-dnd';

import {
  getAvailableModulesTree,
  searchModulesTree,
} from '../model/modulesTree';

import Search from './Search';
import Category from './Category';

import { availableTarget, FORM_DND_ID } from '../model/dnd';

import styles from './AvailableModules.module.styl';

const RESIZE_DEBOUNCE = 200;

class AvailableModules extends Component {
  static propTypes = {
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

    const categories = getAvailableModulesTree(props.moduleControls);
    this.state = {
      preview: null,
      all: categories,
      categories,
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

  handleSearch = search => {
    const { all } = this.state;
    const categories = searchModulesTree(all, search);
    this.setState({ categories, search });
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
    const { onEndDrag, connectDropTarget } = this.props;
    const { preview, categories, top, search } = this.state;

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div className={styles.container} ref={this.container}>
        <Search onSearch={this.handleSearch} />
        {connectDropTarget(
          <div
            className={styles.list}
            onScroll={this.handleScroll}
            id="gems-components"
          >
            {categories.map(({ category, modules }) => (
              <Category
                key={category}
                forceOpen={!!search}
                name={category}
                modules={modules}
                offset={top}
                preview={preview}
                onEndDrag={onEndDrag}
                onAdd={this.handleAdd}
                onPreview={this.handlePreview}
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
