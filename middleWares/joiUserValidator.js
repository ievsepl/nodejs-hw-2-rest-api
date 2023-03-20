const Joi = require("joi");

const userValidator = () => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().required(),
    token: Joi.string().required(),
  });

  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: `missing required ${
          error.message.replace(/"/g, "").split(" ", 1)[0]
        } field`,
      });
    }
    next();
  };
};
const userLoginValidator = () => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    // token: Joi.string().required(),
  });

  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: `missing required ${
          error.message.replace(/"/g, "").split(" ", 1)[0]
        } field`,
      });
    }
    next();
  };
};

const subscriptionValidator = () => {
  const schema = Joi.object({ subscription: Joi.string().required() });

  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      console.log(error);
      return res.status(400).json({
        message: "missing field favorite",
      });
    }
    next();
  };
};
module.exports = { userValidator, userLoginValidator, subscriptionValidator };
