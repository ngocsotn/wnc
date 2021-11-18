const Joi = require('joi');
export const text = {
  value: Joi.string().min(5).max(5000).required().messages({
    'string.empty': `Không được để trống`,
    'string.min': `Tối thiểu {#limit} kí tự`,
    'string.max': `Tối đa {#limit} kí tự`,
    'any.required': `Không được để trống`,
  }),
};

export const emailSchema = {
  value: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': `Không được để trống`,
      'string.email': `Email không hợp lệ`,
      'any.required': `Không được để trống`,
    }),
};

export const number = {
  value: Joi.number().min(2000).messages({
    'string.number': `Vui lòng nhập số hợp lệ`,
    'any.min': `Tối thiểu {#limit}`,
  }),
};
