import React from 'react';
// import { priceApi } from '../../../api/XPNPriceApi';

import styles from './XPNValue.module.styl';

import { XPN_USD } from '../../../common/consts';

// async function fetchPrice() {
//   try {
//     if (tokenPrice !== null) {
//       const response = await priceApi.fetchPrice();
//       tokenPrice = response.price;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

export default function XPNValue() {
  // useEffect(() => fetchPrice(), []);

  return (
    <div className={styles.value}>
      Current Value of Expand token: {XPN_USD} $
    </div>
  );
}
