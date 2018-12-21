// @flow
import { Modifier, ContentState, EditorState, RichUtils } from 'draft-js';

import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

export const getHtml = (contentState: ContentState): string =>
  stateToHTML(contentState, {
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
  });

export const getText = (editorState: EditorState): string =>
  editorState.getCurrentContent().getPlainText();

export const isEmpty = (editorState: EditorState): boolean =>
  !editorState.getCurrentContent().hasText();

export const hasFocus = (editorState: EditorState): boolean =>
  editorState.getSelection().getHasFocus();

export const editorStateFromText = (value: string, decorator: any) => {
  if (!value) {
    return EditorState.createEmpty(decorator);
  }
  return EditorState.createWithContent(
    ContentState.createFromText(value),
    decorator
  );
};

export const editorStateFromHtml = (html: string, decorator: any) => {
  if (!html) {
    return EditorState.createEmpty(decorator);
  }

  const content = stateFromHTML(html, {
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
  });
  return EditorState.createWithContent(content, decorator);
};

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

export const fontPresets = [
  { label: 'body', value: 'unstyled' },
  { label: 'h1', value: 'header-one' },
  { label: 'h2', value: 'header-two' },
  { label: 'h3', value: 'header-three' },
  { label: 'h4', value: 'header-four' },
  { label: 'h5', value: 'header-five' },
  { label: 'h6', value: 'header-six' },
  { label: 'pre', value: 'code-block' },
  { label: 'blockquote', value: 'blockquote' },
];

export const getCurrentFontPreset = (editorState: EditorState) =>
  RichUtils.getCurrentBlockType(editorState);

export const applyFontPreset = (editorState: EditorState, blockType: string) =>
  RichUtils.toggleBlockType(editorState, blockType);

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
