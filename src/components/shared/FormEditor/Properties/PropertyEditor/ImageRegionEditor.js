import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import { withInputValueContext } from '../../Canvas';

import styles from './styles.module.styl';

class ImageRegionEditor extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    moduleValues: PropTypes.shape({}),
    isValueEditable: PropTypes.bool.isRequired,
    // onChange: PropTypes.func.isRequired,
    onStartInput: PropTypes.func.isRequired,
    // onEndInput: PropTypes.func.isRequired,
  };

  static defaultProps = {
    moduleValues: null,
  };

  static withModuleValues = true;

  render() {
    const { title, isValueEditable, onStartInput } = this.props;

    return (
      <div>
        {isValueEditable && (
          <div className={styles.warning}>
            Drag a square onto the image directly.
          </div>
        )}
        <Button className={styles.button} onClick={onStartInput}>
          {title}
        </Button>
      </div>
    );
  }
}

export default withInputValueContext(ImageRegionEditor);
