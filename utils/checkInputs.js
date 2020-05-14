const validator = require("validator");

const checkInput = (inputValue) => {
  const errors = {};
  Object.keys(inputValue).forEach((key) => {
    if (
      !inputValue[key] ||
      validator.isEmpty(String(inputValue[key])) ||
      String(inputValue[key]).trim() === "" ||
      inputValue[key] === ""
    ) {
      errors[key] = `${key} field cannot be blank`;
    } else {
      /*
       *input Validation
       */
      if (key === "email") {
        if (!validator.isEmail(inputValue[key])) {
          errors[key] = `Invalid ${key}`;
        }
      }
      if (key === "password") {
        if (!validator.isLength(inputValue[key], { min: 8, max: 50 })) {
          errors[key] = `${key} must be between 8 and 50 characters`;
        }
      }
    }
  });
  return errors;
};
module.exports = checkInput;
