require('dotenv').config();
let jwt = require('jsonwebtoken');
let { response } = require('../utils/responsehelper');

let getToken = async (id, email) => {
    return jwt.sign({ id: id, username: email }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRY });
}

let verifyToken = async (req, res, next) => {
    let token = req.headers['accesstoken'];
    if (!token) {
        res.statusCode = 401;
        return res.send(response("BE005", ""));
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
        if (err) {
            res.statusCode = 403;
            return res.send(response("BE006", ""));
        } else {
            req.user = result;
            next();
        }
    });
}

module.exports = {
    getToken,
    verifyToken
}