import React, { Component } from 'react';

import { draftProps } from '../../shared/propTypes';

import { SummaryField } from '../controls';

import styles from './TemplateSettings.module.styl';

export default class TemplateSettings extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
  };

  render() {
    const { draft } = this.props;
    return (
      <div className={styles.container}>
        <SummaryField
          title="Staking"
          value={!!draft.funding.requirement}
          type="bool"
        />
        {draft.funding && (
          <SummaryField
            title="How much to stake?"
            value={draft.funding.requirement}
          />
        )}
        {/* <SummaryField
          title="Deduct stake if fail?"
          value={draft.deduct}
          type="bool"
        /> */}
        {draft.callbackUrl && (
          <SummaryField title="Callback Url" value={draft.callbackUrl} />
        )}
      </div>
    );
  }
}
