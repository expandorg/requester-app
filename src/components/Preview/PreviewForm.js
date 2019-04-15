import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNotification } from '@expandorg/app-utils/app';

import { Sidebar, Navbar, Button } from '@expandorg/components/app';
import { Panel } from '@expandorg/components';

import Page from '../shared/Page';
import { authenticated } from '../shared/auth';

import ModulesForm from './draft/ModulesForm';

import styles from './styles.module.styl';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addNotification }, dispatch);

class PreviewForm extends Component {
  static propTypes = {
    addNotification: PropTypes.func.isRequired,
  };

  state = {
    form: null,
    variables: null,
  };

  componentDidMount() {
    window.addEventListener('message', this.handleMessage, false);

    if (window.opener) {
      window.opener.postMessage({ type: 'previewReady' });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage = ({ data }) => {
    if (typeof data === 'object' && data.type === 'updateForm') {
      this.setState({ form: data.form, variables: data.variables });
    }
  };

  handleSubmit = values => {
    console.log(JSON.stringify(values, undefined, 2));
  };

  handleNotify = (type, message) => {
    this.props.addNotification(type, message);
  };

  handleClose = () => {
    window.close();
  };

  render() {
    const { form, variables } = this.state;
    if (!form) {
      return null;
    }

    return (
      <Page title="Preview" className={styles.page}>
        <Navbar>
          <div className={styles.navbar}>
            <Button
              size="small"
              className={styles.home}
              onClick={this.handleClose}
            >
              take me home
            </Button>
          </div>
        </Navbar>

        <Sidebar />
        <div className={styles.container}>
          <Panel className={styles.panel}>
            <ModulesForm
              form={form}
              variables={variables}
              onSubmit={this.handleSubmit}
              onNotify={this.handleNotify}
            />
          </Panel>
        </div>
      </Page>
    );
  }
}

export default authenticated(
  connect(
    null,
    mapDispatchToProps
  )(PreviewForm)
);
