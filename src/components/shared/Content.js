import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import DocumentTitle from 'react-document-title';

import './Content.styl';

const Content = ({ children, title, className }) => (
  <DocumentTitle title={`${title} - Gems`}>
    <div className={cn('gem-content', className)}>{children}</div>
  </DocumentTitle>
);

Content.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Content.defaultProps = {
  className: null,
};

export default Content;
