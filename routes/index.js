let express = require('express');
let route = express.Router();

route.get('/health', (req, res)=>{
    res.send({code : 200, status: 'Bill Easy Application Running Successfully'});
});

module.exports = route;