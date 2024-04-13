const streamifier = require('streamifier');
const { cloudinary } = require('../config');

const cloud = {
    uploadSingleStream: (file) => {
        console.log("cloudinary conf: ", cloudinary);
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
    uploadSingle: async (name, data) => {
        try {
            let now = new Date();
            const objectPath = now.toLocaleDateString("zh-Hans-CN") 
            await cloudinary.api.create_folder('dino-gallery/' + objectPath)
            const res = await cloudinary.uploader.upload(data, {
                folder: objectPath,
                resource_type: "auto",
            })
            console.log("=======", res);
            return res;
        } catch (error) {
            console.log("error===============", error);
        }
    }
}

module.exports = cloud