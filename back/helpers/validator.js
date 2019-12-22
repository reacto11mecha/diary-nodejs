const Joi = require('@hapi/joi');

const login = data => {
    const sc = Joi.object({
        email: Joi.
            string().
            email().
            required(),
        password: Joi.
            string().
            required()
    });
    return sc.validate(data);
}

const register = data => {
    const sc = Joi.object({
        email: Joi.
            string().
            email().
            min(5).
            required(),
        password_first: Joi.
            string().
            required().
            min(5),
        password_confirm: Joi.ref('password_first')
        ,
        username: Joi.
            string().
            min(7).
            required()
    });
    return sc.validate(data);
}

module.exports = {
    login,
    register
}