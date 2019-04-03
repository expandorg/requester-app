import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Description } from '../../Form';
import Table from './Table';
import DeleteDialog from './DeleteDialog';

import { draftProps } from '../../../../shared/propTypes';
import { fetch } from '../../../../../sagas/dataSagas';

import styles from './DataEditor.module.styl';

const mapDispatchToProps = dispatch => bindActionCreators({ fetch }, dispatch);

class DataEditor extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    fetch: PropTypes.func.isRequired,
  };

  state = {
    page: 0,
    dialog: false,
  };

  componentDidMount() {
    const { draft } = this.props;
    const { page } = this.state;

    this.props.fetch(draft.id, draft.dataId, page);
  }

  handleChangePage = page => {
    const { draft } = this.props;

    this.setState({ page });
    this.props.fetch(draft.id, draft.dataId, page);
  };

  handleToggle = evt => {
    if (evt) {
      evt.preventDefault();
    }
    this.setState(({ dialog }) => ({ dialog: !dialog }));
  };

  render() {
    const { draft } = this.props;
    const { page, dialog } = this.state;

    return (
      <div className={styles.container}>
        <Description>
          Edit your column names so that you can recognize them later when
          assigning the data inputs in your task. Skip the ones you won’t use.
        </Description>
        <Table
          draft={draft}
          page={page}
          onDelete={this.handleToggle}
          onChangePage={this.handleChangePage}
        />
        {dialog && <DeleteDialog draft={draft} onHide={this.handleToggle} />}
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DataEditor);
