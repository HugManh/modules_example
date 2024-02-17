const fse = require('fs-extra');
const { time } = require('../utils');
const { localMetadata, localData } = require('../config');
const { cloudinaryS } = require('../storage');

const imageCtrl = {
    uploadImage: async (req, res) => {

        if (!req.file) {
            return res.status(400).json({ success: false, error: { code: 400, message: "No file uploaded!" } });
        }
        try {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            result = await cloudinaryS.uploadSingle(dataURI)
            // result = await cloudinaryS.uploadSingleStream(req.file)
            lists = await listDirection()
            lists.push({ url: result.secure_url })
            fse.writeFileSync(localMetadata, JSON.stringify(lists))
            res.status(200).json({
                success: true,
                message: "File uploaded successfully",
                data: {
                    filename: req.file.originalname,
                    type: req.file.mimetype,
                    size: req.file.size,
                    url: result.secure_url,
                },
            })
        } catch (e) {
            return res.status(500).json({ success: false, error: { code: e.code, message: e.message } });
        }
    },
    upload: async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ success: false, error: { code: 400, message: "No file uploaded!" } });
        }
        try {
            lists = await listDirection()
            lists.push({ url: req.file.path })
            fse.writeFileSync(localMetadata, JSON.stringify(lists))
            res.status(200).json({
                success: true,
                message: "File uploaded successfully",
                data: {
                    filename: req.file.originalname,
                    type: req.file.mimetype,
                    size: req.file.size,
                    url: req.file.path,
                },
            })
        } catch (e) {
            return res.status(500).json({ success: false, error: { code: e.code, message: e.message } });
        }
    },
    getAll: async (req, res) => {
        list = await listDirection()
        res.status(200).json({
            success: true,
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
    if (!fse.existsSync(localMetadata)) {
        console.error("Not exits directory: ", localMetadata)
        fse.writeJsonSync(localMetadata, [])
    }
    jsonString = await fse.readFile(localMetadata, "utf8")
    listImage = JSON.parse(jsonString);
    return listImage
}

module.exports = imageCtrl;
