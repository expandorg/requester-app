import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { UploadProgressIndicator } from '@expandorg/components/app';
import { RequestStates, requestStateProps } from '@expandorg/app-utils';
import { addNotification } from '@expandorg/app-utils/app';

import { ReactComponent as Placeholder } from '../../../../assets/cloud_upload.svg';
import { Upload, ProgressPubSub } from '../../../common/Upload';

import { draftProps } from '../../../shared/propTypes';

import { Fieldset } from '../../controls';

import { uploadData } from '../../../../sagas/dataSagas';
import { uploadDataStateSelector } from '../../../../selectors/uiStateSelectors';

import styles from './UploadForm.module.styl';

const mapStateToProps = state => ({
  uploadState: uploadDataStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ uploadData, addNotification }, dispatch);

class UploadForm extends Component {
  progress = null;

  static propTypes = {
    draft: draftProps.isRequired,
    uploadState: requestStateProps.isRequired,
    uploadData: PropTypes.func.isRequired,
    addNotification: PropTypes.func.isRequired,
  };

  state = {
    data: null,
    progress: 0,
  };

  componentWillUnmount() {
    if (this.progress !== null) {
      this.progress.unsubscribe();
    }
  }

  handleUpload = data => {
    const { draft, uploadState } = this.props;
    if (uploadState.state !== RequestStates.Fetching) {
      this.setState({ data, progress: 0 });

      this.progress = new ProgressPubSub(this.handleProgress);
      this.props.uploadData(draft.id, data, this.progress);
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
    const message = `Filetype is not supported. Only .csv are supported. Please try again.`;
    this.props.addNotification('error', message);
  };

  handleDownload = evt => {
    evt.preventDefault();
    evt.stopPropagation();
  };

  render() {
    const { uploadState } = this.props;
    const { data, progress } = this.state;

    const uploading = uploadState.state === RequestStates.Fetching;
    const uploaded = uploadState.state === RequestStates.Fetched;
    const err = uploadState.state === RequestStates.FetchError;
    return (
      <Fieldset>
        <Upload
          file={data}
          accept="text/csv"
          isUploading={uploading}
          className={styles.upload}
          onSelect={this.handleUpload}
          onReject={this.handleReject}
        >
          {({ file }) =>
            file ? (
              <UploadProgressIndicator
                className={styles.progress}
                isUploading={uploading}
                isUploaded={uploaded}
                isUploadError={err}
                progress={progress}
                onAbort={this.handleAbort}
              />
            ) : (
              <div className={styles.placeholder}>
                <Placeholder className={styles.image} />
                <div className={styles.or}>Drag a file or</div>
                <div className={styles.button}>Browse</div>
              </div>
            )
          }
        </Upload>
      </Fieldset>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadForm);
