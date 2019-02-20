import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { validateForm } from '@expandorg/validation';

import { Input, Button } from '@expandorg/components';

// import DateTimeInput from '../../../common/DateTime/DateTimeInput';
import UploadLogo from './UploadLogo';
import { draftProps } from '../../../shared/propTypes';

import { Form, Description, Field, Fieldset, Actions } from '../Form';

import { settingsRules } from '../../../../model/draft';
import { EndType } from '../../../../model/enums';
// import { EndWhenTitles } from '../../../../model/i18n';

// const options = [
//   { value: EndType.ExceedTasks, label: EndWhenTitles[EndType.ExceedTasks] },
//   { value: EndType.ResultCount, label: EndWhenTitles[EndType.ResultCount] },
//   { value: EndType.Date, label: EndWhenTitles[EndType.Date] },
// ];

const getInitialState = draft => ({
  logo: (draft && draft.logo) || undefined,
  name: (draft && draft.name) || '',
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
    this.nameInput = createRef();
    this.state = {
      draft: props.draft, // eslint-disable-line react/no-unused-state
      errors: null,
      settings: getInitialState(props.draft),
    };
  }

  static getDerivedStateFromProps({ draft }, state) {
    if (draft !== state.draft) {
      return {
        draft,
        errors: null,
        settings: getInitialState(draft),
      };
    }
    return null;
  }

  componentDidMount() {
    this.nameInput.current.focus();
  }

  handleSubmit = () => {
    const { onNext, isSubmitting } = this.props;
    if (!isSubmitting) {
      const { settings } = this.state;
      const errors = validateForm(settings, settingsRules);
      if (errors) {
        this.setState({ errors });
      } else {
        onNext(settings);
      }
    }
  };

  handleChangeLogo = logo => {
    this.setState(({ settings }) => ({
      settings: { ...settings, logo },
    }));
  };

  handleInputChange = ({ target }) => {
    this.setState(({ settings }) => ({
      settings: { ...settings, [target.name]: target.value },
    }));
  };

  render() {
    const { settings, errors, isSubmitting } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Fieldset>
          <Description>
            Helpful Hint: name your project in a way that helps workers
            understand the task at first glance.
          </Description>
          <UploadLogo
            logo={settings.logo}
            onChangeLogo={this.handleChangeLogo}
          />
          <Field
            tooltip={
              <span>
                Choose a title which helps the
                <br /> workers understand the task
              </span>
            }
            name="name"
            errors={errors}
          >
            <Input
              ref={this.nameInput}
              placeholder="Title *"
              name="name"
              error={!!(errors && errors.name)}
              value={settings.name}
              onChange={this.handleInputChange}
            />
          </Field>
          <Field
            tooltip={
              <span>
                Make sure to include info which will support the worker in
                <br />
                determining if she/he is the right person for the task
              </span>
            }
            name="description"
            errors={errors}
          >
            <Input
              placeholder="Description *"
              name="description"
              error={!!(errors && errors.description)}
              value={settings.description}
              onChange={this.handleInputChange}
            />
          </Field>
          {/* <div className={styles.end}>
            <Dropdown
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
                disabledDays={{
                  before: new Date(),
                }}
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
          </div> */}
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
