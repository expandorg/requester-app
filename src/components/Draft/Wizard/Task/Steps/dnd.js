export const STEPS_DND_ID = 'STEPS_DND_ID';

export const source = {
  beginDrag: ({ id, order }) => ({
    id,
    order,
  }),
  canDrag: ({ isTask }) => !isTask,
  endDrag: ({ onEndDrag }) => {
    onEndDrag();
  },
};

export const target = {
  hover: ({ id, order, onMove, isTask }, monitor, component) => {
    if (isTask) {
      return;
    }

    const { id: dragId, order: dragOrder } = monitor.getItem();
    if (dragId === id) {
      return;
    }

    const hoverBoundingRect = component
      .getDecoratedComponentInstance()
      .containerRef.getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragOrder < order && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragOrder > order && hoverClientY > hoverMiddleY) {
      return;
    }

    onMove(dragId, id);
  },
  canDrop: ({ isTask }) => !isTask,
};
