import request from '../lib/utilities/request'

export function apiUpload(formData) {
    return request.post('/files', formData)
}
export function getListFile() {
    return request.get('/files')
}