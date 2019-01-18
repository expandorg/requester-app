import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { RequestStates } from '@expandorg/app-utils';

import { ReactComponent as Placeholder } from '@expandorg/uikit/assets/data.svg';
import {
  Upload,
  ImagePreview,
  ProgressIndicator,
  ProgressPubSub,
} from '../../../common/Upload';

import { addNotification } from '../../../../sagas/notificationsSagas';

import { imagesApi } from '../../../../api/ImagesApi';

import styles from './UploadLogo.module.styl';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addNotification }, dispatch);

class UploadLogo extends Component {
  static propTypes = {
    logo: PropTypes.string,
    onChangeLogo: PropTypes.func.isRequired,
    addNotification: PropTypes.func.isRequired,
  };

  static defaultProps = {
    logo: null,
  };

  state = {
    progress: 0,
    uploadState: RequestStates.NotFetched,
  };

  progress = null;

  componentWillUnmount() {
    if (this.progress !== null) {
      this.progress.unsubscribe();
    }
  }

  handleSelect = async thumbnail => {
    const { onChangeLogo } = this.props;
    const { uploadState } = this.state;

    if (uploadState !== RequestStates.Fetching) {
      try {
        this.setState({ uploadState: RequestStates.Fetching, progress: 0 });
        this.progress = new ProgressPubSub(this.handleProgress);

        const { imageUrl } = await imagesApi.upload({
          thumbnail,
          cb: this.progress,
        });

        onChangeLogo(imageUrl);
        this.setState({ uploadState: RequestStates.Fetched });
      } catch (e) {
        this.setState({ uploadState: RequestStates.FetchError });
      }
    }
  };

  handleProgress = progress => {
    this.setState({ progress });
  };

  handleAbort = () => {
    if (this.progress) {
      this.progress.abortRequest();
    }
  };

  handleReject = () => {
    const message = `File type is not supported. Only .png .gif and .jpg are supported. Please try again.`;
    this.props.addNotification('error', message);
  };

  render() {
    const { logo } = this.props;
    const { uploadState, progress } = this.state;
    const uploading =
      uploadState === RequestStates.Fetching ||
      uploadState === RequestStates.FetchError;
    return (
      <Upload
        label="Thumbnail *"
        tooltip="Upload Image"
        onSelect={this.handleSelect}
        onReject={this.handleReject}
      >
        {() => (
          <>
            {uploading && (
              <ProgressIndicator
                uploadState={uploadState}
                progress={progress}
                onAbort={this.handleAbort}
              />
            )}
            {!uploading &&
              (logo ? (
                <ImagePreview uploadedUrl={logo} />
              ) : (
                <div className={styles.placeholder}>
                  <Placeholder
                    viewBox="0 0 80 56"
                    width={45}
                    height={36}
                    className={styles.hint}
                  />
                  <div className={styles.or}>Drag a file or</div>
                  <div className={styles.browse}>Browse</div>
                </div>
              ))}
          </>
        )}
      </Upload>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(UploadLogo);
