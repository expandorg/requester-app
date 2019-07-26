import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DropTarget } from 'react-dnd';

import { getCategories, searchModules } from './categories';

import Search from './Search';
import Category from './Category';

import { availableTarget, FORM_DND_ID } from '../dnd';

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

    const categories = getCategories(props.moduleControls, exclude);
    this.state = {
      all: categories,
      categories,
    };
  }

  handleSearch = search => {
    const { all } = this.state;
    const categories = searchModules(all, search);
    this.setState({ categories, search });
  };

  handleAdd = meta => {
    const { onAdd } = this.props;
    onAdd(meta, true);
  };

  render() {
    const { onEndDrag, connectDropTarget, className } = this.props;
    const { categories, search } = this.state;

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div className={cn(styles.container, className)}>
        <Search onSearch={this.handleSearch} />
        {connectDropTarget(
          <div className={styles.list} id="gems-components">
            {categories.map(({ category, modules }) => (
              <Category
                key={category}
                forceOpen={!!search}
                name={category}
                modules={modules}
                onEndDrag={onEndDrag}
                onAdd={this.handleAdd}
              />
            ))}
            {isEmpty(categories) && (
              <div className={styles.empty}>
                No components have been found.
                <br />
                Try again maybe?
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default DropTarget(FORM_DND_ID, availableTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(ModulePicker);
