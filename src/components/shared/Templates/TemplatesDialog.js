import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Dialog, Button } from '@expandorg/components';

import Templates from './Templates';

import { taskTemplateProps } from '../propTypes';

import { fetchFormTemplates } from '../../../sagas/formTemplateSagas';
import { formTemplatesSelector } from '../../../selectors/formTemplatesSelectors';

import styles from './TemplatesDialog.module.styl';

const mapStateToProps = state => ({
  templates: formTemplatesSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchFormTemplates }, dispatch);

class TemplatesDialog extends Component {
  static propTypes = {
    templates: PropTypes.arrayOf(taskTemplateProps),
    title: PropTypes.string,
    description: PropTypes.string,

    fetchFormTemplates: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    templates: [],
    description: null,
    title: 'Templates',
  };

  state = {
    selected: null,
  };

  componentDidMount() {
    this.props.fetchFormTemplates();
  }

  handleSelect = id => {
    this.setState({ selected: id });
  };

  handlePick = () => {
    const { selected } = this.state;
    if (selected !== null) {
      const { templates, onSelect } = this.props;

      const template = templates.find(t => t.id === selected);
      onSelect(template);
    }
  };

  render() {
    const { onHide, templates, description, title } = this.props;
    const { selected } = this.state;

    return (
      <Dialog
        visible
        onHide={onHide}
        modalClass={styles.modal}
        overlayClass={styles.overlay}
        contentLabel="templates-dialog"
        hideButton
        shouldCloseOnEsc={false}
      >
        <Templates
          className={styles.content}
          templates={templates}
          selected={selected}
          title={title}
          description={description}
          onSelect={this.handleSelect}
          actions={
            <div className={styles.actions}>
              <Button theme="grey" onClick={onHide}>
                Cancel
              </Button>
              <Button onClick={this.handlePick}>Use this</Button>
            </div>
          }
        />
      </Dialog>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplatesDialog);
