import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';
import {
  Upload,
  ProgressIndicator,
  ProgressPubSub,
} from '../../../common/Upload';

import { draftProps } from '../../../shared/propTypes';
import { ReactComponent as Placeholder } from '../../../assets/data.svg';

import { Description, Fieldset } from '../Form';

import { uploadData } from '../../../../sagas/dataSagas';
import { dataUploadStateSelector } from '../../../../selectors/uiStateSelectors';

import styles from './UploadForm.module.styl';

const mapStateToProps = state => ({
  uploadState: dataUploadStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ uploadData }, dispatch);

class UploadForm extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    uploadState: requestStateProps.isRequired,
    uploadData: PropTypes.func.isRequired,
  };

  state = {
    data: null,
    progress: 0,
  };

  progress = null;

  componentWillUnmount() {
    if (this.progress !== null) {
      this.progress.unsubscribe();
    }
  }

  handleUpload = data => {
    const { draft, uploadState } = this.props;
    if (uploadState !== RequestStates.Fetching) {
      this.setState({ data, progress: 0 });

      this.progress = new ProgressPubSub(this.handleProgress);
      this.props.uploadData(draft.id, data, this.progress.onProgress);
    }
  };

  handleProgress = progress => {
    this.setState({ progress });
  };

  handleToggleApi = evt => {
    evt.prventDefault();
  };

  render() {
    const { uploadState } = this.props;
    const { data, progress } = this.state;

    const uploading = uploadState.state === RequestStates.Fetching;
    return (
      <Fieldset>
        <Description>
          The second step is uploading your data and assigning variables.
        </Description>
        <Upload
          file={data}
          isUploading={uploading}
          className={styles.upload}
          onSelect={this.handleUpload}
        >
          {({ file }) =>
            file ? (
              <ProgressIndicator
                uploadState={uploadState.state}
                progress={progress}
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
        <button
          disabled={uploading}
          onClick={this.handleToggleApi}
          className={styles.api}
        >
          Use API instead?
        </button>
      </Fieldset>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadForm);
