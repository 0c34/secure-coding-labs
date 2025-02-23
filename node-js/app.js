const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/routers');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.disable('x-powered-by')
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: "mysecret", //process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false, // Set to true if using HTTPS
        sameSite: 'Lax',
    },
}))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use('/', userRoute);

module.exports = app;

