//VALIDATION
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
    const schema = {
        name: Joi.string().min(4).required(),
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(4).required(),
        role: Joi.string().required()
    };
    return Joi.validate(data, schema);
};

//Login Validation
const loginValidation = (data) => {
    const schema = {
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(4).required()
    };
    return Joi.validate(data, schema);
};

//SOP Validation
const SOPValidation = (data) => {
    const schema = {
        sop: Joi.string().max(250).required()
    };
    return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.SOPValidation = SOPValidation;