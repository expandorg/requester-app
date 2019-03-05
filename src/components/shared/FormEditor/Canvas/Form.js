import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';
import {
  moduleProps,
  FormDataProvider,
  FileUploadServiceMock,
  ExecutionContextProvider,
} from '@expandorg/modules';

import { dropAreaTarget, FORM_DND_ID } from '../model/dnd';

import Empty from './Empty';
import DnDModule from './Module/DnDModule';

import styles from './Form.module.styl';

const formData = {
  allowedRetries: 3,
  currentTry: 1,
};

const services = new Map([['fileUpload', new FileUploadServiceMock()]]);

class Form extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(moduleProps),
    selected: PropTypes.string,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    onAddModule: PropTypes.func.isRequired,
    onMoveModule: PropTypes.func.isRequired,
    onSelectModule: PropTypes.func.isRequired,
    onRemoveModule: PropTypes.func.isRequired,
    onCopyModule: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };

  static defaultProps = {
    modules: [],
    selected: null,
  };

  render() {
    const {
      modules,
      onAddModule,
      onSelectModule,
      onRemoveModule,
      onMoveModule,
      onCopyModule,
      selected,
      controls,
      connectDropTarget,
    } = this.props;

    return (
      <div className={styles.container}>
        {connectDropTarget(
          <div className={styles.form}>
            {modules.length === 0 && <Empty onAdd={onAddModule} />}
            <FormDataProvider formData={formData}>
              <ExecutionContextProvider
                form={{ modules }}
                controls={controls}
                services={services}
              >
                {modules.map((module, order) => (
                  <DnDModule
                    key={module.name}
                    path={[order]}
                    controls={controls}
                    selected={selected}
                    module={module}
                    onMove={onMoveModule}
                    onRemove={onRemoveModule}
                    onSelect={onSelectModule}
                    onCopy={onCopyModule}
                  />
                ))}
              </ExecutionContextProvider>
            </FormDataProvider>
          </div>
        )}
      </div>
    );
  }
}

export default DropTarget(FORM_DND_ID, dropAreaTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(Form);
