const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 5,
  max: 255,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

const userSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .required()
    .label("First name")
    .pattern(new RegExp("^[A-Za-z]+$"), "letters"),
  lastName: Joi.string()
    .min(3)
    .required()
    .label("Last name")
    .pattern(new RegExp("^[A-Za-z]+$"), "letters"),
  email: Joi.string().email().required().label("E-mail"),
  password: passwordComplexity().required().label("Password"), // password: passwordComplexity(complexityOptions).required().label("Password"),
  phoneNumber: Joi.string().min(9).max(15).required().label("Phone number"),
});

const passwordComplexityInstance = passwordComplexity(complexityOptions);

module.exports = {
  userSchema,
  passwordComplexityInstance,
};
