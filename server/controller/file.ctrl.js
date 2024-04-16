const http = require('http');
const https = require('https');
const { cloud } = require('../storage');
const { cloudinary, constant } = require('../config');

const fileCtrl = {
    upload: async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ success: false, error: { code: 400, message: "No file uploaded!" } });
        }
        try {
            const bucket = 'dino-gallery'
            result = await cloud.upload(bucket, req)
            // result = await cloud.uploadSingleStream(req.file)
            // lists = await listDirection()
            // lists.push({ url: req.file.path })
            // fse.writeFileSync(localMetadata, JSON.stringify(lists))
            res.status(200).json({
                data: {
                    public_id: result.public_id,
                    url: result.secure_url,
                    demo_url: "http://localhost:3000/api/v1/" + result.public_id,
                    size: result.bytes,
                    type: result.resource_type + '/' + result.format,
                },
                message: "File uploaded successfully",
                success: true,
            })
        } catch (e) {
            return res.status(500).json({
                error: { code: e.code, message: e.message },
                success: false,
            });
        }
    },
    read: async (req, resp) => {
        const { bucketname, objectpath, filename } = req.params;
        // resp.redirect(`${constant.endpoint}/${cloudinary.config().cloud_name}/${bucketname}/${objectpath}/${filename}`);
        // Dont use redirect
        const options = {
            method: 'GET',
        };
        let ssl = true
        const transport = ssl ? https : http;
        const request = transport.request(
            `${constant.endpoint}/${cloudinary.config().cloud_name}/${bucketname}/${objectpath}/${filename}`,
            options,
            (res) => {
                resp.set(res.headers)
                res.pipe(resp);
            });
        request.on('error', (e) => {
            console.error(e);
        });
        request.end();
    },
    list: async (req, resp) => {
        const bucket = 'dino-gallery'
        const data = await cloud.list(bucket)
        let response = [];
        for (v of data.resources) {
            response.push({
                asset_id: v.asset_id,
                demo_url: "http://localhost:3000/api/v1/" + v.public_id,
                format: v.format,
                resource_type: v.resource_type,
                bytes: v.bytes,
                created_at: v.created_at,
            })
        }
        resp.status(200).json({
            data: response,
            message: "List file in gallery",
            success: true,
        })
    },
    delete: async (req, resp) => {
        const result = await cloud.delete(req)
        resp.status(200).json({
            data: result,
            message: "Delete file successfully",
            success: true,
        })
    },
}


// async function listDirection() {
//     if (!fse.existsSync(localMetadata)) {
//         console.error("Not exits directory: ", localMetadata)
//         fse.writeJsonSync(localMetadata, [])
//     }
//     jsonString = await fse.readFile(localMetadata, "utf8")
//     listImage = JSON.parse(jsonString);
//     return listImage
// }

module.exports = fileCtrl;
