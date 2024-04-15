const fileRouter = require("express").Router();
const { upload } = require('../../../middleware');
const { fileCtrl } = require("../../../controller");

fileRouter
    .route('/files')
    .post(upload, fileCtrl.upload);
fileRouter
    .route('/:bucketname/:objectpath(*)/:filename')
    .get(fileCtrl.read)

module.exports = fileRouter
