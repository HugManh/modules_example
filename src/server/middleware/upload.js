import multer from 'multer';
import { localData } from '../config';
import DatauriParser from 'datauri/parser';
import path from 'path';

// The disk storage engine gives you full control on storing files to disk.
const _diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, localData);
  },
  filename: function (req, file, cb) {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});
const upload2Disk = multer({ storage: _diskStorage }).single('file');

// The memory storage engine stores the files in memory as Buffer objects.
const _memStorage = multer.memoryStorage();
const upload2Mem = multer({ storage: _memStorage }).single('file');
const upload = process.env.NODE_ENV !== 'production' ? upload2Mem : upload2Disk;

const parser = new DatauriParser();
/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from the string buffer
 */
const dataUri = (req) => {
  const extName = path.extname(req.file.originalname).toString();
  const file64 = parser.format(extName, req.file.buffer);
  return file64;
};

module.exports = { upload, dataUri };
