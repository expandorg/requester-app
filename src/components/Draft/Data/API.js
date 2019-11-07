import React from 'react';
import cn from 'classnames';

import styles from './API.module.styl';

export default function API() {
  return (
    <div className={styles.container}>
      <div className={styles.img} />
      <div className={styles.text}>
        We’re getting the ready for you soon so hold tight. If you have any
        questions don’t hesitate to contact us.
      </div>
      <a
        className={cn(
          'gem-button',
          'gem-button-small',
          'gem-button-white-blue',
          styles.link
        )}
        href="mailto:hello@expand.org"
      >
        contact us
      </a>
    </div>
  );
}
