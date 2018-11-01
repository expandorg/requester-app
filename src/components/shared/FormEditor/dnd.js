export const FORM_DND_ID = 'FORM_DND_ID';

export const emptyTarget = {
  drop: ({ onAdd }, monitor) => {
    const { meta } = monitor.getItem();
    onAdd(meta);
  },
};

export const dropAreaTarget = {
  canDrop: (props, monitor) => {
    const { meta, order } = monitor.getItem();
    return !!meta && order === -1;
  },
  drop: ({ onAddModule }, monitor) => {
    if (!monitor.didDrop()) {
      const { order, meta } = monitor.getItem();
      if (order === -1) {
        onAddModule(meta);
      }
    }
  },
};

export const availableTarget = {
  drop: ({ onRemoveModule }, monitor) => {
    const { order } = monitor.getItem();
    onRemoveModule(order);
  },
};

export const metaSource = {
  beginDrag: ({ meta, onPreview }) => {
    onPreview(null);
    return {
      meta,
      order: -1,
    };
  },
  endDrag: ({ onEndDrag }, monitor) => {
    onEndDrag(monitor.getItem().order);
  },
};

export const moduleSource = {
  beginDrag: props => ({
    id: props.module.name,
    order: props.order,
  }),
};

export const moduleTarget = {
  hover: ({ nested, order, onMove }, monitor, component) => {
    if (!monitor.isOver({ shallow: true })) {
      return;
    }

    const item = monitor.getItem();

    if (order === item.order) {
      return;
    }

    if (nested) {
      return;
    }

    const {
      top,
      bottom,
    } = component
      .getDecoratedComponentInstance()
      .containerRef.getBoundingClientRect();

    const { y } = monitor.getClientOffset();
    const dragY = y - top;

    const middle = (bottom - top) / 2;

    if (dragY < middle) {
      if (item.order <= order) {
        return;
      }
    }
    if (dragY > middle) {
      if (item.order > order) {
        return;
      }
    }
    onMove(item.order, order, item.meta);
    item.order = order;
  },
};
