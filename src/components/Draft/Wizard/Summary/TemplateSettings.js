import React, { Component } from 'react';

import { draftProps } from '../../../shared/propTypes';

import { SummaryField } from '../Form';

import styles from './TemplateSettings.module.styl';

export default class TemplateSettings extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
  };

  render() {
    const { draft } = this.props;
    return (
      <div className={styles.container}>
        <SummaryField title="Staking" value={draft.staking} type="bool" />
        {draft.staking && (
          <SummaryField title="How much to stake?" value={draft.stake} />
        )}
        <SummaryField
          title="Deduct stake if fail?"
          value={draft.deduct}
          type="bool"
        />
        {draft.callbackUrl && (
          <SummaryField title="Callback Url" value={draft.callbackUrl} />
        )}
        {draft.onboarding && (
          <>
            <SummaryField
              title="Onboarding Success Message"
              value={draft.onboarding.successMessage}
            />
            <SummaryField
              title="Onboarding Failure Message"
              value={draft.onboarding.failureMessage}
            />
          </>
        )}
      </div>
    );
  }
}
