export const FORM_DND_ID = 'FORM_DND_ID';

export const uniqName = (meta, totalModules) => `${meta.type}-${totalModules}`;

export const targetEmpty = {
  canDrop: () => true,
  drop: (props, monitor) => {
    const { id, meta } = monitor.getItem();
    props.onAdd(id, meta);
  },
};

export const metaSource = {
  beginDrag: ({ meta, totalModules }) => ({
    id: uniqName(meta, totalModules),
    meta,
    order: totalModules,
  }),
  endDrag: ({ onEndDrag }, monitor) => {
    onEndDrag(monitor.getItem().id);
  },
};

export const moduleSource = {
  beginDrag: props => ({
    id: props.module.name,
    order: props.order,
  }),
};

export const moduleTarget = {
  hover: ({ id, order, onMove }, monitor, component) => {
    const { id: dragId, order: dragOrder, meta } = monitor.getItem();
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
    onMove(dragId, id, meta);
  },
};
