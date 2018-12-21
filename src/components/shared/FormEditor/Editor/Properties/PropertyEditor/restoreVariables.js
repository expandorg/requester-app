// @flow
import { ContentState, ContentBlock } from 'draft-js';

import { restoreEntities } from '../../../../../common/RichText';

export const findVars = (text: string): Array<Object> => {
  const regex = /\$\(([^(^)]+)\)/g;
  const found = [];
  let result = regex.exec(text);
  while (result !== null) {
    found.push({
      name: result[0],
      start: result.index,
      end: regex.lastIndex,
    });
    result = regex.exec(text);
  }
  return found;
};

export const findVarsRanges = (block: ContentBlock): Array<Object> =>
  findVars(block.getText());

const getVariableData = ({ name }) => ({
  mention: {
    name,
    suggestion: name.slice(2, name.length - 1),
  },
});

export const restoreVariables = (content: ContentState) =>
  restoreEntities(
    content,
    '$mention',
    'IMMUTABLE',
    findVarsRanges,
    getVariableData
  );
