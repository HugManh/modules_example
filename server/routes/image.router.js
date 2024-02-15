const imageRoute = require("express").Router();
const { upload } = require('../storage/localStorage');
const { imageCtrl } = require("../controller");

imageRoute
    .route('/upload')
    .post(upload.single('file'), imageCtrl.upload);
imageRoute
    .route('/images')
    .get(imageCtrl.getAll)
imageRoute
    .route('/:time/:name')
    .get(upload.single('file'), imageCtrl.getByName)

module.exports = imageRoute
