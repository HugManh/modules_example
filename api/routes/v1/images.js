const router = require("express").Router();
const { upload } = require('../../configs/storages');
const ImagesCtrl = require("../../controller/imagesCtrl");



router
    .route('/upload')
    .post(upload.single('file'), ImagesCtrl.ImgUpload);
router
    .route('/images')
    .get(ImagesCtrl.ImgGetAll)
router
    .route('/:time/:name')
    .get(upload.single('file'), ImagesCtrl.ImgGetByName)

module.exports = router
