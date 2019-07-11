import React from 'react';

import styles from './API.module.styl';

export default function API() {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        We’re getting the ready for you soon so hold tight. If you have any
        questions don’t hesitate to contact us.
      </div>
      <a href="mailto:hello@expand.org" className={styles.link}>
        contact us
      </a>
    </div>
  );
}
