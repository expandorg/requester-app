import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Preview.module.styl';

export default class Preview extends Component {
  static propTypes = {
    template: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      logo: PropTypes.string,
      description: PropTypes.string,
    }),
  };

  static defaultProps = {
    template: null,
  };

  render() {
    const { template } = this.props;
    if (!template) {
      return null;
    }

    return (
      <div className={styles.container}>
        <div className={styles.title}>{template.name}</div>
        <div className={styles.logo}>
          <img className={styles.img} src={template.logo} alt={template.name} />
        </div>
        <div className={styles.description}>{template.description}</div>
      </div>
    );
  }
}
