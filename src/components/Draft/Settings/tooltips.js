import React from 'react';

export const NameTooltip = () => (
  <span>
    Workers will see your title when deciding to chose a task. The title should
    be accurate, succinct, and easy to understand.
  </span>
);

export const StakingTooltip = () => (
  <span>
    Staking requires workers to lock up a certain amount of their XPN tokens
    before being assigned to a task. Staking is an entirely optional quality
    management system. You can read more about staking{' '}
    <a
      href="https://expandsupport.zendesk.com/hc/en-us/articles/360025693971"
      target="_blank"
      rel="noopener noreferrer"
    >
      here
    </a>
  </span>
);

export const descTooltip =
  'Provide a concise description about the task that is easy to understand for your worker e.g. Label 100 images containing objects belonging to nature';

export const CallbackTooltip = () => (
  <span>
    Events, such as submission, assignment, and verification of a task will be
    sent to the web url supplied
  </span>
);
