import React, { useContext } from 'react';

import {
  FormDataProvider,
  FileUploadServiceMock,
  ExecutionContextProvider,
} from '@expandorg/modules';

import Empty from './Empty';
import DropArea from './DropArea';
import { FormModule } from '../Module';
import { EditorContext } from '../EditorContext';

import styles from './Form.module.styl';

const formData = {
  allowedRetries: 3,
  currentTry: 1,
};

const services = new Map([['fileUpload', new FileUploadServiceMock()]]);

export default function Form() {
  const { modules, controlsMap, selection, onAdd } = useContext(EditorContext);

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
            controls={controlsMap}
            services={services}
          >
            {modules.map((module, order) => (
              <FormModule
                key={module.name}
                module={module}
                path={[order]}
                selection={selection.getId('edit')}
              />
            ))}
          </ExecutionContextProvider>
        </FormDataProvider>
      </DropArea>
    </div>
  );
}
