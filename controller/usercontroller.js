let userservice = require('../services/userservice');
let { response } = require('../utils/responsehelper');
let jwt = require('../utils/tokenhelper');

let createuser = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        let result = await userservice.createUser(email, password);
        console.log({ result });
        if (result == 1) {
            res.statusCode = 200;
            res.send(response("BE001", ""));
        } else {
            res.statusCode = 400;
            res.send(response("BE000", ""));
        }
    } catch (error) {
        res.send(response("BE000", ""));
    }
}

let loginuser = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        let result = await userservice.loginUser(email, password);
        console.log({ result });
        if (result.length > 0) {
            let token = await jwt.getToken(result[0].id, result[0].email);
            res.statusCode = 200;
            res.send(response("BE003", token));
        } else {
            res.statusCode = 404;
            res.send(response("BE004", ""));
        }
    } catch (error) {
        res.send(response("BE000", ""));
    }
}

module.exports = {
    createuser,
    loginuser
}