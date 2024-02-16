const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

function uploadSingle(file) {
    return new Promise(resolve => {
        console.log("result.secure_url: ", file);
        let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });

        streamifier.createReadStream(file.buffer).pipe(stream);
    })
}

module.exports = { uploadSingle }