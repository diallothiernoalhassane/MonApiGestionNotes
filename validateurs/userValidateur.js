const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.email': 'Email invalide !',
            'any.required': 'Email requis !'
        }),
    passWord: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.min': 'Mot de passe trop court !',
            'any.required': 'Mot de passe requis !'
        })
});

module.exports = userSchema;
