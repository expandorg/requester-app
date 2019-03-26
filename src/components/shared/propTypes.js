// @flow
import PropTypes from 'prop-types';

import { moduleProps } from '@expandorg/modules';

export const taskStatsProps = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
});

export const formProps = PropTypes.shape({
  modules: PropTypes.arrayOf(moduleProps),
});

export const draftOnboardingStepProps = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  isGroup: PropTypes.bool,
  retries: PropTypes.number,
  scoreThreashold: PropTypes.number,
  failureMessage: PropTypes.string,
  data: PropTypes.any,
  form: formProps,
});

export const draftOnboardingProps = PropTypes.shape({
  enabled: PropTypes.bool,
  successMessage: PropTypes.string,
  failureMessage: PropTypes.string,
  steps: PropTypes.arrayOf(draftOnboardingStepProps),
});

export const draftProps = PropTypes.shape({
  id: PropTypes.string.isRequired,
  taskForm: formProps,
  verificationForm: formProps,
  onboarding: draftOnboardingProps,
});

export const dataColumnProps = PropTypes.shape({
  name: PropTypes.string,
  type: PropTypes.string,
  skipped: PropTypes.bool,
});

export const dataProps = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  draftId: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(dataColumnProps).isRequired,
  values: PropTypes.arrayOf(PropTypes.any),
  total: PropTypes.number,
});

export const taskTemplateProps = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string,
  description: PropTypes.string,
  form: formProps,
});
