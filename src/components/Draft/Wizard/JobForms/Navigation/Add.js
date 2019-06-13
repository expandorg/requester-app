import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { AddButton, ContextMenu, ContextMenuItem } from './controls';

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
      <AddButton onClick={() => setOpened(true)} />
      {opened && (
        <ContextMenu onHide={() => setOpened(false)}>
          {templates.map(t => (
            <ContextMenuItem key={t.id} onClick={getOnClick(t.id)}>
              {t.name}
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
