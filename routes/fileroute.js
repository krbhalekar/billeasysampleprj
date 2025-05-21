let express = require('express');
let route = express.Router();
let multer = require('multer');
let path = require('path');
let { fileupload, getfileinfo } = require('../controller/filecontroller');
let jwt = require('../utils/tokenhelper');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

let upload = multer({ storage: storage, limits: { fileSize: 2 * 1024 * 1024 } });

route.post('/upload', jwt.verifyToken, upload.single('file'), fileupload);
route.get('/files/:id', jwt.verifyToken, getfileinfo);

module.exports = route;