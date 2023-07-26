const express = require('express');
const app = express();
const cors = require('cors')
const fs = require('fs-extra')

const multer = require("multer");
const shortid = require("shortid")
const path = require("path");
const { mkdir, mkdirSync, createReadStream } = require('fs');
const timers = require('./times');
const transform = require('./resize');

const store = path.join(path.dirname(__dirname), 'storages')
const currenttime = timers.unixTimestamp()
const pathTime = path.join(store, currenttime)

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


let fileNames = []
function listDirection(dir, pa) {
    if (!fs.existsSync(dir)) {
        console.log("no dir ", dir)
        return;
    }
    var files = fs.readdirSync(dir)
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(dir, files[i]);
        var test = pa + '/' + files[i];
        console.log(test);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            listDirection(filename, test); //recurse
        } else {
            fileNames.push(test)
        };
    };
}


app.use(cors())

app.post('/upload', upload.single('file'), function (req, res) {
    console.log(req.file);
    res.status(200).json({
        message: "File uploaded successfully",
        data: {
            file_path: currenttime + '/' + req.file.filename,
            file_url: "http://localhost:3000/" + currenttime + '/' + req.file.filename
        },
        success: true,
    })
});

app.get('/:time/:name', upload.single('file'), function (req, res) {
    const name = req.params['name']
    const time = req.params['time']
    const { w, h } = req.query
    let width, height
    if (w) {
        width = parseInt(w)
    }
    if (h) {
        height = parseInt(h)
    }
    console.log(name);
    transform.resize(store + '/' + time + '/' + name, '', width, height).pipe(res);
})

app.get('/api/v1/images', function (req, res) {
    fileNames = []
    listDirection(store, "http://localhost:3000")
    res.status(200).json({
        message: "Get all images",
        data: fileNames
    })
})

const PORT = 3000
/** Run the app */
app.listen(PORT);
console.log("Starting server on port 3000...");
