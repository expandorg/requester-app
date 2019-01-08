// @flow

import { PubSub } from '@expandorg/utils';

export default class ProgressPubSub {
  unsubscribeCallback: ?Function = null;

  pubSub: PubSub = new PubSub();
  abort: Function;

  aborted: boolean = false;

  constructor(onProgress: Function) {
    this.unsubscribeCallback = this.pubSub.sibscribe(onProgress);
  }

  unsubscribe = () => {
    if (this.unsubscribeCallback) {
      this.unsubscribeCallback();
      this.unsubscribeCallback = null;
    }
  };

  abortRequest = () => {
    if (!this.aborted && this.abort) {
      this.aborted = true;
      this.abort();
    }
  };

  onProgress = ({ loaded, total }: Object) => {
    this.pubSub.notify(loaded / total);
  };
}
