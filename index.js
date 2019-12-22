const path = require('path');
const morgan = require('morgan');
const express = require('express');
const favicon = require('serve-favicon');
const ejs = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash-notification');
const SessionStore = require('nedb-session-store')(session);

const app = express();

app.use(favicon(path.join(__dirname, 'front/image', 'favicon.ico')));

const env = require('dotenv').config(path.join(__dirname, '.env')).parsed;

const { CS: secret } = env;

app.use(morgan('dev'));
app.use(cookieParser(secret));
app.use(
    session({
        secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 365 * 24 * 60 * 60 * 1000
        },
        store: new SessionStore({
            filename: path.join(__dirname, 'storedData', env.nS)
        })
    })
);
app.use(flash(app));

app.use('/bs', express.static(path.join(__dirname, 'node_modules/bootstrap')));
app.use('/jq', express.static(path.join(__dirname, 'node_modules/jquery')));

const reqRoute = name => require(path.join(__dirname, 'back/routes', name));

const port = process.env.PORT || env.PORT || 3000;

app.set('views', path.join(__dirname, 'front/view'));
app.use('/js', express.static(path.join(__dirname, 'front/js')));
app.use('/style', express.static(path.join(__dirname, 'front/css')));

app.set('view engine', 'ejs');
app.use(ejs);

app.set('layout', 'layouts');
app.set('flash', 'flash');

app.get('/', (req, res) => res.render('index', { judul: 'Selamat Datang' }));
app.use('/auth', reqRoute('Auth'));
// app.get('/api', reqRoute('Api'));

app.listen(port, () => console.log(`Listening on *:${port}`));