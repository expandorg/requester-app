import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../common/Button';

import UploadForm from './UploadForm';
import DataEditor from './DataEditor/DataEditor';

import { Form, Actions } from '../Form';

export default class UploadData extends Component {
  static propTypes = {
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  state = {
    data: {},
  };

  handleSubmit = () => {
    const { onNext } = this.props;
    onNext();
  };

  handleUpload = data => {
    this.setState({ data });
  };

  handleDelete = () => {
    this.setState({ data: null });
  };

  handleBack = evt => {
    const { onBack } = this.props;
    onBack();

    evt.preventDefault();
  };

  render() {
    const { data } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        {!data && <UploadForm onUpload={this.handleUpload} />}
        {data && <DataEditor data={data} onDelete={this.handleDelete} />}
        <Actions>
          <Button onClick={this.handleBack}>Back</Button>
          <Button>Next</Button>
        </Actions>
      </Form>
    );
  }
}
