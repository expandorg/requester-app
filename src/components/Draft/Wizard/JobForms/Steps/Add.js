import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { ContextMenu, ContextMenuItem } from './controls';

import { formTemplatesSelector } from '../../../../../selectors/formTemplatesSelectors';
import { fetchFormTemplates } from '../../../../../sagas/formTemplateSagas';

import styles from './Add.module.styl';

export default function Add({ onAddTemplate }) {
  const dispatch = useDispatch();

  const templates = useSelector(formTemplatesSelector);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    dispatch(fetchFormTemplates());
  }, [dispatch]);

  const getOnClick = id => () => {
    onAddTemplate(id);
    setOpened(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.add} onClick={() => setOpened(true)}>
        +
      </button>
      {opened && (
        <ContextMenu onHide={() => setOpened(false)}>
          {templates.map(template => (
            <ContextMenuItem key={template.id} onClick={getOnClick(template)}>
              {template.name}
            </ContextMenuItem>
          ))}
        </ContextMenu>
      )}
    </div>
  );
}

Add.propTypes = {
  onAddTemplate: PropTypes.func.isRequired,
};
