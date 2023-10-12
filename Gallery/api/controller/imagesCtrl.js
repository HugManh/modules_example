const fs = require('fs-extra');
const path = require("path");
const timers = require('../modules/times');
const transform = require('../modules/resize');
const store = path.join(path.dirname(__dirname), 'storages');
const _url = "http://localhost:3000/api/v1";
const _current_time = timers.unixTimestamp();

const ImagesCtrl = {
    ImgUpload: (req, res) => {
        console.log(req.file);
        res.status(200).json({
            message: "File uploaded successfully",
            data: {
                file_path: _current_time + '/' + req.file.filename,
                file_url: _url + '/' + _current_time + '/' + req.file.filename
            },
            success: true,
        })
    },
    ImgGetAll: (req, res) => {
        console.log(store);
        fileNames = []
        listDirection(store, _url)
        res.status(200).json({
            message: "Get all images",
            data: fileNames
        })
    },
    ImgGetByName: (req, res) => {
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
    }
}

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

module.exports = ImagesCtrl;
