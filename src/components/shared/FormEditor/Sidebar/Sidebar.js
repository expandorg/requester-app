import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';

import {
  getAvailableModulesTree,
  searchModulesTree,
} from '../model/categories';

import ClientRectContainer from '../../../common/ClientRectContainer';

import Search from './Search';
import Category from './Category';

import { availableTarget, FORM_DND_ID } from '../model/dnd';

import styles from './Sidebar.module.styl';

// FIXME: temproary disable https://github.com/gemsorg/requester-portal/issues/81
const exclude = ['progress', 'upload'];

const isEmpty = categores => categores.every(c => !c.modules.length);

class Sidebar extends Component {
  static propTypes = {
    onEndDrag: PropTypes.func.isRequired,
    moduleControls: PropTypes.arrayOf(PropTypes.func).isRequired,
    onAddModule: PropTypes.func.isRequired,
    onRemoveModule: PropTypes.func.isRequired, // eslint-disable-line

    connectDropTarget: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const categories = getAvailableModulesTree(props.moduleControls, exclude);
    this.state = {
      preview: null,
      all: categories,
      categories,
    };
  }

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
    const { preview, categories, search } = this.state;

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <ClientRectContainer className={styles.container} ref={this.container}>
        {({ rect }) => (
          <>
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
                    offset={rect ? rect.top : 0}
                    preview={preview}
                    onEndDrag={onEndDrag}
                    onAdd={this.handleAdd}
                    onPreview={this.handlePreview}
                  />
                ))}
                {isEmpty(categories) && (
                  <div className={styles.empty}>No component found.</div>
                )}
              </div>
            )}
          </>
        )}
      </ClientRectContainer>
    );
  }
}

export default DropTarget(FORM_DND_ID, availableTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(Sidebar);
