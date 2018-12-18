// @flow
import { Modifier, ContentState, EditorState } from 'draft-js';

import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

const toHtmlOptions = {
  blockStyleFn: (block: any) => {
    const data = block.getData();
    if (data.get('ALIGNMENT')) {
      return {
        attributes: {
          class: `align-${data.get('ALIGNMENT')}`,
        },
      };
    }
    return null;
  },
};

const fromHtmlOptions = {
  customBlockFn: (element: HTMLElement) => {
    const alignCenter = element.classList.contains('align-center');
    const alignRight = element.classList.contains('align-right');
    if (alignCenter) {
      return { data: { ALIGNMENT: 'center' } };
    }
    if (alignRight) {
      return { data: { ALIGNMENT: 'right' } };
    }
    return null;
  },
};

export const getHtml = (contentState: ContentState): string =>
  stateToHTML(contentState, toHtmlOptions);

export const createContentState = (value: string): ContentState =>
  stateFromHTML(value, fromHtmlOptions);

export const getCurrentBlock = (editorState: EditorState) => {
  const selectionState = editorState.getSelection();
  const anchorKey = selectionState.getAnchorKey();
  const currentContent = editorState.getCurrentContent();
  return currentContent.getBlockForKey(anchorKey);
};

export const getActiveAlignment = (editorState: EditorState): string => {
  const currentBlock = getCurrentBlock(editorState);
  const data = currentBlock.getData();
  if (data) {
    const alignemnt = data.get('ALIGNMENT');
    if (alignemnt === 'right' || alignemnt === 'center') {
      return alignemnt;
    }
  }
  return 'left';
};

export const applyAlignment = (editorState: EditorState, alignemnt: string) => {
  const content = editorState.getCurrentContent();
  const selection = editorState.getSelection();

  const edited = Modifier.mergeBlockData(content, selection, {
    ALIGNMENT: alignemnt,
  });
  return EditorState.push(editorState, edited, 'change-block-data');
};

export const applyFontPreset = (editorState: EditorState) => editorState;

export const fontSizes = ['8', '12', '16', '20'];

export const applyFontSize = (editorState: EditorState) => editorState;

export const blockStyleFn = (block: any) => {
  const data = block.getData();
  const alignemnt = data.get('ALIGNMENT');
  if (alignemnt) {
    return `DraftEditor-align-${alignemnt}`;
  }
  return undefined;
};
