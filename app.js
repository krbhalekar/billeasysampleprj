require('dotenv').config();
let port = process.env.SERVER_PORT;
let express = require('express');
let app = express();
let indexRouter = require('./routes/index');
let userRouter = require('./routes/userroute');
let fileRouter = require('./routes/fileroute');

app.use(express.json());
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/file', fileRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});