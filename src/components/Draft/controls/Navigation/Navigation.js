import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

export default function Navigation({ children, active, onChange }) {
  return (
    <>
      {Children.map(children, (item, index) =>
        cloneElement(item, {
          active: active === index,
          onClick: () => onChange(index),
        })
      )}
    </>
  );
}

Navigation.propTypes = {
  active: PropTypes.number,
  onChange: PropTypes.func,
};

Navigation.defaultProps = {
  active: null,
  onChange: Function.prototype,
};
