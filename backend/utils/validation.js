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

const customMessages = {
  'string.base': 'Pole {#label} musi być ciągiem znaków.',
  'string.min': 'Pole {#label} musi mieć co najmniej {#limit} znaków.',
  'string.max': 'Pole {#label} nie może mieć więcej niż {#limit} znaków.',
  'string.empty': 'Pole {#label} nie może być puste.',
  'string.pattern.base': 'Pole {#label} zawiera niedozwolone znaki.',
  'number.base': 'Pole {#label} musi być liczbą.',
  'any.required': 'Pole {#label} jest wymagane.',
  'number.greater': 'Pole {#label} musi być większe niż {#limit+1}',
  'number.less': 'Pole {#label} musi być mniejsze niż {#limit-1}',
  'passwordComplexity.tooShort': 'Hasło musi mieć co najmniej 8 znaków.',
  'passwordComplexity.uppercase': 'Hasło musi zawierać przynajmniej jedną wielką literę.',
  'passwordComplexity.numeric': 'Hasło musi zawierać przynajmniej jedną cyfrę.',
  'passwordComplexity.symbol': 'Hasło musi zawierać przynajmniej jeden znak specjalny (np. @, $, %, etc.).'
};

const userSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp("^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$"))
    .label("Imię"),
  lastName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp("^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$"))
    .label("Nazwisko"),
  email: Joi.string().email().required().label("E-mail"),
  password: passwordComplexity().required().label("Password"), // password: passwordComplexity(complexityOptions).required().label("Password"),
  phoneNumber: Joi.string().min(9).max(15).required().label("Numer telefonu"),
}).messages(customMessages);

const editUserSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp("^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$"))
    .label("Imię"),
  lastName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp("^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$"))
    .label("Nazwisko"),
  email: Joi.string().email().required().label("E-mail"),
  phoneNumber: Joi.string().min(9).max(15).required().label("Telefon"),
  weight: Joi.number().greater(29).less(111).required().label("Masa"),
}).messages(customMessages);

const editClientSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp("^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$"))
    .label("Imię"),
  lastName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp("^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$"))
    .label("Nazwisko"),
  email: Joi.string().email().required().label("E-mail"),
  phoneNumber: Joi.string().min(9).max(15).required().label("Telefon"),
}).messages(customMessages);

const editOfferSchema = Joi.object({
  jumpName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp("^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ ]+$"))
    .label("Nazwa"),
  jumpPrice: Joi.number().required().label("Cena")
}).messages(customMessages);

const addNewOfferSchema = Joi.object({
  jumpName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp("^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ ]+$"))
    .label("Nazwa"),
  jumpPrice: Joi.number().required().label("Cena"),
  jumpSeats: Joi.number().required().label("Liczba miejsc"),
  jumpLicense: Joi.number().required().label("Wymagana licencja"), // moze Joi.boolean() ?
  jumpWeight: Joi.number().required().label("Masa ciała")
}).messages(customMessages);

const passwordComplexityInstance = passwordComplexity(complexityOptions);

const editUserWeight = Joi.object({
  userWeight: Joi.number().greater(29).less(111).required().label("Masa")
}).messages(customMessages);

const addPaymentMethod = Joi.object({
  paymentName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp("^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ ]+$"))
    .label("Metoda płatności"),
}).messages(customMessages);

module.exports = {
  userSchema,
  addNewOfferSchema,
  editOfferSchema,
  editUserSchema,
  editClientSchema,
  editUserWeight,
  addPaymentMethod,
  passwordComplexityInstance,
};
