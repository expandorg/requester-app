import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@expandorg/modules';
import PreviewFormTab from '../../../../../common/popups/PreviewFormTab';

const updatePreview = (tab, modules, variables) => {
  if (tab.current) {
    const wnd = tab.current.getWindow();
    if (wnd) {
      wnd.postMessage({ type: 'updateForm', form: { modules }, variables });
    }
  }
};

export default function PreviewCtx({ children, modules, variables }) {
  const tab = useRef();
  const handleMessage = ({ data }) => {
    if (typeof data === 'object' && data.type === 'previewReady') {
      updatePreview(tab, modules, variables);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage, false);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    updatePreview(tab, modules, variables);
  }, [modules]);

  const handlePreview = () => {
    if (!tab.current) {
      tab.current = new PreviewFormTab();
    }
    tab.current.open();
  };

  return children({ onPreview: handlePreview });
}

PreviewCtx.propTypes = {
  modules: PropTypes.arrayOf(moduleProps),
  variables: PropTypes.object, // eslint-disable-line
};

PreviewCtx.defaultProps = {
  modules: [],
  variables: null,
};
