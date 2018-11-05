import { DropTarget } from 'react-dnd';

import Placeholder from './Placeholder';

import { nestedTarget, FORM_DND_ID } from '../../../dnd';

const EmptyDroppable = DropTarget(FORM_DND_ID, nestedTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(Placeholder);

export default EmptyDroppable;
