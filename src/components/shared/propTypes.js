// @flow
import PropTypes from 'prop-types';

import { moduleProps } from '@gemsorg/modules';

export const notificationProps = PropTypes.shape({
  type: PropTypes.oneOf(['warning', 'message', 'success']).isRequired,
  message: PropTypes.string,
});

export const taskStatsProps = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
});

export const formProps = PropTypes.shape({
  modules: PropTypes.arrayOf(moduleProps),
});

export const draftTaskProps = PropTypes.shape({
  name: PropTypes.string,
  form: formProps,
});

export const draftOnboardingProps = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  steps: PropTypes.arrayOf(formProps),
});

export const draftProps = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  task: draftTaskProps,
  onboarding: draftOnboardingProps,
});

export const dataColumnProps = PropTypes.shape({
  name: PropTypes.string,
  type: PropTypes.string,
  skipped: PropTypes.bool,
});

export const dataProps = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  draftId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  columns: PropTypes.arrayOf(dataColumnProps).isRequired,
  values: PropTypes.arrayOf(PropTypes.any),
  total: PropTypes.number,
});

export const taskTemplateProps = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string,
  description: PropTypes.string,
  form: formProps,
});
