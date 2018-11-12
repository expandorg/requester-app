import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Dialog } from '@gemsorg/components';
import { RequestStates, requestStateProps } from '@gemsorg/app-utils';
import Button from '../../../../common/Button';

import { ReactComponent as Warning } from '../../../../assets/warning.svg';

import { draftProps } from '../../../../shared/propTypes';

import { removeData } from '../../../../../sagas/dataSagas';
import { removeDataStateSelector } from '../../../../../selectors/uiStateSelectors';

import styles from './DeleteDialog.module.styl';

const mapStateToProps = state => ({
  removeState: removeDataStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeData }, dispatch);

class DeleteDialog extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    onHide: PropTypes.func.isRequired,

    removeState: requestStateProps.isRequired,
    removeData: PropTypes.func.isRequired,
  };

  handleDelete = evt => {
    const { draft, removeState } = this.props;
    if (removeState.state !== RequestStates.Fetching) {
      this.props.removeData(draft.id);
    }

    evt.preventDefault();
  };

  handleHide = evt => {
    const { onHide, removeState } = this.props;
    if (removeState.state !== RequestStates.Fetching) {
      onHide(evt);
    }
  };

  render() {
    return (
      <Dialog
        visible
        onHide={this.handleHide}
        overlayClass={styles.overlay}
        modalClass={styles.modal}
        contentLabel="delete-confirm-dialog"
      >
        <div className={styles.container}>
          <div className={styles.icon}>
            <Warning width={64} height={64} viewBox="0 0 42 42" />
          </div>
          <div className={styles.title}>You are about to remove your data.</div>
          <div className={styles.confirmation}>
            Are you sure you want to continue?
          </div>
          <div className={styles.actions}>
            <Button className={styles.button} onClick={this.handleDelete}>
              Yes, continue
            </Button>
            <Button
              className={styles.button}
              theme="grey"
              onClick={this.handleHide}
            >
              No, go back
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteDialog);
