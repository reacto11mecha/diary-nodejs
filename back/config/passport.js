const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');

const { User } = require('./collection');
module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email }, (err, user) => {
                if (err) throw err;
                if (!user)
                    return done(null, false, { message: 'Akun ini belum terdaftar!' });

                bcrypt.compare(password, user.password, (err, cocok) => {
                    if (err) throw err;
                    if (cocok) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Kata Sandi dimasukan salah' });
                    }
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (_id, done) {
        User.findOne({ _id }, function (err, user) {
            done(err, user);
        });
    });
}