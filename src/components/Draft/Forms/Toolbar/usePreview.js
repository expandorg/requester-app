import { useRef, useEffect, useCallback } from 'react';

import PreviewDraftTab from '../../../../common/popups/PreviewDraftTab';

export default function usePreview(draft) {
  const tab = useRef();
  useEffect(() => {
    if (tab.current) {
      const wnd = tab.current.getWindow();
      if (wnd) {
        wnd.postMessage({ type: 'updateDraft', draft });
      }
    }
  }, [draft]);

  const onPreview = useCallback(() => {
    if (!tab.current) {
      tab.current = new PreviewDraftTab(draft.id);
    }
    tab.current.open();
  }, [draft.id]);

  return onPreview;
}
