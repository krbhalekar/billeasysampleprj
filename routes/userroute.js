let express = require('express');
let route = express.Router();
let { createuser, loginuser } = require('../controller/usercontroller');

route.post('/create', createuser);
route.post('/login', loginuser);

module.exports = route;