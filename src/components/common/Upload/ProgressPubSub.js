// @flow

import { PubSub } from '@gemsorg/utils';

export default class ProgressPubSub {
  unsubscribeCallback: Function;
  pubSub: PubSub = new PubSub();

  constructor(onProgress: Function) {
    this.unsubscribeCallback = this.pubSub.sibscribe(onProgress);
  }

  unsubscribe = () => {
    if (this.unsubscribeCallback) {
      this.unsubscribeCallback();
    }
  };

  onProgress = ({ loaded, total }: Object) => {
    this.pubSub.notify(loaded / total);
  };
}
