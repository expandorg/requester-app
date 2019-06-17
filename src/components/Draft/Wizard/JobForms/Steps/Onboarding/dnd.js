import immer from 'immer';

const type = 'STEPS_DND_ID';

export const replace = (collection, dragIndex, hoverIndex) => {
  const dragged = collection[dragIndex];
  const hovered = collection[hoverIndex];
  return immer(collection, d => {
    d[dragIndex] = hovered;
    d[hoverIndex] = dragged;
  });
};

export const source = (index, onEndDrag) => ({
  item: {
    index,
    type,
  },
  collect: monitor => ({
    isDragging: monitor.isDragging(),
  }),
  end: () => {
    onEndDrag();
  },
});

export const target = (ref, hoverIndex, onMove) => ({
  accept: type,
  hover: (item, monitor) => {
    if (!ref.current || hoverIndex === item.index) {
      return;
    }
    const hoverBoundingRect = ref.current.getBoundingClientRect();

    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    if (item.index < hoverIndex && hoverClientX < hoverMiddleX) {
      return;
    }
    if (item.index > hoverIndex && hoverClientX > hoverMiddleX) {
      return;
    }
    onMove(item.index, hoverIndex);
    item.index = hoverIndex;
  },
});
