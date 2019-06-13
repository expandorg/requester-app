import React from 'react';

import { Topbar } from '../../../../shared/FormEditor/Layout';
import { draftProps } from '../../../../shared/propTypes';

import Add from './Add';

import { Navs, NavItem } from './controls';

const onb = ['Welcome', 'Instructions', 'NDA', 'Quiz', 'Task'];

export default function Navigation({ draft }) {
  console.log(draft);

  return (
    <Topbar>
      <Add />
      <Navs>
        {onb.map(s => (
          <NavItem key={s}>{s}</NavItem>
        ))}
        <NavItem selected>Task</NavItem>
        <NavItem>Verification</NavItem>
      </Navs>
    </Topbar>
  );
}

Navigation.propTypes = {
  draft: draftProps.isRequired,
};
