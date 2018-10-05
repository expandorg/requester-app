import React from 'react';
import PropTypes from 'prop-types';

import DocumentTitle from 'react-document-title';

import './Content.styl';

const Content = ({ children, title }) => (
  <DocumentTitle title={`${title} - Gems`}>
    <div className="gem-content">{children}</div>
  </DocumentTitle>
);

Content.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Content;
