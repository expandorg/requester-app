import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Button } from '@expandorg/components';

import CSV from './CSV';
import API from './API';

import { draftProps } from '../../shared/propTypes';
import { Form, Actions, Description } from '../controls';

import styles from './Data.module.styl';

export default function Data({ draft, onBack, onNext }) {
  const [tab, setTab] = useState(0);
  return (
    <Form>
      <div>
        <Description>
          How would you like to supply your data? You can skip this step if you
          don’t need it.
        </Description>
        <div className={styles.tabs}>
          <button
            className={cn(styles.tab, { [styles.tabActive]: !tab })}
            type="button"
            onClick={() => setTab(0)}
          >
            CSV
          </button>
          <button
            className={cn(styles.tab, { [styles.tabActive]: tab })}
            type="button"
            onClick={() => setTab(1)}
          >
            API
          </button>
        </div>
        {tab === 0 && <CSV draft={draft} />}
        {tab === 1 && <API draft={draft} />}
      </div>
      <Actions>
        <Button theme="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Next</Button>
      </Actions>
    </Form>
  );
}

Data.propTypes = {
  draft: draftProps.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
