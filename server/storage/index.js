const { uploadLocal, uploadMem } = require("./multer")
const { uploadSingle } = require("./cloudinary")

module.exports = {
    uploadLocal,
    uploadMem,
    uploadSingle
}