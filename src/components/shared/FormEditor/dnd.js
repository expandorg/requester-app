import { findDOMNode } from 'react-dom';

export const FORM_DND_ID = 'FORM_DND_ID';

const newModule = module => ({
  // ...module.editor.defaults,
  type: module.type,
  name: `${module.type}-${Math.floor(Math.random() * 1000)}`,
});

export const targetEmpty = {
  canDrop: () => true,
  drop: (props, montior) => {
    props.onAdd(montior.getItem());
  },
};

export const sourceItem = {
  beginDrag: props => ({
    module: newModule(props.meta),
  }),
  endDrag: props => {
    props.onMove(null, null, null, true);
  },
};

export const sourceModule = {
  canDrag: () => true,
  beginDrag: props => ({ module: props.module, index: props.index }),
  endDrag: props => {
    props.onMove(null, null, null, true);
  },
};

export const targetModule = {
  hover: ({ module, index: hoverIndex, onMove }, monitor, component) => {
    const { module: dragModule, index: dragIndex } = monitor.getItem();
    if (dragModule.name === module.name) {
      return;
    }
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect(); // eslint-disable-line
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 4;

    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    monitor.getItem().index = hoverIndex;
    onMove(dragModule, dragIndex, hoverIndex);
  },
};
