const Joi = require('joi');
export const text = {
  value: Joi.string().min(5).max(5000).required().messages({
    'string.empty': `This field cannot be an empty field`,
    'string.min': `This field should have a minimum length of {#limit}`,
    'string.max': `This field should have a maximum length of {#limit}`,
    'any.required': `This field is a required field`,
  }),
};
export const number = {
  value: Joi.number().min(2000),
};
