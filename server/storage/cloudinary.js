const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryS = {
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

module.exports = cloudinaryS