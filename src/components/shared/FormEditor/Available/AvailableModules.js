import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import debounce from 'debounce';
import { DropTarget } from 'react-dnd';

import { ReactComponent as SearchIcon } from '../../../assets/search.svg';

import ModuleItem from './ModuleItem';

import { availableTarget, FORM_DND_ID } from '../dnd';

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
    this.search = createRef();

    this.state = {
      preview: null,
      searching: false,
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

  handleChangeSearch = ({ target }) => {
    this.setState({ search: target.value });
  };

  handleToggeSearch = () => {
    const { searching } = this.state;
    this.setState({ searching: !searching, search: '' }, () =>
      this.search.current.focus()
    );
  };

  render() {
    const { onEndDrag, moduleControls, connectDropTarget } = this.props;
    const { preview, searching, search, top } = this.state;

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */

    return (
      <div className={styles.container} ref={this.container}>
        <div className={cn(styles.header, { [styles.searching]: searching })}>
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
        </div>
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
