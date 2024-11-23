import request from '../lib/request';

export function apiUpload(formData) {
  return request.post('/files', formData);
}
export function getListFile() {
  return request.get('/files');
}
