const fse = require('fs-extra');
const path = require("path");
const { time } = require('../utils');
const cloudinary = require('../storage/cloudinary');
const store = path.join(path.dirname(__dirname), 'localData');
const localData = path.join(path.dirname(__dirname), 'localMetadata', 'data.json');
const _url = "http://localhost:3000/api/v1";
const _current_time = time.unixTimestamp();

const imageCtrl = {
    uploadImage: async (req, res) => {
        if (!req.file) {
            res.status(404).json({ message: "No file uploaded!", success: false });
        }
        try {
            lists = await listDirection()
            lists.push({ url: req.file.path, filename: req.file.originalname })
            fse.writeFileSync(localData, JSON.stringify(lists))
            res.json({
                data: {
                    file_url: req.file.path
                },
                success: true,
            });
        } catch (error) {
            res.status(404).json({
                message: "File upload: " + error,
                success: false,
            })
        }
    },
    upload: async (req, res) => {
        if (!req.file) {
            res.status(404).json({ message: "No file uploaded!", success: false });
        }
        try {
            pathFile = _current_time + '/' + req.file.originalname
            lists = await listDirection()
            lists.push({ url: _url + "/" + pathFile, filename: req.file.originalname })
            fse.writeFileSync(localData, JSON.stringify(lists))
            res.status(200).json({
                message: "File uploaded successfully",
                data: {
                    file_path: pathFile,
                    file_url: _url + '/' + pathFile
                },
                success: true,
            })
        } catch (error) {
            res.status(404).json({
                message: "File upload: " + error,
                success: false,
            })
        }
    },
    getAll: async (req, res) => {
        list = await listDirection()
        res.status(200).json({
            message: "Get all images",
            data: list
        })
    },
    getByName: (req, res) => {
        try {
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
            // image.resize(store + '/' + time + '/' + name, '', width, height).pipe(res);
            fs.createReadStream(store + '/' + time + '/' + name).pipe(res);
        } catch (error) {
            res.status(404).json({
                message: "Get file: " + error,
                success: false,
            })
        }
    }
}

async function listDirection() {
    if (!fse.existsSync(localData)) {
        console.error("Not exits directory: ", localData)
        return;
    }
    jsonString = await fse.readFile(localData, "utf8")
    listImage = JSON.parse(jsonString);
    return listImage
}

module.exports = imageCtrl;
