import path from 'path';

export const localData = path.join(
  path.dirname(__dirname),
  'server',
  'localData'
);

export const localMetadata = path.join(
  path.dirname(__dirname),
  'server',
  'localMetadata',
  'data.json'
);

export const dbStorage = path.join(localData, 'storage.json');
