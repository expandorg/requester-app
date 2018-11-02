export const FORM_DND_ID = 'FORM_DND_ID';

export const getPathId = path => path.join('-');

export const emptyTarget = {
  drop: ({ onAdd }, monitor) => {
    const { meta } = monitor.getItem();
    onAdd(meta);
  },
};

export const findParent = (modules, path, createParent = false) => {
  let mods = modules;
  if (path) {
    let p = path;
    while (p.length > 1) {
      const [index, ...rest] = p;
      p = rest;
      const module = mods[index];
      if (!module.modules && createParent) {
        module.modules = [];
      }
      mods = module.modules;
    }
  }
  return mods;
};

export const nestedTarget = {
  hover: ({ path, onMove }, monitor) => {
    if (!monitor.isOver({ shallow: true })) {
      return;
    }
    const item = monitor.getItem();
    const newPath = [...path, 0];
    onMove(item.path, newPath, item.meta);
    item.path = newPath;
  },
};

export const dropAreaTarget = {
  canDrop: (props, monitor) => {
    const { meta, path } = monitor.getItem();
    return !!meta && path.length === 0;
  },
  drop: ({ onAddModule }, monitor) => {
    if (!monitor.didDrop()) {
      const { path, meta } = monitor.getItem();
      if (path.length === 0) {
        onAddModule(meta);
      }
    }
  },
};

export const availableTarget = {
  drop: ({ onRemoveModule }, monitor) => {
    const { path } = monitor.getItem();
    onRemoveModule(path);
  },
};

export const metaSource = {
  beginDrag: ({ meta, onPreview }) => {
    onPreview(null);
    return {
      meta,
      path: [],
    };
  },
  endDrag: ({ onEndDrag }, monitor) => {
    onEndDrag(monitor.getItem().path);
  },
};

export const moduleSource = {
  beginDrag: props => ({
    id: props.module.name,
    path: props.path,
  }),
};

export const moduleTarget = {
  hover: ({ path, onMove }, monitor, component) => {
    if (!monitor.isOver({ shallow: true })) {
      return;
    }
    const item = monitor.getItem();

    if (getPathId(path) === getPathId(item.path)) {
      return;
    }

    const parentPath = path.slice(0, -1);
    const parentIremPath = item.path.slice(0, -1);

    if (getPathId(parentPath) === getPathId(parentIremPath)) {
      const {
        top,
        bottom,
      } = component
        .getDecoratedComponentInstance()
        .containerRef.getBoundingClientRect();

      const { y } = monitor.getClientOffset();
      const dragY = y - top;

      const middle = (bottom - top) / 2;

      const hoverOrder = path[path.length - 1];
      const dragOrder = item.path[item.path.length - 1];

      if (dragY < middle) {
        if (dragOrder <= hoverOrder) {
          return;
        }
      }
      if (dragY > middle) {
        if (dragOrder > hoverOrder) {
          return;
        }
      }
    }
    console.log(item.path, path);
    onMove(item.path, path, item.meta);
    item.path = path;
  },
};
