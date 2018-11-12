import multer, { memoryStorage } from 'multer';

const range = count => [...Array(count).keys()];

export const dataUpload = multer({
  storage: memoryStorage(),
});

export const dataRepo = {};

export const createData = (id, draftId) => ({
  id,
  draftId,
  columns: [
    { name: 'column 1', type: 'string', skipped: false },
    { name: 'column 2', type: 'string', skipped: false },
    { name: 'column 3', type: 'string', skipped: false },
    { name: 'column 4', type: 'string', skipped: true },
    { name: 'column 5', type: 'string', skipped: false },
    { name: 'column 6', type: 'string', skipped: false },
    { name: 'column 7', type: 'string', skipped: false },
    { name: 'column 8', type: 'string', skipped: false },
    { name: 'column 9', type: 'string', skipped: false },
  ],
  values: range(100).map(idx => range(9).map(j => idx * 10 + j)),
});
