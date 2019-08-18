import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog, Table as T, Button } from '@expandorg/components';
import Header from './Header';
import Row from './Row';
import JsonPreview from './JsonPreview';
import TablePreview from './TablePreview';

import styles from './SelectedRowDialog.module.styl';

export default class SelectedRowDialog extends Component {
  static propTypes = {
    response: PropTypes.shape({
      value: PropTypes.array,
    }).isRequired,
    mode: PropTypes.oneOf(['json', 'table']).isRequired,
    index: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      mode: props.mode,
    };
  }

  handleToggleMode = mode => {
    this.setState({ mode });
  };

  handleNext = evt => {
    evt.preventDefault();
    const { count, index, onNext } = this.props;
    if (index !== count - 1) {
      onNext();
    }
  };

  handleBack = evt => {
    evt.preventDefault();
    const { index, onPrev } = this.props;
    if (index !== 0) {
      onPrev();
    }
  };

  render() {
    const { onHide, response, index } = this.props;
    const { mode } = this.state;

    return (
      <Dialog
        visible
        onHide={onHide}
        modalClass={styles.modal}
        contentLabel="selected-row-dialog"
      >
        <div className={styles.content}>
          <T.Table>
            <Header mode={mode} onToggle={this.handleToggleMode} />
            <Row
              response={response}
              preview={false}
              mode={mode}
              index={index}
            />
          </T.Table>
          {mode === 'json' && (
            <JsonPreview className={styles.json} value={response.value} />
          )}
          {mode === 'table' && (
            <TablePreview className={styles.table} value={response.value} />
          )}
        </div>
        <div className={styles.actions}>
          <Button
            theme="secondary"
            className={styles.back}
            onClick={this.handleBack}
          >
            Back
          </Button>
          <Button
            theme="secondary"
            className={styles.next}
            onClick={this.handleNext}
          >
            Next
          </Button>
        </div>
      </Dialog>
    );
  }
}
