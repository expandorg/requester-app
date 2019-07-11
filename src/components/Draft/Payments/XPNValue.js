import React, { useEffect } from 'react';
import { priceApi } from '../../../api/XPNPriceApi';

import styles from './XPNValue.module.styl';

let tokenPrice = 0.002;

async function fetchPrice() {
  try {
    if (tokenPrice !== null) {
      const response = await priceApi.fetchPrice();
      tokenPrice = response.price;
    }
  } catch (err) {
    console.log(err);
  }
}

export default function XPNValue() {
  useEffect(() => fetchPrice(), []);

  if (tokenPrice === null) {
    return null;
  }
  return (
    <div className={styles.value}>
      Current Value of Expand token: {tokenPrice.toFixed(2)} $
    </div>
  );
}
