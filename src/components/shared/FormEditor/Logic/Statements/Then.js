import React from 'react';
import PropTypes from 'prop-types';

import { Row, Text, Dropdown } from './components';

export default function Then({ name, actions, action, onChange }) {
  return (
    <Row>
      <Text>then </Text>
      <Dropdown value={action} options={actions} onChange={onChange} />
      <Text bold>{name}</Text>
    </Row>
  );
}

Then.propTypes = {
  name: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.string),
  action: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Then.defaultProps = {
  actions: [],
  action: '',
};
