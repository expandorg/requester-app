import React, { Component } from 'react';
import PropTypes from 'prop-types';

import immer from 'immer';
import { removeAtIndex, replaceAtIndex, range } from '@expandorg/utils';

import { Button } from '@expandorg/components';

import {
  ScrollContainer,
  Table,
  Header,
  HeaderCell,
  Row,
  Cell,
} from '../../../../../../common/Table';

import { Description } from '../../../../Form';

import Variable from './Variable';
import ValuesRow from './ValuesRow';

import { draftOnboardingStepProps } from '../../../../../../shared/propTypes';

import Nav from '../Nav';
import { WizardSteps } from '../wizard';

import styles from '../styles.module.styl';
import tstyles from './Data.module.styl';

export default class OnboardingGroupData extends Component {
  static propTypes = {
    group: draftOnboardingStepProps.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onChangeStep: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      original: props.group, // eslint-disable-line react/no-unused-state
      data: props.group.data,
      isDirty: false,
    };
  }

  static getDerivedStateFromProps({ group }, state) {
    if (state.original !== group) {
      return {
        original: group,
        data: group.data,
        isDirty: false,
      };
    }
    return null;
  }

  handleDeleteRow = index => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        values: removeAtIndex(data.values, index),
      },
      isDirty: true,
    });
  };

  handleAddRow = () => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        values: [...data.values, range(data.columns.length).map(() => '')],
      },
      isDirty: true,
    });
  };

  handleChangeVar = (index, value) => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        columns: replaceAtIndex(data.columns, index, value),
      },
      isDirty: true,
    });
  };

  handleChangeValue = (row, col, value) => {
    const { data } = this.state;

    this.setState({
      data: immer(data, draft => {
        draft.values[row][col] = value;
      }),
      isDirty: true,
    });
  };

  handleSave = () => {
    const { onChangeStep, onUpdate } = this.props;
    const { isDirty, data } = this.state;
    if (isDirty) {
      onUpdate(data);
    }
    onChangeStep(WizardSteps.Quiz);
  };

  render() {
    const { onChangeStep } = this.props;
    const { data } = this.state;

    /* eslint-disable react/no-array-index-key */

    return (
      <div className={styles.container}>
        <Nav
          title="Quiz Module"
          onChangeStep={onChangeStep}
          active={WizardSteps.Data}
        />
        <div className={styles.content}>
          <Description>Description about this step goes here.</Description>
          <ScrollContainer className={styles.table}>
            <Table>
              <Header>
                {data.columns.map((column, index) => (
                  <Variable
                    key={index}
                    index={index}
                    column={column}
                    onChange={this.handleChangeVar}
                  />
                ))}
                <HeaderCell>Delete</HeaderCell>
              </Header>

              {data.values.map((row, index) => (
                <ValuesRow
                  key={index}
                  index={index}
                  row={row}
                  onChange={this.handleChangeValue}
                  onDelete={this.handleDeleteRow}
                />
              ))}
              <Row>
                <Cell
                  className={tstyles.spacer}
                  colSpan={data.columns.length}
                />
                <Cell className={tstyles.cellAdd}>
                  <button className={tstyles.add} onClick={this.handleAddRow}>
                    +
                  </button>
                </Cell>
              </Row>
            </Table>
          </ScrollContainer>
        </div>
        <div className={styles.actions}>
          <Button theme="secondary" onClick={() => onChangeStep(null)}>
            Back
          </Button>
          <Button onClick={this.handleSave}>Next</Button>
        </div>
      </div>
    );
  }
}
