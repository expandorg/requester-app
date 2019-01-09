export const STEPS_DND_ID = 'STEPS_DND_ID';

export const source = {
  beginDrag: ({ id, order }) => ({
    id,
    order,
  }),
  canDrag: ({ isOnboarding }) => isOnboarding,
  endDrag: ({ onEndDrag }) => {
    onEndDrag();
  },
};

export const target = {
  hover: ({ id, order, onMove, isOnboarding }, monitor, component) => {
    if (!isOnboarding) {
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
  canDrop: ({ isOnboarding }) => isOnboarding,
};
