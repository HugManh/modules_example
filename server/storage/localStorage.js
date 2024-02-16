const fse = require('fs-extra');
const path = require("path");
const multer = require("multer");
const { mkdirSync } = require('fs');
const { time } = require('../utils');

const store = path.join(path.dirname(__dirname), 'localData');
const _current_time = time.unixTimestamp();
const pathTime = path.join(store, _current_time);

// Set storage on the local filesytem
const localStorage = multer.diskStorage({
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

const upload = multer({ storage: localStorage })

module.exports = { upload }
