import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import DocumentTitle from 'react-document-title';

import Notifications from './Notifications/Notifications';

import './Content.styl';

const Content = ({ children, title, className, sidebar, navbar }) => (
  <DocumentTitle title={`${title} - Gems`}>
    <div className="gem-page">
      <div
        className={cn(
          'gem-content',
          {
            'gem-content__sidebar': sidebar,
            'gem-content__navbar': navbar,
          },
          className
        )}
      >
        {children}
        <Notifications />
      </div>
    </div>
  </DocumentTitle>
);

Content.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  sidebar: PropTypes.bool,
  navbar: PropTypes.bool,
};

Content.defaultProps = {
  className: null,
  sidebar: true,
  navbar: true,
};

export default Content;
