import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  Description,
  Field,
  Input,
  DateInput,
  Fieldset,
  Actions,
  ActionBtn,
} from './Form';

import { Upload, ImagePreview } from './Form/Upload';

import { ReactComponent as Placeholder } from '../../assets/preview.svg';

import styles from './Settings.module.styl';

export default class Settings extends Component {
  static propTypes = {
    onNext: PropTypes.func.isRequired,
  };

  state = {
    settings: {
      image: null,
      title: '',
      description: '',
      startDate: undefined,
      endDate: undefined,
    },
  };

  handleSubmit = () => {
    const { onNext } = this.props;
    onNext();
  };

  handleUpload = image => {
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
        <Fieldset>
          <Description>Description about this step goes here.</Description>
          <Upload
            file={settings.image}
            label="Thumbnail *"
            tooltip="Upload Image"
            onSelect={this.handleUpload}
          >
            {({ file }) =>
              file ? (
                <ImagePreview file={file} />
              ) : (
                <Placeholder className={styles.hint} />
              )
            }
          </Upload>
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
            <DateInput
              placeholder="Start Date *"
              name="startDate"
              value={settings.startDate}
              onChange={this.handleInputChange}
            />
          </Field>
          <Field tooltip="End Date">
            <DateInput
              placeholder="End Date *"
              name="endDate"
              value={settings.endDate}
              onChange={this.handleInputChange}
            />
          </Field>
        </Fieldset>
        <Actions>
          <ActionBtn>Next</ActionBtn>
        </Actions>
      </Form>
    );
  }
}
