const imageRouter = require("express").Router();
const { upload } = require('../../../middleware/upload');
const { imageCtrl } = require("../../../controller");

imageRouter
    .route('/upload')
    .post(upload, imageCtrl.upload);
imageRouter
    .route('/images')
    .get(imageCtrl.getAll)
// imageRouter
//     .route('/:time/:name')
//     .get(upload2Disk, imageCtrl.getByName)

module.exports = imageRouter
