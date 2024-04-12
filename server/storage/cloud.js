const streamifier = require('streamifier');
const { cloudinary } = require('../config');

const cloud = {
    uploadSingleStream: (file) => {
        return new Promise(resolve => {
            let stream = cloudinary.uploader.upload_stream((error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });

            streamifier.createReadStream(file.buffer).pipe(stream);
        })
    },
    uploadSingle: async (file) => {
        const res = await cloudinary.uploader.upload(file, {
            folder: "dino-gallery",
            resource_type: "auto",
        });
        return res;
    }
}

module.exports = cloud