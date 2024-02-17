const imageRouter = require("express").Router();
const { upload2Disk, upload2Mem } = require('../middleware/upload');
const { imageCtrl } = require("../controller");

imageRouter
    .route('/uploadImage')
    .post(upload2Mem, imageCtrl.uploadImage);
imageRouter
    .route('/upload')
    .post(upload2Disk, imageCtrl.upload);
imageRouter
    .route('/images')
    .get(imageCtrl.getAll)
// imageRouter
//     .route('/:time/:name')
//     .get(upload2Disk, imageCtrl.getByName)

module.exports = imageRouter
