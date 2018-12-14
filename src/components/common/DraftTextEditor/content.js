// @flow
import { stateToHTML } from 'draft-js-export-html';
import { ContentState, EditorState, convertFromHTML } from 'draft-js';

export const getHtml = (contentState: ContentState): string => {
  const html = stateToHTML(contentState);
  return html;
};

export const applyAlignment = (editorState: EditorState) => editorState;

export const applyFontPreset = (editorState: EditorState) => editorState;

export const fontSizes = ['8', '12', '16', '20'];

export const applyFontSize = (editorState: EditorState) => editorState;

export const createContentState = (value: string): EditorState => {
  // $FlowFixMe
  const { contentBlocks, entityMap } = convertFromHTML(value);
  // $FlowFixMe
  return ContentState.createFromBlockArray(contentBlocks, entityMap);
};
