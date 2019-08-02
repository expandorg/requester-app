import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  moduleProps,
  FormDataProvider,
  FileUploadServiceMock,
  ExecutionContextProvider,
} from '@expandorg/modules';

import Empty from './Empty';
import DropArea from './DropArea';
import { DnDContainer, Preview } from '../Module';
import { EditorContext } from '../EditorContext';

import styles from './Form.module.styl';

const formData = {
  allowedRetries: 3,
  currentTry: 1,
};

const services = new Map([['fileUpload', new FileUploadServiceMock()]]);

export default function Form({
  modules,
  onAdd,
  onSelect,
  onRemove,
  onMove,
  onCopy,
  selected,
  onEndDrag,
}) {
  const { controlsMap: controls } = useContext(EditorContext);
  // scrollBottom = () => {
  //   setTimeout(() => {
  //     formRef.current.scrollTop =
  //       formRef.current.scrollHeight - this.formRef.current.clientHeight;
  //   }, 100);
  // };
  return (
    <div className={styles.container}>
      <DropArea className={styles.form} onAdd={onAdd}>
        {modules.length === 0 && <Empty />}
        <FormDataProvider formData={formData}>
          <ExecutionContextProvider
            form={{ modules }}
            controls={controls}
            services={services}
          >
            {modules.map((module, order) => {
              const p = [order];
              return (
                <DnDContainer
                  key={module.name}
                  module={module}
                  path={p}
                  controls={controls}
                  onMove={onMove}
                  onEndDrag={onEndDrag}
                >
                  {({ connectDragPreview }) => (
                    <Preview
                      path={p}
                      controls={controls}
                      selection={selected}
                      module={module}
                      onMove={onMove}
                      onRemove={onRemove}
                      onSelect={onSelect}
                      onCopy={onCopy}
                      onEndDrag={onEndDrag}
                      connectDragPreview={connectDragPreview}
                    />
                  )}
                </DnDContainer>
              );
            })}
          </ExecutionContextProvider>
        </FormDataProvider>
      </DropArea>
    </div>
  );
}

Form.propTypes = {
  modules: PropTypes.arrayOf(moduleProps),
  selected: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onEndDrag: PropTypes.func.isRequired,
};

Form.defaultProps = {
  modules: [],
  selected: null,
};
