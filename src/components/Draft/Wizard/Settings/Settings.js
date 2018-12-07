import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { validateForm } from '@gemsorg/validation';

import Input from '../../../common/Input';
import Button from '../../../common/Button';
import Select from '../../../common/Select';

import DateTimeInput from '../../../common/DateTime/DateTimeInput';
import { Upload, ImagePreview } from '../../../common/Upload';

import { draftProps } from '../../../shared/propTypes';

import { Form, Description, Field, Fieldset, Actions } from '../Form';

import { ReactComponent as Placeholder } from '../../../assets/data.svg';

import { settingsRules } from '../../../../model/draft';
import { EndType } from '../../../../model/enums';
import { EndWhenTitles } from '../../../../model/i18n';

import styles from './Settings.module.styl';

const options = [
  { value: EndType.ExceedTasks, label: EndWhenTitles[EndType.ExceedTasks] },
  { value: EndType.ResultCount, label: EndWhenTitles[EndType.ResultCount] },
  { value: EndType.Date, label: EndWhenTitles[EndType.Date] },
];

const getInitialState = draft => ({
  logoUrl: (draft && draft.logoUrl) || undefined,
  title: (draft && draft.title) || '',
  description: (draft && draft.description) || '',
  endWhen: (draft && draft.endWhen) || EndType.ExceedTasks,
  endDate: (draft && draft.endDate) || undefined,
});

export default class Settings extends Component {
  static propTypes = {
    draft: draftProps,
    isSubmitting: PropTypes.bool.isRequired,
    onNext: PropTypes.func.isRequired,
  };

  static defaultProps = {
    draft: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      draft: props.draft, // eslint-disable-line react/no-unused-state
      logo: null,
      errors: null,
      settings: getInitialState(props.draft),
    };
  }

  static getDerivedStateFromProps({ draft }, state) {
    if (draft !== state.draft) {
      return {
        draft,
        logo: null,
        errors: null,
        settings: getInitialState(draft),
      };
    }
    return null;
  }

  handleSubmit = () => {
    const { onNext, isSubmitting } = this.props;
    if (!isSubmitting) {
      const { settings, logo } = this.state;
      const data = { ...settings, logo };
      const errors = validateForm(data, settingsRules);
      if (errors) {
        this.setState({ errors });
      } else {
        onNext(data);
      }
    }
  };

  handleUpload = logo => {
    this.setState({
      logo,
    });
  };

  handleInputChange = ({ target }) => {
    this.setState(({ settings }) => ({
      settings: { ...settings, [target.name]: target.value },
    }));
  };

  render() {
    const { settings, logo, errors, isSubmitting } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Fieldset>
          <Description>Description about this step goes here.</Description>
          <Upload
            file={logo}
            label="Thumbnail *"
            tooltip="Upload Image"
            onSelect={this.handleUpload}
          >
            {({ file }) =>
              file || settings.logoUrl ? (
                <ImagePreview uploadedUrl={settings.logoUrl} file={file} />
              ) : (
                <div className={styles.placeholder}>
                  <Placeholder
                    viewBox="0 0 80 56"
                    width={45}
                    height={36}
                    className={styles.hint}
                  />
                  <div className={styles.or}>Drag a file or</div>
                  <div className={styles.browse}>Browse</div>
                </div>
              )
            }
          </Upload>
          <Field tooltip="Title" name="title" errors={errors}>
            <Input
              placeholder="Title *"
              name="title"
              error={!!(errors && errors.title)}
              value={settings.title}
              onChange={this.handleInputChange}
            />
          </Field>
          <Field tooltip="Description" name="description" errors={errors}>
            <Input
              placeholder="Description *"
              name="description"
              error={!!(errors && errors.description)}
              value={settings.description}
              onChange={this.handleInputChange}
            />
          </Field>
          <div className={styles.end}>
            <Select
              value={settings.endWhen}
              label="End Task When *"
              options={options}
              onChange={when =>
                this.handleInputChange({
                  target: { value: when, name: 'endWhen' },
                })
              }
            />
            {settings.endWhen === EndType.Date && (
              <DateTimeInput
                placeholder="End Date"
                name="endDate"
                error={!!(errors && errors.endDate)}
                value={settings.endDate}
                onChange={this.handleInputChange}
              />
            )}
            {settings.endWhen === EndType.ResultCount && (
              <Input
                placeholder="Count"
                name="endResultCount"
                error={!!(errors && errors.endResultCount)}
                value={settings.endResultCount}
                onChange={this.handleInputChange}
              />
            )}
          </div>
        </Fieldset>
        <Actions>
          <Button disable={isSubmitting} type="submit">
            Next
          </Button>
        </Actions>
      </Form>
    );
  }
}
