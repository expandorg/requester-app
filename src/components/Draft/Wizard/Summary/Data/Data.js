import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Table from './Table';

import { draftProps } from '../../../../shared/propTypes';
import { fetch } from '../../../../../sagas/dataSagas';

import { hasData } from '../../../wizard';

import styles from './Data.module.styl';

const mapDispatchToProps = dispatch => bindActionCreators({ fetch }, dispatch);

class Data extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    fetch: PropTypes.func.isRequired,
  };

  state = {
    page: 0,
  };

  componentDidMount() {
    const { draft } = this.props;
    const { page } = this.state;

    if (draft.dataId) {
      this.props.fetch(draft.id, draft.dataId, page);
    }
  }

  handleChangePage = page => {
    const { draft } = this.props;
    this.setState({ page });
    this.props.fetch(draft.id, draft.dataId, page);
  };

  render() {
    const { draft } = this.props;
    const { page } = this.state;

    const data = hasData(draft);
    return (
      <div className={styles.container}>
        {data && (
          <Table
            draft={draft}
            page={page}
            onChangePage={this.handleChangePage}
          />
        )}
        {!data && <div className={styles.emptyData}>No data uploaded.</div>}
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Data);
