const imageRoute = require("express").Router();
const { uploadLocal, uploadMem } = require('../storage');
const { imageCtrl } = require("../controller");

imageRoute
    .route('/uploadImage')
    .post(uploadMem, imageCtrl.uploadImage);
imageRoute
    .route('/upload')
    .post(uploadLocal, imageCtrl.upload);
imageRoute
    .route('/images')
    .get(imageCtrl.getAll)
imageRoute
    .route('/:time/:name')
    .get(uploadLocal, imageCtrl.getByName)

module.exports = imageRoute
