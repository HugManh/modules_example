const express = require('express');
const app = express();
const cors = require('cors')
const fs = require('fs-extra')

const multer = require("multer");
const shortid = require("shortid")
const path = require("path");
const { mkdir, mkdirSync } = require('fs');

const store = path.join(path.dirname(__dirname), 'uploads')
// Set storage on the local filesytem
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(path)) {
            mkdirSync(store)
        }
        cb(null, store)
    },[]
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage })

app.use(cors())

/** Process POST request with a mutter's middleware */
app.post('/upload', upload.single('file'), function (req, res) {
    console.log(req.file);
    res.send(JSON.stringify(req.file));
});

const PORT = 3000
/** Run the app */
app.listen(PORT);
console.log("Starting server on port 3000...");
