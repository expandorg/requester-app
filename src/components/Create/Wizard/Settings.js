import React, { Component } from 'react';

import { Form, Description, UploadImage } from './Form';

export default class Settings extends Component {
  state = {
    settings: {
      image: null,
    },
  };

  handleSubmit = () => {};

  handleSelect = image => {
    this.setState(({ settings }) => ({
      settings: { ...settings, image },
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
          onSelect={this.handleSelect}
        />
      </Form>
    );
  }
}
