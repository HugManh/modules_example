const fileRouter = require("express").Router();
const { upload } = require('../../../middleware');
const { fileCtrl } = require("../../../controller");

fileRouter
    .route('/files')
    .post(upload, fileCtrl.upload)
    .get(fileCtrl.list)
fileRouter
    .route('/:bucketname/:objectpath(*)/:filename')
    .get(fileCtrl.read)
fileRouter
    .route('/:asset_id')
    .delete(fileCtrl.delete)

module.exports = fileRouter
