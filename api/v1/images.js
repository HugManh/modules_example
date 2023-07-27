const router = require("express").Router();
const fs = require('fs-extra')
const multer = require("multer");
const shortid = require("shortid")
const path = require("path");
const { mkdirSync } = require('fs');
const timers = require('../modules/times');
const transform = require('../modules/resize');

const store = path.join(path.dirname(__dirname), 'storages')
const currenttime = timers.unixTimestamp()
const pathTime = path.join(store, currenttime)
const _url = "http://localhost:3000/api/v1"

// Set storage on the local filesytem
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(store);
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
    console.log(dir)
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


router
    .route('/upload')
    .post(upload.single('file'), function (req, res) {
        console.log(req.file);
        res.status(200).json({
            message: "File uploaded successfully",
            data: {
                file_path: currenttime + '/' + req.file.filename,
                file_url: _url + '/' + currenttime + '/' + req.file.filename
            },
            success: true,
        })
    });

router
    .route('/images')
    .get(function (req, res) {
        console.log(store);
        fileNames = []
        listDirection(store, _url)
        res.status(200).json({
            message: "Get all images",
            data: fileNames
        })
    })

router
    .route('/:time/:name')
    .get(upload.single('file'), function (req, res) {
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



module.exports = router