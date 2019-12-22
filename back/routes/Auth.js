const express = require('express');
const passport = require('passport');
const parser = require('body-parser');

const saltRounds = 15;

const { User } = require('../config/collection');

const Router = express.Router();

require('../config/passport')(passport);

Router.use(passport.initialize());
Router.use(passport.session());

Router.use(parser.urlencoded({ extended: false }));

Router.get('/', (req, res) => res.redirect(`${req.baseUrl}/login`));

Router.get('/login', (req, res) => res.render('auth/login', { judul: 'Login', bURL: req.baseUrl }));

//Router.post('/log', (req, res, next) => {
//    passport.authenticate('local', {
//        successRedirect: '/diary/welcome',
//        failureRedirect: `${req.baseUrl}/login`,
//        failureFlash: true
//    })(req, res, next);
//});

Router.post('/log',passport.authenticate('local', {
       successRedirect: '/diary/welcome',
       failureRedirect: `auth/login`,
       failureFlash: true
}));

Router.get('/daftar', (req, res) => res.render('auth/daftar', { judul: 'Daftar Akun Baru', bURL: req.baseUrl }));

Router.post('/reg', (req, res) => {
//
});

module.exports = Router;