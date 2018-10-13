export const FORM_DND_ID = 'FORM_DND_ID';

export const targetEmpty = {
  canDrop: () => true,
  drop: (props, montior) => {
    props.onAdd(montior.getItem());
  },
};

export const sourceItem = {
  beginDrag: () => ({}),
  endDrag: () => {},
};

export const moduleSource = {
  beginDrag: props => ({
    id: props.module.name,
    order: props.order,
  }),
  endDrag: () => {},
};

export const moduleTarget = {
  hover: ({ id: hoverId, order: hoverOrder, onMove }, monitor, component) => {
    const { id: dragId, order: dragOrder } = monitor.getItem();
    if (dragId === hoverId) {
      return;
    }

    const hoverBoundingRect = component
      .getDecoratedComponentInstance()
      .containerRef.getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragOrder < hoverOrder && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragOrder > hoverOrder && hoverClientY > hoverMiddleY) {
      return;
    }

    onMove(dragId, hoverId);
  },
};
