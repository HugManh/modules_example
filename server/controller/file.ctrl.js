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
            console.log("[Info] upload: ", req.file)
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
    read: (req, resp) => {
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
                console.log('statusCode:', res.statusCode);
                resp.set(res.headers)
                res.pipe(resp);
            });
        request.on('error', (e) => {
            console.error(e);
        });
        request.end();
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
