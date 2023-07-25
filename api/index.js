const express = require('express');
const app = express();
const cors = require('cors')
const fs = require('fs-extra')

const multer = require("multer");
const shortid = require("shortid")
const path = require("path");
const { mkdir, mkdirSync, createReadStream } = require('fs');
const timers = require('./times');

const store = path.join(path.dirname(__dirname), 'storages')
const pathTime = path.join(store, timers.unixTimestamp())

// Set storage on the local filesytem
const storage = multer.diskStorage({
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
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage })

app.use(cors())

app.post('/upload', upload.single('file'), function (req, res) {
    console.log(req.file);
    res.status(200).json({
        message: "File uploaded successfully",
        data: {
            file_path: "storages/" + req.file.filename,
            file_url: "http://localhost:3000/" + req.file.filename
        },
        success: true,
    })
});

app.get('/:name', upload.single('file'), function (req, res) {
    const name = req.params['name']
    console.log(name);
    const readable = createReadStream(pathTime + '/' + name);
    readable.pipe(res)
})

const PORT = 3000
/** Run the app */
app.listen(PORT);
console.log("Starting server on port 3000...");
