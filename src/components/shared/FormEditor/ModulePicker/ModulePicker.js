import React, { useRef, useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useDrop } from 'react-dnd';

import Search from './Search';
import Category from './Category';

import { getCategories, searchModules } from './categories';
import { availableTarget } from '../dnd';

import styles from './ModulePicker.module.styl';

// FIXME: temproary disable https://github.com/gemsorg/requester-portal/issues/81
const exclude = ['progress', 'upload'];

const isEmpty = categores => categores.every(c => !c.modules.length);

export default function ModulePicker({
  className,
  onRemoveModule,
  moduleControls,
  onEndDrag,
  onAdd,
}) {
  const all = useMemo(() => getCategories(moduleControls, exclude), [
    moduleControls,
  ]);

  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState(all);

  const ref = useRef(null);
  const [, drop] = useDrop(availableTarget(onRemoveModule));

  const add = useCallback(
    meta => {
      onAdd(meta, true);
    },
    [onAdd]
  );

  const searchCb = useCallback(
    q => {
      setSearch(q);
      setCategories(searchModules(all, q));
    },
    [all]
  );

  return (
    <div className={cn(styles.container, className)}>
      <Search onSearch={searchCb} />
      <div className={styles.list} id="gems-components" ref={drop(ref)}>
        {categories.map(({ category, modules }) => (
          <Category
            key={category}
            forceOpen={!!search}
            name={category}
            modules={modules}
            onEndDrag={onEndDrag}
            onAdd={add}
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
    </div>
  );
}

ModulePicker.propTypes = {
  className: PropTypes.string,
  onEndDrag: PropTypes.func.isRequired,
  moduleControls: PropTypes.arrayOf(PropTypes.func).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemoveModule: PropTypes.func.isRequired, // eslint-disable-line
};

ModulePicker.defaultProps = {
  className: null,
};
