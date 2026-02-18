import Joi from 'joi';

export const validateExpense = (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().integer().positive().required(),
    category: Joi.string().min(2).required(),
    description: Joi.string().allow('').optional(),
    date: Joi.date().iso().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};
