
const Joi = require('joi');

const createBookValidator = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        author: Joi.string().min(3).required(),
        category: Joi.string().required(),
        price: Joi.number().positive().required(),
        description: Joi.string().optional(),
        imageUrl: Joi.string().optional(),
    });

    return schema.validate(data);
};

module.exports = { createBookValidator };
