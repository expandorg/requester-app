export const FORM_DND_ID = 'FORM_DND_ID';

export const uniqName = (meta, totalModules) => `${meta.type}-${totalModules}`;

export const emptyTarget = {
  drop: ({ onAdd }, monitor) => {
    const { id, meta } = monitor.getItem();
    onAdd(id, meta);
  },
};

export const dropAreaTarget = {
  canDrop: (props, monitor) => {
    const { meta, added } = monitor.getItem();
    return !!meta && !added;
  },
  drop: ({ onAddModule }, monitor) => {
    if (!monitor.didDrop()) {
      const { id, meta, added } = monitor.getItem();
      if (!added) {
        onAddModule(id, meta);
      }
    }
  },
};

export const availableTarget = {
  drop: ({ onRemoveModule }, monitor) => {
    const { id } = monitor.getItem();
    onRemoveModule(id);
  },
};

export const metaSource = {
  beginDrag: ({ meta, totalModules, onPreview }) => {
    onPreview(null);
    return {
      id: uniqName(meta, totalModules),
      meta,
      order: totalModules,
    };
  },
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
    const item = monitor.getItem();

    const { id: dragId, order: dragOrder, meta } = item;
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
    if (!item.added) {
      item.added = true;
    }
  },
};
