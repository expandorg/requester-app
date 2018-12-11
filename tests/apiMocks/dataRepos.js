import multer, { memoryStorage } from 'multer';

const range = count => [...Array(count).keys()];

export const dataUpload = multer({
  storage: memoryStorage(),
});

export const dataRepo = {};

export const createData = (id, draftId) => ({
  id,
  draftId,
  columns: range(9).map(idx => ({
    name: `column ${idx + 1}`,
    type: 'string',
    skipped: false,
  })),
  values: range(85).map(idx => range(9).map(j => `${idx * 10 + j}`)),
});
