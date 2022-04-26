const jwt = require("jsonwebtoken");

const userHandler = {};

userHandler.handleErrors = (error) => {
  let errorData = { username: "", password: "" };

  if (error.code === 11000) {
    errorData.username = "the username is not available";

    return errorData;
  }

  // we run a simple check to know if it was a validation error
  if (error.message.includes("user validation failed")) {
    // Object is a built-in javascript constructor that we can
    // use on any javascript data-type. here, we are checking
    // for the error fields and populating the errorData variable

    Object.values(error.errors).forEach(({ properties }) => {
      errorData[properties.path] = properties.message;
    });
  }

  return errorData;
};

// creating a bearer token
userHandler.createToken = (id) => {
  const maxAge = 24 * 60 * 60;
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge
  });
};

module.exports = userHandler;

// when you log the error to the console, the structure similar to the one given below.
// you will observe that all we are doing is to check the origin of the error and
// get the error message.
// {
//   "errors": {
//       "username": {
//           "name": "ValidatorError",
//           "message": "minimum username length is 6 characters",
//           "properties": {
//               "message": "minimum username length is 6 characters",
//               "type": "minlength",
//               "minlength": 6,
//               "path": "username",
//               "value": "kr"
//           },
//           "kind": "minlength",
//           "path": "username",
//           "value": "kr"
//       },
//       "password": {
//           "name": "ValidatorError",
//           "message": "minimum password length is 6 characters",
//           "properties": {
//               "message": "minimum password length is 6 characters",
//               "type": "minlength",
//               "minlength": 6,
//               "path": "password",
//               "value": "s3Kr"
//           },
//           "kind": "minlength",
//           "path": "password",
//           "value": "s3Kr"
//       }
//   },
//   "_message": "user validation failed",
//   "name": "ValidationError",
//   "message": "user validation failed: username: minimum username length is 6 characters, password: minimum password length is 6 characters"
// }
