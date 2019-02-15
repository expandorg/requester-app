import { DropTarget } from 'react-dnd';

import Placeholder from './Placeholder';

import { nestedTarget, FORM_DND_ID } from '../../../../dnd';

import styles from './EmptyDroppable.module.styl';

const EmptyDroppable = DropTarget(FORM_DND_ID, nestedTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
  className: styles.container,
}))(Placeholder);

export default EmptyDroppable;
