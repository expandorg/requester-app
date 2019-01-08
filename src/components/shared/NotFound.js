import React from 'react';

import { Link } from 'react-router-dom';

import { Panel } from '@expandorg/components';

const NotFound = () => (
  <Panel>
    <Link to="/">Dashboard</Link>
  </Panel>
);

export default NotFound;
