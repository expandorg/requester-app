export const STEPS_DND_ID = 'STEPS_DND_ID';

export const source = {
  beginDrag: ({ step, order }) => ({
    id: step.id,
    order,
  }),
  canDrag: ({ isTask }) => !isTask,
};

export const target = {
  hover: ({ step, order, onMove, isTask }, monitor, component) => {
    if (isTask) {
      return;
    }

    const { id: dragId, order: dragOrder } = monitor.getItem();
    if (dragId === step.id) {
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

    onMove(dragId, step.id);
  },
  canDrop: ({ isTask }) => !isTask,
};
