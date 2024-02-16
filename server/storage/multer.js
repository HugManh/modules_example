const fse = require('fs-extra');
const path = require("path");
const multer = require("multer");
const { mkdirSync } = require('fs');
const { time } = require('../utils');

const store = path.join(path.dirname(__dirname), 'localData');
const _current_time = time.unixTimestamp();
const pathTime = path.join(store, _current_time);

// Set storage on the local filesytem
const _diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fse.existsSync(store)) {
            mkdirSync(store)
        }
        if (!fse.existsSync(pathTime)) {
            mkdirSync(pathTime)
        }
        cb(null, pathTime)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const _memStorage = multer.memoryStorage();

const uploadLocal = multer({ storage: _diskStorage }).single('file')
const uploadMem = multer({ storage: _memStorage }).single('file');

module.exports = { uploadLocal, uploadMem }
