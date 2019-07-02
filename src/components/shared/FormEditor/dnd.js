import { supportNesting } from './modules';

import { treeEditor } from './Tree';

export const FORM_DND_ID = 'FORM_DND_ID';

export const emptyTarget = {
  drop: ({ onAdd }, monitor) => {
    const { meta } = monitor.getItem();
    onAdd(meta);
  },
};

export const nestedTarget = {
  hover: ({ path, onMove }, monitor) => {
    if (!monitor.isOver({ shallow: true })) {
      return;
    }
    const item = monitor.getItem();
    const newPath = [...path, 0];
    onMove(item.path, newPath, item.meta);
    item.path = treeEditor.pathOnRemoved(item.path, newPath);
  },
};

export const nestedModuleTarget = {
  canDrop: () => false,
};

export const dropAreaTarget = {
  canDrop: (props, monitor) => {
    const { meta, path } = monitor.getItem();
    return !!meta && path.length === 0;
  },
  drop: ({ onAdd }, monitor) => {
    if (!monitor.didDrop()) {
      const { path, meta } = monitor.getItem();
      if (path.length === 0) {
        onAdd(meta);
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
  endDrag: ({ onEndDrag }, monitor) => {
    onEndDrag(monitor.getItem().path);
  },
};

const getContainerRect = c => c.containerRef.getBoundingClientRect();

const getParentId = path =>
  treeEditor.getIdByPath(treeEditor.getParentPath(path));

const getControlEdges = (top, bottom, nesting, padding = 25) => {
  const topEdge = nesting ? padding : (bottom - top) / 2;
  const bottomEdge = nesting ? bottom - top - padding : (bottom - top) / 2;
  return [topEdge, bottomEdge];
};

export const moduleTarget = {
  hover: ({ path, onMove, module, controls }, monitor, component) => {
    if (!monitor.isOver({ shallow: true })) {
      return;
    }
    const item = monitor.getItem();

    if (treeEditor.getIdByPath(path) === treeEditor.getIdByPath(item.path)) {
      return;
    }

    const { top, bottom } = getContainerRect(component);

    const { y } = monitor.getClientOffset();
    const dragY = y - top;

    const [topEdge, bottomEdge] = getControlEdges(
      top,
      bottom,
      supportNesting(controls[module.type].module)
    );
    const compare = treeEditor.comparePaths(item.path, path);

    if (dragY < topEdge && compare > 0) {
      onMove(item.path, path, item.meta);
      item.path = treeEditor.pathOnRemoved(item.path, path);
      return;
    }

    if (dragY > bottomEdge && compare <= 0) {
      const sameLevel = getParentId(path) === getParentId(item.path);

      const movePath = sameLevel ? path : treeEditor.pathAfter(path);

      onMove(item.path, movePath, item.meta);
      item.path = treeEditor.pathOnRemoved(item.path, movePath);
    }
  },
};
