import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import debounce from 'debounce';
import { DropTarget } from 'react-dnd';
import { ReactComponent as SearchIcon } from '@expandorg/uikit/assets/search.svg';
import { ReactComponent as X } from '@expandorg/uikit/assets/x.svg';
import {
  getAvailableModulesTree,
  searchModulesTree,
} from '../model/modulesTree';

import Category from './Category';

import { availableTarget, FORM_DND_ID } from '../model/dnd';

import styles from './AvailableModules.module.styl';

const RESIZE_DEBOUNCE = 200;
const INPUT_DEBOUNCE = 400;

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
    this.searchModule = debounce(this.searchModule, INPUT_DEBOUNCE);

    this.container = createRef();
    this.search = createRef();

    const categories = getAvailableModulesTree(props.moduleControls);
    this.state = {
      preview: null,
      searching: false,
      all: categories,
      categories,
      search: '',
      top: 0,
    };
  }

  componentDidMount() {
    this.getOffset();
    window.addEventListener('resize', this.getOffset);
  }

  componentWillUnmount() {
    this.getOffset.clear();
    this.searchModule.clear();
    window.removeEventListener('resize', this.getOffset);
  }

  getOffset = () => {
    const { top } = this.container.current.getBoundingClientRect();
    this.setState({ top });
  };

  searchModule = () => {
    const { search, all } = this.state;
    const categories = searchModulesTree(all, search);
    this.setState({ categories });
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

  handleChangeSearch = ({ target }) => {
    this.setState({ search: target.value }, this.searchModule);
  };

  handleToggeSearch = () => {
    const { searching } = this.state;
    this.setState({ searching: !searching, search: '' }, () => {
      this.search.current.focus();
    });
  };

  handleClearSearch = evt => {
    evt.preventDefault();

    this.setState({ search: '' }, () => {
      this.search.current.focus();
      this.searchModule();
    });
  };

  render() {
    const { onEndDrag, connectDropTarget } = this.props;
    const { preview, categories, searching, search, top } = this.state;

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    const forceOpen = !!search;
    return (
      <div className={styles.container} ref={this.container}>
        <div
          className={cn(styles.header, { [styles.searching]: searching })}
          id="gems-search"
        >
          <div className={styles.title} onClick={this.handleToggeSearch}>
            Components
          </div>
          <SearchIcon
            className={styles.searchIcon}
            onClick={this.handleToggeSearch}
          />
          <input
            placeholder="Search..."
            value={search}
            onChange={this.handleChangeSearch}
            ref={this.search}
            className={styles.search}
          />
          {searching && search && (
            <button className={styles.clear} onClick={this.handleClearSearch}>
              <X />
            </button>
          )}
        </div>

        {connectDropTarget(
          <div
            className={styles.list}
            onScroll={this.handleScroll}
            id="gems-components"
          >
            {categories.map(({ category, modules }) => (
              <Category
                key={category}
                forceOpen={forceOpen}
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
