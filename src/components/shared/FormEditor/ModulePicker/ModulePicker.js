import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DropTarget } from 'react-dnd';

import { getAvailableModulesTree, searchModulesTree } from './categories';

import ClientRectContainer from '../../../common/ClientRectContainer';

import Search from './Search';
import Category from './Category';

import { availableTarget, FORM_DND_ID } from '../model/dnd';

import styles from './ModulePicker.module.styl';

// FIXME: temproary disable https://github.com/gemsorg/requester-portal/issues/81
const exclude = ['progress', 'upload'];

const isEmpty = categores => categores.every(c => !c.modules.length);

class ModulePicker extends Component {
  static propTypes = {
    className: PropTypes.string,
    onEndDrag: PropTypes.func.isRequired,
    moduleControls: PropTypes.arrayOf(PropTypes.func).isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemoveModule: PropTypes.func.isRequired, // eslint-disable-line

    connectDropTarget: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: null,
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

  handleAdd = meta => {
    const { onAdd } = this.props;
    this.setState({ preview: null });
    onAdd(meta, true);
  };

  handleScroll = () => {
    const { preview } = this.state;
    if (preview) {
      this.setState({ preview: null });
    }
  };

  render() {
    const { onEndDrag, connectDropTarget, className } = this.props;
    const { preview, categories, search } = this.state;

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <ClientRectContainer
        className={cn(styles.container, className)}
        ref={this.container}
      >
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
}))(ModulePicker);
