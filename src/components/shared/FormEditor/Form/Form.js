import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';
import {
  moduleProps,
  FormDataProvider,
  FileUploadServiceMock,
  ExecutionContextProvider,
} from '@expandorg/modules';

import { dropAreaTarget, FORM_DND_ID } from '../dnd';

import Empty from './Empty';
import { DnDContainer, Preview } from '../Module';

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
    onAdd: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,
    onEndDrag: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };

  static defaultProps = {
    modules: [],
    selected: null,
  };

  formRef = createRef();
  timeout = null;

  componentWillUnmount() {
    if (this.timeout != null) {
      clearTimeout(this.timeout);
    }
  }

  scrollBottom = () => {
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.formRef.current.scrollTop =
        this.formRef.current.scrollHeight - this.formRef.current.clientHeight;
    }, 100);
  };

  render() {
    const {
      modules,
      onAdd,
      onSelect,
      onRemove,
      onMove,
      onCopy,
      selected,
      controls,
      onEndDrag,
      connectDropTarget,
    } = this.props;
    return (
      <div className={styles.container} ref={this.formRef}>
        {connectDropTarget(
          <div className={styles.form}>
            {modules.length === 0 && <Empty onAdd={onAdd} />}
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
                          connectDragPreview={connectDragPreview}
                        />
                      )}
                    </DnDContainer>
                  );
                })}
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
