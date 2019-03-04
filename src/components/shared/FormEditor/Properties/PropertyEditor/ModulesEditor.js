import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ModulesEditor.module.styl';

export default class ModulesEditor extends Component {
  static propTypes = {
    caption: PropTypes.string.isRequired,
    value: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    value: [],
  };

  render() {
    const { caption, value } = this.props;
    // eslint-disable-next-line no-constant-condition
    if (true) {
      return null;
    }

    return (
      <div className={styles.container}>
        <div className={styles.title}>Modules</div>
        {(!value || !value.length) && (
          <div className={styles.empty}>{caption}</div>
        )}
        {value && (
          <div className={styles.modules}>
            {value.map(v => (
              <div key={v.name}>{v.name}</div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
