const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/routers');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.set('view engine', 'ejs');

app.use('/', userRoute);

module.exports = app;

