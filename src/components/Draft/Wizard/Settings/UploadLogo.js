import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  UploadImagePreview,
  UploadProgressIndicator,
} from '@expandorg/components/app';

import { RequestStates } from '@expandorg/app-utils';
import { addNotification } from '@expandorg/app-utils/app';

import { ReactComponent as Placeholder } from '@expandorg/uikit/assets/data.svg';
import { Upload, ProgressPubSub } from '../../../common/Upload';

import { imagesApi } from '../../../../api/ImagesApi';

import styles from './UploadLogo.module.styl';

import tooltipUploadLogo from './tooltipUploadLogo.png';

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

        const { url } = await imagesApi.upload({
          thumbnail,
          cb: this.progress,
        });

        onChangeLogo(url);
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

    const indicator =
      uploadState === RequestStates.Fetching ||
      uploadState === RequestStates.FetchError;

    return (
      <Upload
        label="Thumbnail *"
        tooltip={
          <img
            src={tooltipUploadLogo}
            className={styles.tooltip}
            alt="Upload logo"
          />
        }
        accept="image/jpeg, image/png, image/gif"
        onSelect={this.handleSelect}
        onReject={this.handleReject}
      >
        {() => (
          <>
            {indicator && (
              <UploadProgressIndicator
                isUploading={uploadState === RequestStates.Fetching}
                isUploaded={uploadState === RequestStates.Fetched}
                isUploadError={uploadState === RequestStates.FetchError}
                progress={progress}
                onAbort={this.handleAbort}
              />
            )}
            {!indicator &&
              (logo ? (
                <UploadImagePreview uploadedUrl={logo} />
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
