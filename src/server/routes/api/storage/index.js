const storage = require("express").Router();
const { upload } = require('../../../middleware');
const { storage } = require("../../../controller");

storage
    .route('/files')
    .post(upload, storage.upload)
    .get(storage.list)
storage
    .route('/:bucketname/:objectpath(*)/:filename')
    .get(storage.read)
storage
    .route('/:asset_id')
    .delete(storage.delete)

module.exports = storage
