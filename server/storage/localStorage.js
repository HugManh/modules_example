const fs = require('fs-extra');
const path = require("path");
const timers = require('../modules/time');
const multer = require("multer");
const { mkdirSync } = require('fs');
const store = path.join(path.dirname(__dirname), 'localData');
const _current_time = timers.unixTimestamp();
const pathTime = path.join(store, _current_time);

// Set storage on the local filesytem
const localStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(store)) {
            mkdirSync(store)
        }
        if (!fs.existsSync(pathTime)) {
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
