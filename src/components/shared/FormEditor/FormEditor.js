import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formProps } from '@expandorg/modules';
import { deepCopyModule } from '@expandorg/modules/model';
import { WalkthroughProvider, WalkthroughPin } from '@expandorg/components/app';

import Canvas from './Canvas';
import Sidebar from './Sidebar/Sidebar';

import { treeEditor } from './model/dnd';
import { scaffold, getUniqId, availableModules } from './model/modules';
import help from './model/help';

import styles from './FormEditor.module.styl';

export default class FormEditor extends Component {
  static propTypes = {
    form: formProps,
    title: PropTypes.string,
    variables: PropTypes.arrayOf(PropTypes.string),
    varsSample: PropTypes.object, // eslint-disable-line
    validateForm: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: [],
    title: 'Task',
    varsSample: null,
    form: null,
  };

  constructor(props) {
    super(props);

    this.previewTab = null;

    this.state = {
      selected: null,
      prev: props.form, // eslint-disable-line react/no-unused-state
      modules: props.form ? props.form.modules : [],
    };
  }

  static getDerviedStateFromProps({ form }, state) {
    if (state.prev !== form) {
      return {
        selected: null,
        prev: form,
        modules: form ? form.modules : [],
      };
    }
    return null;
  }

  handleSave = modules => {
    const { onSave, form } = this.props;
    onSave({ ...form, modules });
  };

  handleAdd = meta => {
    const { modules } = this.state;
    this.setState({
      modules: treeEditor.push(modules, scaffold(meta)),
    });
  };

  handleRemove = path => {
    if (path.length) {
      this.setState(({ modules }) => ({
        selected: null,
        modules: treeEditor.removeAt(modules, path),
      }));
    }
  };

  handleCopyModule = (path, module) => {
    const { modules } = this.state;
    this.setState({
      selected: null,
      modules: treeEditor.insertAt(
        modules,
        path,
        deepCopyModule(module, getUniqId)
      ),
    });
  };

  handleMoveAt = (dragPath, hoverPath, meta) => {
    const { modules } = this.state;
    if (dragPath.length === 0) {
      this.setState({
        selected: null,
        modules: treeEditor.insertAt(modules, hoverPath, scaffold(meta, true)),
      });
    } else {
      this.setState({
        selected: null,
        modules: treeEditor.moveAt(modules, dragPath, hoverPath),
      });
    }
  };

  handleEndDrag = path => {
    const { modules } = this.state;
    this.setState({
      modules: treeEditor.modifyAt(modules, path, item => {
        if (item !== undefined) {
          item.isDragging = undefined;
        }
      }),
    });
  };

  handleSelectModule = path => {
    const { selected } = this.state;
    this.setState({ selected: treeEditor.eq(selected, path) ? null : path });
  };

  handleEditModule = (path, module) => {
    const { modules } = this.state;
    this.setState({
      selected: null,
      modules: treeEditor.replaceAt(modules, path, module),
    });
  };

  render() {
    const { onHide, validateForm, variables, varsSample, title } = this.props;
    const { modules, selected } = this.state;

    return (
      <WalkthroughProvider settings={help}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Sidebar
              moduleControls={availableModules}
              onEndDrag={this.handleEndDrag}
              onAddModule={this.handleAdd}
              onRemoveModule={this.handleRemove}
            />
          </div>
          <div className={styles.editor}>
            <Canvas
              modules={modules}
              title={title}
              selected={selected}
              moduleControls={availableModules}
              validateForm={validateForm}
              variables={variables}
              varsSample={varsSample}
              onAddModule={this.handleAdd}
              onEditModule={this.handleEditModule}
              onMoveModule={this.handleMoveAt}
              onRemoveModule={this.handleRemove}
              onSelectModule={this.handleSelectModule}
              onCopyModule={this.handleCopyModule}
              onSave={this.handleSave}
              onCancel={onHide}
            />
          </div>
        </div>
        <WalkthroughPin id="search" className={styles.serachPin} />
        <WalkthroughPin id="components" className={styles.componentsPin} />
      </WalkthroughProvider>
    );
  }
}
