const multer = require("multer");
const { localData } = require('../config');

// The disk storage engine gives you full control on storing files to disk.
const _diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, localData)
    },
    filename: function (req, file, cb) {
        console.log(file.originalname);
        cb(null, file.originalname)
    }
})
const upload2Disk = multer({ storage: _diskStorage }).single('file')

// The memory storage engine stores the files in memory as Buffer objects.
const _memStorage = multer.memoryStorage();
const upload2Mem = multer({ storage: _memStorage }).single('file');

module.exports = { upload2Disk, upload2Mem }