import React, { useCallback, useRef, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { UploadProgressIndicator } from '@expandorg/components/app';
import { RequestStates } from '@expandorg/app-utils';
import { addNotification } from '@expandorg/app-utils/app';

import { ReactComponent as Placeholder } from '../../../../assets/cloud_upload.svg';
import { Upload, ProgressPubSub } from '../../../common/Upload';

import { draftProps } from '../../../shared/propTypes';

import { Fieldset } from '../../controls';

import { uploadData } from '../../../../sagas/dataSagas';
import { uploadDataStateSelector } from '../../../../selectors/uiStateSelectors';

import styles from './UploadForm.module.styl';

export default function UploadForm({ draft }) {
  const dispatch = useDispatch();
  const uploadState = useSelector(uploadDataStateSelector);

  const ps = useRef(null);
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(null);

  const uploading = uploadState.state === RequestStates.Fetching;

  useEffect(() => {
    return () => {
      if (ps.current !== null) {
        ps.current.unsubscribe();
      }
    };
  }, []);

  const upload = useCallback(
    (d) => {
      if (!uploading) {
        setProgress(0);
        setData(d);
        ps.current = new ProgressPubSub(setProgress);
        dispatch(uploadData(draft.id, d, ps.current));
      }
    },
    [dispatch, uploading, draft.id]
  );

  const rejected = useCallback(() => {
    dispatch(
      addNotification(
        'error',
        'This file type is not supported. Only .csv are supported. Please try again.'
      )
    );
  }, [dispatch]);

  const abort = useCallback(() => {
    if (ps.current !== null) {
      ps.current.abortRequest();
    }
  }, []);

  return (
    <Fieldset>
      <Upload
        file={data}
        accept="text/csv"
        isUploading={uploading}
        className={styles.upload}
        onSelect={upload}
        onReject={rejected}
      >
        {({ file }) =>
          file ? (
            <UploadProgressIndicator
              className={styles.progress}
              isUploading={uploading}
              isUploaded={uploadState.state === RequestStates.Fetched}
              isUploadError={uploadState.state === RequestStates.FetchError}
              progress={progress}
              onAbort={abort}
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

UploadForm.propTypes = {
  draft: draftProps.isRequired,
};
