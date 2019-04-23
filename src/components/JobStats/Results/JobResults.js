import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { requestStateProps, RequestStates } from '@expandorg/app-utils';
import { Table as T } from '@expandorg/components';

import { makeJobResponsesDataSelector } from '../../../selectors/jobResponsesSelectors';
import { fetchJobResponsesStateSelector } from '../../../selectors/uiStateSelectors';

import { LoadIndicator } from '../../Draft/Wizard/Form';
import { Pagination } from '../../shared/DataTable';
import Header from './Header';
import Row from './Row';
import SelectedRowDialog from './SelectedRowDialog';

import styles from './JobResults.module.styl';

const makeMapStateToProps = () => {
  const responsesSelector = makeJobResponsesDataSelector();
  return (state, props) => ({
    responses: responsesSelector(state, props.id, props.page),
    fetchState: fetchJobResponsesStateSelector(state),
  });
};

class JobResults extends Component {
  static propTypes = {
    responses: PropTypes.arrayOf(PropTypes.shape({})),
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    fetchState: requestStateProps.isRequired,
    onChangePage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    responses: null,
  };

  state = {
    selected: null,
  };

  handleSelectValue = (index, mode) => {
    this.setState({ selected: { index, mode } });
  };

  onHide = () => {
    this.setState({ selected: null });
  };

  handleNext = () => {
    this.setState(({ selected }) => ({
      selected: { ...selected, index: selected.index + 1 },
    }));
  };

  handlePrev = () => {
    this.setState(({ selected }) => ({
      selected: { ...selected, index: selected.index - 1 },
    }));
  };

  render() {
    const { fetchState, responses, page, total, onChangePage } = this.props;
    const { selected } = this.state;

    const isFetching = fetchState.state === RequestStates.Fetching;
    return (
      <div className={styles.container}>
        <div className={styles.header}>Task Results</div>
        <LoadIndicator isLoading={!responses && isFetching}>
          {responses && (
            <T.Table>
              <Header />
              {responses.map((resp, i) => (
                <Row
                  key={resp.id}
                  response={resp}
                  index={i}
                  onSelectValue={this.handleSelectValue}
                />
              ))}
            </T.Table>
          )}
        </LoadIndicator>
        <Pagination
          className={styles.paging}
          current={page}
          total={total}
          onChange={onChangePage}
        />
        {selected && (
          <SelectedRowDialog
            row={responses[selected.index]}
            index={selected.index}
            mode={selected.mode}
            count={responses.length}
            onHide={this.handleHide}
            onNext={this.handleNext}
            onPrev={this.handlePrev}
          />
        )}
      </div>
    );
  }
}

export default connect(makeMapStateToProps)(JobResults);
