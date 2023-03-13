const http = require('http');
const express = require('express');
require('dotenv').config({path: 'config.env'});
require('./db/create');
var cors = require('cors');
var cookieParser = require('cookie-parser')

const noteRouter = require('./routers/note');
const userRouter = require('./routers/user');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(noteRouter);
app.use(userRouter);

server.listen(port, () => {
    console.log('Server is up! on port ' + port);
});