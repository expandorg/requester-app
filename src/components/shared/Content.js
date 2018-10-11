import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import DocumentTitle from 'react-document-title';

import Sidebar from './Sidebar';

import './Content.styl';

const Content = ({ children, title, className, sidebar }) => (
  <DocumentTitle title={`${title} - Gems`}>
    <div className="gem-page">
      {sidebar && <Sidebar />}
      <div
        className={cn('gem-page-content', {
          'gem-page-content-shifted': sidebar,
        })}
      >
        <div className={cn('gem-content', className)}>{children}</div>
      </div>
    </div>
  </DocumentTitle>
);

Content.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  sidebar: PropTypes.bool,
};

Content.defaultProps = {
  className: null,
  sidebar: true,
};

export default Content;
