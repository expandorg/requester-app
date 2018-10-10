import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  Description,
  UploadImage,
  Field,
  Input,
  Actions,
  ActionBtn,
} from './Form';

export default class Settings extends Component {
  static propTypes = {
    onNext: PropTypes.func,
  };

  static defaultProps = {
    onNext: Function.prototype,
  };

  state = {
    settings: {
      image: null,
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    },
  };

  handleSubmit = () => {
    const { onNext } = this.props;
    onNext();
  };

  handleSelect = image => {
    this.setState(({ settings }) => ({
      settings: { ...settings, image },
    }));
  };

  handleInputChange = ({ target }) => {
    this.setState(({ settings }) => ({
      settings: { ...settings, [target.name]: target.value },
    }));
  };

  render() {
    const { settings } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Description>Description about this step goes here.</Description>
        <UploadImage
          image={settings.image}
          label="Thumbnail *"
          tooltip="Upload Image"
          onSelect={this.handleSelect}
        />
        <Field tooltip="Title">
          <Input
            placeholder="Title *"
            name="title"
            value={settings.title}
            onChange={this.handleInputChange}
          />
        </Field>
        <Field tooltip="Description">
          <Input
            placeholder="Description *"
            name="description"
            value={settings.description}
            onChange={this.handleInputChange}
          />
        </Field>
        <Field tooltip="Start Date">
          <Input
            placeholder="Start Date *"
            name="startDate"
            value={settings.startDate}
            onChange={this.handleInputChange}
          />
        </Field>
        <Field tooltip="End Date">
          <Input
            placeholder="End Date *"
            name="endDate"
            value={settings.endDate}
            onChange={this.handleInputChange}
          />
        </Field>
        <Actions>
          <ActionBtn>Next</ActionBtn>
        </Actions>
      </Form>
    );
  }
}
