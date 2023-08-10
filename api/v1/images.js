const router = require("express").Router();
const fs = require('fs-extra');
const path = require("path");
const timers = require('../modules/times');
const transform = require('../modules/resize');
const { upload } = require('../configs/storages');
const store = path.join(path.dirname(__dirname), 'storages');
const _url = "http://localhost:3000/api/v1";
const currenttime = timers.unixTimestamp();


let fileNames = []
function listDirection(dir, pa) {
    if (!fs.existsSync(dir)) {
        console.error("Not exits directory: ", dir)
        return;
    }
    let files = fs.readdirSync(dir)
    for (let i = 0; i < files.length; i++) {
        let filename = path.join(dir, files[i]);
        let _url = pa + '/' + files[i];
        let stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            listDirection(filename, _url); //recurse
        } else {
            fileNames.push({ name: files[i], url: _url })
        };
    };
    console.log('fileNames: ', fileNames);
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
