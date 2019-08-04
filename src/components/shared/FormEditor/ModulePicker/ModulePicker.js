import React, { useCallback, useState, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Search from './Search';
import Category from './Category';
import DropArea from './DropArea';

import { EditorContext } from '../EditorContext';
import { getCategories, searchModules } from './categories';

import styles from './ModulePicker.module.styl';

// FIXME: temproary disable https://github.com/gemsorg/requester-portal/issues/81
const exclude = ['progress', 'upload'];

const isEmpty = categores => categores.every(c => !c.modules.length);

export default function ModulePicker({ className, moduleControls }) {
  const { onAdd, onEndDrag } = useContext(EditorContext);

  const all = useMemo(() => getCategories(moduleControls, exclude), [
    moduleControls,
  ]);

  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState(all);

  const add = useCallback(meta => onAdd(meta, true), [onAdd]);

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
      <DropArea className={styles.list}>
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
      </DropArea>
    </div>
  );
}

ModulePicker.propTypes = {
  className: PropTypes.string,
  moduleControls: PropTypes.arrayOf(PropTypes.func).isRequired,
};

ModulePicker.defaultProps = {
  className: null,
};
