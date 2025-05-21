let fileservice = require('../services/fileservice');
let { response } = require('../utils/responsehelper');
let fileupload = async (req, res) => {
    try {
        if (!req.file) {
            res.statusCode = 400;
            res.send(response("BE007", ""));
        }
        let title = req.body.title;
        let description = req.body.description;
        let originalname = req.file.originalname;
        let path = req.file.path;
        let user = req.user;
        console.log({ user });

        let result = await fileservice.storeFileInfo(user.id, originalname, path, title, description);
        if (result.length > 0) {
            let data = {
                fileid: result[0].id,
                filestatus: 'uploaded'
            }
            res.send(response("BE008", data));
        } else {
            res.statusCode = 400;
            res.send(response("BE000", ""));
        }
    } catch (error) {
        res.statusCode = 500;
        res.send(response("BE000", ""));
    }

}

let getfileinfo = async (req, res) => {
    try {
        let fileid = req.params.id;
        let user = req.user;
        let result = await fileservice.getFileInfo(user.id, fileid);
        if (result.length > 0) {
            res.send(response("BE009", result));
        } else {
            res.statusCode = 404;
            res.send(response("BE010", ""));
        }
    } catch (error) {
        res.statusCode = 500;
        res.send(response("BE000", ""));
    }

}

module.exports = {
    fileupload,
    getfileinfo
}